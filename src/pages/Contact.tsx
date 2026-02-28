import { FormEvent, useState, useRef, useEffect } from 'react';
import { PageHero } from '../components/shared';

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

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const timer = useRef<number>();
    const lastSubmit = useRef<number>(0);
    useReveal();

    useEffect(() => {
        return () => { if (timer.current) window.clearTimeout(timer.current); };
    }, []);

    const sanitize = (val: string) => val.trim().replace(/<[^>]*>/g, '');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const form = e.currentTarget;

        // Honeypot check
        const hp = form.querySelector<HTMLInputElement>('input[name="website"]');
        if (hp?.value) return;

        // Rate limit
        const now = Date.now();
        if (now - lastSubmit.current < 30000) {
            setError('Please wait a moment before submitting again.');
            return;
        }

        const email = sanitize(form.querySelector<HTMLInputElement>('input[name="email"]')?.value || '');
        const firstName = sanitize(form.querySelector<HTMLInputElement>('input[name="firstName"]')?.value || '');
        const lastName = sanitize(form.querySelector<HTMLInputElement>('input[name="lastName"]')?.value || '');

        if (!firstName || !lastName) {
            setError('Please enter your full name.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid work email address.');
            return;
        }

        const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'mail.com', 'protonmail.com', 'icloud.com'];
        const domain = email.split('@')[1]?.toLowerCase();
        if (freeProviders.includes(domain)) {
            setError('Please use your work email address.');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        // Remove honeypot from submission
        formData.delete('website');
        // Add reply-to so Formspree sets reply email
        formData.set('_replyto', email);
        formData.set('_subject', `Metics Demo Request from ${firstName} ${lastName}`);

        try {
            setSubmitting(true);
            const res = await fetch('https://formspree.io/f/xeoevwzd', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (res.ok) {
                lastSubmit.current = now;
                form.reset();
                setSubmitted(true);
                timer.current = window.setTimeout(() => setSubmitted(false), 8000);
            } else {
                setError('Something went wrong. Please try again or email us directly at shabeeh@oxmics.com.');
            }
        } catch {
            setError('Network error. Please try again or email us directly at shabeeh@oxmics.com.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <PageHero
                eyebrow="Contact"
                title="See Metics in action"
                subtitle="Book a 20-minute walkthrough tailored to your role. No generic slide decks. We will show you real workflows with real data, and answer every question you have."
            />

            <section className="contact-section">
                <div className="contact-grid">
                    <div className="contact-form-wrapper reveal">
                        <h3>Request a personalized demo</h3>
                        <p>Fill out the form below and a member of our team will reach out within one business day to schedule your walkthrough.</p>
                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            {/* Honeypot */}
                            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Jane" required maxLength={100} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" placeholder="Murphy" required maxLength={100} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Work Email</label>
                                <input type="email" id="email" name="email" placeholder="jane@company.com" required maxLength={200} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input type="text" id="company" name="company" placeholder="Your company name" maxLength={200} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="role">Your Role</label>
                                    <select id="role" name="role">
                                        <option value="">Select your role...</option>
                                        <option>Procurement Manager</option>
                                        <option>Quantity Surveyor</option>
                                        <option>Project Manager</option>
                                        <option>Commercial Director</option>
                                        <option>Director / VP / C-Suite</option>
                                        <option>Supplier / Sales</option>
                                        <option>IT / Operations</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="size">Company Size</label>
                                    <select id="size" name="size">
                                        <option value="">Select team size...</option>
                                        <option>1-10 employees</option>
                                        <option>11-50 employees</option>
                                        <option>51-200 employees</option>
                                        <option>201-1000 employees</option>
                                        <option>1000+ employees</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="packages">Approximate packages per project</label>
                                <select id="packages" name="packages">
                                    <option value="">Select...</option>
                                    <option>Less than 10</option>
                                    <option>10-50</option>
                                    <option>50-100</option>
                                    <option>100-200</option>
                                    <option>200+</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">What are your biggest procurement challenges?</label>
                                <textarea id="message" name="message" rows={4} maxLength={2000} placeholder="Tell us what is slowing down your team, what tools you are currently using, and what you would like to improve..." />
                            </div>
                            {error && <p className="form-error" style={{ color: '#ef4444', fontSize: '.85rem', fontWeight: 500, marginBottom: '8px' }}>{error}</p>}
                            <button type="submit" className="btn-primary full" disabled={submitting}>
                                {submitting ? 'Sending...' : 'Request a Demo'}
                            </button>
                            {submitted && <p className="form-success">Thank you! Our team will be in touch within 24 hours to schedule your walkthrough.</p>}
                        </form>
                    </div>

                    <div className="contact-sidebar">
                        <div className="sidebar-card reveal">
                            <h4>What you will see in the demo</h4>
                            <div className="expect-step">
                                <div className="expect-num">1</div>
                                <p><strong>Your workflow, our platform</strong> &mdash; We will walk through how Metics handles the specific procurement challenges you described, using real examples.</p>
                            </div>
                            <div className="expect-step">
                                <div className="expect-num">2</div>
                                <p><strong>Live feature demonstration</strong> &mdash; See RFQ creation, bid comparison, supplier management, and PO generation in action. Not screenshots, not slides.</p>
                            </div>
                            <div className="expect-step">
                                <div className="expect-num">3</div>
                                <p><strong>Implementation roadmap</strong> &mdash; We will discuss timeline, data migration, team onboarding, and how to get value from Metics in your first week.</p>
                            </div>
                        </div>

                        <div className="sidebar-card reveal">
                            <h4>Why teams choose Metics</h4>
                            <ul>
                                <li>Purpose-built for construction procurement, not adapted from generic tools</li>
                                <li>From RFQ to PO in a single platform, not 5 disconnected tools</li>
                                <li>80% reduction in supplier shortlisting time</li>
                                <li>100% audit-ready documentation from day one</li>
                                <li>Trusted by contractors and QS firms across Europe</li>
                                <li>Suppliers use Metics for free, increasing bid coverage</li>
                            </ul>
                        </div>

                        <div className="sidebar-card trust reveal">
                            <h4>Enterprise-Ready Security</h4>
                            <div className="trust-badges">
                                <span>GDPR Compliant</span>
                                <span>ISO 27001-Ready</span>
                                <span>EU Data Residency</span>
                                <span>SSO / SAML</span>
                                <span>SOC 2 Type II</span>
                                <span>AES-256 Encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
