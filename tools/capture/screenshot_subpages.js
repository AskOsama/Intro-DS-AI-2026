// Snapshot the four new sub-pages so we can audit alignment visually.
const puppeteer = require('puppeteer-core');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'images', 'previews', 'frames', 'audit');
const fs = require('fs');
fs.mkdirSync(OUT, { recursive: true });

const pages = [
    'references/agent_patterns.html',
    'references/agent_patterns_ar.html',
    'references/prompt_patterns.html',
    'references/prompt_patterns_ar.html',
];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 1100, height: 1400, deviceScaleFactor: 1 },
    });
    const page = await browser.newPage();
    for (const rel of pages) {
        const url = 'file://' + path.join(ROOT, rel);
        await page.goto(url, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 600)); // let webfonts settle
        const name = rel.replace(/\//g, '_').replace('.html', '.png');
        await page.screenshot({ path: path.join(OUT, name), fullPage: true });
        console.log('captured', name);
    }
    await browser.close();
})();
