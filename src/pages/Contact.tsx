import { FormEvent, useEffect, useRef, useState } from 'react';

const expectations = [
    ['Your real workflow', 'We will use the package types, supplier groups, approvals, and reporting needs you describe.'],
    ['A product walkthrough', 'You will see RFQ setup, supplier responses, bid comparison, approvals, and PO output in the same flow.'],
    ['A rollout path', 'We will talk through first project setup, data import, team onboarding, and security requirements.']
];

const trustItems = ['GDPR-ready', 'EU data residency options', 'SSO and SAML paths', 'Role-based access', 'Exportable audit trail'];

function useReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
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

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const timer = useRef<number>();
    const lastSubmit = useRef<number>(0);
    useReveal();

    useEffect(() => {
        return () => {
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
        };
    }, []);

    const sanitize = (value: string) => value.trim().replace(/<[^>]*>/g, '');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const form = event.currentTarget;
        const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
        if (honeypot?.value) {
            return;
        }

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

        const payload = {
            firstName,
            lastName,
            email,
            company: sanitize(form.querySelector<HTMLInputElement>('input[name="company"]')?.value || ''),
            role: sanitize(form.querySelector<HTMLSelectElement>('select[name="role"]')?.value || ''),
            size: sanitize(form.querySelector<HTMLSelectElement>('select[name="size"]')?.value || ''),
            packages: sanitize(form.querySelector<HTMLSelectElement>('select[name="packages"]')?.value || ''),
            message: sanitize(form.querySelector<HTMLTextAreaElement>('textarea[name="message"]')?.value || ''),
        };

        try {
            setSubmitting(true);
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
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
        <div className="platform-editorial editorial-page">
            <section className="editorial-hero">
                <div className="editorial-hero-inner">
                    <p className="platform-kicker">Contact</p>
                    <h1>Show us the procurement process you want to fix.</h1>
                    <p>
                        A useful demo starts with your actual work: package volume, supplier lists, approvals, reporting, and the points where the process slows down.
                    </p>
                </div>
            </section>

            <section className="editorial-contact-section">
                <div className="editorial-contact-grid">
                    <div className="editorial-contact-copy reveal-left">
                        <p className="platform-kicker">What happens next</p>
                        <h2>A walkthrough built around your actual procurement process.</h2>
                        <div className="editorial-expect-list">
                            {expectations.map(([title, body], index) => (
                                <article key={title}>
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3>{title}</h3>
                                        <p>{body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="editorial-trust-strip">
                            {trustItems.map((item) => <span key={item}>{item}</span>)}
                        </div>
                    </div>

                    <form className="editorial-contact-form reveal-right" onSubmit={handleSubmit} noValidate>
                        <h2>Request a walkthrough</h2>
                        <p>We usually reply within one business day.</p>

                        <div className="editorial-honeypot" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="Jane" required maxLength={100} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Murphy" required maxLength={100} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Work email</label>
                            <input type="email" id="email" name="email" placeholder="jane@company.com" required maxLength={200} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" name="company" placeholder="Company name" maxLength={200} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select id="role" name="role">
                                    <option value="">Select role</option>
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
                                <label htmlFor="size">Company size</label>
                                <select id="size" name="size">
                                    <option value="">Select size</option>
                                    <option>1-10 employees</option>
                                    <option>11-50 employees</option>
                                    <option>51-200 employees</option>
                                    <option>201-1000 employees</option>
                                    <option>1000+ employees</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="packages">Packages per project</label>
                            <select id="packages" name="packages">
                                <option value="">Select range</option>
                                <option>Less than 10</option>
                                <option>10-50</option>
                                <option>50-100</option>
                                <option>100-200</option>
                                <option>200+</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">What should we look at?</label>
                            <textarea id="message" name="message" rows={5} maxLength={2000} placeholder="Tell us what slows procurement down today, which tools you use, and what a better workflow needs to support." />
                        </div>

                        {error && <p className="form-error">{error}</p>}
                        <button type="submit" className="platform-primary-link editorial-submit" disabled={submitting}>
                            {submitting ? 'Sending...' : 'Request a Demo'}
                        </button>
                        {submitted && <p className="form-success">Thank you. We will be in touch within 24 hours.</p>}
                    </form>
                </div>
            </section>
        </div>
    );
}
