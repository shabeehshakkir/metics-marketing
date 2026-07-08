import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, Folio, RuleLabel } from '../components/shared';
import { WorkflowVisual } from '../components/graphics';
import { usePageMeta } from '../hooks/usePageMeta';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
            className="relative"
        >
            {/* Layered backdrop card for depth */}
            <div className="absolute -bottom-3 left-6 right-6 top-6 rounded-2xl border border-black/[0.06] bg-white/60" aria-hidden="true" />
            <div className="relative rounded-2xl border border-black/[0.08] bg-white p-6 text-left shadow-[0_24px_60px_-24px_rgba(26,26,26,0.18)] md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/40">RFQ package</p>
                        <p className="mt-1 font-serif text-xl text-primary">Structural Steel — Block C</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                        Bids closed
                    </span>
                </div>

                <div className="mt-6 space-y-3">
                    {heroBids.map((bid) => (
                        <div key={bid.supplier} className="flex items-center gap-4">
                            <span className="w-32 shrink-0 truncate text-xs font-medium text-primary/70">{bid.supplier}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.05]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: bid.width }}
                                    transition={{ duration: 0.9, delay: 0.85, ease: easeOut }}
                                    className={`h-full rounded-full ${bid.accent ? 'bg-accent' : 'bg-primary/25'}`}
                                />
                            </div>
                            <span className={`w-20 shrink-0 text-right text-xs tabular-nums ${bid.accent ? 'font-semibold text-primary' : 'text-primary/50'}`}>
                                {bid.amount}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/[0.08] pt-4">
                    <span className="text-xs text-primary/50">3 bids · 2 clarifications · TCO comparison ready</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        Review award
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                            <path d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                    </span>
                </div>
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
            {/* ------------------------------------------------ Hero */}
            <section className="overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easeOut }}
                    >
                        <RuleLabel label="Metics Platform" />
                    </motion.div>

                    <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
                            className="font-serif text-[2.9rem] leading-[1.0] tracking-tight text-primary md:text-7xl lg:col-span-8"
                        >
                            The procurement workspace your projects can <em className="italic text-accent">live in</em>.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
                            className="self-end lg:col-span-4 lg:col-start-9"
                        >
                            <p className="text-lg leading-relaxed text-primary/65">
                                Procurement goes wrong when the cost picture, the supplier risk, and the approval trail live in different places. Metics puts the tender, the bids, the decision, and the purchase order in one record.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
                                >
                                    Book a walkthrough
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-1" aria-hidden="true">
                                        <path d="M5 12h14m-6-6l6 6-6 6" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/platform"
                                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
                                >
                                    See how it works
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Record card anchored right; aside sits left on the same baseline */}
                    <div className="mt-16 grid items-end gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
                        <motion.aside
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
                            className="lg:col-span-4"
                        >
                            <div className="border-t border-black/[0.15] pt-6">
                                <p className="font-serif text-xl italic leading-snug text-primary/75 md:text-2xl">
                                    Most teams find out the real cost of a supplier relationship after the award. Metics shows it before.
                                </p>
                            </div>
                        </motion.aside>
                        <div className="lg:col-span-8 xl:-mr-16">
                            <HeroRecordCard />
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------ Differentiator strip */}
            <section className="border-y border-black/[0.08] bg-white/60">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <div className="grid grid-cols-1 divide-y divide-black/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
                        {strip.map((item, i) => (
                            <div
                                key={item.title}
                                className="px-0 py-8 md:px-10 md:py-12 md:first:pl-0 md:last:pr-0"
                            >
                                <Folio label={String(i + 1).padStart(2, '0')} />
                                <h4 className="mt-4 font-serif text-lg text-primary">{item.title}</h4>
                                <p className="mt-1.5 text-sm leading-relaxed text-primary/60">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --------------------------------------------- Proof steps */}
            <section className="py-24 md:py-32" aria-label="How the workflow runs">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="01 — How the workflow runs" />
                    <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
                        <div className="hidden lg:col-span-5 lg:block lg:self-center">
                            <WorkflowVisual />
                        </div>
                        <div className="lg:col-span-7">
                            {proofPoints.map((item, i) => (
                                <article
                                    key={item.title}
                                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-black/[0.08] py-7 first:border-t md:grid-cols-[5rem_1fr] md:gap-8"
                                >
                                    <span className="font-serif text-2xl tabular-nums leading-none text-primary/25 md:text-3xl">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h2 className="font-serif text-xl text-primary md:text-2xl">{item.title}</h2>
                                        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-primary/60">{item.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------- Belief quote */}
            <section className="bg-[#141414] py-24 md:py-32">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="02 — The point" light />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: easeOut }}
                        className="mt-12 md:mt-16"
                    >
                        <p className="max-w-4xl font-serif text-3xl leading-[1.12] tracking-tight text-white md:text-6xl">
                            The teams that award well are the ones who saw the full picture before the decision was made.
                        </p>
                        <div className="mt-10 flex items-center gap-5">
                            <span className="h-px w-12 bg-accent" aria-hidden="true" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
                                That is what Metics is built to give you.
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --------------------------------------------------- Roles */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="03 — Who it's for" />
                    <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-4">
                            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Different pressures. One procurement record.
                            </h2>
                            <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start" role="tablist" aria-label="Roles">
                                {roles.map((role, i) => (
                                    <button
                                        key={role.tab}
                                        role="tab"
                                        aria-selected={activeRole === i}
                                        onClick={() => setActiveRole(i)}
                                        className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                                            activeRole === i
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-black/[0.1] bg-white text-primary/60 hover:text-primary'
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
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3, ease: easeOut }}
                                    className="border-t border-black/[0.15] pt-8"
                                >
                                    <h3 className="font-serif text-2xl tracking-tight text-primary md:text-3xl">{roles[activeRole].title}</h3>
                                    <p className="mt-5 text-lg leading-relaxed text-primary/65">{roles[activeRole].body}</p>
                                    <p className="mt-8 border-l-2 border-accent pl-5 font-serif text-lg italic text-primary">
                                        {roles[activeRole].outcome}
                                    </p>
                                    <Link
                                        to="/solutions"
                                        className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                                    >
                                        See all roles
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1" aria-hidden="true">
                                            <path d="M5 12h14m-6-6l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------- Tools */}
            <section className="border-t border-black/[0.08] py-24 md:py-32">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="04 — What's inside" />
                    <h2 className="mt-12 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-primary md:mt-16 md:text-[2.75rem]">
                        The useful parts are built in. The noisy parts are left out.
                    </h2>

                    <div className="mt-14 border-t border-black/[0.08]">
                        {tools.map((item, index) => (
                            <article
                                key={item.heading}
                                className="group grid grid-cols-1 gap-4 border-b border-black/[0.08] py-10 md:grid-cols-[120px_1fr_1fr] md:gap-10 md:py-12"
                            >
                                <div className="font-serif text-7xl leading-none text-black/[0.06] transition-colors duration-300 group-hover:text-accent/[0.15]">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">{item.kicker}</span>
                                    <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-primary">{item.heading}</h3>
                                </div>
                                <p className="leading-relaxed text-primary/60 md:pt-7">{item.body}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link
                            to="/platform"
                            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
                        >
                            Full platform overview
                        </Link>
                    </div>
                </div>
            </section>

            {/* -------------------------------------------- Testimonials */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="05 — What teams say" />

                    {/* The one deliberately centered moment on the page */}
                    <figure className="mx-auto mt-16 max-w-3xl text-center md:mt-24">
                        <blockquote className="font-serif text-3xl leading-[1.18] tracking-tight text-primary md:text-5xl">
                            &ldquo;{testimonials[0].quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/50">
                            {testimonials[0].name} &middot; {testimonials[0].role}
                        </figcaption>
                    </figure>

                    <div className="mt-20 grid gap-10 border-t border-black/[0.08] pt-10 md:mt-24 md:grid-cols-2 md:gap-16">
                        {testimonials.slice(1).map((t, i) => (
                            <figure key={t.name} className={i === 1 ? 'md:translate-y-10' : ''}>
                                <blockquote className="font-serif text-xl leading-snug text-primary md:text-2xl">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-6">
                                    <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">{t.name}</span>
                                    <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-primary/50">{t.role}</span>
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
