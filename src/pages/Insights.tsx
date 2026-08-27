import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const articles = [
    {
        category: 'Analysis',
        heading: 'What total cost of ownership actually changes about a procurement decision.',
        summary: 'A unit-price table puts the cheapest bid first. TCO ranking puts the supplier who will actually cost less first. Those two lists are often not the same.',
        date: 'Jun 2025',
        body: [
            "It is easy to trust a cleaned spreadsheet. Once bids sit side by side, the lowest unit price looks like the obvious winner. That is usually where the real cost of the supplier relationship is still hiding.",
            "Total cost of ownership (TCO) looks at the whole financial impact of the deal, not just the unit price. For a package of long-lead manufacturing equipment, the raw purchase price might only be 70% of the lifecycle cost. The other 30% is delivery logistics, customs duties, import tariffs, extended warranties, and commissioning support.",
            "Incoterms move that cost around. A supplier quoting EXW (Ex Works) leaves the buyer with freight, insurance, and import clearance. A slightly higher bid quoting DDP (Delivered Duty Paid) can be cheaper and lower risk once shipping rates are in. Lead time has to match the programme too: a late delivery on a critical path item costs more in site downtime than any unit price saving can cover.",
            "In Metics, buyers set TCO adjustments when they build the RFQ: shipping, customs, quality margins, and programme delays. As suppliers submit structured bids, the platform calculates total cost of ownership for each line item. The ranking shows financial exposure, so commercial teams can award on that number rather than unit price alone."
        ]
    },
    {
        category: 'Risk',
        heading: 'When one supplier holds 80% of a category.',
        summary: 'Supplier concentration builds slowly and fails fast. Most teams only measure it after the first disruption.',
        date: 'May 2025',
        body: [
            "Every procurement team understands volume leverage. Put spend with one supplier and you can negotiate better unit rates, lock in SLAs, and simplify the contract. The problem is the line between that and a dependency you cannot absorb.",
            "Concentration risk builds slowly and fails instantly. If a sole-source supplier has a production shutdown, a labor strike, or a logistics failure, the buyer's operations stop. The cost of that stoppage almost always dwarfs the extra savings from sole-sourcing.",
            "You need to see category exposure at the point of award. That means tracking what share of category spend each vendor already has. When a new RFQ is out, the commercial manager should see how the proposed award changes that score.",
            "Metics puts concentration analytics in the award workflow. When you analyse bids, the platform shows the supplier's share of the active project pipeline. If an award would push a vendor past 80% of a critical category, it flags it. You can then split the package across qualified suppliers so you are not choosing between price and resilience after the fact."
        ]
    },
    {
        category: 'Governance',
        heading: 'The audit trail that should exist before anyone asks for it.',
        summary: 'Award records reconstructed from emails are slow to produce and unreliable. The record should write itself as the process runs.',
        date: 'May 2025',
        body: [
            "An audit request is rarely pleasant. It is worse when it means reconstructing the story from email. When a project owner, client, or external auditor asks why a supplier won a multimillion-dollar contract, 'they had the best proposal' is not an answer.",
            "Pulling the trail out of email threads, personal Excel files, and local PDFs is slow and error-prone. It also looks like weak governance. The record should compile itself as the work happens, not months after the contract is signed.",
            "A complete award record covers the whole lifecycle: original RFQ specifications, the supplier list, submitted bids including revisions, the comparison matrix, clarification Q&As, team scoring notes, the final recommendation, internal approvals, and the issued purchase order.",
            "In Metics every interaction is logged: an RFQ update, a supplier bid revision, all of it. Clarification chats stay on the line items they refer to, and approvals go through defined team roles. When a review is requested, commercial managers can export a timestamped audit pack in one click."
        ]
    },
    {
        category: 'Compliance',
        heading: 'CSRD and procurement: what B2B buyers need to track now.',
        summary: 'CSRD reporting extends into scope 3 emissions. For most businesses that means supplier carbon data has to sit inside the procurement record, not in a separate tool.',
        date: 'Apr 2025',
        body: [
            "The Corporate Sustainability Reporting Directive (CSRD) treats sustainability as an accounting discipline, not a brochure. For businesses operating in or trading with the European Union, emissions reporting is no longer voluntary, and it extends well beyond your own office walls.",
            "Under CSRD, organizations must report Scope 3 emissions, which are the indirect greenhouse gas emissions in their value chain. For most industrial and construction firms, Scope 3 emissions account for over 80% of their total carbon footprint. B2B buyers therefore have to track the carbon intensity of the materials and services they buy.",
            "Historically, carbon tracking was done through annual supplier surveys or generic environmental databases. Neither method gives the transaction-level accuracy needed for auditable CSRD reports. Carbon data has to be captured at the point of procurement, matching actual quantities purchased.",
            "Metics puts carbon accounting in the standard RFQ workflow. Buyers can require carbon footprints (kg CO2e per unit) as a bidding attribute. Suppliers enter those values alongside pricing. The bid comparison then shows financial cost and carbon cost together, so teams can weight awards against sustainability targets and keep carbon-audit-ready PO records."
        ]
    },
    {
        category: 'Strategy',
        heading: 'Why bid coverage drops when suppliers pay to participate.',
        summary: 'A participation fee reduces the supplier pool. Fewer bids means weaker competition and higher award prices. The cost of the fee is paid by the buyer.',
        date: 'Apr 2025',
        body: [
            "For years, enterprise software providers have sold procurement platforms under a supplier-network model. The buyer pays a software license, and suppliers pay a registration or transaction fee to join tenders. That shifts software cost off the buyer. It also introduces a larger hidden expense.",
            "Participation fees cut bid coverage. When small and medium enterprises face a fee to bid on a contract they might not win, they opt out. The pool shrinks to the largest vendors, the ones who can absorb the registration cost.",
            "Fewer bids mean weaker competition. A drop in bid coverage from five suppliers to two typically increases the final award price by 8% to 15%. That premium on materials and services dwarfs any software license savings. The buyer pays the supplier's fee, multiplied many times over in contract values.",
            "Metics is free for suppliers: no registration cost, no transaction fee, no paywall. That is so buyers can keep bid coverage up, invite local SME specialists, and get a real comparison."
        ]
    },
    {
        category: 'Analytics',
        heading: 'The procurement health score: what it measures and why it matters.',
        summary: 'One number covering competitive bidding rate, savings rate, cycle time, and supplier diversity. Useful when it moves, not just when it is printed in a report.',
        date: 'Mar 2025',
        body: [
            "Commercial directors are flooded with data: PO totals, supplier lists, cycle times, and budget variances. Telling whether procurement is improving or slipping across several projects is still hard. What is missing is a single leading indicator of procurement health.",
            "A useful procurement health score has to measure process quality, not just spend volume. It should combine four dimensions: competitive bidding rate (percentage of packages with 3+ bids), savings rate (actual PO price vs. target budget), cycle time (RFQ creation to PO execution), and supplier diversity.",
            "Tracked live, the score flags bottlenecks before they delay projects. If cycle times spike in concrete packages, or competitive bidding drops in finishes, commercial directors can step in early.",
            "Metics calculates a procurement health score for every project and team. The score updates as packages move through the pipeline. Commercial teams get a live view of operational efficiency and governance across the pipeline, rather than waiting for a retrospective quarterly report."
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
                title="Notes on how awards actually get made."
                subtitle="Short reads on how procurement decisions are made well, what data matters before the award, and where the process breaks down when it does."
            />

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    {filter === 'All' && (
                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.6, ease: EASE }}
                            onClick={() => setSelectedArticle(featured)}
                            className="group mb-24 cursor-pointer"
                        >
                            <RuleLabel label={`Featured: ${featured.category}`} />
                            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
                                <h2 className="text-3xl font-light leading-[1.05] tracking-tight text-primary transition-colors group-hover:text-accent md:text-6xl lg:col-span-8">
                                    {featured.heading}
                                </h2>
                                <div className="self-end lg:col-span-4 lg:col-start-9">
                                    <p className="text-lg leading-relaxed text-muted">{featured.summary}</p>
                                    <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                        <span>{featured.date}</span>
                                        <span>{readingTime(featured)}</span>
                                    </div>
                                    <span className="btn-ghost mt-6 px-0">
                                        Read full article <ArrowIcon />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    )}

                    <div
                        className="mb-0 flex flex-wrap items-baseline gap-x-7 gap-y-3 border-b border-subtle pb-5"
                        role="tablist"
                        aria-label="Filter by category"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Filter</span>
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={filter === c}
                                onClick={() => setFilter(c)}
                                className={`relative pb-1 text-sm transition-colors ${
                                    filter === c ? 'text-primary' : 'text-muted hover:text-primary'
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
                        <div className="divide-y divide-subtle">
                            {visible.map((article, i) => (
                                <article
                                    key={article.heading}
                                    onClick={() => setSelectedArticle(article)}
                                    className="group grid cursor-pointer gap-4 py-12 md:py-14 lg:grid-cols-12 lg:gap-10"
                                >
                                    <div className="lg:col-span-7">
                                        <div className="flex items-baseline gap-5">
                                            <span className="font-mono text-2xl leading-none text-subtle">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                                                {article.category}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 max-w-xl text-2xl font-light leading-[1.15] tracking-tight text-primary transition-colors group-hover:text-accent md:text-[2rem]">
                                            {article.heading}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col lg:col-span-4 lg:col-start-9">
                                        <p className="text-[15px] leading-relaxed text-muted">{article.summary}</p>
                                        <div className="mt-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                            <span>{article.date}</span>
                                            <span>{readingTime(article)}</span>
                                        </div>
                                        <span className="btn-ghost mt-4 px-0">
                                            Read full article <ArrowIcon />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center text-muted">No articles in this category yet.</p>
                    )}
                </div>
            </section>

            <CTABanner
                heading="See the platform behind these ideas"
                body="Metics puts TCO analysis, health scores, audit trails, and spend analytics in the procurement workflow, not in a separate tool."
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto border border-subtle bg-white p-8 md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedArticle(null)}
                                aria-label="Close reader"
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-subtle bg-white text-muted transition-colors hover:border-primary hover:text-primary"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>

                            <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-accent">{selectedArticle.category}</p>
                            <h1 className="text-3xl font-light leading-[1.1] tracking-tight text-primary md:text-4xl">{selectedArticle.heading}</h1>
                            <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">Published: {selectedArticle.date}</p>

                            <div className="mt-10 space-y-4 border-t border-subtle pt-8">
                                {selectedArticle.body.map((p, index) => (
                                    <p key={index} className="leading-relaxed text-muted">{p}</p>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
