import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const roles = [
    {
        title: 'General contractors',
        problem: 'Tender packages move through email, Excel, shared folders, and phone calls. By the time a delay is visible, the team is already reacting.',
        fit: 'Each package gets one record. The RFQ, supplier list, bids, clarifications, approvals, and PO all live together. Status is always current.',
        result: 'Most GCs see award cycles shorten within the first two or three packages.'
    },
    {
        title: 'QS and commercial teams',
        problem: 'Too much time goes into cleaning bid sheets before anyone can judge the commercial position.',
        fit: 'Supplier responses arrive in a consistent structure. TCO analysis adjusts each bid for Incoterms logistics, lead time, and the supplier\'s delivery history, so the comparison reflects total cost rather than unit price alone.',
        result: 'The commercial review starts before someone has to clean the data.'
    },
    {
        title: 'Developers and owners',
        problem: 'You carry the budget risk, but procurement detail often arrives late and out of context.',
        fit: 'Package status, bid comparisons, and approval history are live. A spend analytics view tracks actual awards against budget, cycle time, and supplier concentration across all active projects.',
        result: 'You can ask harder questions earlier, before a decision locks in.'
    },
    {
        title: 'Suppliers',
        problem: 'Unclear RFQs, document resubmissions, no word on whether a bid was even reviewed. Good suppliers waste hours on this.',
        fit: 'RFQs come with scope, line items, and dates. Bid status updates when it changes. Clarification threads stay attached to the package.',
        result: 'Less back-and-forth before pricing starts.'
    }
];

const sectors = [
    ['Construction and infrastructure', 'Packages, BOQs, Incoterms, long-lead equipment, phased delivery, and specialist trades.'],
    ['Manufacturing', 'Component sourcing, supplier concentration monitoring, MRO spend, and supplier quality scoring.'],
    ['Energy and utilities', 'Complex technical approvals, international supply chains, carbon tracking, and CSRD reporting.'],
    ['Government and public sector', 'Audit trail, multi-step approval workflows, transparent award records, and spend reporting.']
];

const outcomes = [
    ['Comparisons happen faster', 'Bids land in a shared format. The team reads them in the same place without rebuilding the tender first.'],
    ['Approvals stay attached', 'The recommendation, comments, and sign-off sit on the package. No separate email thread to find six months later.'],
    ['Response rates improve', 'When suppliers get a clear scope, real line items, and a fixed closing date, more of them bid properly.'],
    ['Records that hold up', 'Documents, decisions, revisions, and purchase orders stay together. If someone asks about an award later, the answer is there.'],
    ['Spend picture stays current', 'Actual PO values track against the target prices set at RFQ stage. Savings, cycle time, and supplier concentration are visible without a separate report.']
];

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

export default function Solutions() {
    useReveal();

    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">Solutions</p>
                    <h1>Procurement looks different depending on who you ask.</h1>
                    <p>
                        Most tools manage the process. Metics helps you make the call. Each team sees the TCO analysis, risk scores, and approval record they need without losing the full picture.
                    </p>
                    <div className="platform-hero-actions">
                        <Link className="platform-primary-link" to="/contact">Talk through your workflow</Link>
                        <Link className="platform-secondary-link" to="/">See the platform</Link>
                    </div>
                </div>
            </section>

            <section className="editorial-index-section">
                <div className="editorial-section-heading reveal">
                    <p className="platform-kicker">By role</p>
                    <h2>Different pressures. One procurement record.</h2>
                </div>
                <div className="editorial-role-list">
                    {roles.map((role, index) => (
                        <article className="editorial-role-row reveal" key={role.title}>
                            <div className="editorial-row-number">{String(index + 1).padStart(2, '0')}</div>
                            <div>
                                <h3>{role.title}</h3>
                                <p>{role.problem}</p>
                            </div>
                            <div>
                                <span>What changes</span>
                                <p>{role.fit}</p>
                                <strong>{role.result}</strong>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="editorial-dark-statement">
                <div className="editorial-dark-inner reveal">
                    <p>
                        The best procurement process is boring in the right places: clear scope, comparable bids, visible decisions, and a record nobody has to reconstruct later.
                    </p>
                </div>
            </section>

            <section className="editorial-grid-section">
                <div className="editorial-section-heading reveal">
                    <p className="platform-kicker">By sector</p>
                    <h2>Across every sector that buys at scale.</h2>
                </div>
                <div className="editorial-card-grid four">
                    {sectors.map(([title, body]) => (
                        <article className="editorial-simple-card reveal" key={title}>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="editorial-grid-section compact">
                <div className="editorial-section-heading reveal">
                    <p className="platform-kicker">What changes</p>
                    <h2>The work gets easier to follow.</h2>
                </div>
                <div className="editorial-card-grid">
                    {outcomes.map(([title, body]) => (
                        <article className="editorial-simple-card reveal" key={title}>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <CTABanner
                heading="Bring us one messy tender package"
                body="We will show where the RFQ, bids, notes, approvals, and PO live in Metics."
                primaryLabel="Book a Demo"
                primaryTo="/contact"
                secondaryLabel="Back to Platform"
                secondaryTo="/"
            />
        </div>
    );
}
