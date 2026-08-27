import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE: [number, number, number, number] = [0.2, 0, 0.38, 0.9];

export function Folio({
    label,
    light = false,
    className = '',
}: {
    label: string;
    light?: boolean;
    className?: string;
}) {
    return (
        <p
            className={`flex items-center gap-2 font-mono text-xs font-normal uppercase tracking-[0.12em] ${
                light ? 'text-white/60' : 'text-muted'
            } ${className}`}
        >
            <span className="inline-block h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
            {label}
        </p>
    );
}

export function RuleLabel({
    label,
    light = false,
    className = '',
}: {
    label: string;
    light?: boolean;
    className?: string;
}) {
    return (
        <div className={`flex items-baseline gap-4 ${className}`}>
            <span
                className={`inline-flex shrink-0 items-center gap-2 font-mono text-xs font-normal uppercase tracking-[0.12em] ${
                    light ? 'text-white/60' : 'text-muted'
                }`}
            >
                <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                {label}
            </span>
            <span
                aria-hidden="true"
                className={`h-px flex-1 translate-y-[-0.2em] ${light ? 'bg-white/20' : 'bg-subtle'}`}
            />
        </div>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    lede,
    light = false,
    centered = false,
    layout = 'default',
}: {
    eyebrow: string;
    title: string;
    lede?: string;
    light?: boolean;
    centered?: boolean;
    layout?: 'default' | 'split';
}) {
    if (layout === 'split') {
        return (
            <div className="mb-12 md:mb-16">
                <RuleLabel label={eyebrow} light={light} />
                <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
                    <h2
                        className={`text-3xl leading-[1.19] md:col-span-7 md:text-[2.625rem] md:leading-[50px] ${
                            light ? 'text-white' : 'text-primary'
                        }`}
                    >
                        {title}
                    </h2>
                    {lede && (
                        <p
                            className={`self-end text-base leading-6 md:col-span-4 md:col-start-9 ${
                                light ? 'text-white/70' : 'text-muted'
                            }`}
                        >
                            {lede}
                        </p>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className={`mb-12 max-w-2xl md:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
            <Folio label={eyebrow} light={light} className="mb-4" />
            <h2
                className={`text-3xl leading-[1.19] md:text-[2.625rem] md:leading-[50px] ${
                    light ? 'text-white' : 'text-primary'
                }`}
            >
                {title}
            </h2>
            {lede && (
                <p
                    className={`mt-5 text-base leading-6 ${
                        light ? 'text-white/70' : 'text-muted'
                    }`}
                >
                    {lede}
                </p>
            )}
        </div>
    );
}

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
        <div className="group h-full border border-subtle bg-layer p-4 hover:bg-[#e8e8e8]">
            <span
                aria-hidden="true"
                className="mb-6 inline-flex h-8 w-8 items-center justify-center text-lg leading-none text-primary"
            >
                {icon}
            </span>
            <h3 className="mb-2 text-base font-semibold leading-[22px] text-primary">
                {title}
            </h3>
            <p className="text-base leading-6 text-muted">{body}</p>
        </div>
    );
}

export function StatCard({
    metric,
    body,
}: {
    metric: string;
    body: string;
}) {
    return (
        <div className="h-full border-t border-subtle pt-6">
            <p className="text-4xl font-light leading-none tracking-tight text-primary md:text-5xl">
                {metric}
            </p>
            <p className="mt-4 text-base leading-6 text-muted">{body}</p>
        </div>
    );
}

export function CTABanner({
    heading = 'See how a package moves through Metics',
    body = 'Bring one real procurement workflow to the call. We will walk through how the RFQ, supplier responses, approvals, and PO would sit in the platform.',
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
        <section className="bg-ink">
            <div className="site-wrap py-16 md:py-24">
                <RuleLabel label="Next step" light />
                <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8">
                        <h2 className="title-rail text-4xl leading-[1.18] text-white md:text-[3.375rem] md:leading-[64px]">
                            {heading}
                        </h2>
                    </div>
                    <div className="lg:col-span-4 lg:col-start-9">
                        <p className="text-base leading-6 text-white/70">{body}</p>
                        <div className="mt-8 flex flex-col gap-1 sm:flex-row lg:flex-col xl:flex-row">
                            <Link to={primaryTo} className="btn-inverse">
                                {primaryLabel}
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path d="M11.8 4.4 17.4 10l-5.6 5.6M17.4 10H2.6" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </Link>
                            {secondaryLabel && secondaryTo && (
                                <Link to={secondaryTo} className="inline-flex h-12 items-center justify-center border border-white/40 px-5 text-sm font-semibold text-white hover:bg-white hover:text-primary">
                                    {secondaryLabel}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

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
        <section className="leadspace border-b border-subtle bg-paper pb-16 pt-12 md:min-h-[480px] md:pb-20 md:pt-16">
            <div className="site-wrap">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.24, ease: EASE }}
                >
                    <RuleLabel label={`Metics / ${eyebrow}`} />
                </motion.div>
                <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:gap-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.06, ease: EASE }}
                        className="title-rail text-4xl leading-[1.18] text-primary md:text-5xl lg:col-span-10 lg:text-[3.375rem] lg:leading-[64px]"
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.12, ease: EASE }}
                        className="lg:col-span-8"
                    >
                        <p className="text-base leading-6 text-muted md:text-lg md:leading-7">{subtitle}</p>
                        {children}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
