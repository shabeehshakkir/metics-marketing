import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, SectionHeading, CTABanner } from '../components/shared';

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

export default function Platform() {
    useReveal();

    return (
        <>
            <PageHero
                eyebrow="Platform"
                title="One platform. Complete procurement control."
                subtitle="Stop juggling spreadsheets, emails, and disconnected tools. Metics brings your entire procurement lifecycle — from RFQ creation to purchase order — into a single, intelligent workspace."
            />

            {/* ── THE PROBLEM ── */}
            <section className="bento-section">
                <SectionHeading
                    eyebrow="The Problem"
                    title="Construction procurement is broken"
                    lede="Every day, procurement teams waste hours on tasks that should take minutes. Here's what we hear from teams before they switch to Metics."
                />
                <div className="bento-grid">
                    <div className="bento-card bento-lg reveal">
                        <div className="bento-label">Fragmentation</div>
                        <h3>Your data lives in 5+ different places</h3>
                        <p>RFQs in email. Bids in spreadsheets. POs in another system. Supplier info scattered across shared drives. When you need to trace a decision, it takes hours — if you can find it at all.</p>
                        <div className="bento-tags">
                            <span>Email Chains</span>
                            <span>Spreadsheets</span>
                            <span>Shared Drives</span>
                            <span>WhatsApp</span>
                            <span>Phone Calls</span>
                        </div>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Time Waste</div>
                        <h3>Manual bid comparison eats your week</h3>
                        <p>Normalizing supplier responses into comparable formats takes 2-3 days per tender. Multiply that across 50+ packages per project and your team is drowning in admin.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Risk</div>
                        <h3>Audit trails that don't exist</h3>
                        <p>When governance teams ask "why did you choose this supplier?" — you shouldn't have to reconstruct the answer from email threads and meeting notes.</p>
                    </div>
                    <div className="bento-card bento-dark reveal">
                        <div className="bento-label light">Cost Overruns</div>
                        <h3>€2.4M+ average procurement leakage per project</h3>
                        <p>Without structured comparison and real-time visibility, teams overpay, miss deadlines, and lose negotiating leverage. The cost of inefficiency compounds across every project.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Supplier Fatigue</div>
                        <h3>Good suppliers stop responding</h3>
                        <p>When your process is unclear, slow, or unprofessional, top-tier suppliers deprioritize your projects. You end up working with whoever happens to reply.</p>
                    </div>
                </div>
            </section>

            {/* ── THE SOLUTION: FOR BUYERS ── */}
            <section className="capabilities-section">
                <SectionHeading
                    eyebrow="For Buyers"
                    title="Take control of every procurement package"
                    lede="Metics gives procurement managers, project directors, and QS teams a single workspace to manage the entire buy-side lifecycle."
                />

                <div className="capability-block reveal-left">
                    <div className="capability-content">
                        <div className="capability-label">Create & Launch</div>
                        <h3>Build RFQs in minutes, not days</h3>
                        <ul className="capability-list">
                            <li><strong>Structured RFQ Builder —</strong> Define headers, line items, quantities, units, and custom attributes. Set bidding rules (open/closed, partial/full) and deadlines with a few clicks.</li>
                            <li><strong>Template Library —</strong> Clone previous RFQs or start from industry templates for steel, MEP, finishes, concrete, and more. Stop rebuilding from scratch.</li>
                            <li><strong>Smart Supplier Matching —</strong> Invite suppliers by trade category, region, and certification. Metics suggests qualified suppliers you haven't worked with yet.</li>
                            <li><strong>Bulk Import —</strong> Upload BOQs via CSV or connect to your ERP via API. Your existing data flows right in.</li>
                            <li><strong>Draft & Resume —</strong> Save work-in-progress packages and pick up exactly where you left off. Share drafts with colleagues for review before publishing.</li>
                        </ul>
                    </div>
                    <div className="capability-visual">
                        <div className="visual-card">
                            <div className="visual-label">RFQ Dashboard</div>
                            <div className="visual-stat">12 active packages</div>
                            <div className="visual-stat">47 bids received</div>
                            <div className="visual-stat">3 POs generated today</div>
                            <div className="visual-stat">€1.2M in active tenders</div>
                        </div>
                    </div>
                </div>

                <div className="capability-block reverse reveal-right">
                    <div className="capability-content">
                        <div className="capability-label">Compare & Decide</div>
                        <h3>Side-by-side bid analysis that actually works</h3>
                        <ul className="capability-list">
                            <li><strong>Automated Normalization —</strong> Bids arrive in a structured format. No more reformatting supplier responses into your spreadsheet template.</li>
                            <li><strong>Multi-Criteria Scoring —</strong> Weight price, quality, delivery time, compliance, and custom criteria. See composite scores instantly.</li>
                            <li><strong>Partial Bid Support —</strong> Suppliers can bid on individual line items. Compare at the item level and split awards across multiple suppliers.</li>
                            <li><strong>Negotiation Tools —</strong> Send clarification requests, counter-offers, and revised specifications directly within the platform. Full conversation history attached to every bid.</li>
                            <li><strong>One-Click Reports —</strong> Generate tender summaries, comparison matrices, and recommendation reports as client-ready PDFs.</li>
                        </ul>
                    </div>
                    <div className="capability-visual">
                        <div className="visual-card">
                            <div className="visual-label">Bid Comparison</div>
                            <div className="visual-stat">Supplier A — €124,500 (Score: 87)</div>
                            <div className="visual-stat">Supplier B — €131,200 (Score: 82)</div>
                            <div className="visual-stat">Supplier C — €119,800 (Score: 91)</div>
                        </div>
                    </div>
                </div>

                <div className="capability-block reveal-left">
                    <div className="capability-content">
                        <div className="capability-label">Award & Execute</div>
                        <h3>From decision to purchase order in one click</h3>
                        <ul className="capability-list">
                            <li><strong>Auto PO Generation —</strong> Award a bid and Metics generates a complete purchase order with agreed terms, quantities, pricing, and delivery schedules. Ready for PDF export.</li>
                            <li><strong>Approval Workflows —</strong> Route POs through internal approval chains. Set thresholds, add reviewers, and maintain segregation of duties.</li>
                            <li><strong>Full Audit Trail —</strong> Every action — creation, edit, bid, award, revision — is logged with timestamps and user attribution. Export governance summaries at any time.</li>
                            <li><strong>Contract Repository —</strong> Store signed POs, amendments, and supplier contracts in a version-controlled document vault.</li>
                        </ul>
                    </div>
                    <div className="capability-visual">
                        <div className="visual-card">
                            <div className="visual-label">Purchase Order</div>
                            <div className="visual-stat">PO-2024-0847 — Steel Package</div>
                            <div className="visual-stat">€124,500 — Partial award</div>
                            <div className="visual-stat">Approved by: J. Murphy (PM)</div>
                            <div className="visual-stat">Status: Confirmed</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOR SUPPLIERS ── */}
            <section className="bento-section" style={{ background: 'var(--g05)' }}>
                <SectionHeading
                    eyebrow="For Suppliers"
                    title="Win more work, with less friction"
                    lede="Metics isn't just a buyer tool. Suppliers get a professional portal to discover opportunities, submit bids, and build lasting relationships."
                />
                <div className="bento-grid">
                    <div className="bento-card reveal">
                        <div className="bento-label">Discovery</div>
                        <h3>Get matched to relevant RFQs</h3>
                        <p>Register once with your trade categories, certifications, and delivery capabilities. Metics matches you to relevant opportunities from qualified buyers — no more cold outreach.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Bidding</div>
                        <h3>Submit structured, competitive bids</h3>
                        <p>Bid on full packages or individual line items. Attach terms & conditions templates, add remarks, and include supporting documents — all in a professional format that buyers can instantly compare.</p>
                    </div>
                    <div className="bento-card bento-lg reveal">
                        <div className="bento-label">Visibility</div>
                        <h3>Know exactly where you stand</h3>
                        <p>Real-time bid status tracking. Know when your bid has been viewed, shortlisted, or when a decision is expected. Accept or reject POs directly from your dashboard. No more waiting in the dark.</p>
                        <div className="bento-visual">
                            <div className="speed-bar"><div className="speed-fill" style={{ width: '70%' }} /></div>
                            <span className="speed-label">70% of bids reviewed within 48 hours</span>
                        </div>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Catalogue</div>
                        <h3>Publish your product catalogue</h3>
                        <p>Showcase your products and capabilities to qualified buyers. Manage enquiries from a single inbox and build a professional digital presence.</p>
                    </div>
                    <div className="bento-card reveal">
                        <div className="bento-label">Compliance</div>
                        <h3>Certifications always up-to-date</h3>
                        <p>Store insurance docs, ISO certificates, and trade licences with version control and expiry alerts. Buyers see your verified credentials automatically.</p>
                    </div>
                </div>
            </section>

            {/* ── INTELLIGENCE & GOVERNANCE ── */}
            <section className="capabilities-section">
                <SectionHeading
                    eyebrow="Intelligence & Governance"
                    title="Visibility that leadership demands"
                    lede="Procurement leaders need more than a tool — they need insight. Metics gives you real-time analytics and governance-ready documentation."
                />
                <div className="capability-block reveal">
                    <div className="capability-content">
                        <div className="capability-label">Analytics & Reporting</div>
                        <h3>Data-driven procurement decisions</h3>
                        <ul className="capability-list">
                            <li><strong>Spend Analytics —</strong> Track spend by category, supplier, project, and time period. Identify cost trends and saving opportunities.</li>
                            <li><strong>Cycle Time Tracking —</strong> Monitor how long each stage takes — from RFQ launch to PO generation. Find and fix bottlenecks.</li>
                            <li><strong>Supplier Scorecards —</strong> Rate suppliers on custom criteria across projects. Build institutional knowledge that survives team turnover.</li>
                            <li><strong>Exportable Reports —</strong> One-click PDF/CSV exports for board presentations, client reports, and internal reviews.</li>
                            <li><strong>Governance Dashboard —</strong> See compliance status, approval bottlenecks, and audit trail completeness across all active projects.</li>
                        </ul>
                    </div>
                    <div className="capability-visual">
                        <div className="visual-card">
                            <div className="visual-label">Analytics Summary</div>
                            <div className="visual-stat">€2.4M managed spend this quarter</div>
                            <div className="visual-stat">12 days avg. award cycle</div>
                            <div className="visual-stat">98% on-time PO delivery</div>
                            <div className="visual-stat">47 active suppliers scored</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Integrations ── */}
            <section className="integrations-section">
                <SectionHeading
                    eyebrow="Integrations"
                    title="Fits into your existing stack"
                    lede="Metics doesn't replace your systems — it connects them. Import data, authenticate users, and export results to where they need to go."
                />
                <div className="integration-grid">
                    <div className="integration-card reveal">
                        <h4>CSV / API Import</h4>
                        <p>Bulk-import RFQs, BOQs, and supplier lists from spreadsheets. Connect your ERP or project management tool via REST API for automated data flow.</p>
                    </div>
                    <div className="integration-card reveal">
                        <h4>ERP-Ready Exports</h4>
                        <p>Structured PO exports with mapping templates designed for SAP, Oracle, and Microsoft Dynamics. Your finance team gets clean, ingestible data.</p>
                    </div>
                    <div className="integration-card reveal">
                        <h4>SSO & SAML</h4>
                        <p>Enterprise single sign-on with Azure AD, Okta, Google Workspace, and any SAML 2.0 provider. One less password for your team to manage.</p>
                    </div>
                    <div className="integration-card reveal">
                        <h4>Document Sync</h4>
                        <p>Version-controlled file management with audit-ready storage. Attach drawings, specs, and contracts to any RFQ or PO with full revision history.</p>
                    </div>
                </div>
            </section>

            {/* ── Security ── */}
            <section className="stats-mega">
                <div className="stats-bg-text">SECURE</div>
                <div className="stats-mega-inner">
                    <div className="stats-intro reveal">
                        <p className="eyebrow">Enterprise Security</p>
                        <h2>Built for teams that can't afford to compromise</h2>
                    </div>
                    <div className="stats-counter-grid">
                        <div className="counter-card reveal">
                            <h3>GDPR</h3>
                            <p>Full GDPR compliance with data processing agreements and right-to-erasure support</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3>EU</h3>
                            <p>EU-based data centers with guaranteed data residency and sovereignty</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3>ISO</h3>
                            <p>ISO 27001-ready security controls with regular third-party audits</p>
                        </div>
                        <div className="counter-card reveal">
                            <h3>SSO</h3>
                            <p>Enterprise authentication with SAML 2.0, SCIM provisioning, and MFA support</p>
                        </div>
                    </div>
                </div>
            </section>

            <CTABanner
                heading="See the full platform in action"
                body="Book a 20-minute walkthrough with our team. We'll show you exactly how Metics fits your procurement process — with real workflows, not slide decks."
                primaryLabel="Book a Demo"
                primaryTo="/contact"
                secondaryLabel="View Pricing"
                secondaryTo="/pricing"
            />
        </>
    );
}
