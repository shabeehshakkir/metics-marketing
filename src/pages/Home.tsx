import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { SectionHeading, FeatureCard, StatCard, CTABanner } from '../components/shared';

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}


function useCountUp() {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('[data-count]');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target as HTMLElement;
                const target = el.dataset.count || '';
                const isPercent = target.includes('%');
                const isX = target.includes('×');
                const num = parseInt(target.replace(/[^0-9]/g, ''));
                const suffix = isPercent ? '%' : isX ? '×' : target.replace(/[0-9]/g, '');
                let current = 0;
                const step = Math.ceil(num / 40);
                const timer = setInterval(() => {
                    current = Math.min(current + step, num);
                    el.textContent = current + suffix;
                    if (current >= num) clearInterval(timer);
                }, 30);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

export default function Home() {
    useScrollReveal();
    useCountUp();

    return (
        <>
            {/* ── HERO WITH ANIMATED ORBS ── */}
            <section className="hero-mega">
                <div className="hero-orbs">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>
                <div className="hero-noise" />
                <div className="hero-mega-inner">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-dot" />
                            Procurement Intelligence Platform
                        </div>
                        <h1 className="hero-title">
                            Smarter procurement<br />
                            <span className="hero-gradient">for the built world</span>
                        </h1>
                        <p className="hero-desc">
                            Metics unifies RFQs, bid analysis, and purchase orders on a single
                            intelligent platform — giving construction buyers and suppliers the
                            transparency and speed to make better decisions, faster.
                        </p>
                        <div className="hero-actions">
                            <Link className="btn-glow" to="/contact">
                                Request a Demo
                                <span className="btn-arrow">→</span>
                            </Link>
                            <Link className="btn-glass" to="/platform">
                                Explore Platform
                            </Link>
                        </div>
                        <div className="hero-proof">
                            <span><i className="dot green" />ISO-Ready</span>
                            <span><i className="dot green" />GDPR Compliant</span>
                            <span><i className="dot green" />Real-time</span>
                        </div>
                    </div>
                    <div className="hero-showcase">
                        <div className="showcase-card">
                            <div className="showcase-header">
                                <span className="sc-pill live">● Live</span>
                                <span className="sc-pill">PO Generated</span>
                            </div>
                            <div className="showcase-chart">
                                <div className="chart-bar" style={{ height: '40%' }} />
                                <div className="chart-bar" style={{ height: '65%' }} />
                                <div className="chart-bar accent" style={{ height: '85%' }} />
                                <div className="chart-bar" style={{ height: '55%' }} />
                                <div className="chart-bar" style={{ height: '75%' }} />
                                <div className="chart-bar accent" style={{ height: '92%' }} />
                                <div className="chart-bar" style={{ height: '60%' }} />
                            </div>
                            <div className="showcase-items">
                                <div className="sc-item">
                                    <div className="sc-item-dot" />
                                    <div>
                                        <strong>Steel Package RFQ</strong>
                                        <span>3 bids received · Partial awards enabled</span>
                                    </div>
                                </div>
                                <div className="sc-item">
                                    <div className="sc-item-dot blue" />
                                    <div>
                                        <strong>MEP Tender</strong>
                                        <span>Supplier chat active · Docs synced</span>
                                    </div>
                                </div>
                                <div className="sc-item">
                                    <div className="sc-item-dot green" />
                                    <div>
                                        <strong>Finishes Procurement</strong>
                                        <span>PO ready · Export PDF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating notification */}
                        <div className="float-notif">
                            <div className="notif-icon">✓</div>
                            <div>
                                <strong>Award confirmed</strong>
                                <span>Steel Package — €124,500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MARQUEE TRUST STRIP ── */}
            <section className="marquee-strip">
                <div className="marquee-track">
                    {[...Array(2)].map((_, i) => (
                        <div className="marquee-content" key={i}>
                            <span>Infrastructure</span>
                            <span className="marquee-dot">◆</span>
                            <span>Commercial Construction</span>
                            <span className="marquee-dot">◆</span>
                            <span>QS Consultancies</span>
                            <span className="marquee-dot">◆</span>
                            <span>Material Suppliers</span>
                            <span className="marquee-dot">◆</span>
                            <span>MEP Specialists</span>
                            <span className="marquee-dot">◆</span>
                            <span>General Contractors</span>
                            <span className="marquee-dot">◆</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BENTO GRID VALUE PROPS ── */}
            <section className="bento-section" id="value">
                <SectionHeading
                    eyebrow="Why Metics"
                    title="Built for how construction actually procures"
                    lede="Traditional procurement tools weren't designed for the complexity of construction supply chains. Metics is."
                />
                <div className="bento-grid">
                    <div className="bento-card bento-lg reveal">
                        <div className="bento-label">Speed</div>
                        <h3>Accelerate Award Cycles</h3>
                        <p>From RFQ creation to PO generation in minutes. Structured workflows eliminate bottlenecks and keep projects moving at pace.</p>
                        <div className="bento-visual">
                            <div className="speed-bar"><div className="speed-fill" /></div>
                            <span className="speed-label">3× faster than spreadsheets</span>
                        </div>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Transparency</div>
                        <h3>Total Bid Transparency</h3>
                        <p>Side-by-side bid comparisons with scoring. Every decision is auditable and defensible.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Collaboration</div>
                        <h3>Connected Supply Chain</h3>
                        <p>Real-time communication. Category-matched invitations, in-context chat, and live status updates.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Analytics</div>
                        <h3>Procurement Analytics</h3>
                        <p>Scorecards, spend analytics, and exportable reports give leadership visibility at scale.</p>
                    </div>
                    <div className="bento-card bento-lg reveal">
                        <div className="bento-label">Built for Construction</div>
                        <h3>Construction-Native Platform</h3>
                        <p>Partial bidding, trade-specific packages, Incoterms support, and BOQ structures built for how the industry works.</p>
                        <div className="bento-tags">
                            <span>Partial Bidding</span>
                            <span>BOQ Support</span>
                            <span>Incoterms</span>
                            <span>Trade Packages</span>
                        </div>
                    </div>
                    <div className="bento-card bento-dark reveal">
                        <div className="bento-label light">Security</div>
                        <h3>Enterprise-Grade</h3>
                        <p>SSO/SAML, role-based access, EU data residency, and ISO-ready compliance from day one.</p>
                    </div>
                </div>
            </section>

            {/* ── STATS — DRAMATIC COUNTERS ── */}
            <section className="stats-mega">
                <div className="stats-bg-text">METICS</div>
                <div className="stats-mega-inner">
                    <div className="stats-intro reveal">
                        <p className="eyebrow">Proof Points</p>
                        <h2>Numbers that speak for themselves</h2>
                    </div>
                    <div className="stats-counter-grid">
                        <div className="counter-card reveal">
                            <h3 data-count="80%">0%</h3>
                            <p>Reduction in supplier shortlisting time</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3 data-count="3×">0×</h3>
                            <p>Faster award cycles vs. spreadsheets</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3 data-count="100%">0%</h3>
                            <p>Audit-ready tender history</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3 data-count="24/7">0/7</h3>
                            <p>Access to RFQs, chats, and POs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WORKFLOW — CONNECTED STEPS ── */}
            <section className="flow-section">
                <SectionHeading
                    eyebrow="How It Works"
                    title="From enquiry to purchase order — every step connected"
                />
                <div className="flow-grid">
                    <article className="flow-step reveal">
                        <div className="flow-num">01</div>
                        <div className="flow-connector" />
                        <h3>Create & Launch</h3>
                        <p>Import via CSV/API or build from templates. Define attributes, attachments, bidding rules, and invite suppliers by category.</p>
                    </article>
                    <article className="flow-step reveal">
                        <div className="flow-num">02</div>
                        <div className="flow-connector" />
                        <h3>Compare & Collaborate</h3>
                        <p>Receive bids, compare side-by-side with scoring, negotiate via in-context chat, and maintain full documentation.</p>
                    </article>
                    <article className="flow-step reveal">
                        <div className="flow-num">03</div>
                        <h3>Award & Automate</h3>
                        <p>Make partial or full awards, auto-generate purchase orders with agreed terms, and export audit-ready PDFs.</p>
                    </article>
                </div>
            </section>

            {/* ── CTA ── */}
            <CTABanner
                heading="See Metics in action"
                body="Book a 20-minute walkthrough and discover how leading construction firms are transforming their procurement operations."
                primaryLabel="Request a Demo"
                primaryTo="/contact"
                secondaryLabel="View Pricing"
                secondaryTo="/pricing"
            />
        </>
    );
}
