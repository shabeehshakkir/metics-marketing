import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NotFound() {
    usePageMeta('Page Not Found', 'The page you were looking for does not exist. Head back to the Metics platform overview or contact support.');
    return (
        <div className="relative overflow-hidden bg-paper">
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-8 select-none text-[8rem] font-light leading-none text-primary/[0.04] md:left-8 md:text-[12rem]"
            >
                404
            </span>

            <section className="relative border-b border-subtle pb-16 pt-12 md:min-h-[480px] md:pb-20 md:pt-16">
                <div className="site-wrap">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="max-w-3xl py-12 md:py-16"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">404</p>
                        <h1 className="mt-8 text-4xl font-light leading-[1.18] tracking-tight text-primary md:text-5xl lg:text-[3.375rem] lg:leading-[64px]">
                            This page is not part of the package.
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-6 text-muted md:text-lg md:leading-7">
                            The link may have moved, or the page may no longer exist in our record.
                        </p>
                        <div className="mt-10 flex flex-col gap-1 sm:flex-row">
                            <Link to="/" className="btn-primary">
                                Back to platform
                            </Link>
                            <Link to="/contact" className="btn-tertiary">
                                Contact support
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
