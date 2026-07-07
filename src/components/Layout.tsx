import { useEffect, useState, useCallback } from 'react';
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
            if (window.innerWidth > 960) setNavOpen(false);
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
        <div className="page-shell">
            <ScrollToTop />

            <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
                <div className="site-nav-inner">
                    <Link className="site-nav-logo" to="/" aria-label="Metics home" onMouseEnter={() => prefetchRoute('/')}>
                        <img src="/Metics-blue.png" alt="Metics Logo" height="24" />
                    </Link>

                    <nav className={`site-nav-links${navOpen ? ' active' : ''}`} id="primary-navigation">
                        <Link
                            to="/platform"
                            className={isActive('/platform') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/platform')}
                        >
                            Platform
                        </Link>
                        <Link
                            to="/solutions"
                            className={isActive('/solutions') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/solutions')}
                        >
                            Solutions
                        </Link>
                        <Link
                            to="/industries"
                            className={isActive('/industries') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/industries')}
                        >
                            Industries
                        </Link>
                        <Link
                            to="/case-studies"
                            className={isActive('/case-studies') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/case-studies')}
                        >
                            Case studies
                        </Link>
                        <Link
                            to="/insights"
                            className={isActive('/insights') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/insights')}
                        >
                            Insights
                        </Link>
                        <Link
                            to="/pricing"
                            className={isActive('/pricing') ? 'active' : ''}
                            onClick={() => setNavOpen(false)}
                            onMouseEnter={() => prefetchRoute('/pricing')}
                        >
                            Pricing
                        </Link>
                        <div className="site-nav-mobile-cta">
                            <Link
                                className="site-nav-cta-btn"
                                to="/contact"
                                onClick={() => setNavOpen(false)}
                                onMouseEnter={() => prefetchRoute('/contact')}
                            >
                                Get started
                            </Link>
                        </div>
                    </nav>

                    <div className="site-nav-cta">
                        <Link
                            className="site-nav-cta-btn"
                            to="/contact"
                            onMouseEnter={() => prefetchRoute('/contact')}
                        >
                            Get started
                        </Link>
                    </div>

                    <button
                        className={`site-nav-toggle${navOpen ? ' open' : ''}`}
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={navOpen}
                        aria-controls="primary-navigation"
                        onClick={() => setNavOpen(prev => !prev)}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </header>

            <main>
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

            <footer className="site-footer">
                <div className="site-footer-inner">
                    <div className="site-footer-top">
                        <div className="site-footer-brand">
                            <Link to="/" className="site-footer-logo">
                                <img src="/Metics-blue.png" alt="Metics Logo" height="20" />
                            </Link>
                            <p>Procurement decision intelligence. RFQs, bids, approvals, and purchase orders in one shared record.</p>
                            <div className="site-footer-trust">
                                <span className="site-footer-trust-badge">GDPR compliant</span>
                                <span className="site-footer-trust-badge">EU data residency</span>
                                <span className="site-footer-trust-badge">Free for suppliers</span>
                            </div>
                        </div>

                        <div className="site-footer-cols">
                            <div>
                                <h4>Product</h4>
                                <ul>
                                    <li><Link to="/platform">Platform</Link></li>
                                    <li><Link to="/solutions">Solutions</Link></li>
                                    <li><Link to="/industries">Industries</Link></li>
                                    <li><Link to="/pricing">Pricing</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4>Resources</h4>
                                <ul>
                                    <li><Link to="/case-studies">Case studies</Link></li>
                                    <li><Link to="/insights">Insights</Link></li>
                                    <li><Link to="/solutions">By role</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4>Company</h4>
                                <ul>
                                    <li><Link to="/contact">Book a demo</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    <li><a href="#">Security</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="site-footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Metics. All rights reserved.</p>
                        <div className="site-footer-legal">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
