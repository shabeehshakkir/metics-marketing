import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const proofPoints = [
    {
        title: 'Start with one package',
        body: 'Create an RFQ from a BOQ, a template, or a clean blank sheet. Invite the suppliers who should see it.'
    },
    {
        title: 'Keep bids comparable',
        body: 'Suppliers answer in the same structure, so price, scope, exclusions, and delivery dates can be read side by side.'
    },
    {
        title: 'Decide with the record open',
        body: 'Clarifications, revisions, approvals, and notes stay attached to the package.'
    },
    {
        title: 'Issue the PO',
        body: 'Turn an awarded bid into a purchase order without rebuilding the work in another system.'
    }
];

const buyerSteps = [
    'Build RFQs with line items, quantities, units, documents, and bidding rules.',
    'Invite suppliers by trade, region, approval status, or a saved project list.',
    'Compare full and partial bids without reworking supplier spreadsheets.',
    'Route awards through approval steps and export a clean PO when the decision is made.'
];

const supplierSteps = [
    'Keep company details, trade categories, certificates, and terms in one profile.',
    'Receive RFQs that match the work you actually do.',
    'Submit a full package bid or price only the line items you can deliver.',
    'See bid status and respond to buyer clarifications from the same thread.'
];

const toolSections = [
    {
        kicker: 'RFQ builder',
        heading: 'A package starts as structured work, not a messy attachment.',
        body: 'Each tender gets scope, line items, drawings, dates, bidding rules, and an approved supplier list. You can import from a spreadsheet to start, but the working record stays in one place after that.'
    },
    {
        kicker: 'Bid room',
        heading: 'Supplier answers arrive ready to compare.',
        body: 'Supplier responses come in with commercial terms, alternates, and files attached to the right line items. Clarification threads stay with the package, not in a side email chain.'
    },
    {
        kicker: 'Award record',
        heading: 'The reason for the award stays with the award.',
        body: 'Shortlists, scoring notes, approvals, and final purchase orders are kept together. When someone asks why a supplier won, the answer is already there.'
    },
    {
        kicker: 'TCO comparison',
        heading: 'The lowest unit price is not always the lowest cost.',
        body: 'Each bid adjusts for Incoterms logistics, delivery lead time, and the supplier\'s historical fill rate. Suppliers rank by total cost of ownership. The adjusted comparison exports alongside the bid summary.'
    },
    {
        kicker: 'Sustainability',
        heading: 'Carbon data sits inside the procurement record, not outside it.',
        body: 'Each bid carries a carbon estimate. Awards can be weighted by emissions as well as price. Supplier compliance evidence, certifications, and CSRD data live in the same record as the RFQ and PO.'
    }
];

const analyticsItems = [
    'Spend vs budget: actual PO values against the target prices set at RFQ stage, per category.',
    'Procurement cycle time: average days from RFQ created to purchase order confirmed.',
    'Supplier concentration: categories where one supplier holds more than 80% of spend are flagged.',
    'Procurement health score: one number covering competitive bidding rate, savings rate, speed, and supplier diversity.',
    'Award optimizer: ranks split-award options across suppliers when the package is too large for a single source.',
];

const governanceItems = [
    'Role-based access for procurement, commercial, project, finance, and supplier teams.',
    'Document history for drawings, specifications, contracts, certificates, and PO changes.',
    'Delivery receipts, supplier invoices, and payment records attached to each purchase order.',
    'Exportable summaries for client reports, board packs, and audit reviews.',
    'ERP integrations: SAP Ariba, Zoho, QuickBooks, Odoo, and a generic API path for teams with custom finance systems.'
];

function TcoBarsGraphic() {
    const suppliers = [
        { name: 'Supplier A', base: 96, logistics: 6, leadTime: 0, quality: 3, total: 105 },
        { name: 'Supplier B', base: 88, logistics: 4, leadTime: 5, quality: 7, total: 104 },
        { name: 'Supplier C', base: 82, logistics: 11, leadTime: 9, quality: 6, total: 108 },
    ];
    const max = 116;
    const w = 360;
    const rowH = 52;
    const barH = 22;
    const labelW = 80;
    const chartW = w - labelW - 4;
    const lowestIdx = suppliers.reduce((li, s, i) => s.total < suppliers[li].total ? i : li, 0);

    return (
        <div className="infographic-tco" aria-label="TCO comparison chart">
            <p className="infographic-label">Facade works — TCO comparison</p>
            <svg viewBox={`0 0 ${w} ${suppliers.length * rowH + 30}`} aria-hidden="true" style={{ overflow: 'visible' }}>
                {suppliers.map((s, i) => {
                    const y = i * rowH + 20;
                    const baseW = (s.base / max) * chartW;
                    const logW = (s.logistics / max) * chartW;
                    const ltW = (s.leadTime / max) * chartW;
                    const qW = (s.quality / max) * chartW;
                    const totalW = baseW + logW + ltW + qW;
                    const isLowest = i === lowestIdx;
                    return (
                        <g key={s.name}>
                            {isLowest && <rect x={labelW} y={y - 2} width={totalW} height={barH + 4} rx="4" fill="none" stroke="#ff6719" strokeWidth="1.5" strokeDasharray="3 2" />}
                            <text x={labelW - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize="11" fill={isLowest ? '#171717' : '#888'} fontWeight={isLowest ? '600' : '400'} fontFamily="Inter, sans-serif">{s.name}</text>
                            <rect x={labelW} y={y} width={baseW} height={barH} fill={isLowest ? '#d6cfc2' : '#e8e3d8'} rx="2" />
                            <rect x={labelW + baseW} y={y} width={logW} height={barH} fill="#f5b088" rx="2" />
                            <rect x={labelW + baseW + logW} y={y} width={ltW} height={barH} fill="#f28c5e" rx="2" />
                            <rect x={labelW + baseW + logW + ltW} y={y} width={qW} height={barH} fill="#e06030" rx="2" />
                            {isLowest && (
                                <text x={labelW + totalW + 7} y={y + barH / 2 + 4} fontSize="10" fill="#ff6719" fontWeight="700" fontFamily="Inter, sans-serif">lowest TCO</text>
                            )}
                        </g>
                    );
                })}
                <g transform={`translate(${labelW}, ${suppliers.length * rowH + 12})`}>
                    <rect width="9" height="9" fill="#d6cfc2" rx="2" /><text x="13" y="8" fontSize="9" fill="#aaa" fontFamily="Inter, sans-serif">Unit price</text>
                    <rect x="68" width="9" height="9" fill="#f5b088" rx="2" /><text x="81" y="8" fontSize="9" fill="#aaa" fontFamily="Inter, sans-serif">Logistics</text>
                    <rect x="132" width="9" height="9" fill="#f28c5e" rx="2" /><text x="145" y="8" fontSize="9" fill="#aaa" fontFamily="Inter, sans-serif">Lead time</text>
                    <rect x="200" width="9" height="9" fill="#e06030" rx="2" /><text x="213" y="8" fontSize="9" fill="#aaa" fontFamily="Inter, sans-serif">Quality</text>
                </g>
            </svg>
        </div>
    );
}

function HealthScoreGraphic({ active }: { active: boolean }) {
    const score = 74;
    const r = 62;
    const cx = 80;
    const cy = 80;
    const circumference = 2 * Math.PI * r;
    const arcPct = 0.75;
    const dashArr = arcPct * circumference;
    const progress = active ? (score / 100) * dashArr : 0;
    const rotation = 135;

    const bars = [
        { label: 'Competitive bidding', score: 80 },
        { label: 'Savings vs budget', score: 68 },
        { label: 'Procurement speed', score: 72 },
        { label: 'Supplier diversity', score: 76 },
    ];

    return (
        <div className="infographic-health" aria-label="Procurement health score">
            <div className="infographic-health-dial">
                <svg viewBox="0 0 160 120" aria-hidden="true">
                    <text x={cx} y="14" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="#aaa" fontFamily="Inter, sans-serif" textDecoration="none">HEALTH SCORE</text>
                    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8e3d8" strokeWidth="11"
                        strokeDasharray={`${dashArr} ${circumference}`}
                        strokeLinecap="round"
                        transform={`rotate(${rotation} ${cx} ${cy})`} />
                    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ff6719" strokeWidth="11"
                        strokeDasharray={`${progress} ${circumference}`}
                        strokeLinecap="round"
                        transform={`rotate(${rotation} ${cx} ${cy})`}
                        style={{ transition: active ? 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none' }} />
                    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="30" fontWeight="700" fill="#171717" fontFamily="Georgia, serif">{score}</text>
                    <text x={cx} y={cy + 20} textAnchor="middle" fontSize="9.5" fill="#bbb" fontFamily="Inter, sans-serif">out of 100</text>
                </svg>
            </div>
            <div className="infographic-health-bars">
                {bars.map(b => (
                    <div key={b.label} className="infographic-mini-bar">
                        <span className="infographic-mini-label">{b.label}</span>
                        <div className="infographic-mini-track">
                            <div className="infographic-mini-fill" style={{ width: active ? `${b.score}%` : '0%' }} />
                        </div>
                        <span className="infographic-mini-val">{b.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProcurementFlowGraphic() {
    const steps = [
        { label: 'RFQ', sub: 'Structured tender' },
        { label: 'Bid room', sub: 'Suppliers respond' },
        { label: 'TCO review', sub: 'Adjusted ranking' },
        { label: 'Award', sub: 'Decision + notes' },
        { label: 'PO', sub: 'Purchase order' },
        { label: 'Delivery', sub: 'GRN + invoice' },
    ];
    return (
        <div className="infographic-flow reveal" aria-label="Procurement workflow steps">
            {steps.map((step, i) => (
                <div key={step.label} className="infographic-flow-step">
                    <div className="infographic-flow-node">
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <strong>{step.label}</strong>
                        <em>{step.sub}</em>
                    </div>
                    {i < steps.length - 1 && <div className="infographic-flow-arrow" aria-hidden="true" />}
                </div>
            ))}
        </div>
    );
}

function CountUp({ target, duration = 900, active }: { target: number; duration?: number; active: boolean }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        const start = performance.now();
        const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.round(p * target));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [active, target, duration]);
    return <>{val}</>;
}

function useReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);
}

export default function Platform() {
    useReveal();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardInView, setCardInView] = useState(false);
    const analyticsRef = useRef<HTMLDivElement>(null);
    const [analyticsInView, setAnalyticsInView] = useState(false);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setCardInView(true); obs.disconnect(); }
        }, { threshold: 0.45 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const el = analyticsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setAnalyticsInView(true); obs.disconnect(); }
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="platform-editorial">
            <section className="platform-story-hero">
                <div className="platform-story-inner">
                    <div className="platform-story-copy">
                        <p className="platform-kicker">Metics Platform</p>
                        <h1>The procurement workspace your project can live in.</h1>
                        <p className="platform-hero-lede">
                            Procurement decisions break when cost, risk, and compliance live in separate places. Metics keeps every RFQ, bid, approval, and purchase order in one shared record so the decision is visible when you need it.
                        </p>
                        <div className="platform-hero-actions">
                            <Link className="platform-primary-link" to="/contact">Book a walkthrough</Link>
                            <Link className="platform-secondary-link" to="/pricing">See pricing</Link>
                        </div>
                    </div>

                    <div className="platform-paper-stack" aria-label="Example procurement package">
                        <div ref={cardRef} className={`platform-package-card${cardInView ? ' in-view' : ''}`}>
                            <div className="package-card-header">
                                <span>Package</span>
                                <strong>Facade works</strong>
                            </div>
                            <div className="package-progress">
                                <span />
                            </div>
                            <dl className="package-card-list">
                                <div>
                                    <dt>Suppliers invited</dt>
                                    <dd><CountUp target={8} active={cardInView} /></dd>
                                </div>
                                <div>
                                    <dt>Bids received</dt>
                                    <dd><CountUp target={5} active={cardInView} duration={750} /></dd>
                                </div>
                                <div>
                                    <dt>Clarifications</dt>
                                    <dd><CountUp target={12} active={cardInView} duration={1050} /></dd>
                                </div>
                            </dl>
                            <div className="package-note">
                                Shortlist ready for commercial review
                            </div>
                        </div>
                        <div className="platform-package-shadow" />
                    </div>
                </div>
            </section>

            <section className="platform-proof-strip" aria-label="Platform workflow">
                <div className="platform-proof-grid">
                    {proofPoints.map((item) => (
                        <article className="platform-proof-card reveal" key={item.title}>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="platform-stats-strip">
                <div className="platform-stats-grid">
                    <div className="platform-stat-item reveal">
                        <span className="platform-stat-value">P2P</span>
                        <span className="platform-stat-desc">Full procure-to-pay. From the first RFQ line item to the delivery receipt, one place.</span>
                    </div>
                    <div className="platform-stat-item reveal">
                        <span className="platform-stat-value">Free</span>
                        <span className="platform-stat-desc">Suppliers receive RFQs, submit bids, and track status. No account fee, no participation cost.</span>
                    </div>
                    <div className="platform-stat-item reveal">
                        <span className="platform-stat-value">CSRD</span>
                        <span className="platform-stat-desc">Carbon data, certifications, and compliance records inside the procurement record, not in a separate system.</span>
                    </div>
                </div>
            </section>

            <section className="platform-flow-section">
                <ProcurementFlowGraphic />
            </section>

            <section className="platform-split-section">
                <div className="platform-split-intro reveal">
                    <p className="platform-kicker">Both sides of the tender</p>
                    <h2>Buyers and suppliers work from the same package record.</h2>
                    <p>
                        Both sides need the process to be clear. Buyers run the tender. Suppliers price it, ask questions, and track the outcome. The same package record holds both views.
                    </p>
                </div>

                <div className="platform-two-column">
                    <article className="platform-role-panel reveal-left">
                        <span>For buyers</span>
                        <h3>Run the tender without rebuilding it every week.</h3>
                        <ul>
                            {buyerSteps.map((step) => <li key={step}>{step}</li>)}
                        </ul>
                    </article>
                    <article className="platform-role-panel reveal-right">
                        <span>For suppliers</span>
                        <h3>Price the work clearly, then keep track of what happens.</h3>
                        <ul>
                            {supplierSteps.map((step) => <li key={step}>{step}</li>)}
                        </ul>
                    </article>
                </div>
            </section>

            <section className="platform-belief-section">
                <div className="platform-belief-inner reveal">
                    <p>
                        You make better procurement decisions when you can see risk, cost, and compliance in the same place.
                    </p>
                    <span>That is the intelligence layer Metics adds.</span>
                </div>
            </section>

            <section className="platform-tools-section">
                <div className="platform-tools-heading reveal">
                    <p className="platform-kicker">Built-in tools</p>
                    <h2>The useful parts are built in. The noisy parts are left out.</h2>
                </div>

                <div className="platform-tool-list">
                    {toolSections.map((item, index) => (
                        <article className="platform-tool-row reveal" key={item.heading}>
                            <div className="platform-tool-number">{String(index + 1).padStart(2, '0')}</div>
                            <div>
                                <span>{item.kicker}</span>
                                <h3>{item.heading}</h3>
                            </div>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="platform-analytics-hook">
                <div className="platform-analytics-hook-inner reveal">
                    <p>A procurement health score of 60 means something specific is wrong. Slow cycles, sole-source categories, awards above budget. Metics tells you which one.</p>
                </div>
            </section>

            <section className="platform-analytics-section" ref={analyticsRef}>
                <div className="platform-analytics-visuals reveal-left">
                    <HealthScoreGraphic active={analyticsInView} />
                    <TcoBarsGraphic />
                </div>
                <div className="platform-analytics-copy reveal-right">
                    <p className="platform-kicker">Spend analytics</p>
                    <h2>Numbers that matter once the tenders are running.</h2>
                    <p>
                        Metics tracks actual PO spend against the target prices you set at RFQ stage. The picture covers every package in a project: what was budgeted, what was awarded, how long each cycle took, and where supplier concentration creates risk.
                    </p>
                    <ul className="platform-analytics-list">
                        {analyticsItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="platform-governance-section">
                <div className="platform-governance-copy reveal-left">
                    <p className="platform-kicker">Control</p>
                    <h2>Enough governance for serious projects. Simple enough for daily use.</h2>
                    <p>
                        Metics is built for teams that need decisions to move quickly and still stand up to scrutiny later. The record keeps itself without making people work around the system.
                    </p>
                </div>
                <div className="platform-governance-list reveal-right">
                    {governanceItems.map((item) => (
                        <div key={item}>
                            <span />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTABanner
                heading="See how a package moves through Metics"
                body="Bring one real procurement package to the call. We will show how the RFQ, supplier responses, approvals, and PO move through Metics."
                primaryLabel="Book a Demo"
                primaryTo="/contact"
                secondaryLabel="View Pricing"
                secondaryTo="/pricing"
            />
        </div>
    );
}
