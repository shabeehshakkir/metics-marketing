import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, Folio, RuleLabel } from '../components/shared';
import { WorkflowVisual } from '../components/graphics';
import { usePageMeta } from '../hooks/usePageMeta';

const easeOut: [number, number, number, number] = [0.2, 0, 0.38, 0.9];

const proofPoints = [
    {
        title: 'Start with one package',
        body: 'Create an RFQ from a BOQ, a template, or a blank sheet. Invite the suppliers who should see it.',
    },
    {
        title: 'Keep bids comparable',
        body: 'Suppliers answer in the same structure, so price, scope, and delivery dates sit side by side.',
    },
    {
        title: 'Decide with the record open',
        body: 'Clarifications, revisions, approvals, and notes stay attached to the package.',
    },
    {
        title: 'Issue the PO',
        body: 'Turn an awarded bid into a purchase order without rebuilding the work in another system.',
    },
];

const roles = [
    {
        tab: 'Contractors',
        title: 'General contractors',
        body: 'Each package gets one record: the RFQ, supplier list, bids, clarifications, approvals, and PO. The status is always current. Delays show up early enough to do something about them.',
        outcome: 'Award cycles get shorter within the first few packages.',
    },
    {
        tab: 'QS teams',
        title: 'QS and commercial teams',
        body: 'Supplier responses land in a consistent structure. You compare at package or line level without rebuilding the spreadsheet. The commercial review starts when bids close, not after someone cleans the data.',
        outcome: 'The analysis starts the same day bids close.',
    },
    {
        tab: 'Developers',
        title: 'Developers and owners',
        body: 'Package status, bid comparisons, and approval history are live. You do not need a report from every project team to see where things stand. Ask harder questions earlier, before decisions lock in.',
        outcome: 'You carry the budget risk. Now you have the data to manage it.',
    },
    {
        tab: 'Suppliers',
        title: 'Suppliers',
        body: 'RFQs come with scope, line items, and dates. Bid status updates when it changes. Clarification threads stay attached to the package. No chasing, no resubmitting the same document twice.',
        outcome: 'Suppliers price faster when the RFQ makes sense.',
    },
];

const testimonials = [
    {
        quote: 'The bid comparison used to take two days of spreadsheet work. Now the data is ready when bids close.',
        name: 'Rachel T.',
        role: 'Commercial Manager',
    },
    {
        quote: 'The award record shows exactly why each supplier was chosen. That still holds up when a client asks six months later.',
        name: 'James O.',
        role: 'Head of Procurement',
    },
    {
        quote: 'For the first time I can see the spend picture across every package without waiting for a report from the project team.',
        name: 'Maria S.',
        role: 'Development Director',
    },
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

const strip = [
    {
        title: 'Decision intelligence',
        body: 'Not just another procurement workflow tool. Live analytics and total cost comparisons built in.',
    },
    {
        title: 'Free for suppliers',
        body: 'No platform fees, no registration barriers, no paywalls. More bid coverage for buyers.',
    },
    {
        title: 'CSRD compliance',
        body: 'Scope 3 carbon tracking and sustainability metrics built directly into the RFQ and PO record.',
    },
];

const heroBids = [
    { supplier: 'Nordbau GmbH', amount: '€412,300', width: '72%', accent: true },
    { supplier: 'Delta Steel Co.', amount: '€448,150', width: '84%', accent: false },
    { supplier: 'Meridian Supply', amount: '€463,900', width: '92%', accent: false },
];

function HeroRecordCard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
            className="border border-subtle bg-layer p-6 md:p-8"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">RFQ package</p>
                    <p className="mt-1 text-xl font-normal text-primary">Structural Steel — Block C</p>
                </div>
                <span className="inline-flex items-center gap-2 border border-subtle bg-paper px-3 py-1 text-xs font-semibold text-support">
                    <span className="h-1.5 w-1.5 bg-support" aria-hidden="true" />
                    Bids closed
                </span>
            </div>

            <div className="mt-6 space-y-3">
                {heroBids.map((bid) => (
                    <div key={bid.supplier} className="flex items-center gap-4">
                        <span className="w-32 shrink-0 truncate text-xs font-medium text-muted">{bid.supplier}</span>
                        <div className="h-2 flex-1 overflow-hidden bg-subtle">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: bid.width }}
                                transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
                                className={`h-full ${bid.accent ? 'bg-accent' : 'bg-strong'}`}
                            />
                        </div>
                        <span className={`w-20 shrink-0 text-right font-mono text-xs tabular-nums ${bid.accent ? 'font-semibold text-primary' : 'text-muted'}`}>
                            {bid.amount}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-subtle pt-4">
                <span className="text-xs text-muted">3 bids · 2 clarifications · TCO comparison ready</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
                    Review award
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path d="M11.8 4.4 17.4 10l-5.6 5.6M17.4 10H2.6" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </span>
            </div>
        </motion.div>
    );
}

export default function Home() {
    usePageMeta(
        undefined,
        'Metics keeps every RFQ, bid, approval, and purchase order in one shared record. Procurement decision intelligence for teams that buy at scale.'
    );
    const [activeRole, setActiveRole] = useState(0);

    return (
        <div className="page">
            <section className="leadspace border-b border-subtle bg-paper pb-16 pt-12 md:min-h-[640px] md:pb-24 md:pt-16">
                <div className="site-wrap">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.24, ease: easeOut }}
                    >
                        <RuleLabel label="Metics Platform" />
                    </motion.div>

                    <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:gap-8">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.06, ease: easeOut }}
                            className="title-rail text-4xl leading-[1.18] text-primary md:text-5xl lg:col-span-10 lg:text-[3.375rem] lg:leading-[64px]"
                        >
                            The procurement workspace your projects can <span className="text-accent">live in</span>.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.12, ease: easeOut }}
                            className="lg:col-span-8"
                        >
                            <p className="text-base leading-6 text-muted md:text-lg md:leading-7">
                                Procurement goes wrong when the cost picture, the supplier risk, and the approval trail live in different places. Metics puts the tender, the bids, the decision, and the purchase order in one record.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link to="/contact" className="btn-primary">
                                    Book a walkthrough
                                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                                        <path d="M11.8 4.4 17.4 10l-5.6 5.6M17.4 10H2.6" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </Link>
                                <Link to="/platform" className="btn-tertiary">
                                    See how it works
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-16 grid items-end gap-8 md:mt-20 lg:grid-cols-12">
                        <motion.aside
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.18, ease: easeOut }}
                            className="lg:col-span-4"
                        >
                            <div className="border-t border-strong pt-6">
                                <p className="text-xl font-light leading-snug text-muted md:text-2xl">
                                    Most teams find out the real cost of a supplier relationship after the award. Metics shows it before.
                                </p>
                            </div>
                        </motion.aside>
                        <div className="lg:col-span-8">
                            <HeroRecordCard />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-subtle bg-layer">
                <div className="site-wrap">
                    <div className="grid grid-cols-1 divide-y divide-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
                        {strip.map((item, i) => (
                            <div
                                key={item.title}
                                className="px-0 py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
                            >
                                <Folio label={String(i + 1).padStart(2, '0')} />
                                <h4 className="mt-4 text-base font-semibold text-primary">{item.title}</h4>
                                <p className="mt-2 text-sm leading-[18px] text-muted">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-paper py-16 md:py-24" aria-label="How the workflow runs">
                <div className="site-wrap">
                    <RuleLabel label="01 — How the workflow runs" />
                    <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
                        <div className="hidden lg:col-span-5 lg:block lg:self-center">
                            <WorkflowVisual />
                        </div>
                        <div className="lg:col-span-7">
                            {proofPoints.map((item, i) => (
                                <article
                                    key={item.title}
                                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-subtle py-6 first:border-t md:grid-cols-[5rem_1fr] md:gap-8"
                                >
                                    <span className="font-mono text-2xl tabular-nums leading-none text-strong md:text-3xl">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-normal text-primary md:text-2xl">{item.title}</h2>
                                        <p className="mt-2 max-w-lg text-base leading-6 text-muted">{item.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-ink py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="02 — The point" light />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="mt-12"
                    >
                        <p className="max-w-4xl text-3xl font-light leading-[1.19] text-white md:text-[3.375rem] md:leading-[64px]">
                            The teams that award well are the ones who saw the full picture before the decision was made.
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                            <span className="h-px w-8 bg-accent" aria-hidden="true" />
                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#c6c6c6]">
                                That is what Metics is built to give you.
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-paper py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="03 — Who it's for" />
                    <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <h2 className="text-3xl leading-[1.19] text-primary md:text-[2.625rem] md:leading-[50px]">
                                Different pressures. One procurement record.
                            </h2>
                            <div className="mt-8 flex flex-wrap border-b border-subtle lg:flex-col lg:items-stretch lg:border-b-0 lg:border-l" role="tablist" aria-label="Roles">
                                {roles.map((role, i) => (
                                    <button
                                        key={role.tab}
                                        role="tab"
                                        aria-selected={activeRole === i}
                                        onClick={() => setActiveRole(i)}
                                        className={`px-4 py-3 text-left text-sm font-semibold transition-colors duration-150 ${
                                            activeRole === i
                                                ? 'border-b-2 border-accent bg-highlight text-primary lg:border-b-0 lg:border-l-2 lg:border-accent'
                                                : 'text-muted hover:bg-layer hover:text-primary'
                                        }`}
                                    >
                                        {role.tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 lg:col-start-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeRole}
                                    role="tabpanel"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15, ease: easeOut }}
                                    className="border-t border-strong pt-8"
                                >
                                    <h3 className="text-2xl font-normal tracking-tight text-primary md:text-3xl">{roles[activeRole].title}</h3>
                                    <p className="mt-5 text-base leading-6 text-muted md:text-lg md:leading-7">{roles[activeRole].body}</p>
                                    <p className="mt-8 border-l-2 border-accent pl-4 text-base text-primary">
                                        {roles[activeRole].outcome}
                                    </p>
                                    <Link
                                        to="/solutions"
                                        className="btn-ghost mt-8 px-0"
                                    >
                                        See all roles
                                        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                                            <path d="M11.8 4.4 17.4 10l-5.6 5.6M17.4 10H2.6" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-subtle bg-layer py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="04 — What's inside" />
                    <h2 className="mt-12 max-w-3xl text-3xl leading-[1.19] text-primary md:text-[2.625rem] md:leading-[50px]">
                        The useful parts are built in. The noisy parts are left out.
                    </h2>

                    <div className="mt-12 border-t border-subtle">
                        {tools.map((item, index) => (
                            <article
                                key={item.heading}
                                className="group grid grid-cols-1 gap-4 border-b border-subtle py-8 md:grid-cols-[120px_1fr_1fr] md:gap-8 md:py-10"
                            >
                                <div className="font-mono text-5xl leading-none text-subtle md:text-7xl">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">{item.kicker}</span>
                                    <h3 className="mt-2 text-xl font-normal leading-snug text-primary md:text-2xl">{item.heading}</h3>
                                </div>
                                <p className="text-base leading-6 text-muted md:pt-6">{item.body}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link to="/platform" className="btn-tertiary">
                            Full platform overview
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-paper py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="05 — What teams say" />

                    <figure className="mt-12 max-w-4xl md:mt-16">
                        <blockquote className="text-3xl font-light leading-[1.19] text-primary md:text-[2.625rem] md:leading-[50px]">
                            &ldquo;{testimonials[0].quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                            {testimonials[0].name} · {testimonials[0].role}
                        </figcaption>
                    </figure>

                    <div className="mt-16 grid gap-8 border-t border-subtle pt-10 md:grid-cols-2 md:gap-8">
                        {testimonials.slice(1).map((t) => (
                            <figure key={t.name}>
                                <blockquote className="text-xl font-light leading-snug text-primary md:text-2xl">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-6">
                                    <span className="block font-mono text-xs uppercase tracking-[0.08em] text-primary">{t.name}</span>
                                    <span className="mt-1 block font-mono text-xs uppercase tracking-[0.08em] text-muted">{t.role}</span>
                                </figcaption>
                            </figure>
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
