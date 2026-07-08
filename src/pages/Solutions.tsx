import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { AnalyticsVisual } from '../components/graphics';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const roles = [
    {
        title: 'General contractors',
        problem: 'Tender packages move through email, Excel, shared folders, and phone calls. By the time a delay is visible, the team is already reacting.',
        fit: 'Each package gets one record. The RFQ, supplier list, bids, clarifications, approvals, and PO all live together. Status is always current.',
        result: 'Most GCs see award cycles shorten within the first two or three packages.',
    },
    {
        title: 'QS and commercial teams',
        problem: 'Too much time goes into cleaning bid sheets before anyone can judge the commercial position.',
        fit: "Supplier responses arrive in a consistent structure. TCO analysis adjusts each bid for Incoterms logistics, lead time, and the supplier's delivery history, so the comparison reflects total cost rather than unit price alone.",
        result: 'The commercial review starts before someone has to clean the data.',
    },
    {
        title: 'Developers and owners',
        problem: 'You carry the budget risk, but procurement detail often arrives late and out of context.',
        fit: 'Package status, bid comparisons, and approval history are live. A spend analytics view tracks actual awards against budget, cycle time, and supplier concentration across all active projects.',
        result: 'You can ask harder questions earlier, before a decision locks in.',
    },
    {
        title: 'Suppliers',
        problem: 'Unclear RFQs, document resubmissions, no word on whether a bid was even reviewed. Good suppliers waste hours on this.',
        fit: 'RFQs come with scope, line items, and dates. Bid status updates when it changes. Clarification threads stay attached to the package.',
        result: 'Less back-and-forth before pricing starts.',
    },
];

const sectors = [
    {
        title: 'Construction and infrastructure',
        body: 'Packages, BOQs, Incoterms, long-lead equipment, phased delivery, and specialist trades.',
    },
    {
        title: 'Manufacturing',
        body: 'Component sourcing, supplier concentration monitoring, MRO spend, and supplier quality scoring.',
    },
    {
        title: 'Energy and utilities',
        body: 'Complex technical approvals, international supply chains, carbon tracking, and CSRD reporting.',
    },
    {
        title: 'Government and public sector',
        body: 'Audit trail, multi-step approval workflows, transparent award records, and spend reporting.',
    },
];

const outcomes = [
    {
        title: 'Comparisons happen faster',
        body: 'Bids land in a shared format. The team reads them in the same place without rebuilding the tender first.',
    },
    {
        title: 'Approvals stay attached',
        body: 'The recommendation, comments, and sign-off sit on the package. No separate email thread to find six months later.',
    },
    {
        title: 'Response rates improve',
        body: 'When suppliers get a clear scope, real line items, and a fixed closing date, more of them bid properly.',
    },
    {
        title: 'Records that hold up',
        body: 'Documents, decisions, revisions, and purchase orders stay together. If someone asks about an award later, the answer is there.',
    },
    {
        title: 'Spend picture stays current',
        body: 'Actual PO values track against the target prices set at RFQ stage. Savings, cycle time, and supplier concentration are visible without a separate report.',
    },
];

export default function Solutions() {
    usePageMeta(
        'Solutions',
        'How general contractors, QS and commercial teams, developers, and suppliers each work from one shared procurement record in Metics.'
    );
    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Solutions"
                title="Procurement looks different depending on who you ask."
                subtitle="Most tools manage the process. Metics helps you make the call. Each team sees the TCO analysis, risk scores, and approval record they need without losing the full picture."
            >
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
                    >
                        Talk through your workflow
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
                    >
                        See the platform
                    </Link>
                </div>
            </PageHero>

            {/* By role — full-width editorial entries, not cards */}
            <section className="border-t border-black/[0.08] bg-white">
                <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
                    <RuleLabel label="01 — By role" />
                    <h2 className="mt-12 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-primary md:mt-16 md:text-[2.75rem]">
                        Different pressures. One procurement record.
                    </h2>

                    <div className="mt-14 border-t border-black/[0.08]">
                        {roles.map((role, index) => (
                            <article
                                key={role.title}
                                className="grid gap-6 border-b border-black/[0.08] py-12 md:py-16 lg:grid-cols-12 lg:gap-10"
                            >
                                <div className="lg:col-span-4">
                                    <span className="font-serif text-4xl leading-none text-black/[0.08] md:text-5xl">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-4 font-serif text-2xl leading-snug tracking-tight text-primary md:text-3xl">{role.title}</h3>
                                    <p className="mt-5 font-serif text-lg italic leading-relaxed text-primary/60">{role.problem}</p>
                                </div>
                                <div className="lg:col-span-7 lg:col-start-6">
                                    <Folio label="What changes" />
                                    <p className="mt-4 text-lg leading-relaxed text-primary/70">{role.fit}</p>
                                    <p className="mt-8 border-l-2 border-accent pl-5 text-[15px] font-semibold leading-relaxed text-primary">
                                        {role.result}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spend picture */}
            <section className="bg-paper">
                <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <Folio label="02 — The spend picture" className="mb-5" />
                            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Every role reads the same live numbers.
                            </h2>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary/65">
                                Actual PO values track against the target prices set at RFQ stage. Savings, cycle time, and
                                supplier concentration stay visible across every active project — without anyone assembling a
                                report first. Commercial teams analyse it, project teams act on it, and owners hold budgets
                                against it.
                            </p>
                        </div>
                        <div className="lg:col-span-6 lg:col-start-7 xl:-mr-12">
                            <AnalyticsVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark statement */}
            <section className="bg-[#141414]">
                <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
                    <RuleLabel label="03 — A position" light />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 max-w-4xl font-serif text-3xl leading-[1.15] tracking-tight text-white md:mt-16 md:text-5xl"
                    >
                        The best procurement process is boring in the right places: clear scope, comparable bids, visible decisions, and a record nobody has to reconstruct later.
                    </motion.p>
                </div>
            </section>

            {/* By sector — hairline columns, no cards */}
            <section className="bg-paper">
                <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
                    <RuleLabel label="04 — By sector" />
                    <h2 className="mt-12 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                        Across every sector that buys at scale.
                    </h2>

                    <div className="mt-14 grid gap-y-10 border-t border-black/[0.15] pt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {sectors.map((item, i) => (
                            <div key={item.title} className="pr-8 lg:border-l lg:border-black/[0.08] lg:pl-8 lg:first:border-0 lg:first:pl-0">
                                <Folio label={String(i + 1).padStart(2, '0')} />
                                <h3 className="mt-4 font-serif text-xl leading-snug text-primary">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-primary/65">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What changes — ragged two-column list */}
            <section className="border-t border-black/[0.08] bg-white">
                <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
                    <RuleLabel label="05 — What changes" />
                    <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
                        <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem] lg:col-span-4">
                            The work gets easier to follow.
                        </h2>
                        <div className="grid gap-x-16 gap-y-0 sm:grid-cols-2 lg:col-span-8">
                            {outcomes.map((item, i) => (
                                <article
                                    key={item.title}
                                    className={`border-t border-black/[0.12] py-8 ${i % 2 === 1 ? 'sm:translate-y-12' : ''}`}
                                >
                                    <h3 className="font-serif text-xl text-primary">{item.title}</h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-primary/65">{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
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
