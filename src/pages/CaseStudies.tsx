import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

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
            "A regional main contractor running three commercial building sites had fragmented tendering. Subcontractor packages (steel, concrete, MEP, glazing) were managed by individual project managers using their own spreadsheets, email chains, and WhatsApp messages.",
            "Bid comparisons were inconsistent, contract sign-offs ran late, and the corporate commercial team had no view of total spend until invoices arrived. If a trade subcontractor delayed a bid, it threatened the construction program.",
            "The contractor put all forty trade packages into Metics. Project managers built RFQs from importable BOQ templates. Suppliers responded in a standard format. Sign-offs ran through a multi-step digital approval workflow. Award cycle times shortened by 32%, they had an audit trail for client reviews, and they had 100% visibility into concurrent packages."
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
            "That concentration was not tracked systematically. When the supplier suffered a major furnace failure, raw material deliveries stopped and the production line halted for ten days. Delivery delays to clients cost the manufacturer over EUR 250,000 in penalties and damaged relationships.",
            "The manufacturer used Metics to put resilience into raw material sourcing. Live analytics calculated supplier concentration across active category packages. On a new raw material tender, the platform showed that awarding the entire volume to the preferred supplier would exceed safe concentration levels. The team split the contract 60/40 between two qualified suppliers, reducing single-source exposure by 45% while keeping production safety."
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
            "Approval packages frequently sat in managers' inboxes for weeks, with no shared record of who was holding up the sign-off. When project deadlines neared, packages had to be escalated manually, which delayed equipment orders.",
            "The provider mapped their multi-step approval workflow into Metics. When bids close, the package is routed sequentially to technical, safety, and commercial teams for digital reviews. Current status and days elapsed are visible on a live dashboard. Approval bottlenecks show up immediately, order cycles have shortened by 14 days, and compliance approvals stay archived with the final purchase order."
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
            "A municipal public sector procurement office was subject to strict compliance audits. For every public tender, they had to prove that evaluation was fair, transparent, and in line with municipal guidelines.",
            "Reconstructing that trail was a large manual effort. When auditors asked about a past award, staff spent weeks searching email archives, shared network drives, and paper files for the original RFQ specifications, all supplier bids, scorecard evaluations, and sign-offs.",
            "The municipality used Metics so every action in the procurement lifecycle is logged in a timestamped audit log. Bids are compared, scored, and approved on the platform. For audit reviews, staff enter the package number and export a complete compliance pack. Retrieval times dropped from three weeks to three minutes, and the office achieved a 100% audit compliance score."
        ]
    },
];

const filters = ['All', 'Construction', 'Manufacturing', 'Energy', 'Government'];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '-80px' } as const;

type Study = (typeof allStudies)[number];

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
        </svg>
    );
}

function ReadLink() {
    return (
        <span className="btn-ghost mt-auto px-0 pt-6">
            Read full case study <ArrowIcon />
        </span>
    );
}

function QuoteBlock({ text }: { text: string }) {
    return (
        <div className="relative pl-6">
            <span aria-hidden="true" className="absolute left-0 top-0 select-none text-2xl font-light leading-none text-accent">&ldquo;</span>
            <p className="text-base font-light leading-relaxed text-muted md:text-lg">{text}</p>
        </div>
    );
}

function StatsRow({ stats, large = false }: { stats: Study['stats']; large?: boolean }) {
    return (
        <div className={`flex flex-wrap ${large ? 'gap-x-10 gap-y-6' : 'gap-x-8 gap-y-4'}`}>
            {stats.map((s) => (
                <div key={s.label}>
                    <span className={`block font-light leading-none text-accent ${large ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{s.value}</span>
                    <span className="mt-2 block font-mono text-xs uppercase tracking-[0.08em] text-muted">{s.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function CaseStudies() {
    usePageMeta(
        'Case Studies',
        'How procurement teams use Metics: shorter award cycles, complete audit records, and supplier concentration under control.'
    );
    const [filter, setFilter] = useState('All');
    const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

    const visible = filter === 'All'
        ? allStudies
        : allStudies.filter((s) => s.industry === filter);

    const featured = visible[0];
    const rest = visible.slice(1);

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="How teams use Metics"
                title="How teams run tenders in Metics."
                subtitle="Patterns from teams that changed how they run tenders, compare bids, and keep award records. The details vary by sector. The underlying problem is usually the same."
            >
                <div className="mt-8 flex flex-wrap gap-1">
                    <Link to="/contact" className="btn-primary">
                        Book a walkthrough
                    </Link>
                    <Link to="/platform" className="btn-tertiary">
                        See the platform
                    </Link>
                </div>
            </PageHero>

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    <div
                        className="mb-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-subtle pb-5"
                        role="tablist"
                        aria-label="Filter by industry"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Filter</span>
                        {filters.map((f) => (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={filter === f}
                                onClick={() => setFilter(f)}
                                className={`relative pb-1 text-sm transition-colors ${
                                    filter === f
                                        ? 'text-primary'
                                        : 'text-muted hover:text-primary'
                                }`}
                            >
                                {f}
                                {filter === f && (
                                    <motion.span
                                        layoutId="case-filter-underline"
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {visible.length > 0 ? (
                        <>
                            {featured && (
                                <motion.article
                                    key={featured.heading}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VIEWPORT}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    onClick={() => setSelectedStudy(featured)}
                                    className="group cursor-pointer"
                                >
                                    <RuleLabel label={`Featured: ${featured.industry}`} />
                                    <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
                                        <div className="lg:col-span-7">
                                            <h2 className="text-3xl font-light leading-[1.05] tracking-tight text-primary transition-colors group-hover:text-accent md:text-6xl">
                                                {featured.heading}
                                            </h2>
                                            <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-muted">{featured.team}</p>
                                            <div className="mt-10 border-t border-subtle pt-8">
                                                <StatsRow stats={featured.stats} large />
                                            </div>
                                        </div>
                                        <div className="self-end lg:col-span-4 lg:col-start-9">
                                            <Folio label="The problem" className="mb-4" />
                                            <QuoteBlock text={featured.problem} />
                                            <Folio label="What changed" className="mb-4 mt-8 !text-secondary/80" />
                                            <p className="leading-relaxed text-muted">{featured.outcome}</p>
                                            <ReadLink />
                                        </div>
                                    </div>
                                </motion.article>
                            )}

                            {rest.length > 0 && (
                                <div className="mt-24 border-t border-subtle">
                                    {rest.map((study) => (
                                        <article
                                            key={study.heading}
                                            onClick={() => setSelectedStudy(study)}
                                            className="group grid cursor-pointer gap-8 border-b border-subtle py-12 md:py-16 lg:grid-cols-12 lg:gap-10"
                                        >
                                            <div className="lg:col-span-3">
                                                <Folio label={study.industry} className="!text-accent" />
                                                <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">{study.team}</p>
                                                {study.stats.length > 0 && (
                                                    <div className="mt-8 hidden lg:block">
                                                        <StatsRow stats={study.stats} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="lg:col-span-8 lg:col-start-5">
                                                <h3 className="max-w-2xl text-2xl font-light leading-[1.12] tracking-tight text-primary transition-colors group-hover:text-accent md:text-4xl">
                                                    {study.heading}
                                                </h3>
                                                <div className="mt-8 grid gap-8 md:grid-cols-2">
                                                    <div>
                                                        <Folio label="The problem" className="mb-4" />
                                                        <p className="text-[15px] leading-relaxed text-muted">{study.problem}</p>
                                                    </div>
                                                    <div>
                                                        <Folio label="What changed" className="mb-4 !text-secondary/80" />
                                                        <p className="text-[15px] leading-relaxed text-muted">{study.outcome}</p>
                                                    </div>
                                                </div>
                                                {study.stats.length > 0 && (
                                                    <div className="mt-8 lg:hidden">
                                                        <StatsRow stats={study.stats} />
                                                    </div>
                                                )}
                                                <ReadLink />
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="py-16 text-center text-muted">No case studies in this category yet.</p>
                    )}
                </div>
            </section>

            <section className="bg-ink py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="On records" light />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 max-w-4xl text-3xl font-light leading-[1.19] tracking-tight text-white md:mt-16 md:text-5xl"
                    >
                        The award decision is made once. The record of it should last for the life of the project.
                    </motion.p>
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

            <AnimatePresence>
                {selectedStudy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
                        onClick={() => setSelectedStudy(null)}
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
                                onClick={() => setSelectedStudy(null)}
                                aria-label="Close reader"
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-subtle bg-white text-muted transition-colors hover:border-primary hover:text-primary"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>

                            <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-accent">{selectedStudy.industry}</p>
                            <h1 className="text-3xl font-light leading-[1.1] tracking-tight text-primary md:text-4xl">{selectedStudy.heading}</h1>
                            <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">{selectedStudy.team}</p>

                            <div className="mt-10">
                                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">The problem</h3>
                                <p className="leading-relaxed text-muted">{selectedStudy.problem}</p>
                            </div>

                            <div className="mt-10">
                                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">How they ran it</h3>
                                <div className="space-y-4">
                                    {selectedStudy.body.map((p, index) => (
                                        <p key={index} className="leading-relaxed text-muted">{p}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">Outcome</h3>
                                <p className="leading-relaxed text-muted">{selectedStudy.outcome}</p>
                                {selectedStudy.stats.length > 0 && (
                                    <div className="mt-8 border-t border-subtle pt-6">
                                        <StatsRow stats={selectedStudy.stats} />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
