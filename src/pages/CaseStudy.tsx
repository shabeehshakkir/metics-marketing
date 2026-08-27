import { Link, useParams } from 'react-router-dom';
import { CTABanner, Folio, PageHero } from '../components/shared';
import { getCaseStudy, type CaseStudy as Study } from '../data/caseStudies';
import { usePageMeta } from '../hooks/usePageMeta';
import NotFound from './NotFound';

function StatsRow({ stats }: { stats: Study['stats'] }) {
    return (
        <div className="flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((s) => (
                <div key={s.label}>
                    <span className="block text-4xl font-light leading-none text-accent md:text-5xl">{s.value}</span>
                    <span className="mt-2 block font-mono text-xs uppercase tracking-[0.08em] text-muted">{s.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function CaseStudy() {
    const { slug } = useParams();
    const study = getCaseStudy(slug);

    usePageMeta(
        study ? `${study.industry} case study` : 'Page Not Found',
        study
            ? study.problem
            : 'The page you were looking for does not exist. Head back to the Metics platform overview or contact support.'
    );

    if (!study) return <NotFound />;

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow={study.industry}
                title={study.heading}
                subtitle={study.team}
            >
                <div className="mt-8">
                    <Link to="/case-studies" className="btn-ghost px-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H4.5m0 0 6-6m-6 6 6 6" />
                        </svg>
                        All case studies
                    </Link>
                </div>
            </PageHero>

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-4">
                            <Folio label="The problem" className="mb-4" />
                            <p className="text-base font-light leading-relaxed text-muted md:text-lg">{study.problem}</p>
                            {study.stats.length > 0 && (
                                <div className="mt-10 border-t border-subtle pt-8">
                                    <StatsRow stats={study.stats} />
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-7 lg:col-start-6">
                            <Folio label="How they ran it" className="mb-6" />
                            <div className="space-y-5">
                                {study.body.map((p) => (
                                    <p key={p} className="leading-relaxed text-muted">{p}</p>
                                ))}
                            </div>
                            <div className="mt-12 border-t border-subtle pt-10">
                                <Folio label="What changed" className="mb-4 !text-secondary/80" />
                                <p className="text-base leading-relaxed text-muted md:text-lg">{study.outcome}</p>
                            </div>
                        </div>
                    </div>
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
