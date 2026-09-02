import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const STATIC_URLS: { loc: string; changefreq: string; priority: string }[] = [
  { loc: 'https://www.metics.net/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://www.metics.net/platform', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://www.metics.net/solutions', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://www.metics.net/industries', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://www.metics.net/case-studies', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://www.metics.net/case-studies/construction-forty-packages', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://www.metics.net/case-studies/manufacturing-supplier-concentration', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://www.metics.net/case-studies/energy-approval-packages', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://www.metics.net/case-studies/government-award-records', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://www.metics.net/insights', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://www.metics.net/pricing', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://www.metics.net/contact', changefreq: 'yearly', priority: '0.8' },
  { loc: 'https://www.metics.net/about', changefreq: 'yearly', priority: '0.6' },
  { loc: 'https://www.metics.net/faq', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://www.metics.net/security', changefreq: 'yearly', priority: '0.6' },
  { loc: 'https://www.metics.net/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://www.metics.net/terms', changefreq: 'yearly', priority: '0.3' },
];

function insightSlugs() {
  const dir = path.resolve('content/insights');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();
}

function writeSitemap() {
  const urls = [
    ...STATIC_URLS.slice(0, 10),
    ...insightSlugs().map((slug) => ({
      loc: `https://www.metics.net/insights/${slug}`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
    ...STATIC_URLS.slice(10),
  ];

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  fs.writeFileSync(
    path.resolve('public/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
}

function insightPagesPlugin(): Plugin {
  return {
    name: 'insight-pages',
    buildStart() {
      writeSitemap();
    },
    configureServer(server) {
      writeSitemap();
      const dir = path.resolve('content/insights');
      server.watcher.add(dir);
    },
  };
}

export default defineConfig({
  plugins: [react(), insightPagesPlugin()],
  server: {
    host: true,
    port: 5173,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      'X-Permitted-Cross-Domain-Policies': 'none',
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
