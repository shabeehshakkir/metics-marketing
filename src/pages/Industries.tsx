import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const industries = [
    {
        id: 'construction',
        label: 'Construction',
        heading: 'Construction and infrastructure',
        intro: 'Construction procurement runs on packages, BOQs, and specialist trades. Timelines are tight, scope changes fast, and a supplier needs a clear brief to price accurately.',
        snapshot: ['Package-based RFQs', 'BOQ line items', 'Phased delivery'],
        problems: [
            'Tender packages sent over email, tracked in separate spreadsheets per project.',
            'Bids arrive in different formats and need manual cleaning before any comparison can start.',
            'Award decisions live in emails rather than the package record.',
            'Long-lead items have no central visibility separate from a project manager\'s own sheet.',
        ],
        capabilities: [
            'Build RFQs from BOQs with line items, quantities, and units already in place.',
            'Supplier responses arrive in one structure: price, exclusions, alternates, and delivery dates side by side.',
            'TCO adjustment covers Incoterms logistics and delivery lead time against the project program.',
            'The award record stays on the package: shortlist, scoring notes, approval, and PO in the same place.',
        ],
        stat: { value: '40+', label: 'packages running across concurrent projects in a single system' },
    },
    {
        id: 'manufacturing',
        label: 'Manufacturing',
        heading: 'Manufacturing',
        intro: 'Manufacturing procurement covers component sourcing, indirect spend, and MRO. Supplier quality and delivery reliability matter as much as unit price.',
        snapshot: ['Component sourcing', 'MRO spend', 'Supplier quality scoring'],
        problems: [
            'Supplier qualification data lives in a separate system from the RFQ and bid comparison.',
            'Category concentration is not visible until a sole-source supplier misses a critical delivery.',
            'Savings are measured against target prices set months before the tender went out.',
            'Invoice matching against delivery receipts happens outside procurement.',
        ],
        capabilities: [
            'Supplier profiles carry qualification status, certificates, and performance history into every bid comparison.',
            'Concentration flags appear before an award is made, so the team can act before a delivery fails.',
            'Spend analytics tracks actual PO values against the target prices set at RFQ stage, per category.',
            'Delivery receipts and invoices attach to the purchase order in the same package record.',
        ],
        stat: { value: 'Real-time', label: 'supplier concentration visibility across every active category' },
    },
    {
        id: 'energy',
        label: 'Energy',
        heading: 'Energy and utilities',
        intro: 'Energy procurement involves complex technical approvals, international supply chains, and growing pressure to track carbon and supplier compliance.',
        snapshot: ['Multi-step approvals', 'Carbon tracking', 'CSRD ready'],
        problems: [
            'Multi-step approval workflows have no shared visibility across commercial and technical teams.',
            'Carbon data sits outside the procurement record, making CSRD reporting a manual reconstruction.',
            'International suppliers involve Incoterms complexity that unit price comparisons do not capture.',
            'Certifications and compliance documents are stored separately from bid records.',
        ],
        capabilities: [
            'Role-based approval steps run inside the package record. Every team sees the current status.',
            'Carbon estimates attach to each bid. Awards can be weighted by emissions as well as price.',
            'TCO comparison accounts for Incoterms logistics costs and delivery lead time in the same ranking.',
            'Supplier certifications, ESG data, and CSRD compliance records live inside the procurement package.',
        ],
        stat: { value: 'CSRD', label: 'compliance data captured inside procurement, not in a separate reporting tool' },
    },
    {
        id: 'government',
        label: 'Government',
        heading: 'Government and public sector',
        intro: 'Public sector procurement requires transparent award records, multi-step approval chains, and documentation that holds up to scrutiny long after the decision was made.',
        snapshot: ['Full audit trail', 'Multi-step approvals', 'Exportable records'],
        problems: [
            'Award justifications are written after the fact rather than captured at the point of decision.',
            'Multi-step approvals are tracked through email chains with no shared view of current status.',
            'Audit requests trigger a document reconstruction effort that takes weeks of staff time.',
            'Spend reporting requires data from multiple systems that do not connect to each other.',
        ],
        capabilities: [
            'Every award captures the shortlist, scoring notes, and decision rationale in the package record.',
            'Approval workflows route through defined steps. Status is live for all teams involved.',
            'The full package record, from RFQ to PO, is exportable for audit review at any time.',
            'Spend analytics shows actual awards against budget targets without a separate reporting system.',
        ],
        stat: { value: '100%', label: 'of award decisions documented with full approval trail at the point of decision' },
    },
];

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

export default function Industries() {
    useReveal();
    const [activeIdx, setActiveIdx] = useState(0);
    const active = industries[activeIdx];

    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">Industries</p>
                    <h1>Built for teams that buy at scale.</h1>
                    <p>
                        Procurement looks different depending on the sector. Metics adapts to the specifics without needing a custom implementation.
                    </p>
                    <div className="platform-hero-actions">
                        <Link className="platform-primary-link" to="/contact">Talk through your workflow</Link>
                        <Link className="platform-secondary-link" to="/platform">See the platform</Link>
                    </div>
                </div>
            </section>

            {/* Sector tab selector */}
            <section className="editorial-index-section">
                <div className="tab-nav" role="tablist">
                    {industries.map((ind, i) => (
                        <button
                            key={ind.id}
                            role="tab"
                            aria-selected={activeIdx === i}
                            className={`tab-btn${activeIdx === i ? ' active' : ''}`}
                            onClick={() => setActiveIdx(i)}
                        >
                            {ind.label}
                        </button>
                    ))}
                </div>

                <div key={active.id} className="industry-panel">
                    <div className="editorial-section-heading reveal">
                        <div className="industry-snapshot-chips">
                            {active.snapshot.map((s) => (
                                <span key={s} className="industry-snapshot-chip">{s}</span>
                            ))}
                        </div>
                        <h2>{active.heading}</h2>
                        <p className="industry-intro">{active.intro}</p>
                    </div>

                    <div className="editorial-role-list">
                        <div className="editorial-role-row reveal">
                            <div className="editorial-row-number">01</div>
                            <div>
                                <span>Common friction</span>
                                <ul className="industry-problem-list">
                                    {active.problems.map((p) => <li key={p}>{p}</li>)}
                                </ul>
                            </div>
                            <div>
                                <span>What Metics changes</span>
                                <ul className="industry-capability-list">
                                    {active.capabilities.map((c) => (
                                        <li key={c}><i aria-hidden="true" />{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="industry-stat reveal">
                        <span className="industry-stat-value">{active.stat.value}</span>
                        <span className="industry-stat-label">{active.stat.label}</span>
                    </div>
                </div>
            </section>

            <section className="editorial-dark-statement">
                <div className="editorial-dark-inner reveal">
                    <p>
                        The RFQ, the bids, the approval, and the purchase order belong in the same place. That is true in construction, manufacturing, energy, and government alike.
                    </p>
                </div>
            </section>

            <CTABanner
                heading="See how Metics fits your sector"
                body="Bring one real procurement workflow to the call. We will show where the friction is and how the record holds together."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View solutions"
                secondaryTo="/solutions"
            />
        </div>
    );
}
