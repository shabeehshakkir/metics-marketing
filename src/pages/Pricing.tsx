import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTABanner } from '../components/shared';

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

function useReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);
}

export default function Pricing() {
    const [openFaq, setOpenFaq] = useState(0);
    useReveal();

    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">Pricing</p>
                    <h1>Pricing that matches how procurement teams roll out software.</h1>
                    <p>
                        Start with a small team, prove the workflow, then scale across projects. Suppliers are free, because bid coverage matters more than charging both sides.
                    </p>
                </div>
            </section>

            <section className="editorial-pricing-section">
                <div className="editorial-pricing-grid">
                    {plans.map((plan) => (
                        <article className={`editorial-price-card reveal${plan.featured ? ' featured' : ''}`} key={plan.name}>
                            {plan.featured && <span className="editorial-plan-badge">Most teams start here</span>}
                            <h2>{plan.name}</h2>
                            <div className="editorial-price">
                                <strong>{plan.price}</strong>
                                {plan.period && <span>{plan.period}</span>}
                            </div>
                            <p>{plan.note}</p>
                            <ul>
                                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                            </ul>
                            <Link className={plan.featured ? 'platform-primary-link' : 'platform-secondary-link'} to="/contact">
                                {plan.cta}
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="editorial-grid-section compact">
                <div className="editorial-card-grid three">
                    {pricingNotes.map(([title, body]) => (
                        <article className="editorial-simple-card reveal" key={title}>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="editorial-faq-section">
                <div className="editorial-section-heading reveal">
                    <p className="platform-kicker">Questions</p>
                    <h2>Clear answers before you book a call.</h2>
                </div>
                <div className="editorial-faq-list">
                    {faqs.map(([question, answer], index) => (
                        <details
                            key={question}
                            open={index === openFaq}
                            onClick={(event) => {
                                event.preventDefault();
                                setOpenFaq(index === openFaq ? -1 : index);
                            }}
                        >
                            <summary>{question}</summary>
                            <p>{answer}</p>
                        </details>
                    ))}
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
