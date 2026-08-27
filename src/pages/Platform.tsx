import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { TCOVisual } from '../components/graphics';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CheckMark({ className = 'text-accent' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`mt-1 h-4 w-4 shrink-0 ${className}`} aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    );
}

const proofPoints = [
    {
        title: 'Start with one package',
        body: 'Create an RFQ from a BOQ, a template, or a clean blank sheet. Invite the suppliers who should see it.',
    },
    {
        title: 'Keep bids comparable',
        body: 'Suppliers answer in the same structure, so price, scope, exclusions, and delivery dates can be read side by side.',
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

const platformStats = [
    { value: 'P2P', desc: 'Full procure-to-pay. From the first RFQ line item to the delivery receipt, one place.' },
    { value: 'Free', desc: 'Suppliers receive RFQs, submit bids, and track status. No account fee, no participation cost.' },
    { value: 'CSRD', desc: 'Carbon data, certifications, and compliance records inside the procurement record, not in a separate system.' },
];

const flowSteps = [
    { label: 'RFQ', sub: 'Structured tender' },
    { label: 'Bid room', sub: 'Suppliers respond' },
    { label: 'TCO review', sub: 'Adjusted ranking' },
    { label: 'Award', sub: 'Decision + notes' },
    { label: 'PO', sub: 'Purchase order' },
    { label: 'Delivery', sub: 'GRN + invoice' },
];

const buyerSteps = [
    'Build RFQs with line items, quantities, units, documents, and bidding rules.',
    'Invite suppliers by trade, region, approval status, or a saved project list.',
    'Compare full and partial bids without reworking supplier spreadsheets.',
    'Route awards through approval steps and export a clean PO when the decision is made.',
];

const supplierSteps = [
    'Keep company details, trade categories, certificates, and terms in one profile.',
    'Receive RFQs that match the work you actually do.',
    'Submit a full package bid or price only the line items you can deliver.',
    'See bid status and respond to buyer clarifications from the same thread.',
];

const toolSections = [
    {
        kicker: 'RFQ builder',
        heading: 'A package starts as structured work, not a messy attachment.',
        body: 'Each tender gets scope, line items, drawings, dates, bidding rules, and an approved supplier list. You can import from a spreadsheet to start, but the working record stays in one place after that.',
    },
    {
        kicker: 'Bid room',
        heading: 'Supplier answers arrive ready to compare.',
        body: 'Supplier responses come in with commercial terms, alternates, and files attached to the right line items. Clarification threads stay with the package, not in a side email chain.',
    },
    {
        kicker: 'Award record',
        heading: 'The reason for the award stays with the award.',
        body: 'Shortlists, scoring notes, approvals, and final purchase orders are kept together. When someone asks why a supplier won, the answer is already there.',
    },
    {
        kicker: 'TCO comparison',
        heading: 'The lowest unit price is not always the lowest cost.',
        body: "Each bid adjusts for Incoterms logistics, delivery lead time, and the supplier's historical fill rate. Suppliers rank by total cost of ownership. The adjusted comparison exports alongside the bid summary.",
    },
    {
        kicker: 'Sustainability',
        heading: 'Carbon data sits inside the procurement record, not outside it.',
        body: 'Each bid carries a carbon estimate. Awards can be weighted by emissions as well as price. Supplier compliance evidence, certifications, and CSRD data live in the same record as the RFQ and PO.',
    },
];

const analyticsItems = [
    ['Spend vs budget', 'actual PO values against the target prices set at RFQ stage, per category.'],
    ['Procurement cycle time', 'average days from RFQ created to purchase order confirmed.'],
    ['Supplier concentration', 'categories where one supplier holds more than 80% of spend are flagged.'],
    ['Procurement health score', 'one number covering competitive bidding rate, savings rate, speed, and supplier diversity.'],
    ['Award optimizer', 'ranks split-award options across suppliers when the package is too large for a single source.'],
];

const governanceItems = [
    ['Access', 'Role-based access for procurement, commercial, project, finance, and supplier teams.'],
    ['Documents', 'Document history for drawings, specifications, contracts, certificates, and PO changes.'],
    ['Delivery', 'Delivery receipts, supplier invoices, and payment records attached to each purchase order.'],
    ['Reporting', 'Exportable summaries for client reports, board packs, and audit reviews.'],
    ['Integrations', 'ERP integrations: SAP Ariba, Zoho, QuickBooks, Odoo, and a generic API path for teams with custom finance systems.'],
];

/* ── Abstract product visuals (divs only, no images) ── */

function PackageCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="border border-subtle bg-white p-6"
            aria-label="Example procurement package"
        >
            <div className="flex items-baseline justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Package</p>
                <p className="text-lg font-normal text-primary">Facade works</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden bg-subtle">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '62%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                    className="h-full bg-accent"
                />
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-4">
                {[
                    { label: 'Suppliers invited', value: '8' },
                    { label: 'Bids received', value: '5' },
                    { label: 'Clarifications', value: '12' },
                ].map((item) => (
                    <div key={item.label}>
                        <dd className="text-3xl font-light leading-none text-primary">{item.value}</dd>
                        <dt className="mt-2 text-xs leading-snug text-muted">{item.label}</dt>
                    </div>
                ))}
            </dl>
            <div className="mt-6 flex items-center gap-2 bg-layer px-4 py-3 text-sm text-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                Shortlist ready for commercial review
            </div>
        </motion.div>
    );
}

function SkeletonBar({ w }: { w: string }) {
    return <div className={`h-2 bg-subtle ${w}`} aria-hidden="true" />;
}

function RfqBuilderVisual() {
    const rows = [
        { name: 'w-36', qty: '240', unit: 'm²' },
        { name: 'w-28', qty: '86', unit: 'nr' },
        { name: 'w-32', qty: '1,120', unit: 'lm' },
    ];
    return (
        <div className="border border-subtle bg-white p-6">
            <div className="flex items-center justify-between border-b border-subtle pb-4">
                <div className="space-y-2">
                    <SkeletonBar w="w-32" />
                    <SkeletonBar w="w-20" />
                </div>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs font-semibold text-accent">RFQ</span>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-6 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                <span>Line item</span>
                <span className="text-right">Qty</span>
                <span className="w-8 text-right">Unit</span>
            </div>
            <div className="mt-2 divide-y divide-subtle">
                {rows.map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 py-3.5">
                        <SkeletonBar w={row.name} />
                        <span className="text-right text-sm tabular-nums text-muted">{row.qty}</span>
                        <span className="w-8 text-right text-sm text-muted">{row.unit}</span>
                    </div>
                ))}
            </div>
            <div className="mt-3 flex gap-2">
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">Drawings</span>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">Dates</span>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">Bidding rules</span>
            </div>
        </div>
    );
}

function BidRoomVisual() {
    const bids = [
        { name: 'Supplier A', status: 'Bid received', tone: 'green' },
        { name: 'Supplier B', status: 'Clarification', tone: 'accent' },
        { name: 'Supplier C', status: 'Bid received', tone: 'green' },
    ];
    return (
        <div className="border border-subtle bg-white p-6">
            <div className="divide-y divide-subtle">
                {bids.map((bid) => (
                    <div key={bid.name} className="flex items-center justify-between gap-4 py-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center bg-layer text-xs font-semibold text-muted">
                                {bid.name.slice(-1)}
                            </span>
                            <div className="space-y-1.5">
                                <p className="text-sm font-medium text-primary">{bid.name}</p>
                                <SkeletonBar w="w-24" />
                            </div>
                        </div>
                        <span
                            className={`border border-subtle bg-layer px-3 py-1 text-xs font-semibold ${
                                bid.tone === 'green' ? 'text-secondary' : 'text-accent'
                            }`}
                        >
                            {bid.status}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-2 bg-layer px-4 py-3">
                <div className="space-y-2">
                    <SkeletonBar w="w-full" />
                    <SkeletonBar w="w-2/3" />
                </div>
            </div>
        </div>
    );
}

function AwardRecordVisual() {
    const steps = [
        { label: 'Shortlist', done: true },
        { label: 'Scoring notes', done: true },
        { label: 'Approval', done: true },
        { label: 'Purchase order', done: false },
    ];
    return (
        <div className="border border-subtle bg-white p-6">
            <div className="relative pl-2">
                <div className="absolute bottom-4 left-[19px] top-4 w-px bg-subtle" aria-hidden="true" />
                {steps.map((step) => (
                    <div key={step.label} className="relative flex items-center gap-4 py-3">
                        <span
                            className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center border ${
                                step.done ? 'border-secondary/30 bg-secondary/10 text-secondary' : 'border-accent/40 bg-white text-accent'
                            }`}
                        >
                            {step.done ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                                </svg>
                            ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                            )}
                        </span>
                        <div className="flex flex-1 items-center justify-between gap-4">
                            <p className="text-sm font-medium text-primary">{step.label}</p>
                            <SkeletonBar w="w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SustainabilityVisual() {
    const rows = [
        { name: 'Supplier A', pct: 78 },
        { name: 'Supplier B', pct: 52 },
        { name: 'Supplier C', pct: 64 },
    ];
    return (
        <div className="border border-subtle bg-white p-6">
            <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Carbon estimate per bid</p>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs font-semibold text-secondary">Emissions-weighted</span>
            </div>
            <div className="mt-5 space-y-4">
                {rows.map((row) => (
                    <div key={row.name} className="grid grid-cols-[88px_1fr] items-center gap-4">
                        <span className="text-xs text-muted">{row.name}</span>
                        <div className="h-2 bg-subtle">
                            <div style={{ width: `${row.pct}%` }} className="h-full bg-accent" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex gap-2 border-t border-subtle pt-4">
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">Certifications</span>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">CSRD data</span>
                <span className="border border-subtle bg-layer px-3 py-1 text-xs text-muted">Compliance</span>
            </div>
        </div>
    );
}

const toolVisuals = [RfqBuilderVisual, BidRoomVisual, AwardRecordVisual, TCOVisual, SustainabilityVisual];

function HealthScorePanel() {
    const bars = [
        { label: 'Competitive bidding', score: 80 },
        { label: 'Savings vs budget', score: 68 },
        { label: 'Procurement speed', score: 72 },
        { label: 'Supplier diversity', score: 76 },
    ];
    return (
        <div className="border border-subtle bg-white p-8" aria-label="Procurement health score">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Health score</p>
            <div className="mt-4 flex items-baseline gap-3">
                <span className="text-6xl font-light leading-none text-primary">74</span>
                <span className="text-sm text-muted">out of 100</span>
            </div>
            <div className="mt-8 space-y-5">
                {bars.map((bar, i) => (
                    <div key={bar.label}>
                        <div className="mb-1.5 flex items-baseline justify-between">
                            <span className="text-xs text-muted">{bar.label}</span>
                            <span className="text-xs font-semibold tabular-nums text-primary">{bar.score}</span>
                        </div>
                        <div className="h-2 bg-subtle">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${bar.score}%` }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                                className="h-full bg-accent"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Platform() {
    usePageMeta(
        'Platform',
        'One shared record for RFQs, bids, TCO comparison, approvals, and purchase orders, with spend analytics and governance built in.'
    );
    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Platform"
                title="The procurement workspace your project can live in."
                subtitle="Procurement decisions break when cost, risk, and compliance live in separate places. Metics keeps every RFQ, bid, approval, and purchase order in one shared record so the decision is visible when you need it."
            >
                <div className="mt-8 flex flex-wrap gap-1">
                    <Link to="/contact" className="btn-primary">
                        Book a walkthrough
                        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                            <path d="M11.8 4.4 17.4 10l-5.6 5.6M17.4 10H2.6" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </Link>
                    <Link to="/pricing" className="btn-tertiary">
                        See pricing
                    </Link>
                </div>
            </PageHero>

            {/* Workflow proof points + package card */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="01. The workflow" />
                    <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7" aria-label="Platform workflow">
                            {proofPoints.map((item, i) => (
                                <article
                                    key={item.title}
                                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-subtle py-7 first:border-t md:grid-cols-[5rem_1fr] md:gap-8"
                                >
                                    <span className="font-mono text-2xl tabular-nums leading-none text-strong md:text-3xl">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h2 className="text-xl font-normal text-primary md:text-2xl">{item.title}</h2>
                                        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">{item.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:mt-10">
                            <PackageCard />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats strip — hairline rules, no cards */}
            <section className="bg-paper">
                <div className="site-wrap py-16 md:py-20">
                    <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                        {platformStats.map((stat) => (
                            <div key={stat.value} className="border-t border-strong pt-6">
                                <span className="text-5xl font-light leading-none text-primary md:text-6xl">{stat.value}</span>
                                <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Procurement flow — set as a hairline table row, magazine style */}
            <section className="border-y border-subtle bg-white">
                <div className="site-wrap py-16 md:py-20">
                    <RuleLabel label="02. From RFQ to delivery" />
                    <ol className="mt-10 grid gap-y-8 sm:grid-cols-2 md:mt-12 lg:grid-cols-6 lg:gap-y-0" aria-label="Procurement workflow steps">
                        {flowSteps.map((step, i) => (
                            <li key={step.label} className="relative pr-8 lg:border-l lg:border-subtle lg:pl-6 lg:first:border-0 lg:first:pl-0">
                                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="mt-3 text-2xl font-light tracking-tight text-primary">{step.label}</p>
                                <p className="mt-1 text-sm text-muted">{step.sub}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Both sides of the tender — one ink card among white */}
            <section className="bg-paper">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="03. Both sides of the tender" />
                    <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
                        <h2 className="text-3xl font-light leading-[1.08] tracking-tight text-primary md:text-[2.75rem] lg:col-span-7">
                            Buyers and suppliers work from the same package record.
                        </h2>
                        <p className="self-end text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
                            Both sides need the process to be clear. Buyers run the tender. Suppliers price it, ask questions, and track the outcome. The same package record holds both views.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
                        <article className="flex h-full flex-col border border-subtle bg-white p-8 md:p-10">
                            <Folio label="For buyers" />
                            <h3 className="mt-3 text-2xl font-normal leading-snug tracking-tight text-primary">Run the tender without rebuilding it every week.</h3>
                            <ul className="mt-6 space-y-4">
                                {buyerSteps.map((step) => (
                                    <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                                        <CheckMark />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article className="flex h-full flex-col bg-ink p-8 text-white md:p-10">
                            <Folio label="For suppliers" light />
                            <h3 className="mt-3 text-2xl font-normal leading-snug tracking-tight text-white">Price the work clearly, then keep track of what happens.</h3>
                            <ul className="mt-6 space-y-4">
                                {supplierSteps.map((step) => (
                                    <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-[#c6c6c6]">
                                        <CheckMark className="text-accent" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            {/* Dark belief statement */}
            <section className="bg-ink">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="04. The point" light />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 md:mt-16"
                    >
                        <p className="max-w-4xl text-3xl font-light leading-[1.12] tracking-tight text-white md:text-5xl">
                            You make better procurement decisions when you can see risk, cost, and compliance in the same place.
                        </p>
                        <div className="mt-10 flex items-center gap-5">
                            <span className="h-px w-12 bg-accent" aria-hidden="true" />
                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#c6c6c6]">That sits on top of the workflow.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Built-in tools */}
            <section className="bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="05. Built-in tools" />
                    <h2 className="mt-12 max-w-3xl text-3xl font-light leading-[1.1] tracking-tight text-primary md:mt-16 md:text-[2.75rem]">
                        RFQ builder, bid room, award record, TCO, and carbon data. That is the product.
                    </h2>

                    <div className="mt-16 space-y-24 md:space-y-32">
                        {toolSections.map((tool, index) => {
                            const Visual = toolVisuals[index];
                            const flipped = index % 2 === 1;
                            return (
                                <div key={tool.heading} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
                                    <div className={flipped ? 'lg:order-2 lg:col-span-6 lg:col-start-7 lg:pl-16' : 'lg:col-span-6 lg:pr-16'}>
                                        <div className="flex items-baseline gap-4">
                                            <span className="font-mono text-5xl leading-none text-subtle">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">{tool.kicker}</span>
                                        </div>
                                        <h3 className="mt-5 text-2xl font-normal leading-snug tracking-tight text-primary md:text-3xl">{tool.heading}</h3>
                                        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{tool.body}</p>
                                    </div>
                                    <div className={flipped ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5 lg:col-start-8'}>
                                        <Visual />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Spend analytics */}
            <section className="bg-paper">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="06. Spend analytics" />
                    <motion.blockquote
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 max-w-3xl md:mt-16"
                    >
                        <p className="text-2xl font-light leading-[1.3] text-primary md:text-4xl">
                            A procurement health score of 60 means something specific is wrong. Slow cycles, sole-source categories, awards above budget. Metics tells you which one.
                        </p>
                    </motion.blockquote>

                    <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-16 md:mt-24">
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Numbers that matter once the tenders are running.
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg text-muted">
                                Metics tracks actual PO spend against the target prices you set at RFQ stage. The picture covers every package in a project: what was budgeted, what was awarded, how long each cycle took, and where supplier concentration creates risk.
                            </p>
                            {/* Hairline table, not a card list */}
                            <dl className="mt-10 border-t border-strong">
                                {analyticsItems.map(([term, def]) => (
                                    <div key={term} className="grid gap-1 border-b border-subtle py-5 sm:grid-cols-[220px_1fr] sm:gap-8">
                                        <dt className="text-sm font-semibold text-primary">{term}</dt>
                                        <dd className="text-[15px] leading-relaxed text-muted">{def}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="lg:col-span-5 lg:sticky lg:top-28">
                            <HealthScorePanel />
                        </div>
                    </div>
                </div>
            </section>

            {/* Governance */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="07. Control" />
                    <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Enough control for a serious project, without making people work around the system.
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg text-muted">
                                Metics is built for teams that need decisions to move quickly and still be defensible later. The record keeps itself.
                            </p>
                        </div>
                        <dl className="border-t border-strong lg:col-span-6 lg:col-start-7">
                            {governanceItems.map(([term, def]) => (
                                <div key={term} className="grid gap-1 border-b border-subtle py-5 sm:grid-cols-[140px_1fr] sm:gap-8">
                                    <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted sm:pt-1">{term}</dt>
                                    <dd className="text-[15px] leading-relaxed text-muted">{def}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
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
