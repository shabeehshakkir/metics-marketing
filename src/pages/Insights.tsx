import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

const articles = [
    {
        category: 'Analysis',
        heading: 'What total cost of ownership actually changes about a procurement decision.',
        summary: 'Unit price comparison puts the cheapest number first. TCO analysis puts the right supplier first. The gap between the two is where procurement value lives.',
        date: 'Jun 2025',
        body: [
            "In commercial procurement, it is tempting to believe the spreadsheet does not lie. When bids are normalized and unit prices sit side-by-side, the lowest number appears to be the obvious winner. But this is where the real cost of a supplier relationship is hidden.",
            "Total Cost of Ownership (TCO) shifts the analysis from simple unit prices to the complete financial impact of the transaction. For a package of long-lead manufacturing equipment, the raw purchase price might only represent 70% of the lifecycle cost. The remaining 30% consists of delivery logistics, customs duties, import tariffs, extended warranties, and commissioning support.",
            "Logistics parameters like Incoterms (e.g., EXW vs. DDP) drastically shift risk and expense. A supplier quoting EXW (Ex Works) leaves the buyer responsible for freight, insurance, and import clearance. A slightly higher bid quoting DDP (Delivered Duty Paid) may actually be cheaper and lower risk once shipping rates are factored in. Furthermore, delivery lead times must be matched against the project schedule: a late delivery on a critical path item costs more in site downtime than any unit price saving can cover.",
            "Metics automates this complex analysis. When setting up an RFQ, buyers define TCO adjustments—including shipping, customs, quality margins, and program delays. As suppliers submit structured bids, Metics automatically calculates the total cost of ownership for each line item. The resulting ranking shows buyers the true financial exposure, giving commercial teams the data they need to make the right award decision."
        ]
    },
    {
        category: 'Risk',
        heading: 'When one supplier holds 80% of a category.',
        summary: 'Supplier concentration is a risk that builds slowly and fails fast. Most teams only measure it after the first disruption.',
        date: 'May 2025',
        body: [
            "Every procurement team understands the value of volume leverage. By concentrating spend with a single supplier, you negotiate better unit rates, establish preferred SLAs, and simplify contract management. However, there is a fine line between volume leverage and dangerous dependency.",
            "Supplier concentration risk is a systemic vulnerability that builds slowly and fails instantly. When a sole-source supplier suffers a production shutdown, labor strike, or logistics failure, the buyer’s operations grind to a halt. The cost of a supply chain stoppage almost always dwarfs the marginal savings gained through sole-sourcing.",
            "To manage this risk, teams must have visibility into category exposure at the point of decision. This requires tracking the percentage of total category spend allocated to each vendor in real-time. When a new RFQ is issued, the commercial manager must see how the proposed award changes the overall concentration score.",
            "Metics builds concentration analytics directly into the award workflow. When analyzing bids for a package, the platform highlights the supplier's share of your active project pipeline. If an award would push a vendor's share of a critical category past 80%, the system flags it. Buyers can then use Metics' split-award functionality to distribute the package across multiple qualified suppliers—balancing price optimization with supply chain resilience."
        ]
    },
    {
        category: 'Governance',
        heading: 'The audit trail that should exist before anyone asks for it.',
        summary: 'Award records reconstructed from emails are slow to produce and unreliable. The record should write itself as the process runs.',
        date: 'May 2025',
        body: [
            "An audit request is rarely a pleasant experience, but it is far worse when it requires forensic email reconstruction. When a project owner, client, or external auditor asks why a specific supplier was awarded a multimillion-dollar contract, the explanation cannot simply be 'they had the best proposal.'",
            "Reconstructing the decision trail from scattered email threads, personal Excel spreadsheets, and local PDFs is slow and prone to errors. It also raises questions about governance. An audit-ready procurement process should compile its records automatically as the work happens, not months after the contract is signed.",
            "A complete award record requires documenting the entire lifecycle: the original RFQ specifications, the supplier list, the submitted bids (including revisions), the side-by-side comparison matrix, clarification Q&As, team scoring notes, the final recommendation, internal approvals, and the issued purchase order.",
            "Metics makes audit compliance passive. Every interaction on the platform—from an RFQ update to a supplier bid revision—is logged in an immutable audit trail. Clarification chats stay attached to the line items they reference, and approvals route through defined team roles. When a review is requested, commercial managers can export a complete, timestamped audit pack in a single click, proving compliance by design."
        ]
    },
    {
        category: 'Compliance',
        heading: 'CSRD and procurement: what B2B buyers need to track now.',
        summary: 'CSRD reporting extends into scope 3 emissions. For most businesses that means supplier carbon data has to sit inside the procurement record, not in a separate tool.',
        date: 'Apr 2025',
        body: [
            "The Corporate Sustainability Reporting Directive (CSRD) is transforming corporate sustainability from a marketing narrative into a strict accounting discipline. For businesses operating in or trading with the European Union, emissions reporting is no longer voluntary—and it extends far beyond your own office walls.",
            "Under CSRD, organizations must report Scope 3 emissions, which represent the indirect greenhouse gas emissions in their value chain. For most industrial and construction firms, Scope 3 emissions account for over 80% of their total carbon footprint. This means B2B buyers must track the carbon intensity of the materials and services they procure from suppliers.",
            "Historically, carbon tracking was done through annual supplier surveys or generic environmental databases. Neither method provides the transaction-level accuracy needed for auditable CSRD reports. Carbon data must be captured at the point of procurement, matching actual quantities purchased.",
            "Metics integrates carbon accounting into the standard RFQ workflow. Buyers can require carbon footprints (kg CO2e per unit) as a bidding attribute. Suppliers input these values directly alongside their pricing. The bid comparison screen then displays both the financial cost and the carbon cost of each proposal, allowing teams to weight decisions based on sustainability targets and generate carbon-audit-ready PO records."
        ]
    },
    {
        category: 'Strategy',
        heading: 'Why bid coverage drops when suppliers pay to participate.',
        summary: 'A participation fee reduces the supplier pool. Fewer bids means weaker competition and higher award prices. The cost of the fee is paid by the buyer.',
        date: 'Apr 2025',
        body: [
            "For years, enterprise software providers have sold procurement platforms under the 'supplier network' model. The premise is simple: the buyer pays a software license, and suppliers pay a registration or transaction fee to participate in tenders. While this shifts software costs off the buyer, it introduces a hidden, much larger expense.",
            "Supplier participation fees drastically reduce bid coverage. When small and medium enterprises (SMEs) face a fee to bid on a contract they might not win, they simply opt out. The supplier pool shrinks, leaving only the largest, high-overhead vendors who can absorb the registration cost.",
            "Fewer bids mean weaker competition. A drop in bid coverage from five suppliers to two typically increases the final award price by 8% to 15%. This premium paid on materials and services dwarfs any software license savings. The buyer ultimately pays the supplier's fee, multiplied many times over in inflated contract values.",
            "At Metics, we believe the supplier relationship is the core of procurement success. The platform is entirely free for suppliers—no registration costs, no transaction fees, and no paywalls. By removing participation barriers, Metics helps buyers achieve maximum bid coverage, invite local SME specialists, and drive true competitive pricing."
        ]
    },
    {
        category: 'Analytics',
        heading: 'The procurement health score: what it measures and why it matters.',
        summary: 'One number covering competitive bidding rate, savings rate, cycle time, and supplier diversity. Useful when it moves, not just when it is printed in a report.',
        date: 'Mar 2025',
        body: [
            "Commercial directors are flooded with data: PO totals, supplier lists, cycle times, and budget variances. Yet, identifying whether procurement operations are improving or deteriorating across multiple projects remains difficult. What is missing is a single, leading indicator of procurement health.",
            "A useful Procurement Health Score must measure process quality, not just spend volume. It should combine four core dimensions: competitive bidding rate (percentage of packages with 3+ bids), savings rate (actual PO price vs. target budget), cycle time (RFQ creation to PO execution), and supplier diversity.",
            "When tracked as a live metric, the health score alerts management to bottlenecks before they delay projects. If cycle times are spiking in concrete packages, or competitive bidding rates are dropping in finishes, commercial directors can intervene early.",
            "Metics calculates a real-time Procurement Health Score for every project and team. The score updates automatically as packages move through the pipeline. Rather than waiting for a retrospective quarterly report, commercial teams have a live dashboard showing the operational efficiency and governance strength of their entire pipeline."
        ]
    },
];

const categories = ['All', 'Analysis', 'Risk', 'Governance', 'Compliance', 'Strategy', 'Analytics'];

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

export default function Insights() {
    useReveal();
    const [filter, setFilter] = useState('All');
    const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

    const featured = articles[0];
    const visible = filter === 'All'
        ? articles.slice(1)
        : articles.filter((a) => a.category === filter);

    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">Insights</p>
                    <h1>Procurement thinking.</h1>
                    <p>
                        Short reads on how procurement decisions are made well, what data matters before the award, and where the process breaks down when it does.
                    </p>
                </div>
            </section>

            <section className="editorial-index-section">
                {filter === 'All' && (
                    <article 
                        className="insights-featured reveal"
                        onClick={() => setSelectedArticle(featured)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="insights-featured-meta">
                            <span className="insights-tag">{featured.category}</span>
                            <span className="insights-date">{featured.date}</span>
                        </div>
                        <h2>{featured.heading}</h2>
                        <p>{featured.summary}</p>
                        <span className="insights-read-link">
                            Read full article <span aria-hidden="true">→</span>
                        </span>
                    </article>
                )}

                <div className="tab-nav" role="tablist" aria-label="Filter by category">
                    {categories.map((c) => (
                        <button
                            key={c}
                            role="tab"
                            aria-selected={filter === c}
                            className={`tab-btn${filter === c ? ' active' : ''}`}
                            onClick={() => setFilter(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {visible.length > 0 ? (
                    <div className="editorial-role-list">
                        {visible.map((article, i) => (
                            <article 
                                className="editorial-role-row reveal" 
                                key={article.heading}
                                onClick={() => setSelectedArticle(article)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="editorial-row-number">{String(i + 1).padStart(2, '0')}</div>
                                <div>
                                    <span>{article.category}</span>
                                    <h3>{article.heading}</h3>
                                </div>
                                <div>
                                    <p>{article.summary}</p>
                                    <p className="insights-date">{article.date}</p>
                                    <span className="insights-read-link">
                                        Read full article <span aria-hidden="true">→</span>
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="insights-empty">No articles in this category yet.</p>
                )}
            </section>

            <CTABanner
                heading="See the platform behind these ideas"
                body="Metics puts TCO analysis, health scores, audit trails, and spend analytics into the procurement workflow. Not in a separate tool."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View platform"
                secondaryTo="/platform"
            />

            {/* Reading Modal Detail View */}
            {selectedArticle && (
                <div className="reading-modal-backdrop" onClick={() => setSelectedArticle(null)}>
                    <div className="reading-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="reading-modal-close" onClick={() => setSelectedArticle(null)} aria-label="Close reader">×</button>
                        <div className="reading-modal-body">
                            <span className="reading-modal-kicker">{selectedArticle.category}</span>
                            <h1>{selectedArticle.heading}</h1>
                            <p className="reading-modal-sub">Published: {selectedArticle.date}</p>
                            
                            <div className="reading-modal-section">
                                {selectedArticle.body.map((p, index) => (
                                    <p key={index}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
