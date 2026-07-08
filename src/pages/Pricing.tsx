import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        note: 'For trying structured RFQs on a small number of packages.',
        cta: 'Start free',
        features: ['5 active RFQs', 'Basic bid comparison', 'PDF purchase orders', 'One team member', 'Standard templates']
    },
    {
        name: 'Professional',
        price: 'EUR 49',
        period: 'per user / month',
        note: 'For teams running procurement across live projects.',
        cta: 'Book a trial',
        featured: true,
        features: ['Unlimited RFQs', 'Weighted bid scoring', 'Partial bids and split awards', 'Supplier management', 'Audit trail exports', 'CSV imports']
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        note: 'For larger teams with security, integration, and governance needs.',
        cta: 'Contact sales',
        features: ['SSO and SAML', 'Custom API integrations', 'ERP-ready exports', 'Dedicated onboarding', 'EU data residency', 'Advanced roles']
    }
];

const faqs = [
    ['Do suppliers pay?', 'No. Suppliers can register, receive RFQs, submit bids, and respond to clarifications without paying. Buyers get better bid coverage when suppliers are not blocked by a fee.'],
    ['Can we start with one project?', 'Yes. Most teams start with one active project or one category of packages, then expand once the workflow is familiar.'],
    ['Do you support annual contracts?', 'Yes. Professional and Enterprise plans can be billed annually. Enterprise agreements can include custom onboarding, support terms, and integration work.'],
    ['Can we import existing spreadsheets?', 'Yes. Teams can import supplier lists, BOQs, RFQs, and package data through CSV. API paths are available for Enterprise implementations.'],
    ['What happens after the trial?', 'You can continue on Professional, move to Starter, or pause. Existing records remain available according to your plan terms.'],
    ['Is the platform secure enough for enterprise use?', 'Metics supports role-based access, audit trails, EU data residency options, and enterprise authentication paths such as SSO and SAML.']
];

const pricingNotes = [
    ['No per-RFQ fee', 'Run more packages without paying for every tender you issue.'],
    ['Suppliers stay free', 'Removing supplier fees keeps participation high.'],
    ['Start small', 'A team can test Metics on one project before rolling it out more widely.']
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l5.25 5.25 9.75-11.25" />
        </svg>
    );
}

export default function Pricing() {
    usePageMeta(
        'Pricing',
        'Metics pricing: free Starter plan, Professional at EUR 49 per user per month, and custom Enterprise plans. Suppliers are always free.'
    );
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Pricing"
                title="Pricing that matches how procurement teams roll out software."
                subtitle="Start with a small team, prove the workflow, then scale across projects. Suppliers are free, because bid coverage matters more than charging both sides."
            />

            <section className="border-t border-black/[0.08] py-16 md:py-24">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="01 — Plans" />
                    <div className="mt-12 grid items-stretch gap-6 md:mt-16 lg:grid-cols-3 lg:gap-8">
                        {plans.map((plan) => (
                            <article
                                key={plan.name}
                                className={`relative flex h-full flex-col rounded-2xl p-8 md:p-10 ${
                                    plan.featured
                                        ? 'bg-ink text-white'
                                        : 'border border-black/[0.08] bg-white text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:translate-y-8'
                                }`}
                            >
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${plan.featured ? 'text-white/50' : 'text-primary/50'}`}>{plan.name}</p>
                                    {plan.featured && (
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                                            Recommended
                                        </span>
                                    )}
                                </div>
                                <div className="mt-6 flex items-baseline gap-2">
                                    <strong className={`font-serif text-5xl font-medium leading-none tracking-tight md:text-6xl ${plan.featured ? 'text-white' : 'text-primary'}`}>{plan.price}</strong>
                                    {plan.period && <span className={`text-sm ${plan.featured ? 'text-white/50' : 'text-primary/50'}`}>{plan.period}</span>}
                                </div>
                                {plan.featured && (
                                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Most teams start here</p>
                                )}
                                <p className={`mt-4 leading-relaxed ${plan.featured ? 'text-white/65' : 'text-primary/65'}`}>{plan.note}</p>
                                <ul className={`mt-8 flex-1 space-y-3 border-t pt-8 ${plan.featured ? 'border-white/10' : 'border-black/[0.08]'}`}>
                                    {plan.features.map((feature) => (
                                        <li key={feature} className={`flex items-start gap-3 text-sm ${plan.featured ? 'text-white/80' : 'text-primary/75'}`}>
                                            <CheckIcon />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/contact"
                                    className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                                        plan.featured
                                            ? 'bg-white text-ink hover:bg-accent hover:text-white'
                                            : 'border border-black/15 text-primary hover:border-primary'
                                    }`}
                                >
                                    {plan.cta}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 pt-16 md:pb-28 md:pt-20">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <div className="grid gap-10 border-t border-black/[0.15] pt-10 md:grid-cols-3 md:gap-8">
                        {pricingNotes.map(([title, body], i) => (
                            <div key={title} className="md:pr-8">
                                <Folio label={String(i + 1).padStart(2, '0')} />
                                <h3 className="mt-4 font-serif text-xl tracking-tight text-primary">{title}</h3>
                                <p className="mt-2 leading-relaxed text-primary/65">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <RuleLabel label="02 — Questions" />
                    <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
                        <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem] lg:col-span-4">
                            Clear answers before you book a call.
                        </h2>
                        <div className="lg:col-span-7 lg:col-start-6">
                            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
                                {faqs.map(([question, answer], index) => {
                                    const open = index === openFaq;
                                    return (
                                        <div key={question} className="py-2">
                                            <button
                                                onClick={() => setOpenFaq(open ? -1 : index)}
                                                aria-expanded={open}
                                                className="flex w-full items-center justify-between gap-6 py-4 text-left"
                                            >
                                                <span className={`text-base font-semibold transition-colors md:text-lg ${open ? 'text-accent' : 'text-primary'}`}>
                                                    {question}
                                                </span>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={1.5}
                                                    aria-hidden="true"
                                                    className={`h-5 w-5 shrink-0 text-primary/50 transition-transform duration-300 ${open ? 'rotate-45 text-accent' : ''}`}
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
                                                        <p className="max-w-3xl pb-5 leading-relaxed text-primary/65">{answer}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-8 text-[15px] text-primary/55">
                                More questions about RFQs, suppliers, or integrations?{' '}
                                <Link
                                    to="/faq"
                                    className="font-semibold text-primary underline decoration-black/20 underline-offset-4 transition-colors hover:text-accent"
                                >
                                    Browse the full FAQ
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <CTABanner
                heading="Need to price a wider rollout?"
                body="Tell us how many teams and projects are involved. We will put together a plan that fits how your procurement actually runs."
                primaryLabel="Contact Sales"
                primaryTo="/contact"
            />
        </div>
    );
}
