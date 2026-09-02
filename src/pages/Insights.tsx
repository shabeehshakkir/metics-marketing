import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, PageHero, RuleLabel } from '../components/shared';
import { articles, categories, readingTime } from '../data/insights';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '-80px' } as const;

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
        </svg>
    );
}

export default function Insights() {
    usePageMeta(
        'Insights',
        'Writing on procurement practice: total cost of ownership, supplier concentration risk, audit-ready award records, and spend analytics.'
    );
    const [filter, setFilter] = useState('All');

    const featured = articles[0];
    const visible = filter === 'All'
        ? articles.slice(1)
        : articles.filter((a) => a.category === filter);

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="Insights"
                title="Notes on how awards actually get made."
                subtitle="Short reads on how procurement decisions are made well, what data matters before the award, and where the process breaks down when it does."
            />

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    {filter === 'All' && featured && (
                        <motion.article
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.6, ease: EASE }}
                        >
                            <Link to={`/insights/${featured.slug}`} className="group mb-24 block">
                                <RuleLabel label={`Featured: ${featured.category}`} />
                                <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
                                    <h2 className="text-3xl font-light leading-[1.05] tracking-tight text-primary transition-colors group-hover:text-accent md:text-6xl lg:col-span-8">
                                        {featured.heading}
                                    </h2>
                                    <div className="self-end lg:col-span-4 lg:col-start-9">
                                        <p className="text-lg leading-relaxed text-muted">{featured.summary}</p>
                                        <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                            <span>{featured.date}</span>
                                            <span>{readingTime(featured)}</span>
                                        </div>
                                        <span className="btn-ghost mt-6 px-0">
                                            Read full article <ArrowIcon />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    )}

                    <div
                        className="mb-0 flex flex-wrap items-baseline gap-x-7 gap-y-3 border-b border-subtle pb-5"
                        role="tablist"
                        aria-label="Filter by category"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Filter</span>
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={filter === c}
                                onClick={() => setFilter(c)}
                                className={`relative pb-1 text-sm transition-colors ${
                                    filter === c ? 'text-primary' : 'text-muted hover:text-primary'
                                }`}
                            >
                                {c}
                                {filter === c && (
                                    <motion.span
                                        layoutId="insights-filter-underline"
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {visible.length > 0 ? (
                        <div className="divide-y divide-subtle">
                            {visible.map((article) => (
                                <article key={article.slug}>
                                    <Link
                                        to={`/insights/${article.slug}`}
                                        className="group grid gap-4 py-12 md:py-14 lg:grid-cols-12 lg:gap-10"
                                    >
                                        <div className="lg:col-span-7">
                                            <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                                                {article.category}
                                            </span>
                                            <h3 className="mt-4 max-w-xl text-2xl font-light leading-[1.15] tracking-tight text-primary transition-colors group-hover:text-accent md:text-[2rem]">
                                                {article.heading}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col lg:col-span-4 lg:col-start-9">
                                            <p className="text-[15px] leading-relaxed text-muted">{article.summary}</p>
                                            <div className="mt-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                                <span>{article.date}</span>
                                                <span>{readingTime(article)}</span>
                                            </div>
                                            <span className="btn-ghost mt-4 px-0">
                                                Read full article <ArrowIcon />
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center text-muted">No articles in this category yet.</p>
                    )}
                </div>
            </section>

            <CTABanner
                heading="See the platform behind these ideas"
                body="Metics puts TCO analysis, health scores, audit trails, and spend analytics in the procurement workflow, not in a separate tool."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View platform"
                secondaryTo="/platform"
            />
        </div>
    );
}
