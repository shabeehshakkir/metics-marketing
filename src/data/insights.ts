export type InsightArticle = {
    slug: string;
    category: string;
    heading: string;
    summary: string;
    date: string;
    published: string;
    body: string[];
};

const files = import.meta.glob('../../content/insights/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
        throw new Error('Insight markdown needs YAML frontmatter between --- markers.');
    }

    const fields: Record<string, string> = {};
    for (const line of match[1].split('\n')) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        fields[key] = value;
    }

    const body = match[2]
        .trim()
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\n/g, ' ').trim())
        .filter(Boolean);

    return { fields, body };
}

function slugFromPath(path: string) {
    const file = path.split('/').pop() ?? path;
    return file.replace(/\.md$/, '');
}

export const articles: InsightArticle[] = Object.entries(files)
    .map(([path, raw]) => {
        const { fields, body } = parseFrontmatter(raw);
        const slug = fields.slug || slugFromPath(path);
        return {
            slug,
            category: fields.category ?? 'Analysis',
            heading: fields.heading ?? slug,
            summary: fields.summary ?? '',
            date: fields.date ?? '',
            published: fields.published ?? fields.date ?? '',
            body,
        };
    })
    .sort((a, b) => b.published.localeCompare(a.published));

export const categories = ['All', ...[...new Set(articles.map((a) => a.category))]];

export function getInsight(slug: string | undefined) {
    if (!slug) return undefined;
    return articles.find((article) => article.slug === slug);
}

export function readingTime(article: InsightArticle) {
    const words = article.body.join(' ').split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
}
