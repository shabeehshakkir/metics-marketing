import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:5173';
const OUT = '/tmp/metics-shots';

const routes = [
    ['home', '/'],
    ['platform', '/platform'],
    ['solutions', '/solutions'],
    ['industries', '/industries'],
    ['cases', '/case-studies'],
    ['insights', '/insights'],
    ['pricing', '/pricing'],
    ['contact', '/contact'],
    ['about', '/about'],
    ['faq', '/faq'],
    ['security', '/security'],
];

const widths = [
    ['desktop', 1440, 900],
    ['mobile', 390, 844],
];

const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
});

const results = [];
for (const [wName, width, height] of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    for (const [name, path] of routes) {
        await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise((r) => setTimeout(r, 400));
        // Scroll through the page to trigger whileInView animations
        await page.evaluate(async () => {
            const step = window.innerHeight * 0.7;
            for (let y = 0; y <= document.body.scrollHeight; y += step) {
                window.scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 120));
            }
            window.scrollTo(0, 0);
            await new Promise((r) => setTimeout(r, 400));
        });
        await new Promise((r) => setTimeout(r, 300));
        const overflow = await page.evaluate(() => {
            const doc = document.documentElement;
            return {
                scrollWidth: doc.scrollWidth,
                clientWidth: doc.clientWidth,
                overflowing: doc.scrollWidth > doc.clientWidth + 1,
            };
        });
        results.push({ route: name, width: wName, ...overflow });
        await page.screenshot({ path: `${OUT}/character-${name}-${wName}.png`, fullPage: true });
        console.log(`captured ${name} @ ${wName}${overflow.overflowing ? '  << HORIZONTAL OVERFLOW: ' + overflow.scrollWidth + ' vs ' + overflow.clientWidth : ''}`);
    }
    await page.close();
}

await browser.close();
const bad = results.filter((r) => r.overflowing);
console.log(bad.length ? `\nOVERFLOW ISSUES:\n${JSON.stringify(bad, null, 2)}` : '\nNo horizontal overflow on any page.');
