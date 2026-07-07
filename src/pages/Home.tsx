import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const proofPoints = [
    {
        title: 'Start with one package',
        body: 'Create an RFQ from a BOQ, a template, or a blank sheet. Invite the suppliers who should see it.'
    },
    {
        title: 'Keep bids comparable',
        body: 'Suppliers answer in the same structure, so price, scope, and delivery dates sit side by side.'
    },
    {
        title: 'Decide with the record open',
        body: 'Clarifications, revisions, approvals, and notes stay attached to the package.'
    },
    {
        title: 'Issue the PO',
        body: 'Turn an awarded bid into a purchase order without rebuilding the work in another system.'
    },
];

const roles = [
    {
        tab: 'Contractors',
        title: 'General contractors',
        body: 'Each package gets one record: the RFQ, supplier list, bids, clarifications, approvals, and PO. The status is always current. Delays show up early enough to do something about them.',
        outcome: 'Award cycles get shorter within the first few packages.'
    },
    {
        tab: 'QS teams',
        title: 'QS and commercial teams',
        body: 'Supplier responses land in a consistent structure. You compare at package or line level without rebuilding the spreadsheet. The commercial review starts when bids close, not after someone cleans the data.',
        outcome: 'The analysis starts the same day bids close.'
    },
    {
        tab: 'Developers',
        title: 'Developers and owners',
        body: 'Package status, bid comparisons, and approval history are live. You do not need a report from every project team to see where things stand. Ask harder questions earlier, before decisions lock in.',
        outcome: 'You carry the budget risk. Now you have the data to manage it.'
    },
    {
        tab: 'Suppliers',
        title: 'Suppliers',
        body: 'RFQs come with scope, line items, and dates. Bid status updates when it changes. Clarification threads stay attached to the package. No chasing, no resubmitting the same document twice.',
        outcome: 'Suppliers price faster when the RFQ makes sense.'
    },
];

const testimonials = [
    {
        quote: 'The bid comparison used to take two days of spreadsheet work. Now the data is ready when bids close.',
        name: 'Rachel T.',
        role: 'Commercial Manager'
    },
    {
        quote: 'The award record shows exactly why each supplier was chosen. That still holds up when a client asks six months later.',
        name: 'James O.',
        role: 'Head of Procurement'
    },
    {
        quote: 'For the first time I can see the spend picture across every package without waiting for a report from the project team.',
        name: 'Maria S.',
        role: 'Development Director'
    }
];

const tools = [
    {
        kicker: 'RFQ builder',
        heading: 'A package starts as structured work, not a messy attachment.',
        body: 'Metics gives each tender a clear shape: scope, line items, drawings, dates, rules, suppliers, and internal reviewers. You can still import from spreadsheets, but the working record lives in one place.',
    },
    {
        kicker: 'Bid room',
        heading: 'Supplier answers arrive ready to compare.',
        body: 'Every bid keeps its commercial terms, comments, alternates, and files attached to the right line. Buyers can ask questions without losing the thread.',
    },
    {
        kicker: 'Award record',
        heading: 'The reason for the award stays with the award.',
        body: 'Shortlists, scoring notes, approvals, and final purchase orders are kept together. When someone asks why a supplier won, the answer is already there.',
    },
    {
        kicker: 'Spend analytics',
        heading: 'The numbers that matter once the tenders are running.',
        body: 'Actual PO spend tracks against the target prices set at RFQ stage. Cycle time, supplier concentration, and a procurement health score are visible without a separate report.',
    },
];

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

export default function Home() {
    useReveal();
    const [activeRole, setActiveRole] = useState(0);

    return (
        <div className="platform-editorial">
            <section className="home-hero">
                <div className="home-hero-inner">
                    <p className="platform-kicker">Metics Platform</p>
                    <h1>The procurement workspace your projects can live in.</h1>
                    <p className="platform-hero-lede">
                        Procurement goes wrong when the cost picture, the supplier risk, and the approval trail live in different places. Metics puts the tender, the bids, the decision, and the purchase order in one record.
                    </p>
                    <p className="home-hero-hook">Most teams find out the real cost of a supplier relationship after the award. Metics shows it before.</p>
                    <div className="platform-hero-actions">
                        <Link className="platform-primary-link" to="/contact">Book a walkthrough</Link>
                        <Link className="platform-secondary-link" to="/platform">See how it works</Link>
                    </div>
                    <div className="home-hero-stats">
                        <span className="home-hero-stats-item"><strong>Decision intelligence</strong> - not just workflow</span>
                        <span className="home-hero-stats-sep" aria-hidden="true" />
                        <span className="home-hero-stats-item"><strong>Free for suppliers</strong> - no participation fee</span>
                        <span className="home-hero-stats-sep" aria-hidden="true" />
                        <span className="home-hero-stats-item"><strong>CSRD-ready</strong> - sustainability built in</span>
                    </div>
                </div>
            </section>

            <section className="platform-proof-strip" aria-label="How the workflow runs">
                <div className="platform-proof-grid">
                    {proofPoints.map((item) => (
                        <article className="platform-proof-card reveal" key={item.title}>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="platform-belief-section">
                <div className="platform-belief-inner reveal">
                    <p>
                        The teams that award well are the ones who saw the full picture before the decision was made.
                    </p>
                    <span>That is what Metics is built to give you.</span>
                </div>
            </section>

            <section className="home-roles-section">
                <div className="home-roles-inner">
                    <div className="editorial-section-heading reveal">
                        <p className="platform-kicker">Who it&rsquo;s for</p>
                        <h2>Different pressures. One procurement record.</h2>
                    </div>
                    <div className="home-roles-tabs" role="tablist">
                        {roles.map((role, i) => (
                            <button
                                key={role.tab}
                                role="tab"
                                aria-selected={activeRole === i}
                                className={`home-role-tab${activeRole === i ? ' active' : ''}`}
                                onClick={() => setActiveRole(i)}
                            >
                                {role.tab}
                            </button>
                        ))}
                    </div>
                    <div key={activeRole} className="home-role-panel" role="tabpanel">
                        <h3>{roles[activeRole].title}</h3>
                        <p>{roles[activeRole].body}</p>
                        <div className="home-role-outcome">{roles[activeRole].outcome}</div>
                        <Link className="home-role-more-link" to="/solutions">
                            See all roles <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="platform-tools-section">
                <div className="platform-tools-heading reveal">
                    <p className="platform-kicker">What&rsquo;s inside</p>
                    <h2>The useful parts are built in. The noisy parts are left out.</h2>
                </div>
                <div className="platform-tool-list">
                    {tools.map((item, index) => (
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
                <div className="home-tools-footer reveal">
                    <Link className="platform-secondary-link" to="/platform">Full platform overview</Link>
                </div>
            </section>

            <section className="home-testimonials-section">
                <div className="home-testimonials-inner">
                    <div className="editorial-section-heading reveal">
                        <p className="platform-kicker">What teams say</p>
                        <h2>From the people running the tenders.</h2>
                    </div>
                    <div className="testimonials-featured reveal">
                        <p className="testimonials-pull-quote">"{testimonials[0].quote}"</p>
                        <p className="testimonials-pull-attribution">{testimonials[0].name}, {testimonials[0].role}</p>
                    </div>
                    <div className="testimonials-card-grid">
                        {testimonials.slice(1).map((t) => (
                            <article className="testimonials-card reveal" key={t.name}>
                                <p className="testimonials-card-quote">"{t.quote}"</p>
                                <div className="testimonials-card-attribution">
                                    <span className="testimonials-card-name">{t.name}</span>
                                    <span className="testimonials-card-role">{t.role}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner
                heading="See how a package moves through Metics"
                body="Bring one real procurement workflow to the call. We will walk through how the RFQ, supplier responses, approvals, and PO would sit in the platform."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View pricing"
                secondaryTo="/pricing"
            />
        </div>
    );
}
