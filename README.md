# DS-AI 2026 — AI for Leaders

A self-contained 5-day intensive course on AI for public-sector leaders. Bilingual (English + Modern Standard Arabic), no coding required, includes interactive demos.

This directory is independent — you can zip it and upload it as a single static site.

## Directory layout

```
.
├── index.html          — English landing page
├── index_ar.html       — Arabic landing page
├── styles.css          — Stylesheet for demos & references
├── landing.css         — Stylesheet for index & module pages
├── README.md
│
├── modules/            — The 5 day-modules (EN + AR each)
│   ├── module1.html    Day 1 — What AI Is + Using AI Today
│   ├── module1_ar.html
│   ├── module2.html    Day 2 — Directing AI: From Chatbots to Agents
│   ├── module2_ar.html
│   ├── module3.html    Day 3 — Big Data, Privacy & Sovereignty
│   ├── module3_ar.html
│   ├── module4.html    Day 4 — How AI Reasons
│   ├── module4_ar.html
│   ├── module5.html    Day 5 — Capstone Workshop
│   └── module5_ar.html
│
├── demos/              — Self-contained interactive demos (most have AR variants)
│   ├── baloot_game*.html             Watch / play the Saudi card game vs AI
│   ├── deanonymization_demo*.html    The $20 Attack made tangible
│   ├── privacy_budget_tracker.html   Differential privacy
│   ├── vid_dag*.html                 DAG visualization
│   ├── memory_game_demo.html         Search-space intuition
│   ├── heuristic_demo.html           Random vs sequential vs heuristic
│   ├── objective_function_demo*.html Pareto front explorer
│   ├── family_inference_demo*.html   KBS rule firing
│   ├── activation_functions_demo*.html  Sigmoid/ReLU/Tanh visualizer
│   ├── ml-viz-v2.html                ML algorithm decision boundaries
│   ├── entropy_calculator_demo.html  Shannon entropy
│   └── data_*.html                   Sample datasets used by the de-anon demo
│
├── references/         — Background reading
│   ├── ai_smartphone_apps*.html        Guide to ChatGPT/Claude/Gemini/Copilot
│   ├── AI_History_*.html               Narrative history of AI
│   ├── distributed_tools_reference*.html
│   ├── optimization_solvers_reference*.html
│   └── ml_resources*.html
│
├── images/             — SVG diagrams (bilingual) and reference images
└── js/                 — JavaScript bundles for demos that load external scripts
```

## How to deploy

Drop the entire directory on any static web host (or open `index.html` in a browser locally). No build step, no server-side code, no external dependencies except the Google Fonts CDN for the Arabic typeface (loaded automatically by the Arabic pages).

## Audience

Government and enterprise leaders who must evaluate AI proposals, ask the right procurement questions, classify data correctly under PDPL & NDMO, and identify AI opportunities in their own work. **No prior programming or technical background required.**

## License

CC BY 4.0. Attribution: "DS-AI Course Materials, licensed under CC BY 4.0." Materials are adapted and condensed from the open DS-AI parent course.
