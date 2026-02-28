import { useEffect, useState, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// Prefetch route chunks on nav link hover
const prefetchedRoutes = new Set<string>();
function prefetchRoute(routeName: string) {
    if (prefetchedRoutes.has(routeName)) return;
    prefetchedRoutes.add(routeName);
    switch (routeName) {
        case '/platform': import('../pages/Platform'); break;
        case '/solutions': import('../pages/Solutions'); break;
        case '/pricing': import('../pages/Pricing'); break;
        case '/contact': import('../pages/Contact'); break;
    }
}

export default function Layout() {
    const [navOpen, setNavOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
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

    // Back-to-top visibility
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setShowBackToTop(window.scrollY > 600);
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

            <header className="top-nav">
                <Link className="nav-logo" to="/" aria-label="Metics home">
                    <img src="/Metics-blue.png" alt="Metics" width="140" height="36" />
                </Link>

                <nav className={`nav-links${navOpen ? ' active' : ''}`} id="primary-navigation">
                    <Link to="/platform" className={isActive('/platform') ? 'active' : ''} onClick={() => setNavOpen(false)} onMouseEnter={() => prefetchRoute('/platform')}>Platform</Link>
                    <Link to="/solutions" className={isActive('/solutions') ? 'active' : ''} onClick={() => setNavOpen(false)} onMouseEnter={() => prefetchRoute('/solutions')}>Solutions</Link>
                    <Link to="/pricing" className={isActive('/pricing') ? 'active' : ''} onClick={() => setNavOpen(false)} onMouseEnter={() => prefetchRoute('/pricing')}>Pricing</Link>
                    <div className="nav-mobile-cta">
                        <Link className="mobile-primary" to="/contact" onClick={() => setNavOpen(false)} onMouseEnter={() => prefetchRoute('/contact')}>Request Demo</Link>
                        <Link className="mobile-secondary" to="/contact" onClick={() => setNavOpen(false)}>Contact Sales</Link>
                    </div>
                </nav>

                <div className="nav-cta">
                    <Link className="ghost" to="/contact" onMouseEnter={() => prefetchRoute('/contact')}>Contact Sales</Link>
                    <Link className="solid" to="/contact" onMouseEnter={() => prefetchRoute('/contact')}>Request Demo</Link>
                </div>

                <button
                    className={`nav-toggle${navOpen ? ' open' : ''}`}
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={navOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setNavOpen(prev => !prev)}
                >
                    <span /><span />
                </button>
            </header>

            <main>
                <Outlet />
            </main>

            {/* Back-to-top button */}
            <button
                className={`back-to-top${showBackToTop ? ' visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
                type="button"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <Link className="logo footer-logo" to="/" aria-label="Metics home">
                            <img src="/Metics-blue.png" alt="" width="36" height="36" loading="lazy" className="footer-logo-icon" />
                            <span className="footer-logo-text">Metics</span>
                        </Link>
                        <p>Enterprise procurement intelligence for the built world. Connecting buyers and suppliers with data-driven transparency.</p>
                    </div>

                    <div className="footer-links">
                        <div>
                            <h4>Platform</h4>
                            <Link to="/platform" onMouseEnter={() => prefetchRoute('/platform')}>Overview</Link>
                            <Link to="/platform">For Buyers</Link>
                            <Link to="/platform">For Suppliers</Link>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <Link to="/solutions" onMouseEnter={() => prefetchRoute('/solutions')}>Solutions</Link>
                            <Link to="/pricing" onMouseEnter={() => prefetchRoute('/pricing')}>Pricing</Link>
                            <Link to="/contact" onMouseEnter={() => prefetchRoute('/contact')}>Contact</Link>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <a href="#" rel="noopener noreferrer">Documentation</a>
                            <a href="#" rel="noopener noreferrer">API Reference</a>
                            <a href="#" rel="noopener noreferrer">Status</a>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Metics. All rights reserved.</p>
                        <div className="footer-badges">
                            <span>GDPR Compliant</span>
                            <span>ISO-Ready</span>
                            <span>EU Data Residency</span>
                            <span>SSO &amp; SAML</span>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}
