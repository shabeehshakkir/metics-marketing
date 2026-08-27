import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface LegalSection {
    id: string;
    heading: string;
    body: React.ReactNode;
}

/**
 * Legal-document layout: sticky in-page table of contents on the left
 * (desktop), prose sections with light display headings on the right.
 */
export default function LegalPage({
    eyebrow,
    title,
    intro,
    lastUpdated,
    sections,
}: {
    eyebrow: string;
    title: string;
    intro: string;
    lastUpdated: string;
    sections: LegalSection[];
}) {
    const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-96px 0px -70% 0px' }
        );
        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, [sections]);

    return (
        <div className="bg-paper">
            {/* Header */}
            <section className="border-b border-subtle">
                <div className="site-wrap py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="max-w-3xl"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">{eyebrow}</p>
                        <h1 className="mt-5 text-4xl font-light leading-[1.18] tracking-tight text-primary md:text-5xl lg:text-[3.375rem] lg:leading-[64px]">
                            {title}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
                        <p className="mt-8 inline-flex items-center gap-2 border border-subtle bg-layer px-3 py-1.5 text-xs font-medium text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                            Last updated: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Body */}
            <section>
                <div className="site-wrap py-16 md:py-20">
                    <div className="grid gap-14 lg:grid-cols-[260px_1fr] lg:gap-20">
                        {/* Table of contents */}
                        <nav aria-label="Table of contents" className="hidden lg:block">
                            <div className="sticky top-28">
                                <p className="mb-5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                    On this page
                                </p>
                                <ol className="space-y-1 border-l border-subtle">
                                    {sections.map((section, i) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className={`-ml-px block border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200 ${
                                                    activeId === section.id
                                                        ? 'border-accent font-semibold text-primary'
                                                        : 'border-transparent text-muted hover:text-primary'
                                                }`}
                                            >
                                                <span className="mr-2 font-mono text-muted">{i + 1}.</span>
                                                {section.heading}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </nav>

                        {/* Prose */}
                        <div className="max-w-3xl">
                            {sections.map((section, i) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className={`scroll-mt-28 ${i > 0 ? 'mt-14 border-t border-subtle pt-14' : ''}`}
                                >
                                    <h2 className="text-2xl font-light tracking-tight text-primary md:text-3xl">
                                        <span className="mr-3 font-mono text-muted">{i + 1}.</span>
                                        {section.heading}
                                    </h2>
                                    <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
                                        {section.body}
                                    </div>
                                </section>
                            ))}

                            <div className="mt-16 border border-subtle bg-layer p-8">
                                <p className="text-[15px] leading-relaxed text-muted">
                                    Questions about this document? Reach us through the{' '}
                                    <Link
                                        to="/contact"
                                        className="font-semibold text-primary underline decoration-black/20 underline-offset-4 transition-colors hover:text-accent"
                                    >
                                        contact page
                                    </Link>{' '}
                                    and we will respond promptly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
