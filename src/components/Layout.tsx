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
        case '/about': import('../pages/About'); break;
        case '/faq': import('../pages/Faq'); break;
        case '/security': import('../pages/Security'); break;
        case '/privacy': import('../pages/Privacy'); break;
        case '/terms': import('../pages/Terms'); break;
    }
}

const NAV_LINKS = [
    { name: 'Platform', path: '/platform' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'Case studies', path: '/case-studies' },
    { name: 'Insights', path: '/insights' },
    { name: 'Pricing', path: '/pricing' },
];

const EASE: [number, number, number, number] = [0.2, 0, 0.38, 0.9];

const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.15, ease: EASE, when: 'beforeChildren' as const, staggerChildren: 0.04 },
    },
    exit: { opacity: 0, transition: { duration: 0.11, ease: EASE, when: 'afterChildren' as const } },
};

const mobileLinkVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15, ease: EASE } },
    exit: { opacity: 0, transition: { duration: 0.11, ease: EASE } },
};

export default function Layout() {
    const [navOpen, setNavOpen] = useState(false);
    const [showTop, setShowTop] = useState(false);
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
                    setShowTop(window.scrollY > 560);
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
        <div className="min-h-screen bg-paper">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <ScrollToTop />

            <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-subtle border-t-[3px] border-t-accent bg-paper">
                <div className="site-wrap flex h-14 items-center justify-between">
                    <Link
                        className="relative z-50 flex items-center"
                        to="/"
                        aria-label="Metics home"
                        onMouseEnter={() => prefetchRoute('/')}
                    >
                        <img src="/Metics-blue.png" alt="Metics" height="20" className="h-5 w-auto" />
                    </Link>

                    <nav className="hidden h-14 items-stretch lg:flex" aria-label="Primary">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`inline-flex items-center px-4 text-sm transition-colors duration-150 ${
                                    isActive(link.path)
                                        ? 'border-b-2 border-accent text-primary'
                                        : 'text-muted hover:bg-layer hover:text-primary'
                                }`}
                                onMouseEnter={() => prefetchRoute(link.path)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-2 lg:flex">
                        <a
                            className="inline-flex h-8 items-center px-4 text-sm text-muted hover:bg-layer hover:text-primary"
                            href="https://app.metics.net/"
                        >
                            Log in
                        </a>
                        <Link
                            className="btn-masthead"
                            to="/contact"
                            onMouseEnter={() => prefetchRoute('/contact')}
                        >
                            Get started
                        </Link>
                    </div>

                    <button
                        className="relative z-50 -mr-2 p-2 lg:hidden"
                        type="button"
                        onClick={() => setNavOpen(!navOpen)}
                        aria-label={navOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={navOpen}
                    >
                        <div className="flex w-5 flex-col gap-[5px]">
                            <span className={`h-px w-full bg-primary transition-all duration-150 ${navOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                            <span className={`h-px w-full bg-primary transition-all duration-150 ${navOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-px w-full bg-primary transition-all duration-150 ${navOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
                        </div>
                    </button>
                </div>

                <AnimatePresence>
                    {navOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-4 pb-10 pt-[4.5rem] lg:hidden"
                        >
                            <nav className="flex flex-col" aria-label="Mobile">
                                {[...NAV_LINKS, { name: 'Contact', path: '/contact' }].map((link) => (
                                    <motion.div key={link.path} variants={mobileLinkVariants}>
                                        <Link
                                            to={link.path}
                                            className={`flex items-center justify-between border-b border-subtle py-4 text-2xl font-light tracking-tight ${
                                                isActive(link.path) ? 'text-accent' : 'text-primary'
                                            }`}
                                            onClick={() => setNavOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div variants={mobileLinkVariants} className="mt-auto flex flex-col gap-1 pt-10">
                                <a
                                    className="btn-tertiary w-full"
                                    href="https://app.metics.net/"
                                >
                                    Log in
                                </a>
                                <Link
                                    className="btn-primary w-full"
                                    to="/contact"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Get started
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main id="main-content" className="pt-14">
                <div key={location.pathname} className="page-enter">
                    <Outlet />
                </div>
            </main>

            <button
                className={`back-to-top${showTop ? ' visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
                type="button"
            >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </button>

            <footer className="bg-ink text-[#c6c6c6]">
                <div className="site-wrap py-16">
                    <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-16 lg:gap-8">
                        <div className="lg:col-span-6">
                            <Link to="/" className="mb-6 inline-block" aria-label="Metics home">
                                <img src="/Metics-blue.png" alt="Metics" height="20" className="h-5 w-auto brightness-0 invert" />
                            </Link>
                            <p className="max-w-sm text-base leading-6 text-[#c6c6c6]">
                                RFQs, bids, approvals, and purchase orders in one shared record.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-9 lg:col-start-8">
                            <div>
                                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-white/50">Product</h4>
                                <ul className="flex flex-col gap-2 text-sm">
                                    <li><Link to="/platform" className="hover:text-white">Platform</Link></li>
                                    <li><Link to="/solutions" className="hover:text-white">Solutions</Link></li>
                                    <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
                                    <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-white/50">Resources</h4>
                                <ul className="flex flex-col gap-2 text-sm">
                                    <li><Link to="/case-studies" className="hover:text-white">Case studies</Link></li>
                                    <li><Link to="/insights" className="hover:text-white">Insights</Link></li>
                                    <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                                    <li><Link to="/solutions" className="hover:text-white">By role</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-white/50">Company</h4>
                                <ul className="flex flex-col gap-2 text-sm">
                                    <li><Link to="/about" className="hover:text-white">About</Link></li>
                                    <li><Link to="/contact" className="hover:text-white">Book a demo</Link></li>
                                    <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                                    <li><Link to="/security" className="hover:text-white">Security</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 border-t border-[#393939] pt-6 text-sm text-[#8d8d8d] md:flex-row md:items-center">
                        <p>&copy; {new Date().getFullYear()} Metics. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-white">Privacy</Link>
                            <Link to="/terms" className="hover:text-white">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
