// Headless capture of the heuristic-search demo running in AI Greedy mode.
// Starts a fresh game, sets a fast AI speed, lets it run for a few moves,
// snaps frames, then stitches via ffmpeg.

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..', '..');
const DEMO_URL = 'file://' + path.join(ROOT, 'demos', 'heuristic_demo.html');
const FRAMES_DIR = path.join(ROOT, 'images', 'previews', 'frames', 'heuristic');

(async () => {
    fs.mkdirSync(FRAMES_DIR, { recursive: true });
    for (const f of fs.readdirSync(FRAMES_DIR)) fs.unlinkSync(path.join(FRAMES_DIR, f));

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
        defaultViewport: { width: 720, height: 1100, deviceScaleFactor: 1 },
    });
    const page = await browser.newPage();
    await page.goto(DEMO_URL, { waitUntil: 'networkidle0' });

    // Disable demo-polish.css overrides so colors/gradients show through.
    await page.evaluate(() => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
            if (l.href.includes('demo-polish.css')) l.disabled = true;
        });
    });

    // Setup is already preset (ai-greedy, pairs, 8 cards). Click Start Game.
    await page.waitForSelector('.btn-start');
    await page.click('.btn-start');
    await page.waitForSelector('#gameArea:not(.hidden) .game-board .card', { timeout: 5000 });

    // AIPlayer is a const so it's only reachable via the onclick attribute the
    // demo wires up — click the button. Speed override has to happen post-start.

    const board = await page.$('.game-board');
    let frameIdx = 0;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const snap = async () => {
        const f = String(frameIdx).padStart(3, '0');
        // elementHandle.screenshot auto-scrolls and clips to the element,
        // which is more reliable than computing viewport-relative clip rects.
        await board.screenshot({ path: path.join(FRAMES_DIR, `f${f}.png`) });
        frameIdx++;
    };

    // Idle frame, then start AI via its onclick.
    await snap(); await sleep(150); await snap();
    await page.click('#btnAutoPlay');

    // Snap ~50 frames at 130ms = ~6.5s of action.
    for (let i = 0; i < 50; i++) {
        await sleep(130);
        await snap();
    }

    await browser.close();
    console.log(`Captured ${frameIdx} frames -> ${FRAMES_DIR}`);
})();
