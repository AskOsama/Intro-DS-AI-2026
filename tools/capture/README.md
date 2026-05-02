# Demo GIF capture

Headless-Chromium scripts that capture animated demos as optimized GIFs for the
landing-page previews.

## Prereqs
- Node 18+
- Google Chrome at `/usr/bin/google-chrome` (or edit `executablePath` in each script)
- `ffmpeg` on PATH
- From repo root: `npm install puppeteer-core`

## Re-generate the GIFs
```sh
node tools/capture/capture_memory_game.js
ffmpeg -y -framerate 8 -i images/previews/frames/memory/f%03d.png \
    -vf "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4" \
    images/previews/memory_game.gif

node tools/capture/capture_heuristic.js
ffmpeg -y -framerate 8 -i images/previews/frames/heuristic/f%03d.png \
    -vf "fps=8,scale=380:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4" \
    images/previews/heuristic_demo.gif
```

The frame PNGs are gitignored; only the final GIFs are committed.

Both scripts disable `demo-polish.css` at runtime so the demos render with their
original vibrant card gradients (the polish stylesheet's `!important` overrides
strip the gradient for print/editorial consistency, which is wrong for a thumbnail).
