// Headless capture of the memory-game card-flip animation.
// Uses the demo as-is, reads the shuffled emoji order from the DOM after init,
// and clicks a deterministic mismatch + match sequence so the GIF is reproducible.

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..', '..');
const DEMO_URL = 'file://' + path.join(ROOT, 'demos', 'memory_game_demo.html');
const FRAMES_DIR = path.join(ROOT, 'images', 'previews', 'frames', 'memory');

(async () => {
    fs.mkdirSync(FRAMES_DIR, { recursive: true });
    for (const f of fs.readdirSync(FRAMES_DIR)) fs.unlinkSync(path.join(FRAMES_DIR, f));

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
        defaultViewport: { width: 520, height: 560, deviceScaleFactor: 1 },
    });
    const page = await browser.newPage();
    await page.goto(DEMO_URL, { waitUntil: 'networkidle0' });

    await page.waitForSelector('.game-board .card', { timeout: 5000 });

    // demo-polish.css applies !important overrides that strip the card gradient;
    // disable it so the GIF shows the demo's intended vibrant flip styling.
    await page.evaluate(() => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
            if (l.href.includes('demo-polish.css')) l.disabled = true;
        });
    });

    // Read the emoji-by-index map; pick a non-matching pair then a matching pair.
    const plan = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.game-board .card'));
        const emojis = cards.map(c => c.dataset.emoji);
        // Find first two indices with different emojis (mismatch demo)
        let mis = null;
        for (let i = 0; i < emojis.length && !mis; i++) {
            for (let j = i + 1; j < emojis.length && !mis; j++) {
                if (emojis[i] !== emojis[j]) mis = [i, j];
            }
        }
        // Find first matching pair NOT overlapping the mismatch indices
        let mat = null;
        const used = new Set(mis);
        for (let i = 0; i < emojis.length && !mat; i++) {
            if (used.has(i)) continue;
            for (let j = i + 1; j < emojis.length && !mat; j++) {
                if (used.has(j)) continue;
                if (emojis[i] === emojis[j]) mat = [i, j];
            }
        }
        return { mis, mat };
    });

    const board = await page.$('.game-board');
    const box = await board.boundingBox();
    const clip = {
        x: Math.floor(box.x),
        y: Math.floor(box.y),
        width: Math.ceil(box.width),
        height: Math.ceil(box.height),
    };

    let frameIdx = 0;
    const snap = async () => {
        const f = String(frameIdx).padStart(3, '0');
        await page.screenshot({ path: path.join(FRAMES_DIR, `f${f}.png`), clip });
        frameIdx++;
    };
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const clickIdx = async (i) => {
        await page.evaluate((i) => {
            document.querySelectorAll('.game-board .card')[i].click();
        }, i);
    };

    // Idle beat
    await snap(); await sleep(120); await snap();

    // Mismatch sequence: click first card, snap; click second card, snap during reveal,
    // wait for the 1000ms auto-flip-back, snap during flip-back.
    await clickIdx(plan.mis[0]);
    for (let i = 0; i < 4; i++) { await sleep(80); await snap(); }
    await clickIdx(plan.mis[1]);
    for (let i = 0; i < 6; i++) { await sleep(120); await snap(); }
    // The flip-back fires at 1000ms after the second click; snap a few frames during/after.
    await sleep(300);
    for (let i = 0; i < 4; i++) { await sleep(120); await snap(); }

    // Match sequence: green pulse on success.
    await clickIdx(plan.mat[0]);
    for (let i = 0; i < 4; i++) { await sleep(80); await snap(); }
    await clickIdx(plan.mat[1]);
    for (let i = 0; i < 8; i++) { await sleep(120); await snap(); }

    await browser.close();
    console.log(`Captured ${frameIdx} frames -> ${FRAMES_DIR}`);
    console.log(`Plan: mismatch ${plan.mis} match ${plan.mat}`);
})();
