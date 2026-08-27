import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const beliefs = [
    {
        title: 'Calm decisions',
        body: 'Procurement should not run on urgency and half-remembered email threads. When the record is complete and current, the decision can be made without drama.',
    },
    {
        title: 'Auditable by default',
        body: 'The reason a supplier won should not need reconstructing six months later. Every clarification, revision, approval, and award stays attached to the package it belongs to.',
    },
    {
        title: 'Data over instinct',
        body: 'The lowest unit price is not always the lowest cost. Total cost of ownership, supplier concentration, and cycle time belong in the decision, not in a report written afterwards.',
    },
];

const workPrinciples = [
    {
        title: 'We start with one package',
        body: 'Teams do not adopt Metics through a big-bang rollout. They bring one real tender, run it end to end, and expand when the workflow has proven itself.',
    },
    {
        title: 'We keep suppliers free',
        body: 'Charging suppliers to bid reduces bid coverage, and bid coverage is what makes a comparison meaningful. Suppliers register, receive RFQs, and respond at no cost.',
    },
    {
        title: 'We build for the record',
        body: 'Features earn their place by making the shared record more complete or easier to act on. Anything that fragments the record into side channels does not ship.',
    },
    {
        title: 'We stay close to site reality',
        body: 'Construction procurement is BOQs, partial bids, split awards, and revised drawings. The product follows how projects actually buy, not an idealised workflow.',
    },
];

export default function About() {
    usePageMeta(
        'About',
        'Why Metics exists: procurement decisions made with partial information cost construction projects millions. Metics puts the whole record in one place.'
    );

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="About"
                title="Procurement decisions deserve the whole record."
                subtitle="Metics is a procurement platform for construction. Buying with partial information costs projects millions. The gap is usually the record: spreadsheet, email, phone, inbox. We put the RFQ, the bids, the approval, and the PO in one place."
            />

            {/* Why Metics exists */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="Why we exist" />
                    <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
                        <h2 className="text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem] lg:col-span-5">
                            Awards go wrong when the person deciding never sees the full picture.
                        </h2>
                        <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
                            <p>
                                On most projects, the tender lives in a spreadsheet, the bids arrive by email, the clarifications
                                happen on the phone, and the approval sits in someone&rsquo;s inbox. Each piece is fine on its own.
                                Together, they mean the person making the award never sees the full picture at the moment it matters.
                            </p>
                            <p>
                                That gap is where the real cost hides: awards that ignored delivery risk, suppliers carrying too much
                                of one category, budgets that drifted between the RFQ and the purchase order. None of it is visible
                                until it has already happened.
                            </p>
                            <p>
                                Metics was built to close that gap. Every RFQ, bid, clarification, approval, and purchase order lives
                                in one shared record, so the decision is made with everything on the table, and the reasoning is
                                still there when someone asks about it later.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What we believe — hairline columns */}
            <section className="bg-paper">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="What we believe" />
                    <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
                        <h2 className="text-3xl leading-[1.08] tracking-tight text-primary md:text-[2.75rem] lg:col-span-7">
                            Good procurement is boring in the right places.
                        </h2>
                        <p className="self-end text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
                            Clear scope, comparable bids, visible decisions, and a record nobody has to reconstruct. These three points shape what we ship.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-3">
                        {beliefs.map((belief) => (
                            <article
                                key={belief.title}
                                className="border-t border-subtle pt-6"
                            >
                                <h3 className="text-2xl leading-snug tracking-tight text-primary">{belief.title}</h3>
                                <p className="mt-4 text-[15px] leading-relaxed text-muted">{belief.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dark statement */}
            <section className="bg-ink">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="The measure" light />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 md:mt-16"
                    >
                        <p className="max-w-4xl text-3xl font-light leading-[1.15] tracking-tight text-white md:text-5xl">
                            We measure the product by one question: when the award is challenged, does the record answer for itself?
                        </p>
                        <div className="mt-10 flex items-center gap-5">
                            <span className="h-px w-12 bg-accent" aria-hidden="true" />
                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#c6c6c6]">If the answer is yes, the software did its job.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How we work — numbered hairline rows */}
            <section className="bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="How we work" />
                    <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
                        <h2 className="text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem] lg:col-span-4">
                            A small set of rules we hold ourselves to.
                        </h2>
                        <div className="border-t border-subtle lg:col-span-7 lg:col-start-6">
                            {workPrinciples.map((item) => (
                                <article
                                    key={item.title}
                                    className="border-b border-subtle py-7"
                                >
                                    <h3 className="text-xl text-primary md:text-2xl">{item.title}</h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who we build for */}
            <section className="border-t border-subtle bg-paper">
                <div className="site-wrap py-16 md:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-6">
                            <Folio label="Who we build for" className="mb-5" />
                            <h2 className="text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Both sides of the tender, one shared record.
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-muted">
                                General contractors, QS and commercial teams, developers and owners run the buying side. Suppliers
                                price the work and track the outcome. Metics is built so both sides work from the same package
                                record. The platform is GDPR compliant, hosted with EU data residency, and free for suppliers.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link to="/solutions" className="btn-primary">
                                    Explore solutions by role
                                </Link>
                                <Link to="/security" className="btn-tertiary">
                                    Security &amp; trust
                                </Link>
                            </div>
                        </div>
                        <dl className="border-t border-subtle lg:col-span-5 lg:col-start-8">
                            {[
                                ['General contractors', 'One record per package, from RFQ to purchase order.'],
                                ['QS & commercial teams', 'Bids arrive comparable; analysis starts the day they close.'],
                                ['Developers & owners', 'Live status and spend picture without chasing reports.'],
                                ['Suppliers', 'Clear RFQs, live bid status, no platform fees.'],
                            ].map(([who, what]) => (
                                <div
                                    key={who}
                                    className="grid gap-1 border-b border-subtle py-5 sm:grid-cols-[180px_1fr] sm:gap-6"
                                >
                                    <dt className="text-sm font-semibold text-primary">{who}</dt>
                                    <dd className="text-sm leading-relaxed text-muted">{what}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <CTABanner
                heading="See what a complete record changes"
                body="Bring one live tender package to a walkthrough. We will show you how the RFQ, bids, approvals, and PO sit together in Metics."
                primaryLabel="Book a Demo"
                primaryTo="/contact"
                secondaryLabel="View Pricing"
                secondaryTo="/pricing"
            />
        </div>
    );
}
