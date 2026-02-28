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

const solutions = [
    {
        title: 'General Contractors',
        challenge: 'You manage 50 to 200+ procurement packages per project. Tenders go out via email, bids come back in different formats, and decisions live in spreadsheets that only one person understands. When a package is delayed, nobody knows why until it is too late.',
        solution: 'Metics gives you a single workspace to issue RFQs per trade package, collect structured bids, compare side-by-side, and generate purchase orders with full documentation at every step. Split awards across suppliers, track status in real-time, and export audit-ready reports.',
        outcome: '3x faster award cycles, 100% documented decisions, and predictable delivery timelines that keep projects on track.',
        stats: [{ n: '80%', l: 'Less admin time' }, { n: '3x', l: 'Faster awards' }],
    },
    {
        title: 'Quantity Surveyors & Consultants',
        challenge: 'Your team spends 2 to 3 days per tender round just normalizing bids into comparable formats. Then another day building the comparison report. Multiply that across 10 projects and you have lost a full-time employee to spreadsheet work.',
        solution: 'Bids arrive in a structured format that is instantly comparable. Multi-criteria scoring, partial bid analysis, and one-click tender summaries export as client-ready PDFs. Your expertise goes into analysis, not formatting.',
        outcome: 'Less spreadsheet work, clearer advice to clients, and repeatable governance frameworks that strengthen your reputation.',
        stats: [{ n: '2 days', l: 'Saved per tender' }, { n: '1-click', l: 'PDF reports' }],
    },
    {
        title: 'Developers & Project Owners',
        challenge: 'You are accountable for budget and timeline, but you have limited visibility into what your procurement team is doing. By the time cost overruns surface, it is too late to course-correct. And when something goes wrong, there is no paper trail.',
        solution: 'Real-time dashboards show spend by category, cycle times, and supplier performance across all your projects. See which packages are on track, which are stalled, and where costs are trending. Transparent comparisons with partial awards and live PO tracking.',
        outcome: 'Lower dependency risk, better budget adherence, and fully traceable procurement that satisfies governance requirements.',
        stats: [{ n: '100%', l: 'Audit-ready' }, { n: 'Real-time', l: 'Visibility' }],
    },
    {
        title: 'SME Suppliers',
        challenge: 'You do great work, but you cannot compete on visibility. You hear about opportunities too late. When you do bid, the process is opaque. You submit and hope for the best, with no idea where your bid stands or when a decision will be made.',
        solution: 'Register once with your trade categories and capabilities. Metics matches you to relevant RFQs from qualified buyers. Submit professional, structured bids. Track status in real-time. Accept or reject POs directly from your dashboard.',
        outcome: 'More invitations, higher win rates, and professional engagement that helps you build long-term buyer relationships.',
        stats: [{ n: '4x', l: 'More RFQ invites' }, { n: '48hrs', l: 'Avg response time' }],
    },
    {
        title: 'Enterprise Procurement',
        challenge: 'High RFQ volume. Strict compliance. Multiple departments with different processes. Your team uses 5+ tools that do not talk to each other. Reporting takes a week to assemble. And every audit is a fire drill.',
        solution: 'CSV and API import for bulk operations. Controlled supplier lists with approval workflows. End-to-end audit trails. PO PDF exports with approval chains. Centralized communication with in-context chat. SSO and SAML for enterprise authentication.',
        outcome: 'Scalable operations, governance by design, and ERP-ready data flows that eliminate manual reconciliation.',
        stats: [{ n: 'Unlimited', l: 'RFQ volume' }, { n: 'SSO', l: 'Enterprise auth' }],
    },
];

const industries = [
    {
        title: 'Commercial Construction',
        body: 'Multi-trade tendering for offices, retail, hotels, and mixed-use developments. Manage steel, MEP, finishes, and facade packages with trade-specific templates and supplier pools.',
        packages: '50-200+ packages per project',
    },
    {
        title: 'Infrastructure & Civil',
        body: 'High-volume material procurement for roads, bridges, utilities, and public works. Handle bulk quantities, staged delivery schedules, and government compliance requirements.',
        packages: 'Bulk materials & staged delivery',
    },
    {
        title: 'Residential Development',
        body: 'Standardized procurement across housing phases. Template-driven RFQs with supplier reuse across plots. Track costs per unit and maintain consistency across phases.',
        packages: 'Phased procurement & cost tracking',
    },
    {
        title: 'Industrial & Energy',
        body: 'Specialized procurement for manufacturing facilities, data centers, power plants, and process engineering. Support for Incoterms, international suppliers, and complex BOQ structures.',
        packages: 'Incoterms & global supply chains',
    },
];

const caseStudies = [
    {
        company: 'A Mid-Size General Contractor',
        location: 'Dublin, Ireland',
        before: 'Managed 120+ packages per project across email and Excel. Award cycles averaged 18 days. Two full-time employees dedicated to bid comparison and reporting.',
        after: 'Switched to Metics. Award cycles dropped to 6 days. Freed up one FTE for higher-value work. 100% audit-ready documentation from day one.',
        metric: '67%',
        metricLabel: 'reduction in award cycle time',
    },
    {
        company: 'A QS Consultancy',
        location: 'London, UK',
        before: 'Each tender round required 3 days of manual bid normalization. Client reports were inconsistent and time-consuming to produce.',
        after: 'Automated bid comparison and one-click PDF reports cut reporting time by 80%. Clients now receive standardized, professional tender summaries within hours.',
        metric: '80%',
        metricLabel: 'less time on bid comparison',
    },
    {
        company: 'A Regional Steel Supplier',
        location: 'Frankfurt, Germany',
        before: 'Depended on personal relationships for leads. Missed opportunities from buyers outside their network. No visibility into bid status after submission.',
        after: 'Registered on Metics and received 4x more RFQ invitations. Real-time bid tracking eliminated follow-up calls. Win rate improved by 35%.',
        metric: '4x',
        metricLabel: 'increase in RFQ invitations',
    },
];

export default function Solutions() {
    useReveal();

    return (
        <>
            <PageHero
                eyebrow="Solutions"
                title="Built for every role in the supply chain"
                subtitle="Whether you are a procurement manager juggling 200 packages, a QS drowning in bid comparison, or a supplier trying to win more work, Metics is built for how you actually work."
            />

            {/* Role-based Solutions */}
            <section className="solutions-section">
                <SectionHeading
                    eyebrow="By Role"
                    title="Your pain points. Our purpose."
                    lede="Every stakeholder in construction procurement faces unique challenges. We built Metics by talking to hundreds of buyers and suppliers to understand exactly what they need."
                />
                <div className="solutions-grid">
                    {solutions.map((s) => (
                        <article className="solution-card reveal" key={s.title}>
                            <h3>{s.title}</h3>
                            <div className="solution-detail">
                                <div className="solution-section">
                                    <span className="solution-tag challenge">The Pain</span>
                                    <p>{s.challenge}</p>
                                </div>
                                <div className="solution-section">
                                    <span className="solution-tag solution-t">How Metics Helps</span>
                                    <p>{s.solution}</p>
                                </div>
                                <div className="solution-section">
                                    <span className="solution-tag outcome">The Result</span>
                                    <p>{s.outcome}</p>
                                </div>
                                <div className="solution-stats">
                                    {s.stats.map(st => (
                                        <div className="solution-stat" key={st.l}>
                                            <strong>{st.n}</strong>
                                            <span>{st.l}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Results */}
            <section className="stats-mega">
                <div className="stats-bg-text">RESULTS</div>
                <div className="stats-mega-inner">
                    <div className="stats-intro reveal">
                        <p className="eyebrow">Real Results</p>
                        <h2>What teams achieve after switching to Metics</h2>
                    </div>
                    <div className="stats-counter-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {caseStudies.map(c => (
                            <div className="counter-card reveal" key={c.company} style={{ textAlign: 'left' }}>
                                <h3 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{c.metric}</h3>
                                <p style={{ color: 'var(--i4)', fontWeight: 600, fontFamily: 'var(--fh)', fontSize: '.85rem', letterSpacing: '.02em', marginBottom: '20px' }}>{c.metricLabel}</p>
                                <p style={{ fontSize: '.82rem', color: 'var(--g50)', lineHeight: 1.7, marginBottom: '12px' }}><strong style={{ color: 'var(--g30)' }}>{c.company}</strong> &middot; {c.location}</p>
                                <p style={{ fontSize: '.82rem', color: 'var(--g50)', lineHeight: 1.7, marginBottom: '8px' }}><em>Before:</em> {c.before}</p>
                                <p style={{ fontSize: '.82rem', color: 'var(--g30)', lineHeight: 1.7 }}><em>After:</em> {c.after}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries */}
            <section className="industries-section">
                <SectionHeading
                    eyebrow="By Industry"
                    title="Built for the built environment"
                    lede="Metics supports procurement workflows across the full spectrum of construction and infrastructure sectors."
                />
                <div className="industry-grid">
                    {industries.map((ind) => (
                        <div className="industry-card reveal" key={ind.title}>
                            <h3>{ind.title}</h3>
                            <p>{ind.body}</p>
                            <p style={{ marginTop: '16px', fontSize: '.78rem', fontFamily: 'var(--fh)', fontWeight: 600, color: 'var(--i5)', letterSpacing: '.02em' }}>{ind.packages}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTABanner
                heading="Find the right solution for your team"
                body="Tell us about your procurement challenges. We will show you exactly how Metics can help with a personalized walkthrough."
                primaryLabel="Talk to Our Team"
                primaryTo="/contact"
                secondaryLabel="Explore Platform"
                secondaryTo="/platform"
            />
        </>
    );
}
