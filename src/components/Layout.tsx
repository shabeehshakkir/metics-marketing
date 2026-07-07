import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const prefetchedRoutes = new Set<string>();
function prefetchRoute(routeName: string) {
    if (prefetchedRoutes.has(routeName)) return;
    prefetchedRoutes.add(routeName);
    switch (routeName) {
        case '/': import('../pages/Home'); break;
        case '/platform': import('../pages/Platform'); break;
        case '/solutions': import('../pages/Solutions'); break;
        case '/industries': import('../pages/Industries'); break;
        case '/case-studies': import('../pages/CaseStudies'); break;
        case '/insights': import('../pages/Insights'); break;
        case '/pricing': import('../pages/Pricing'); break;
        case '/contact': import('../pages/Contact'); break;
    }
}

export default function Layout() {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setNavOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.classList.toggle('nav-open', navOpen);
        return () => { document.body.classList.remove('nav-open'); };
    }, [navOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setNavOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="page-shell bg-paper selection:bg-accent/30 selection:text-primary">
            <ScrollToTop />

            <header className="site-nav fixed top-0 left-0 right-0 bg-[#FAF8F6] border-b border-black/10 transition-all duration-300">
                <div className="site-nav-inner flex items-center justify-between">
                    <Link className="site-nav-logo z-50" to="/" aria-label="Metics home" onMouseEnter={() => prefetchRoute('/')}>
                        <img src="/Metics-blue.png" alt="Metics Logo" height="32" className="h-8 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {[
                            { name: 'Platform', path: '/platform' },
                            { name: 'Solutions', path: '/solutions' },
                            { name: 'Industries', path: '/industries' },
                            { name: 'Case studies', path: '/case-studies' },
                            { name: 'Insights', path: '/insights' },
                            { name: 'Pricing', path: '/pricing' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm transition-colors hover:text-primary ${isActive(link.path) ? 'text-primary font-bold' : 'text-primary/60 font-medium'}`}
                                onMouseEnter={() => prefetchRoute(link.path)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            className="text-sm font-bold text-primary/60 hover:text-primary transition-colors"
                            to="/contact"
                        >
                            Log in
                        </Link>
                        <Link
                            className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded hover:bg-accent transition-colors"
                            to="/contact"
                            onMouseEnter={() => prefetchRoute('/contact')}
                        >
                            Get started
                        </Link>
                    </div>

                    <button
                        className="lg:hidden z-50 p-2"
                        type="button"
                        onClick={() => setNavOpen(!navOpen)}
                        aria-label="Menu"
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span className={`h-0.5 w-full bg-primary transition-all ${navOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`h-0.5 w-full bg-primary transition-all ${navOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-0.5 w-full bg-primary transition-all ${navOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {navOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-white z-40 flex flex-col p-8 pt-24"
                        >
                            <nav className="flex flex-col gap-6">
                                {[
                                    { name: 'Platform', path: '/platform' },
                                    { name: 'Solutions', path: '/solutions' },
                                    { name: 'Industries', path: '/industries' },
                                    { name: 'Case studies', path: '/case-studies' },
                                    { name: 'Insights', path: '/insights' },
                                    { name: 'Pricing', path: '/pricing' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-2xl font-serif font-medium text-primary"
                                        onClick={() => setNavOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                             <div className="mt-auto flex flex-col gap-4">
                                <Link
                                    className="w-full py-3.5 text-center font-bold border border-primary/20 rounded text-primary hover:border-accent hover:text-accent transition-colors"
                                    to="/contact"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    className="w-full py-3.5 text-center font-bold bg-primary text-white rounded hover:bg-accent transition-colors"
                                    to="/contact"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Get started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="pt-20">
                <div key={location.pathname} className="page-enter">
                    <Outlet />
                </div>
            </main>

            <button
                className={`back-to-top${scrolled ? ' visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
                type="button"
            >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <footer className="site-footer bg-primary text-white/60 py-20">
                <div className="site-footer-inner max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16">
                        <div className="site-footer-brand">
                            <Link to="/" className="site-footer-logo inline-block mb-8">
                                <img src="/Metics-blue.png" alt="Metics Logo" height="28" className="h-7 w-auto brightness-0 invert" />
                            </Link>
                            <p className="text-lg leading-relaxed max-w-sm mb-8">
                                Procurement decision intelligence. RFQs, bids, approvals, and purchase orders in one shared record.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['GDPR compliant', 'EU data residency', 'Free for suppliers'].map(badge => (
                                    <span key={badge} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                            <div>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Product</h4>
                                <ul className="flex flex-col gap-4">
                                    <li><Link to="/platform" className="hover:text-white transition-colors">Platform</Link></li>
                                    <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                                    <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
                                    <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Resources</h4>
                                <ul className="flex flex-col gap-4">
                                    <li><Link to="/case-studies" className="hover:text-white transition-colors">Case studies</Link></li>
                                    <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                                    <li><Link to="/solutions" className="hover:text-white transition-colors">By role</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
                                <ul className="flex flex-col gap-4">
                                    <li><Link to="/contact" className="hover:text-white transition-colors">Book a demo</Link></li>
                                    <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                        <p>&copy; {new Date().getFullYear()} Metics. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
