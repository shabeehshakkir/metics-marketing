import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const allStudies = [
    {
        industry: 'Construction',
        team: 'Main contractor, 40-person procurement team',
        heading: 'Forty packages across three sites, now in one place.',
        problem: 'Packages were tracked across email threads and separate spreadsheets per project. By the time a delay surfaced, the window to act had already passed. The award trail existed in some inboxes and nowhere else.',
        outcome: 'Every package moved into one system. Award records now exist for every tender, not just the ones where someone saved the right email. The team can see where a package stands without asking.',
        stats: [
            { value: '40+', label: 'packages' },
            { value: '3', label: 'sites' },
            { value: '100%', label: 'documented' },
        ],
        body: [
            "A regional main contractor running three commercial building sites struggled with fragmented tendering. Subcontractor packages (steel, concrete, MEP, glazing) were managed by individual project managers using their own spreadsheets, email chains, and WhatsApp messages.",
            "The lack of standardization meant bid comparisons were inconsistent, contract sign-offs were delayed, and the corporate commercial team had no visibility into total spend until invoices arrived. If a trade subcontractor delayed their bid submission, it directly threatened the construction program.",
            "By adopting Metics, the contractor consolidated all forty trade packages into a single workspace. Project managers built RFQs using importable BOQ templates, while suppliers responded in a standard format. Sign-offs were handled digitally through a multi-step approval workflow. The contractor shortened award cycle times by 32%, established a complete audit trail for client reviews, and achieved 100% visibility into concurrent packages."
        ]
    },
    {
        industry: 'Manufacturing',
        team: 'Indirect procurement, component sourcing',
        heading: 'Supplier concentration risk was invisible until a delivery failed.',
        problem: 'A sole-source supplier missed a critical delivery. The team had no way to see how exposed they were in that category until the damage was done.',
        outcome: 'Concentration flags now surface before the award is made. The team can see where a category is at risk before the PO goes out.',
        stats: [
            { value: '45%', label: 'lower concentration risk' },
            { value: '2.5x', label: 'sourcing speed' },
        ],
        body: [
            "An industrial component manufacturer relied on a complex supplier network for specialized raw materials. Over time, the sourcing team shifted volume to a single preferred supplier to secure volume discounts.",
            "However, this concentration was not tracked systematically. When that supplier suffered a major furnace failure, raw material deliveries stopped, halting the production line for ten days. The resulting delivery delays to clients cost the manufacturer over EUR 250,000 in penalties and damaged relationships.",
            "The manufacturer implemented Metics to build resilience into their raw material sourcing. The platform’s live analytics automatically calculated supplier concentration metrics across all active category packages. When the team ran a new raw material tender, the platform highlighted that awarding the entire volume to their preferred supplier would exceed safe concentration levels. The team used Metics to execute a split-award, dividing the contract 60/40 between two qualified suppliers, reducing single-source exposure by 45% while maintaining production safety."
        ]
    },
    {
        industry: 'Energy',
        team: 'Project procurement lead',
        heading: 'Approval packages sat in inboxes with no shared view.',
        problem: 'Multi-step approvals had no shared visibility. Finance and commercial teams worked from different document versions and tracked status through email.',
        outcome: 'Approval status is live in the package record. Both teams see the same data. Delays surface before they become escalations.',
        stats: [
            { value: '14 days', label: 'saved per package' },
            { value: '100%', label: 'compliance visibility' },
        ],
        body: [
            "A utility provider executing substation upgrades faced bottlenecked procurement approvals. Technical reviews, health and safety checks, commercial scores, and executive sign-offs were routed via email.",
            "Approval packages frequently sat in managers' inboxes for weeks, with no shared record of who was holding up the sign-off. When project deadlines neared, packages had to be escalated manually, creating administrative chaos and delaying equipment orders.",
            "The provider mapped their multi-step approval workflow directly into Metics. When bids close, the package is routed sequentially to technical, safety, and commercial teams for digital reviews. The current status—and days elapsed—is visible on a live dashboard. As a result, approval bottlenecks are immediately visible, order cycles have shortened by 14 days, and all compliance approvals are permanently archived with the final purchase order."
        ]
    },
    {
        industry: 'Government',
        team: 'Public sector procurement office',
        heading: 'Award records had to exist before the audit request arrived.',
        problem: 'When a procurement review was requested, the team reconstructed records from emails and shared folders. The process took weeks.',
        outcome: 'Every award now has a complete record: RFQ, bids, shortlist notes, approval, and PO. The next review took days.',
        stats: [
            { value: '3 mins', label: 'audit package retrieval' },
            { value: '100%', label: 'compliance score' },
        ],
        body: [
            "A municipal public sector procurement office was subject to strict compliance audits. For every public tender, they were required to prove that the evaluation process was fair, transparent, and in line with municipal guidelines.",
            "Reconstructing this audit trail was a massive manual effort. When auditors requested information on a past award, staff spent weeks searching email archives, shared network drives, and paper files to locate the original RFQ specifications, all supplier bids, scorecard evaluations, and sign-offs.",
            "The municipality deployed Metics to automate compliance. Every action in the procurement lifecycle is now logged in an immutable, timestamped audit log. Bids are compared, scored, and approved directly on the platform. When audit reviews occur, staff simply enter the package number and export a complete compliance pack. Retrieval times dropped from three weeks to three minutes, and the office achieved a 100% audit compliance score."
        ]
    },
];

const filters = ['All', 'Construction', 'Manufacturing', 'Energy', 'Government'];

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

export default function CaseStudies() {
    useReveal();
    const [filter, setFilter] = useState('All');
    const [selectedStudy, setSelectedStudy] = useState<typeof allStudies[0] | null>(null);

    const visible = filter === 'All'
        ? allStudies
        : allStudies.filter((s) => s.industry === filter);

    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">How teams use Metics</p>
                    <h1>Procurement that moved differently.</h1>
                    <p>
                        Patterns from teams that changed how they run tenders, compare bids, and keep award records. The details vary by sector. The underlying problem is usually the same.
                    </p>
                    <div className="platform-hero-actions">
                        <Link className="platform-primary-link" to="/contact">Book a walkthrough</Link>
                        <Link className="platform-secondary-link" to="/platform">See the platform</Link>
                    </div>
                </div>
            </section>

            <section className="editorial-index-section">
                <div className="tab-nav" role="tablist" aria-label="Filter by industry">
                    {filters.map((f) => (
                        <button
                            key={f}
                            role="tab"
                            aria-selected={filter === f}
                            className={`tab-btn${filter === f ? ' active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {visible.length > 0 ? (
                    <div className="editorial-role-list">
                        {visible.map((study, i) => (
                            <article 
                                className="editorial-role-row reveal" 
                                key={study.heading}
                                onClick={() => setSelectedStudy(study)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="editorial-row-number">{String(i + 1).padStart(2, '0')}</div>
                                <div>
                                    <span>{study.industry}</span>
                                    <h3>{study.heading}</h3>
                                    <p className="case-team-tag">{study.team}</p>
                                </div>
                                <div>
                                    <span>The problem</span>
                                    <p>{study.problem}</p>
                                    <span className="case-what-changed">What changed</span>
                                    <p>{study.outcome}</p>
                                    {study.stats.length > 0 && (
                                        <div className="case-stats-row">
                                            {study.stats.map((s) => (
                                                <div key={s.label} className="case-stat">
                                                    <span className="case-stat-value">{s.value}</span>
                                                    <span className="case-stat-label">{s.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <span className="insights-read-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                                        Read full case study <span aria-hidden="true">→</span>
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="case-empty">No case studies in this category yet.</p>
                )}
            </section>

            <section className="editorial-dark-statement">
                <div className="editorial-dark-inner reveal">
                    <p>
                        The award decision is made once. The record of it should last for the life of the project.
                    </p>
                </div>
            </section>

            <CTABanner
                heading="Bring your workflow to the call"
                body="We will show how one real package moves from RFQ through bids, approval, and purchase order in Metics."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View platform"
                secondaryTo="/platform"
            />

            {/* Reading Modal Detail View */}
            {selectedStudy && (
                <div className="reading-modal-backdrop" onClick={() => setSelectedStudy(null)}>
                    <div className="reading-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="reading-modal-close" onClick={() => setSelectedStudy(null)} aria-label="Close reader">×</button>
                        <div className="reading-modal-body">
                            <span className="reading-modal-kicker">{selectedStudy.industry}</span>
                            <h1>{selectedStudy.heading}</h1>
                            <p className="reading-modal-sub">{selectedStudy.team}</p>
                            
                            <div className="reading-modal-section">
                                <h3>The Problem</h3>
                                <p>{selectedStudy.problem}</p>
                            </div>

                            <div className="reading-modal-section">
                                <h3>The Execution</h3>
                                {selectedStudy.body.map((p, index) => (
                                    <p key={index}>{p}</p>
                                ))}
                            </div>

                            <div className="reading-modal-section">
                                <h3>Outcome & Impact</h3>
                                <p>{selectedStudy.outcome}</p>
                                {selectedStudy.stats.length > 0 && (
                                    <div className="case-stats-row" style={{ marginTop: '24px' }}>
                                        {selectedStudy.stats.map((s) => (
                                            <div key={s.label} className="case-stat">
                                                <span className="case-stat-value">{s.value}</span>
                                                <span className="case-stat-label">{s.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
