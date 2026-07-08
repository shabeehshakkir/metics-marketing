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
 * (desktop), prose sections with serif headings on the right.
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
            <section className="border-b border-black/[0.08]">
                <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-8 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="max-w-3xl"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
                        <h1 className="mt-5 font-serif text-4xl leading-[1.06] tracking-tight text-primary md:text-6xl">
                            {title}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary/65">{intro}</p>
                        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 py-1.5 text-xs font-medium text-primary/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                            Last updated: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Body */}
            <section>
                <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-20">
                    <div className="grid gap-14 lg:grid-cols-[260px_1fr] lg:gap-20">
                        {/* Table of contents */}
                        <nav aria-label="Table of contents" className="hidden lg:block">
                            <div className="sticky top-28">
                                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/40">
                                    On this page
                                </p>
                                <ol className="space-y-1 border-l border-black/[0.08]">
                                    {sections.map((section, i) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className={`-ml-px block border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200 ${
                                                    activeId === section.id
                                                        ? 'border-accent font-semibold text-primary'
                                                        : 'border-transparent text-primary/50 hover:text-primary'
                                                }`}
                                            >
                                                <span className="mr-2 font-serif text-primary/30">{i + 1}.</span>
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
                                    className={`scroll-mt-28 ${i > 0 ? 'mt-14 border-t border-black/[0.08] pt-14' : ''}`}
                                >
                                    <h2 className="font-serif text-2xl tracking-tight text-primary md:text-3xl">
                                        <span className="mr-3 text-primary/25">{i + 1}.</span>
                                        {section.heading}
                                    </h2>
                                    <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-primary/70 md:text-base">
                                        {section.body}
                                    </div>
                                </section>
                            ))}

                            <div className="mt-16 rounded-2xl border border-black/[0.08] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                                <p className="text-[15px] leading-relaxed text-primary/70">
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
