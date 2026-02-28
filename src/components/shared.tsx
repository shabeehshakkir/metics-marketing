import { Link } from 'react-router-dom';

/* ── Section Heading ── */
export function SectionHeading({
    eyebrow,
    title,
    lede,
    light = false,
}: {
    eyebrow: string;
    title: string;
    lede?: string;
    light?: boolean;
}) {
    return (
        <div className={`section-heading${light ? ' light' : ''}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            {lede && <p className="lede">{lede}</p>}
        </div>
    );
}

/* ── Feature Card ── */
export function FeatureCard({
    icon,
    title,
    body,
}: {
    icon: string;
    title: string;
    body: string;
}) {
    return (
        <div className="feature-card">
            <span className="icon" role="img" aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
}

/* ── Stat Card ── */
export function StatCard({
    metric,
    body,
}: {
    metric: string;
    body: string;
}) {
    return (
        <div className="stat-card">
            <h3>{metric}</h3>
            <p>{body}</p>
        </div>
    );
}

/* ── CTA Banner ── */
export function CTABanner({
    heading = 'Ready to transform procurement?',
    body = 'See how Metics gives your team complete visibility and control over every RFQ, bid, and purchase order.',
    primaryLabel = 'Request a Demo',
    primaryTo = '/contact',
    secondaryLabel,
    secondaryTo,
}: {
    heading?: string;
    body?: string;
    primaryLabel?: string;
    primaryTo?: string;
    secondaryLabel?: string;
    secondaryTo?: string;
}) {
    return (
        <section className="cta-banner">
            <div className="cta-banner-inner">
                <h2>{heading}</h2>
                <p>{body}</p>
                <div className="cta-actions">
                    <Link className="btn-primary" to={primaryTo}>{primaryLabel}</Link>
                    {secondaryLabel && secondaryTo && (
                        <Link className="btn-ghost-light" to={secondaryTo}>{secondaryLabel}</Link>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ── Page Hero ── */
export function PageHero({
    eyebrow,
    title,
    subtitle,
    children,
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}) {
    return (
        <section className="page-hero">
            <div className="page-hero-inner">
                <p className="eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
                <p className="page-hero-sub">{subtitle}</p>
                {children}
            </div>
        </section>
    );
}
