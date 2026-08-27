import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner, Folio, PageHero, RuleLabel } from '../components/shared';
import { allStudies, type CaseStudy as Study } from '../data/caseStudies';
import { usePageMeta } from '../hooks/usePageMeta';

const filters = ['All', 'Construction', 'Manufacturing', 'Energy', 'Government'];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '-80px' } as const;

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
        </svg>
    );
}

function ReadLink() {
    return (
        <span className="btn-ghost mt-auto px-0 pt-6">
            Read full case study <ArrowIcon />
        </span>
    );
}

function QuoteBlock({ text }: { text: string }) {
    return (
        <div className="relative pl-6">
            <span aria-hidden="true" className="absolute left-0 top-0 select-none text-2xl font-light leading-none text-accent">&ldquo;</span>
            <p className="text-base font-light leading-relaxed text-muted md:text-lg">{text}</p>
        </div>
    );
}

function StatsRow({ stats, large = false }: { stats: Study['stats']; large?: boolean }) {
    return (
        <div className={`flex flex-wrap ${large ? 'gap-x-10 gap-y-6' : 'gap-x-8 gap-y-4'}`}>
            {stats.map((s) => (
                <div key={s.label}>
                    <span className={`block font-light leading-none text-accent ${large ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{s.value}</span>
                    <span className="mt-2 block font-mono text-xs uppercase tracking-[0.08em] text-muted">{s.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function CaseStudies() {
    usePageMeta(
        'Case Studies',
        'How procurement teams use Metics: shorter award cycles, complete audit records, and supplier concentration under control.'
    );
    const [filter, setFilter] = useState('All');

    const visible = filter === 'All'
        ? allStudies
        : allStudies.filter((s) => s.industry === filter);

    const featured = visible[0];
    const rest = visible.slice(1);

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow="How teams use Metics"
                title="How teams run tenders in Metics."
                subtitle="Patterns from teams that changed how they run tenders, compare bids, and keep award records. The details vary by sector. The underlying problem is usually the same."
            >
                <div className="mt-8 flex flex-wrap gap-1">
                    <Link to="/contact" className="btn-primary">
                        Book a walkthrough
                    </Link>
                    <Link to="/platform" className="btn-tertiary">
                        See the platform
                    </Link>
                </div>
            </PageHero>

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    <div
                        className="mb-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-subtle pb-5"
                        role="tablist"
                        aria-label="Filter by industry"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Filter</span>
                        {filters.map((f) => (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={filter === f}
                                onClick={() => setFilter(f)}
                                className={`relative pb-1 text-sm transition-colors ${
                                    filter === f
                                        ? 'text-primary'
                                        : 'text-muted hover:text-primary'
                                }`}
                            >
                                {f}
                                {filter === f && (
                                    <motion.span
                                        layoutId="case-filter-underline"
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {visible.length > 0 ? (
                        <>
                            {featured && (
                                <motion.article
                                    key={featured.slug}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VIEWPORT}
                                    transition={{ duration: 0.6, ease: EASE }}
                                >
                                    <Link to={`/case-studies/${featured.slug}`} className="group block">
                                        <RuleLabel label={`Featured: ${featured.industry}`} />
                                        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
                                            <div className="lg:col-span-7">
                                                <h2 className="text-3xl font-light leading-[1.05] tracking-tight text-primary transition-colors group-hover:text-accent md:text-6xl">
                                                    {featured.heading}
                                                </h2>
                                                <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-muted">{featured.team}</p>
                                                <div className="mt-10 border-t border-subtle pt-8">
                                                    <StatsRow stats={featured.stats} large />
                                                </div>
                                            </div>
                                            <div className="self-end lg:col-span-4 lg:col-start-9">
                                                <Folio label="The problem" className="mb-4" />
                                                <QuoteBlock text={featured.problem} />
                                                <Folio label="What changed" className="mb-4 mt-8 !text-secondary/80" />
                                                <p className="leading-relaxed text-muted">{featured.outcome}</p>
                                                <ReadLink />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            )}

                            {rest.length > 0 && (
                                <div className="mt-24 border-t border-subtle">
                                    {rest.map((study) => (
                                        <article
                                            key={study.slug}
                                            className="border-b border-subtle"
                                        >
                                            <Link
                                                to={`/case-studies/${study.slug}`}
                                                className="group grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-10"
                                            >
                                                <div className="lg:col-span-3">
                                                    <Folio label={study.industry} className="!text-accent" />
                                                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">{study.team}</p>
                                                    {study.stats.length > 0 && (
                                                        <div className="mt-8 hidden lg:block">
                                                            <StatsRow stats={study.stats} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="lg:col-span-8 lg:col-start-5">
                                                    <h3 className="max-w-2xl text-2xl font-light leading-[1.12] tracking-tight text-primary transition-colors group-hover:text-accent md:text-4xl">
                                                        {study.heading}
                                                    </h3>
                                                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                                                        <div>
                                                            <Folio label="The problem" className="mb-4" />
                                                            <p className="text-[15px] leading-relaxed text-muted">{study.problem}</p>
                                                        </div>
                                                        <div>
                                                            <Folio label="What changed" className="mb-4 !text-secondary/80" />
                                                            <p className="text-[15px] leading-relaxed text-muted">{study.outcome}</p>
                                                        </div>
                                                    </div>
                                                    {study.stats.length > 0 && (
                                                        <div className="mt-8 lg:hidden">
                                                            <StatsRow stats={study.stats} />
                                                        </div>
                                                    )}
                                                    <ReadLink />
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="py-16 text-center text-muted">No case studies in this category yet.</p>
                    )}
                </div>
            </section>

            <section className="bg-ink py-16 md:py-24">
                <div className="site-wrap">
                    <RuleLabel label="On records" light />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-12 max-w-4xl text-3xl font-light leading-[1.19] tracking-tight text-white md:mt-16 md:text-5xl"
                    >
                        The award decision is made once. The record of it should last for the life of the project.
                    </motion.p>
                </div>
            </section>

            <CTABanner
                heading="Bring your workflow to the call"
                body="We will show how one real package moves from RFQ through bids, approval, and purchase order in Metics."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View platform"
                secondaryTo="/platform"
            />
        </div>
    );
}
