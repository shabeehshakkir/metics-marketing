import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '-80px' } as const;

type Article = (typeof articles)[number];

function readingTime(article: Article) {
    const words = article.body.join(' ').split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
}

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
        </svg>
    );
}

export default function Insights() {
    usePageMeta(
        'Insights',
        'Writing on procurement practice: total cost of ownership, supplier concentration risk, audit-ready award records, and spend analytics.'
    );
    const [filter, setFilter] = useState('All');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const featured = articles[0];
    const visible = filter === 'All'
        ? articles.slice(1)
        : articles.filter((a) => a.category === filter);

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Insights"
                title="Procurement thinking."
                subtitle="Short reads on how procurement decisions are made well, what data matters before the award, and where the process breaks down when it does."
            />

            <section className="border-t border-black/[0.08] py-16 md:py-24">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    {filter === 'All' && (
                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.6, ease: EASE }}
                            onClick={() => setSelectedArticle(featured)}
                            className="group mb-24 cursor-pointer"
                        >
                            <RuleLabel label={`Featured — ${featured.category}`} />
                            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
                                <h2 className="font-serif text-3xl leading-[1.05] tracking-tight text-primary transition-colors group-hover:text-accent md:text-6xl lg:col-span-8">
                                    {featured.heading}
                                </h2>
                                <div className="self-end lg:col-span-4 lg:col-start-9">
                                    <p className="text-lg leading-relaxed text-primary/65">{featured.summary}</p>
                                    <div className="mt-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/50">
                                        <span>{featured.date}</span>
                                        <span>{readingTime(featured)}</span>
                                    </div>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                                        Read full article <ArrowIcon />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    )}

                    <div
                        className="mb-0 flex flex-wrap items-baseline gap-x-7 gap-y-3 border-b border-black/[0.08] pb-5"
                        role="tablist"
                        aria-label="Filter by category"
                    >
                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/40">Filter</span>
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={filter === c}
                                onClick={() => setFilter(c)}
                                className={`relative pb-1 text-sm font-semibold transition-colors ${
                                    filter === c ? 'text-primary' : 'text-primary/40 hover:text-primary/70'
                                }`}
                            >
                                {c}
                                {filter === c && (
                                    <motion.span
                                        layoutId="insights-filter-underline"
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {visible.length > 0 ? (
                        <div className="divide-y divide-black/[0.08]">
                            {visible.map((article, i) => (
                                <article
                                    key={article.heading}
                                    onClick={() => setSelectedArticle(article)}
                                    className="group grid cursor-pointer gap-4 py-12 md:py-14 lg:grid-cols-12 lg:gap-10"
                                >
                                    <div className="lg:col-span-7">
                                        <div className="flex items-baseline gap-5">
                                            <span className="font-serif text-2xl leading-none text-black/[0.12]">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                                                {article.category}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 max-w-xl font-serif text-2xl leading-[1.15] tracking-tight text-primary transition-colors group-hover:text-accent md:text-[2rem]">
                                            {article.heading}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col lg:col-span-4 lg:col-start-9">
                                        <p className="text-[15px] leading-relaxed text-primary/65">{article.summary}</p>
                                        <div className="mt-5 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/50">
                                            <span>{article.date}</span>
                                            <span>{readingTime(article)}</span>
                                        </div>
                                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                                            Read full article <ArrowIcon />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center text-primary/50">No articles in this category yet.</p>
                    )}
                </div>
            </section>

            <CTABanner
                heading="See the platform behind these ideas"
                body="Metics puts TCO analysis, health scores, audit trails, and spend analytics into the procurement workflow. Not in a separate tool."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View platform"
                secondaryTo="/platform"
            />

            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 px-4 py-8 backdrop-blur-sm"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8 shadow-[0_24px_80px_-16px_rgba(26,26,26,0.35)] md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedArticle(null)}
                                aria-label="Close reader"
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-primary/60 transition-colors hover:border-primary hover:text-primary"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>

                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{selectedArticle.category}</p>
                            <h1 className="font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-4xl">{selectedArticle.heading}</h1>
                            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary/50">Published: {selectedArticle.date}</p>

                            <div className="mt-10 space-y-4 border-t border-black/[0.08] pt-8">
                                {selectedArticle.body.map((p, index) => (
                                    <p key={index} className="text-primary/70 leading-relaxed">{p}</p>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
