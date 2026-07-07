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
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group p-10 bg-white border border-black/[0.03] rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-2 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="inline-flex items-center justify-center w-16 h-16 bg-accent/5 rounded-2xl text-3xl mb-8 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500" role="img" aria-hidden="true">{icon}</span>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-primary/60 leading-relaxed text-lg">{body}</p>
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
            whileHover={{ scale: 1.02 }}
            className="p-12 bg-[#FAF8F6] border border-black/[0.03] rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
        >
            <h3 className="text-5xl font-serif text-accent mb-6 leading-none">{metric}</h3>
            <p className="text-xl font-medium text-primary/60 leading-snug">{body}</p>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded bg-primary text-white py-20 px-8 text-center"
        >
            {/* Clean Grid Background pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">{heading}</h2>
                <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{body}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link className="w-full sm:w-auto px-6 py-3 bg-accent text-white rounded font-bold hover:bg-accent/90 transition-colors text-base" to={primaryTo}>
                        {primaryLabel}
                    </Link>
                    {secondaryLabel && secondaryTo && (
                        <Link className="w-full sm:w-auto px-6 py-3 border border-white/20 rounded font-bold hover:bg-white/10 hover:border-white/40 transition-colors text-base" to={secondaryTo}>
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
