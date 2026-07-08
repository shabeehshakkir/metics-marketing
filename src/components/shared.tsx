import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Folio label — small-caps metadata line, like a folio line in a printed journal ── */
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
            className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${
                light ? 'text-white/40' : 'text-primary/40'
            } ${className}`}
        >
            {label}
        </p>
    );
}

/* ── Rule label — full-width hairline with a small-caps label sitting on it ── */
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
        <div className={`flex items-baseline gap-5 ${className}`}>
            <span
                className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                    light ? 'text-white/40' : 'text-primary/40'
                }`}
            >
                {label}
            </span>
            <span
                aria-hidden="true"
                className={`h-px flex-1 translate-y-[-0.2em] ${light ? 'bg-white/10' : 'bg-black/[0.08]'}`}
            />
        </div>
    );
}

/* ── Section Heading ── */
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
            <div className="mb-14 md:mb-20">
                <RuleLabel label={eyebrow} light={light} />
                <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:gap-10">
                    <h2
                        className={`font-serif text-3xl md:text-[2.75rem] leading-[1.08] tracking-tight md:col-span-7 ${
                            light ? 'text-white' : 'text-primary'
                        }`}
                    >
                        {title}
                    </h2>
                    {lede && (
                        <p
                            className={`self-end text-lg leading-relaxed md:col-span-4 md:col-start-9 ${
                                light ? 'text-white/65' : 'text-primary/65'
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
        <div className={`mb-14 md:mb-16 max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
            <Folio label={eyebrow} light={light} className="mb-5" />
            <h2
                className={`font-serif text-3xl md:text-[2.75rem] leading-[1.1] tracking-tight ${
                    light ? 'text-white' : 'text-primary'
                }`}
            >
                {title}
            </h2>
            {lede && (
                <p
                    className={`mt-5 text-lg leading-relaxed ${
                        light ? 'text-white/65' : 'text-primary/65'
                    }`}
                >
                    {lede}
                </p>
            )}
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
        <div className="group h-full rounded-2xl border border-black/[0.08] bg-white p-8 shadow-card">
            <span
                aria-hidden="true"
                className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.08] bg-paper text-lg leading-none text-primary/80 [filter:grayscale(1)]"
            >
                {icon}
            </span>
            <h3 className="mb-2.5 text-lg font-semibold tracking-tight text-primary">
                {title}
            </h3>
            <p className="text-[15px] leading-relaxed text-primary/60">{body}</p>
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
        <div className="h-full border-t border-black/[0.15] pt-6">
            <p className="font-serif text-4xl md:text-5xl leading-none tracking-tight text-primary">
                {metric}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-primary/60">{body}</p>
        </div>
    );
}

/* ── CTA Banner — editorial colophon-style closing section ── */
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
        <section className="border-t border-black/[0.08]">
            <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-8 md:py-32">
                <RuleLabel label="Next step" />
                <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-primary md:text-6xl">
                            {heading}
                        </h2>
                    </div>
                    <div className="lg:col-span-4 lg:col-start-9">
                        <p className="text-lg leading-relaxed text-primary/65">{body}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                            <Link
                                to={primaryTo}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent"
                            >
                                {primaryLabel}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </Link>
                            {secondaryLabel && secondaryTo && (
                                <Link
                                    to={secondaryTo}
                                    className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary"
                                >
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

/* ── Page Hero — left-set, magazine style: folio rule on top, oversized serif, offset lede ── */
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
        <section className="pb-16 pt-16 md:pb-24 md:pt-24">
            <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                >
                    <RuleLabel label={`Metics / ${eyebrow}`} />
                </motion.div>
                <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                        className="font-serif text-[2.75rem] leading-[1.02] tracking-tight text-primary md:text-6xl lg:col-span-8 xl:text-7xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                        className="self-end lg:col-span-4 lg:col-start-9"
                    >
                        <p className="text-lg leading-relaxed text-primary/65">{subtitle}</p>
                        {children}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
