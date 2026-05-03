// Detail screenshots focused on specific elements that are likely misaligned.
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'images', 'previews', 'frames', 'audit');
fs.mkdirSync(OUT, { recursive: true });

const targets = [
    { file: 'references/agent_patterns.html', name: 'en-header', sel: '.module-header' },
    { file: 'references/agent_patterns.html', name: 'en-toc', sel: '.module-toc' },
    { file: 'references/agent_patterns.html', name: 'en-diagram', sel: '#prompt-chaining' },
    { file: 'references/agent_patterns.html', name: 'en-blockquote', sel: '#workflow-vs-agent blockquote' },
    { file: 'references/agent_patterns.html', name: 'en-nav', sel: '.module-nav' },

    { file: 'references/agent_patterns_ar.html', name: 'ar-header', sel: '.module-header' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-toc', sel: '.module-toc' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-diagram', sel: '#prompt-chaining' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-routing', sel: '#routing' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-orchestrator', sel: '#orchestrator-workers' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-blockquote', sel: '#workflow-vs-agent blockquote' },
    { file: 'references/agent_patterns_ar.html', name: 'ar-nav', sel: '.module-nav' },

    { file: 'references/prompt_patterns.html', name: 'en-pp-compare', sel: '#role' },
    { file: 'references/prompt_patterns.html', name: 'en-pp-callout', sel: '#examples' },
    { file: 'references/prompt_patterns_ar.html', name: 'ar-pp-compare', sel: '#role' },
    { file: 'references/prompt_patterns_ar.html', name: 'ar-pp-callout', sel: '#examples' },
];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 1100, height: 900, deviceScaleFactor: 2 },
    });
    const page = await browser.newPage();
    let lastFile = null;
    for (const t of targets) {
        if (t.file !== lastFile) {
            await page.goto('file://' + path.join(ROOT, t.file), { waitUntil: 'networkidle0' });
            await new Promise(r => setTimeout(r, 500));
            lastFile = t.file;
        }
        const el = await page.$(t.sel);
        if (!el) { console.log('MISSING', t.name, t.sel); continue; }
        await el.screenshot({ path: path.join(OUT, `detail-${t.name}.png`) });
        console.log('captured detail-' + t.name);
    }
    await browser.close();
})();
