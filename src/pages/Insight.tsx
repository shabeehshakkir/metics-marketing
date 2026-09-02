import { Link, useParams } from 'react-router-dom';
import { CTABanner, Folio, PageHero } from '../components/shared';
import { getInsight, readingTime } from '../data/insights';
import { usePageMeta } from '../hooks/usePageMeta';
import NotFound from './NotFound';

export default function Insight() {
    const { slug } = useParams();
    const article = getInsight(slug);

    usePageMeta(
        article ? article.heading.replace(/\.$/, '') : 'Page Not Found',
        article
            ? article.summary
            : 'The page you were looking for does not exist. Head back to the Metics platform overview or contact support.'
    );

    if (!article) return <NotFound />;

    return (
        <div className="bg-paper">
            <PageHero
                eyebrow={article.category}
                title={article.heading}
                subtitle={article.summary}
            >
                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                    <span>{article.date}</span>
                    <span>{readingTime(article)}</span>
                </div>
                <div className="mt-8">
                    <Link to="/insights" className="btn-ghost px-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H4.5m0 0 6-6m-6 6 6 6" />
                        </svg>
                        All insights
                    </Link>
                </div>
            </PageHero>

            <section className="border-t border-subtle py-16 md:py-24">
                <div className="site-wrap">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-8 lg:col-start-3">
                            <Folio label="Article" className="mb-8" />
                            <div className="space-y-5">
                                {article.body.map((p) => (
                                    <p key={p} className="text-base leading-relaxed text-muted md:text-lg">{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
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
