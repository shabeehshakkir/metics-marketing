import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, Folio, PageHero } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FaqEntry = { q: string; a: string };
type FaqGroup = { category: string; description: string; entries: FaqEntry[] };

const FAQ_GROUPS: FaqGroup[] = [
    {
        category: 'RFQs & bidding',
        description: 'How tenders are structured, shared, and kept fair.',
        entries: [
            {
                q: 'Can suppliers bid partially?',
                a: 'Yes. Buyers can enable partial bidding; suppliers then quote partial quantities. Buyers can also make partial awards across suppliers.',
            },
            {
                q: 'Can I restrict an RFQ to selected suppliers?',
                a: 'Yes. Choose Closed (selected or authorized suppliers only) or Open (all suppliers in the category).',
            },
            {
                q: 'Can I edit an RFQ after publishing?',
                a: 'Before the deadline: yes, with notifications sent to participants. Critical fields may lock after bids arrive to keep the process fair.',
            },
        ],
    },
    {
        category: 'Suppliers & communication',
        description: 'How suppliers find work and how both sides stay in sync.',
        entries: [
            {
                q: 'How do suppliers get RFQs?',
                a: 'By category matching. Once a supplier sets their company and product categories, they automatically receive RFQs that match the work they do.',
            },
            {
                q: 'Is there in-platform communication?',
                a: 'Yes. Each RFQ has real-time chat, plus notifications and an updates feed, so clarifications stay attached to the package instead of scattering across email.',
            },
            {
                q: 'Do suppliers pay?',
                a: 'No. Suppliers can register, receive RFQs, submit bids, and respond to clarifications without paying. Buyers get better bid coverage when suppliers are not blocked by a fee.',
            },
        ],
    },
    {
        category: 'Orders & integrations',
        description: 'From award to purchase order, and into your existing systems.',
        entries: [
            {
                q: 'Do purchase orders generate automatically?',
                a: 'Yes. Awarding a bid auto-generates a purchase order with the agreed terms, and buyers can export it as a PDF.',
            },
            {
                q: 'Can I integrate with my ERP?',
                a: 'Yes. Import RFQs via CSV or API; mapping templates are supported. Enterprise implementations can use custom API integrations and ERP-ready exports.',
            },
            {
                q: 'Can we import existing spreadsheets?',
                a: 'Yes. Teams can import supplier lists, BOQs, RFQs, and package data through CSV. API paths are available for Enterprise implementations.',
            },
        ],
    },
    {
        category: 'Plans & rollout',
        description: 'Getting started, trials, and what enterprise teams need.',
        entries: [
            {
                q: 'Can we start with one project?',
                a: 'Yes. Most teams start with one active project or one category of packages, then expand once the workflow is familiar.',
            },
            {
                q: 'Do you support annual contracts?',
                a: 'Yes. Professional and Enterprise plans can be billed annually. Enterprise agreements can include custom onboarding, support terms, and integration work.',
            },
            {
                q: 'What happens after the trial?',
                a: 'You can continue on Professional, move to Starter, or pause. Existing records remain available according to your plan terms.',
            },
            {
                q: 'Is the platform secure enough for enterprise use?',
                a: 'Metics supports role-based access, audit trails, EU data residency options, and enterprise authentication paths such as SSO and SAML.',
            },
        ],
    },
];

const CATEGORIES = ['All', ...FAQ_GROUPS.map((group) => group.category)];

function buildJsonLd(): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_GROUPS.flatMap((group) =>
            group.entries.map((entry) => ({
                '@type': 'Question',
                name: entry.q,
                acceptedAnswer: { '@type': 'Answer', text: entry.a },
            }))
        ),
    });
}

export default function Faq() {
    usePageMeta(
        'FAQ',
        'Answers to common questions about Metics: partial bidding, closed and open RFQs, automatic purchase orders, ERP integration, supplier access, and plans.'
    );

    const [activeCategory, setActiveCategory] = useState('All');
    const [openQuestion, setOpenQuestion] = useState<string | null>(FAQ_GROUPS[0].entries[0].q);
    const jsonLd = useMemo(buildJsonLd, []);

    const visibleGroups =
        activeCategory === 'All'
            ? FAQ_GROUPS
            : FAQ_GROUPS.filter((group) => group.category === activeCategory);

    return (
        <div className="bg-paper">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            <PageHero
                eyebrow="FAQ"
                title="Clear answers, before you ask."
                subtitle="How RFQs, bids, purchase orders, and supplier access work in Metics. If your question is not here, we answer directly — no ticket queue."
            />

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    {/* Category filter — Carbon selected state */}
                    <div
                        className="mb-16 flex flex-wrap items-end border-b border-subtle"
                        role="tablist"
                        aria-label="FAQ categories"
                    >
                        <span className="mr-4 self-center font-mono text-xs uppercase tracking-[0.08em] text-muted">Browse</span>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                role="tab"
                                aria-selected={activeCategory === category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
                                    activeCategory === category
                                        ? 'border-b-2 border-accent bg-highlight text-primary'
                                        : 'text-muted hover:bg-layer hover:text-primary'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Accordion groups — category heading left, questions right */}
                    <div className="space-y-20 md:space-y-24">
                        {visibleGroups.map((group, groupIdx) => (
                            <div key={group.category} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                                <div className="lg:col-span-4">
                                    <Folio label={String(groupIdx + 1).padStart(2, '0')} className="mb-4" />
                                    <h2 className="text-2xl tracking-tight text-primary md:text-3xl">{group.category}</h2>
                                    <p className="mt-2 max-w-sm text-[15px] text-muted">{group.description}</p>
                                </div>
                                <div className="divide-y divide-subtle border-y border-subtle lg:col-span-7 lg:col-start-6">
                                    {group.entries.map((entry) => {
                                        const open = openQuestion === entry.q;
                                        return (
                                            <div key={entry.q} className="py-2">
                                                <button
                                                    onClick={() => setOpenQuestion(open ? null : entry.q)}
                                                    aria-expanded={open}
                                                    className="flex w-full items-center justify-between gap-6 py-4 text-left"
                                                >
                                                    <span
                                                        className={`text-base font-semibold transition-colors md:text-lg ${
                                                            open ? 'text-accent' : 'text-primary'
                                                        }`}
                                                    >
                                                        {entry.q}
                                                    </span>
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={1.5}
                                                        aria-hidden="true"
                                                        className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                                                            open ? 'rotate-45 text-accent' : ''
                                                        }`}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {open && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.35, ease: EASE }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="max-w-3xl pb-5 leading-relaxed text-muted">{entry.a}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still stuck */}
                    <p className="mt-20 border-t border-subtle pt-8 text-[15px] text-muted">
                        Looking for plan details? See{' '}
                        <Link to="/pricing" className="font-semibold text-primary underline decoration-subtle underline-offset-4 transition-colors hover:text-accent">
                            pricing
                        </Link>
                        , or read how we handle data on the{' '}
                        <Link to="/security" className="font-semibold text-primary underline decoration-subtle underline-offset-4 transition-colors hover:text-accent">
                            security page
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <CTABanner
                heading="Ask us the harder questions"
                body="Rollout plans, integrations, security reviews — bring whatever is on your list. We will answer with specifics, not a sales script."
                primaryLabel="Contact Us"
                primaryTo="/contact"
                secondaryLabel="View Pricing"
                secondaryTo="/pricing"
            />
        </div>
    );
}
