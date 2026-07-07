import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Section Heading ── */
export function SectionHeading({
    eyebrow,
    title,
    lede,
    light = false,
    centered = false,
}: {
    eyebrow: string;
    title: string;
    lede?: string;
    light?: boolean;
    centered?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${centered ? 'text-center' : ''} ${light ? 'text-white' : 'text-primary'}`}
        >
            <p className="text-accent font-bold uppercase tracking-widest text-xs mb-3">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{title}</h2>
            {lede && <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'opacity-80' : 'text-primary/70'}`}>{lede}</p>}
        </motion.div>
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
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-black/5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <span className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl text-2xl mb-6" role="img" aria-hidden="true">{icon}</span>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-primary/70 leading-relaxed">{body}</p>
        </motion.div>
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
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-paper-soft border border-black/5 rounded-2xl"
        >
            <h3 className="text-4xl font-serif text-accent mb-4">{metric}</h3>
            <p className="text-lg font-medium text-primary/70">{body}</p>
        </motion.div>
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
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary text-white py-20 px-8 text-center"
        >
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] rounded-full bg-accent blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-secondary blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif mb-6">{heading}</h2>
                <p className="text-lg md:text-xl text-white/70 mb-10">{body}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link className="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-accent/20" to={primaryTo}>
                        {primaryLabel}
                    </Link>
                    {secondaryLabel && secondaryTo && (
                        <Link className="w-full sm:w-auto px-8 py-4 border-2 border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors" to={secondaryTo}>
                            {secondaryLabel}
                        </Link>
                    )}
                </div>
            </div>
        </motion.section>
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
