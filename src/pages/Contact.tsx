import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Folio, PageHero, RuleLabel } from '../components/shared';
import { usePageMeta } from '../hooks/usePageMeta';

const expectations = [
    ['Your real workflow', 'We will use the package types, supplier groups, approvals, and reporting needs you describe.'],
    ['A product walkthrough', 'You will see RFQ setup, supplier responses, bid comparison, approvals, and PO output in the same flow.'],
    ['A rollout path', 'We will talk through first project setup, data import, team onboarding, and security requirements.']
];

const trustItems = ['GDPR-ready', 'EU data residency options', 'SSO and SAML paths', 'Role-based access', 'Exportable audit trail'];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '-80px' } as const;

const inputClass = 'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-primary placeholder:text-primary/40 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition';
const labelClass = 'block text-sm font-medium text-primary mb-1.5';

export default function Contact() {
    usePageMeta(
        'Contact',
        'Book a Metics walkthrough with your real procurement workflow — RFQ setup, supplier responses, bid comparison, approvals, and PO output.'
    );
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const timer = useRef<number>();
    const lastSubmit = useRef<number>(0);

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
        <div className="bg-paper">
            <PageHero
                eyebrow="Contact"
                title="Show us the procurement process you want to fix."
                subtitle="A useful demo starts with your actual work: package volume, supplier lists, approvals, reporting, and the points where the process slows down."
            />

            <section className="border-t border-black/[0.08] py-16 md:py-24">
                <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <RuleLabel label="What happens next" />
                            <h2 className="mt-8 font-serif text-3xl leading-[1.1] tracking-tight text-primary md:text-[2.75rem]">
                                A walkthrough built around your actual procurement process.
                            </h2>

                            <div className="mt-12 border-t border-black/[0.08]">
                                {expectations.map(([title, body], index) => (
                                    <article
                                        key={title}
                                        className="grid grid-cols-[3rem_1fr] gap-4 border-b border-black/[0.08] py-6"
                                    >
                                        <span className="font-serif text-2xl leading-none text-black/[0.12]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-primary">{title}</h3>
                                            <p className="mt-1.5 leading-relaxed text-primary/65">{body}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Folio label="Trust" className="mb-4" />
                                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                                    {trustItems.map((item) => (
                                        <li
                                            key={item}
                                            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/55"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <motion.form
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                            onSubmit={handleSubmit}
                            noValidate
                            className="relative h-fit rounded-2xl border border-black/[0.08] bg-white p-8 shadow-[0_16px_40px_-12px_rgba(26,26,26,0.12)] md:p-10 lg:col-span-7 lg:mt-16"
                        >
                            <h2 className="font-serif text-2xl tracking-tight text-primary md:text-3xl">Request a walkthrough</h2>
                            <p className="mt-2 text-primary/65">We usually reply within one business day.</p>

                            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className={labelClass}>First name</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Jane" required maxLength={100} className={inputClass} />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className={labelClass}>Last name</label>
                                    <input type="text" id="lastName" name="lastName" placeholder="Murphy" required maxLength={100} className={inputClass} />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="email" className={labelClass}>Work email</label>
                                <input type="email" id="email" name="email" placeholder="jane@company.com" required maxLength={200} className={inputClass} />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="company" className={labelClass}>Company</label>
                                <input type="text" id="company" name="company" placeholder="Company name" maxLength={200} className={inputClass} />
                            </div>

                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="role" className={labelClass}>Role</label>
                                    <select id="role" name="role" className={inputClass}>
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
                                <div>
                                    <label htmlFor="size" className={labelClass}>Company size</label>
                                    <select id="size" name="size" className={inputClass}>
                                        <option value="">Select size</option>
                                        <option>1-10 employees</option>
                                        <option>11-50 employees</option>
                                        <option>51-200 employees</option>
                                        <option>201-1000 employees</option>
                                        <option>1000+ employees</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="packages" className={labelClass}>Packages per project</label>
                                <select id="packages" name="packages" className={inputClass}>
                                    <option value="">Select range</option>
                                    <option>Less than 10</option>
                                    <option>10-50</option>
                                    <option>50-100</option>
                                    <option>100-200</option>
                                    <option>200+</option>
                                </select>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="message" className={labelClass}>What should we look at?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    maxLength={2000}
                                    placeholder="Tell us what slows procurement down today, which tools you use, and what a better workflow needs to support."
                                    className={`${inputClass} resize-y`}
                                />
                            </div>

                            {error && (
                                <p className="mt-5 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm font-medium text-accent" role="alert">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? 'Sending...' : 'Request a Demo'}
                            </button>

                            {submitted && (
                                <p className="mt-5 rounded-xl border border-secondary/30 bg-secondary/[0.06] px-4 py-3 text-sm font-medium text-secondary" role="status">
                                    Thank you. We will be in touch within 24 hours.
                                </p>
                            )}
                        </motion.form>
                    </div>
                </div>
            </section>
        </div>
    );
}
