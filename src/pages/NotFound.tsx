import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NotFound() {
    usePageMeta('Page Not Found', 'The page you were looking for does not exist. Head back to the Metics platform overview or contact support.');
    return (
        <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-paper">
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[16rem] leading-none text-primary/[0.04] md:text-[26rem]"
            >
                404
            </span>

            <div className="mx-auto max-w-[1180px] px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="relative mx-auto max-w-2xl py-20 text-center md:py-28"
                >
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
                    <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-primary md:text-6xl">
                        This page is not part of the package.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary/65">
                        The link may have moved, or the page may no longer exist in our record.
                    </p>
                    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
                        >
                            Back to platform
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
                        >
                            Contact support
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
