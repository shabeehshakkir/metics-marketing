import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, CTABanner } from '../components/shared';

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-scale');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

const Check = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        period: '',
        description: 'For small teams exploring structured procurement. No credit card required.',
        features: [
            'Up to 5 active RFQs',
            'Basic bid comparison (side-by-side)',
            'PO generation with PDF export',
            'Email notifications',
            '1 team member',
            'Community support',
            'Standard templates',
        ],
        ideal: 'Ideal for small contractors or suppliers testing the platform.',
        cta: 'Get Started Free',
        highlighted: false,
    },
    {
        name: 'Professional',
        price: '\u20AC49',
        period: '/user/month',
        description: 'For growing procurement teams that need full control and analytics.',
        features: [
            'Unlimited RFQs and packages',
            'Advanced bid scoring with weighted criteria',
            'Partial bidding and split awards',
            'Real-time in-context chat per RFQ',
            'CSV and API import for bulk operations',
            'Supplier management and catalogues',
            'Full audit trail with exportable reports',
            'Custom RFQ templates',
            'Up to 25 team members',
            'Priority email and chat support',
            'Analytics dashboard',
        ],
        ideal: 'Most popular with mid-size contractors and QS firms.',
        cta: 'Start 14-Day Free Trial',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For large organizations with complex procurement and compliance needs.',
        features: [
            'Everything in Professional',
            'Unlimited team members',
            'SSO / SAML authentication',
            'SCIM user provisioning',
            'Custom API integrations',
            'ERP-ready PO exports (SAP, Oracle)',
            'Dedicated account manager',
            'Custom onboarding and training',
            'SLA guarantees (99.9% uptime)',
            'EU data residency',
            'ISO 27001-ready compliance',
            'Advanced role-based access control',
            'Multi-project dashboards',
        ],
        ideal: 'Built for enterprise teams managing portfolios of projects.',
        cta: 'Contact Sales',
        highlighted: false,
    },
];

const faqs = [
    {
        q: 'Is there a free trial?',
        a: 'Yes. The Professional plan includes a 14-day free trial with full access to all features. No credit card required. At the end of the trial, you can choose to continue or downgrade to the free Starter plan.',
    },
    {
        q: 'Can I switch plans later?',
        a: 'Absolutely. You can upgrade or downgrade at any time from your account settings. Changes take effect at the start of your next billing cycle, and you will be credited for any unused time.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers. Enterprise clients can arrange purchase orders and annual invoicing with custom payment terms.',
    },
    {
        q: 'Do you offer discounts for annual billing?',
        a: 'Yes. Annual plans receive a 20% discount compared to monthly billing. Contact us for multi-year enterprise agreements with additional savings.',
    },
    {
        q: 'What happens when I exceed the Starter plan limits?',
        a: 'You will receive a notification when approaching limits. Your existing RFQs remain accessible. You can upgrade to Professional at any time to unlock unlimited RFQs and advanced features.',
    },
    {
        q: 'Is my data secure?',
        a: 'Yes. Metics uses AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure runs on EU-based data centers with SOC 2 Type II controls. We support SSO/SAML for enterprise authentication and are fully GDPR compliant.',
    },
    {
        q: 'Can I import my existing data?',
        a: 'Yes. Professional and Enterprise plans support CSV import for RFQs, supplier lists, and BOQs. Enterprise plans also include REST API access for automated data pipelines from your ERP or project management tools.',
    },
    {
        q: 'Do suppliers need to pay?',
        a: 'No. Suppliers can register, receive RFQ invitations, submit bids, and track status for free. This ensures maximum supplier participation and better bid coverage for buyers.',
    },
];

export default function Pricing() {
    const [openFaq, setOpenFaq] = useState<number>(0);
    useReveal();

    return (
        <>
            <PageHero
                eyebrow="Pricing"
                title="Simple, transparent pricing"
                subtitle="Start free. Scale as you grow. No hidden fees, no per-RFQ charges, no surprises. Suppliers always free."
            />

            {/* Plans */}
            <section className="pricing-section">
                <div className="pricing-grid">
                    {plans.map((plan) => (
                        <div className={`pricing-card reveal${plan.highlighted ? ' highlighted' : ''}`} key={plan.name}>
                            {plan.highlighted && <div className="pricing-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <div className="pricing-amount">
                                <span className="price">{plan.price}</span>
                                {plan.period && <span className="period">{plan.period}</span>}
                            </div>
                            <p className="pricing-desc">{plan.description}</p>
                            <ul className="pricing-features">
                                {plan.features.map((f) => (
                                    <li key={f}><Check />{f}</li>
                                ))}
                            </ul>
                            <p style={{ fontSize: '.78rem', color: 'var(--g40)', fontStyle: 'italic', marginTop: '-8px' }}>{plan.ideal}</p>
                            <Link
                                className={plan.highlighted ? 'btn-primary full' : 'btn-outline full'}
                                to="/contact"
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Social proof strip */}
            <section className="bento-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="bento-grid" style={{ maxWidth: '900px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="bento-card reveal" style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--i5), var(--v5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>14 days</h3>
                        <p>Free trial, full features, no credit card</p>
                    </div>
                    <div className="bento-card reveal" style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--i5), var(--v5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Free</h3>
                        <p>Suppliers never pay. Better coverage for buyers.</p>
                    </div>
                    <div className="bento-card reveal" style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--i5), var(--v5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>20%</h3>
                        <p>Discount on annual billing plans</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="pricing-faq">
                <div className="section-heading">
                    <p className="eyebrow">FAQs</p>
                    <h2>Common questions, clear answers</h2>
                </div>
                <div className="faq-grid">
                    {faqs.map((faq, i) => (
                        <details key={faq.q} open={i === openFaq} onClick={(e) => { e.preventDefault(); setOpenFaq(i === openFaq ? -1 : i); }}>
                            <summary>{faq.q}</summary>
                            <p>{faq.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <CTABanner
                heading="Need a custom plan?"
                body="Enterprise teams get tailored pricing, dedicated support, custom integrations, and SLA guarantees. Let us build a plan that fits your organization."
                primaryLabel="Contact Sales"
                primaryTo="/contact"
            />
        </>
    );
}
