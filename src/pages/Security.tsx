import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { RecordTimelineVisual } from '../components/graphics';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pillars = [
    {
        title: 'EU data residency',
        body: 'Your procurement data is hosted in the European Union. It does not leave the region for processing or storage.',
    },
    {
        title: 'GDPR compliance',
        body: 'Metics is built to GDPR requirements: lawful processing, data-subject rights, and a data processing agreement for every customer.',
    },
    {
        title: 'Encryption everywhere',
        body: 'Data is encrypted in transit with TLS and encrypted at rest. Bids stay sealed between supplier and buyer until the process opens them.',
    },
    {
        title: 'Role-based access',
        body: 'Procurement, commercial, project, finance, and supplier roles each see exactly what their role requires, nothing more.',
    },
    {
        title: 'Complete audit trail',
        body: 'Every RFQ edit, clarification, bid, approval, and award is recorded with who did it and when. Audit exports are available on paid plans.',
    },
    {
        title: 'Enterprise authentication',
        body: 'Enterprise plans support SSO and SAML, so access follows your identity provider and offboarding takes effect immediately.',
    },
];

const practices = [
    'Data processing agreement (DPA) available for every customer.',
    'Your data can be exported or deleted on request, in line with GDPR data-subject rights.',
    'Access to production systems is restricted, logged, and reviewed.',
    'Suppliers only ever see the RFQs they are invited to or matched with, never other suppliers\u2019 bids during tendering.',
    'Document history is kept for drawings, specifications, contracts, certificates, and PO changes.',
];

export default function Security() {
    usePageMeta(
        'Security',
        'How Metics protects procurement data: EU data residency, GDPR compliance, encryption in transit and at rest, role-based access, and a complete audit trail.'
    );

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Security & Trust"
                title="Procurement data that can survive a review."
                subtitle="Tenders, bids, and awards are commercially sensitive by nature. Metics is built so that data stays in the EU, access follows roles, and every decision leaves a record."
            />

            {/* Trust pillars — hairline grid, no icon cards */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="Foundations" />
                    <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
                        <h2 className="text-3xl leading-[1.08] tracking-tight text-primary md:text-[2.75rem] lg:col-span-7">
                            Six things you can hold us to.
                        </h2>
                        <p className="self-end text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
                            We describe what the platform does. If something is not here, we do not claim it.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {pillars.map((pillar) => (
                            <article key={pillar.title} className="border-t border-subtle pt-6">
                                <h3 className="text-xl leading-snug tracking-tight text-primary">{pillar.title}</h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-muted">{pillar.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Audit trail — product tie-in */}
            <section className="bg-paper">
                <div className="site-wrap py-16 md:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-6">
                            <Folio label="Audit trail" className="mb-5" />
                            <h2 className="text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                The audit trail writes itself as people use the product.
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-muted">
                                Because every RFQ, clarification, bid, approval, and purchase order lives in one shared record, the
                                audit trail is not a separate module. When a client, auditor, or board asks why a supplier
                                won, the answer is already in the record, with names, timestamps, and the documents that were on
                                the table at the time.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-muted">
                                Nothing needs reconstructing, and nothing depends on someone&rsquo;s inbox surviving the project.
                            </p>
                        </div>
                        <div className="lg:col-span-5 lg:col-start-8">
                            <RecordTimelineVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* Data practices */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="Data practices" />
                    <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                Straight answers for your security review.
                            </h2>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                                If your review needs more detail (data flows, sub-processors, retention terms), ask us directly and
                                we will walk your team through it.
                            </p>
                            <Link to="/contact" className="btn-primary mt-8">
                                Talk to us about security
                            </Link>
                        </div>
                        <ul className="border-t border-subtle lg:col-span-6 lg:col-start-7">
                            {practices.map((item) => (
                                <li key={item} className="flex gap-4 border-b border-subtle py-5">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mt-1 h-4 w-4 shrink-0 text-secondary"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                    </svg>
                                    <p className="text-[15px] leading-relaxed text-muted">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Dark statement */}
            <section className="bg-ink">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="On trust" light />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 md:mt-16"
                    >
                        <p className="max-w-4xl text-3xl font-light leading-[1.15] tracking-tight text-white md:text-5xl">
                            Trust in a procurement platform is earned by keeping the record straight. That is the same bar as a
                            procurement process.
                        </p>
                        <div className="mt-10 flex items-center gap-5">
                            <span className="h-px w-12 bg-accent" aria-hidden="true" />
                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#c6c6c6]">
                                Read our{' '}
                                <Link to="/privacy" className="text-[#c6c6c6] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
                                    privacy policy
                                </Link>{' '}
                                for the full detail.
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <CTABanner
                heading="Bring your security checklist"
                body="We will go through it line by line: data residency, access controls, audit exports, and the DPA, with the people who built the platform."
                primaryLabel="Book a Security Review"
                primaryTo="/contact"
                secondaryLabel="Read the FAQ"
                secondaryTo="/faq"
            />
        </div>
    );
}
