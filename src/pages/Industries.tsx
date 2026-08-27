import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const industries: {
    id: string;
    label: string;
    heading: string;
    intro: string;
    snapshot: string[];
    problems: string[];
    capabilities: string[];
    stat: { value: string; label: string };
}[] = [
    {
        id: 'construction',
        label: 'Construction',
        heading: 'Construction and infrastructure',
        intro: 'Construction procurement runs on packages, BOQs, and specialist trades. Timelines are tight, scope changes fast, and a supplier needs a clear brief to price accurately.',
        snapshot: ['Package-based RFQs', 'BOQ line items', 'Phased delivery'],
        problems: [
            'Tender packages sent over email, tracked in separate spreadsheets per project.',
            'Bids arrive in different formats and need manual cleaning before any comparison can start.',
            'Award decisions live in emails rather than the package record.',
            "Long-lead items have no central visibility separate from a project manager's own sheet.",
        ],
        capabilities: [
            'Build RFQs from BOQs with line items, quantities, and units already in place.',
            'Supplier responses arrive in one structure: price, exclusions, alternates, and delivery dates side by side.',
            'TCO adjustment covers Incoterms logistics and delivery lead time against the project program.',
            'The award record stays on the package: shortlist, scoring notes, approval, and PO in the same place.',
        ],
        stat: { value: '40+', label: 'packages running across concurrent projects in a single system' },
    },
    {
        id: 'manufacturing',
        label: 'Manufacturing',
        heading: 'Manufacturing',
        intro: 'Manufacturing procurement covers component sourcing, indirect spend, and MRO. Supplier quality and delivery reliability matter as much as unit price.',
        snapshot: ['Component sourcing', 'MRO spend', 'Supplier quality scoring'],
        problems: [
            'Supplier qualification data lives in a separate system from the RFQ and bid comparison.',
            'Category concentration is not visible until a sole-source supplier misses a critical delivery.',
            'Savings are measured against target prices set months before the tender went out.',
            'Invoice matching against delivery receipts happens outside procurement.',
        ],
        capabilities: [
            'Supplier profiles carry qualification status, certificates, and performance history into every bid comparison.',
            'Concentration flags appear before an award is made, so the team can act before a delivery fails.',
            'Spend analytics tracks actual PO values against the target prices set at RFQ stage, per category.',
            'Delivery receipts and invoices attach to the purchase order in the same package record.',
        ],
        stat: { value: 'Real-time', label: 'supplier concentration visibility across every active category' },
    },
    {
        id: 'energy',
        label: 'Energy',
        heading: 'Energy and utilities',
        intro: 'Energy procurement involves complex technical approvals, international supply chains, and growing pressure to track carbon and supplier compliance.',
        snapshot: ['Multi-step approvals', 'Carbon tracking', 'CSRD ready'],
        problems: [
            'Multi-step approval workflows have no shared visibility across commercial and technical teams.',
            'Carbon data sits outside the procurement record, making CSRD reporting a manual reconstruction.',
            'International suppliers involve Incoterms complexity that unit price comparisons do not capture.',
            'Certifications and compliance documents are stored separately from bid records.',
        ],
        capabilities: [
            'Role-based approval steps run inside the package record. Every team sees the current status.',
            'Carbon estimates attach to each bid. Awards can be weighted by emissions as well as price.',
            'TCO comparison accounts for Incoterms logistics costs and delivery lead time in the same ranking.',
            'Supplier certifications, ESG data, and CSRD compliance records live inside the procurement package.',
        ],
        stat: { value: 'CSRD', label: 'compliance data captured inside procurement, not in a separate reporting tool' },
    },
    {
        id: 'government',
        label: 'Government',
        heading: 'Government and public sector',
        intro: 'Public sector procurement requires transparent award records, multi-step approval chains, and documentation that holds up to scrutiny long after the decision was made.',
        snapshot: ['Full audit trail', 'Multi-step approvals', 'Exportable records'],
        problems: [
            'Award justifications are written after the fact rather than captured at the point of decision.',
            'Multi-step approvals are tracked through email chains with no shared view of current status.',
            'Audit requests trigger a document reconstruction effort that takes weeks of staff time.',
            'Spend reporting requires data from multiple systems that do not connect to each other.',
        ],
        capabilities: [
            'Every award captures the shortlist, scoring notes, and decision rationale in the package record.',
            'Approval workflows route through defined steps. Status is live for all teams involved.',
            'The full package record, from RFQ to PO, is exportable for audit review at any time.',
            'Spend analytics shows actual awards against budget targets without a separate reporting system.',
        ],
        stat: { value: '100%', label: 'of award decisions documented with full approval trail at the point of decision' },
    },
];

export default function Industries() {
    usePageMeta(
        'Industries',
        'Metics runs procurement for construction, manufacturing, energy, and public sector teams — structured RFQs, comparable bids, and auditable awards.'
    );
    const [activeIdx, setActiveIdx] = useState(0);
    const active = industries[activeIdx];

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Industries"
                title="Built for teams that buy at scale."
                subtitle="Procurement looks different depending on the sector. Metics adapts to the specifics without needing a custom implementation."
            >
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary">
                        Talk through your workflow
                    </Link>
                    <Link to="/platform" className="btn-tertiary">
                        See the platform
                    </Link>
                </div>
            </PageHero>

            {/* Sector selector + detail panel */}
            <section className="border-t border-subtle bg-white">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="01 — Choose a sector" />
                    <div
                        className="mt-10 flex flex-wrap border-b border-subtle"
                        role="tablist"
                        aria-label="Select an industry"
                    >
                        {industries.map((ind, i) => {
                            const isActive = activeIdx === i;
                            return (
                                <button
                                    key={ind.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveIdx(i)}
                                    className={`px-4 py-3 text-left text-sm font-semibold transition-colors duration-150 ${
                                        isActive
                                            ? 'border-b-2 border-accent bg-highlight text-primary'
                                            : 'text-muted hover:bg-layer hover:text-primary'
                                    }`}
                                >
                                    {ind.label}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="mt-14"
                        >
                            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                                <div className="lg:col-span-7">
                                    <h2 className="text-3xl leading-[1.08] tracking-tight text-primary md:text-5xl">
                                        {active.heading}
                                    </h2>
                                    <p className="mt-5 max-w-2xl text-lg text-muted">{active.intro}</p>
                                </div>
                                <div className="self-end lg:col-span-4 lg:col-start-9">
                                    <Folio label="Snapshot" />
                                    <ul className="mt-4 border-t border-subtle">
                                        {active.snapshot.map((chip) => (
                                            <li key={chip} className="border-b border-subtle py-2.5 text-sm font-medium text-muted">
                                                {chip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
                                <div className="lg:col-span-5">
                                    <Folio label="Common friction" />
                                    <ul className="mt-6 space-y-5">
                                        {active.problems.map((p) => (
                                            <li key={p} className="border-l-2 border-accent pl-4 text-lg font-light leading-relaxed text-muted">
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border border-subtle bg-ink p-8 text-white md:p-10 lg:col-span-6 lg:col-start-7">
                                    <Folio label="What Metics changes" light />
                                    <ul className="mt-6 divide-y divide-white/10">
                                        {active.capabilities.map((c) => (
                                            <li key={c} className="flex gap-3 py-4 text-[15px] leading-relaxed text-white/75">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true">
                                                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                                                </svg>
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-16 flex flex-col gap-4 border-t border-subtle pt-8 sm:flex-row sm:items-baseline sm:gap-10">
                                <span className="text-6xl font-light leading-none tracking-tight text-primary md:text-7xl">{active.stat.value}</span>
                                <span className="max-w-md text-[15px] leading-relaxed text-muted">
                                    {active.stat.label}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Dark statement */}
            <section className="bg-ink">
                <div className="site-wrap py-16 md:py-24">
                    <RuleLabel label="02 — One record" light />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 max-w-4xl text-3xl font-light leading-[1.15] tracking-tight text-white md:mt-16 md:text-5xl"
                    >
                        The RFQ, the bids, the approval, and the purchase order belong in the same place. That is true in construction, manufacturing, energy, and government alike.
                    </motion.p>
                </div>
            </section>

            <CTABanner
                heading="See how Metics fits your sector"
                body="Bring one real procurement workflow to the call. We will show where the friction is and how the record holds together."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View solutions"
                secondaryTo="/solutions"
            />
        </div>
    );
}
