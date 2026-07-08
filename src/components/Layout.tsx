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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: EASE, when: 'beforeChildren' as const, staggerChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.25, ease: EASE, when: 'afterChildren' as const } },
};

const mobileLinkVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.15, ease: EASE } },
};

export default function Layout() {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
                    setScrolled(window.scrollY > 12);
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
        <div className="min-h-screen bg-paper selection:bg-accent/25 selection:text-primary">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <ScrollToTop />

            <header
                className={`fixed inset-x-0 top-0 z-50 bg-[#FAF8F6]/80 backdrop-blur-xl transition-[border-color] duration-300 border-b ${
                    scrolled && !navOpen ? 'border-black/[0.08]' : 'border-transparent'
                }`}
            >
                <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-8">
                    <Link
                        className="relative z-50 flex items-center"
                        to="/"
                        aria-label="Metics home"
                        onMouseEnter={() => prefetchRoute('/')}
                    >
                        <img src="/Metics-blue.png" alt="Metics" height="22" className="h-[22px] w-auto" />
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`group relative py-1 text-[13px] font-medium transition-colors duration-200 ${
                                    isActive(link.path) ? 'text-primary' : 'text-primary/55 hover:text-primary'
                                }`}
                                onMouseEnter={() => prefetchRoute(link.path)}
                            >
                                {link.name}
                                {/* Hover underline — draws left to right, exits to the right */}
                                <span
                                    aria-hidden="true"
                                    className={`absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-editorial group-hover:origin-left group-hover:scale-x-100 ${
                                        isActive(link.path) ? 'hidden' : ''
                                    }`}
                                />
                                {isActive(link.path) && (
                                    <motion.span
                                        layoutId="nav-active-underline"
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-5 lg:flex">
                        <Link
                            className="text-[13px] font-medium text-primary/55 transition-colors duration-200 hover:text-primary"
                            to="/contact"
                        >
                            Log in
                        </Link>
                        <Link
                            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-accent"
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
                            <span className={`h-px w-full bg-primary transition-all duration-300 ${navOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                            <span className={`h-px w-full bg-primary transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-px w-full bg-primary transition-all duration-300 ${navOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile navigation overlay */}
                <AnimatePresence>
                    {navOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-6 pb-10 pt-24 lg:hidden"
                        >
                            <nav className="flex flex-col" aria-label="Mobile">
                                {[...NAV_LINKS, { name: 'Contact', path: '/contact' }].map((link) => (
                                    <motion.div key={link.path} variants={mobileLinkVariants}>
                                        <Link
                                            to={link.path}
                                            className={`flex items-center justify-between border-b border-black/[0.06] py-4 font-serif text-3xl tracking-tight transition-colors ${
                                                isActive(link.path) ? 'text-accent' : 'text-primary'
                                            }`}
                                            onClick={() => setNavOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div variants={mobileLinkVariants} className="mt-auto flex flex-col gap-3 pt-10">
                                <Link
                                    className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
                                    to="/contact"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
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

            <main id="main-content" className="pt-16">
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
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <footer className="mt-16 rounded-t-[2.5rem] bg-ink text-white/55 md:mt-24">
                <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-8 md:py-24">
                    <div className="mb-16 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                        <div>
                            <Link to="/" className="mb-7 inline-block" aria-label="Metics home">
                                <img src="/Metics-blue.png" alt="Metics" height="26" className="h-[26px] w-auto brightness-0 invert" />
                            </Link>
                            <p className="mb-8 max-w-sm font-serif text-xl leading-relaxed text-white/75">
                                Procurement decision intelligence. RFQs, bids, approvals, and purchase orders in one shared record.
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {['GDPR compliant', 'EU data residency', 'Free for suppliers'].map(badge => (
                                    <span
                                        key={badge}
                                        className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:border-white/25 hover:text-white/85"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                            <div>
                                <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Product</h4>
                                <ul className="flex flex-col gap-3.5 text-sm">
                                    <li><Link to="/platform" className="transition-colors duration-200 hover:text-white">Platform</Link></li>
                                    <li><Link to="/solutions" className="transition-colors duration-200 hover:text-white">Solutions</Link></li>
                                    <li><Link to="/industries" className="transition-colors duration-200 hover:text-white">Industries</Link></li>
                                    <li><Link to="/pricing" className="transition-colors duration-200 hover:text-white">Pricing</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Resources</h4>
                                <ul className="flex flex-col gap-3.5 text-sm">
                                    <li><Link to="/case-studies" className="transition-colors duration-200 hover:text-white">Case studies</Link></li>
                                    <li><Link to="/insights" className="transition-colors duration-200 hover:text-white">Insights</Link></li>
                                    <li><Link to="/faq" className="transition-colors duration-200 hover:text-white">FAQ</Link></li>
                                    <li><Link to="/solutions" className="transition-colors duration-200 hover:text-white">By role</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Company</h4>
                                <ul className="flex flex-col gap-3.5 text-sm">
                                    <li><Link to="/about" className="transition-colors duration-200 hover:text-white">About</Link></li>
                                    <li><Link to="/contact" className="transition-colors duration-200 hover:text-white">Book a demo</Link></li>
                                    <li><Link to="/contact" className="transition-colors duration-200 hover:text-white">Contact</Link></li>
                                    <li><Link to="/security" className="transition-colors duration-200 hover:text-white">Security</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Oversized serif wordmark — a print-style colophon signature */}
                    <div className="overflow-hidden border-t border-white/10 pt-12" aria-hidden="true">
                        <p className="select-none text-center font-serif text-[20.5vw] leading-[0.85] tracking-tight text-white/[0.07] lg:text-[15rem]">
                            Metics
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 text-[13px] text-white/40 md:flex-row md:items-center">
                        <p>&copy; {new Date().getFullYear()} Metics. All rights reserved.</p>
                        <div className="flex gap-7">
                            <Link to="/privacy" className="transition-colors duration-200 hover:text-white/80">Privacy Policy</Link>
                            <Link to="/terms" className="transition-colors duration-200 hover:text-white/80">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
