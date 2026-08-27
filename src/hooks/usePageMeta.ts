import { useEffect } from 'react';

const DEFAULT_TITLE = 'Metics | Procurement Decision Intelligence';

/**
 * Sets the document title ("Page | Metics") and meta description for a route.
 * Pass no title for the home page to keep the default site title.
 */
export function usePageMeta(title: string | undefined, description: string) {
    useEffect(() => {
        document.title = title ? `${title} | Metics` : DEFAULT_TITLE;

        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
        }
        meta.content = description;
    }, [title, description]);
}
