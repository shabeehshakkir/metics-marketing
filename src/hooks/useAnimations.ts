import { useEffect, useCallback } from 'react';

/**
 * Shared IntersectionObserver-based scroll reveal.
 * Triggers 'revealed' class when elements with
 * .reveal, .reveal-scale, .reveal-left, .reveal-right enter viewport.
 */
export function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

/**
 * Count-up animation for elements with data-count attribute.
 * Animates from 0 to the target number on scroll into view.
 */
export function useCountUp() {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('[data-count]');
        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (!e.isIntersecting) return;
                    const el = e.target as HTMLElement;
                    const target = el.dataset.count || '';
                    const isPercent = target.includes('%');
                    const isX = target.includes('\u00d7');
                    const num = parseInt(target.replace(/[^0-9]/g, ''));
                    const suffix = isPercent ? '%' : isX ? '\u00d7' : target.replace(/[0-9]/g, '');
                    let current = 0;
                    const step = Math.ceil(num / 40);
                    const timer = setInterval(() => {
                        current = Math.min(current + step, num);
                        el.textContent = current + suffix;
                        if (current >= num) clearInterval(timer);
                    }, 30);
                    obs.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );

        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

/**
 * Prefetch a route's JS chunk on link hover.
 * Call with the route module path, e.g. prefetch('./pages/Platform')
 */
const prefetched = new Set<string>();
export function usePrefetch() {
    return useCallback((path: string) => {
        if (prefetched.has(path)) return;
        prefetched.add(path);
        // Dynamic import triggers Vite to load the chunk
        import(/* @vite-ignore */ path).catch(() => { });
    }, []);
}
