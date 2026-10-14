# 🧠 CONTEXT FOR AI BRAIN — Alchemy Docs Project

> **Purpose:** This document is the single source of truth for any AI assistant picking up work on this project. Read this fully before making any changes. It captures everything built, every bug fixed, where we stopped, and what the exact correct workflow is.

---

## 1. PROJECT IDENTITY

| Property | Value |
|---|---|
| **Project Name** | Alchemy Docs |
| **Tagline** | The Ultimate Prompt Framework for Builders |
| **Owner / Author** | Siddiq (SidhCodez) |
| **GitHub Repo** | `https://github.com/SidhCodez/Alechemy-Docs` (note: typo in URL is intentional, repo name is "Alechemy") |
| **Main Branch** | `main` |
| **Local Path** | `/home/siddiq/Sidh-Files/SOURCE-CODES/Alechemy-docs` |
| **Deployed on** | Vercel (auto-deploys on every push to `main`) |
| **Current Status** | ✅ Live. Landing page + full docs are deployed. |

---

## 2. WHAT THIS PROJECT IS

Alchemy Docs is a **structured prompt framework documentation site** for hackathon participants, builders, and developers. It gives AI-ready, categorized prompt templates covering every angle of building a software project — from problem analysis to deployment.

The project has **two distinct parts** that are built together and deployed as one site:

1. **The Landing Page** — A Next.js (React) marketing page at the root `/`
2. **The Docs** — An mdBook-generated static site served at `/docs/`

---

## 3. FULL DIRECTORY STRUCTURE

```
Alechemy-docs/
├── build.sh                    ← Master build script. Run this to build everything.
├── vercel.json                 ← Vercel deployment config
├── CONTEXT_FOR_AI_BRAIN.md    ← This file
├── README.md                   ← Public-facing project readme
├── .gitignore
│
├── scripts/
│   └── fix-paths.js            ← CRITICAL post-build script (see Section 7)
│
├── docs/                       ← mdBook source
│   ├── book.toml               ← mdBook config
│   ├── SUMMARY.md              ← THE sidebar/routing registry (must update for new pages)
│   ├── custom.css              ← Custom theme for the docs
│   ├── custom.js               ← Custom JS (expand/collapse sidebar controls)
│   └── src/
│       ├── introduction.md
│       ├── hackathon-alchemy/  ← All 20 hackathon categories live here
│       └── builder-alchemy/    ← Future framework (stub only)
│
├── landing/                    ← Next.js 14 app
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── package.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      ← Root layout, Inter font, Navbar + Footer
│   │   │   ├── page.tsx        ← Landing page composition
│   │   │   └── globals.css     ← CSS custom properties + Tailwind directives
│   │   └── components/
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── WhatIs.tsx
│   │       ├── Frameworks.tsx
│   │       ├── Footer.tsx
│   │       ├── InteractiveBackground.tsx
│   │       └── SmoothScroll.tsx
│   └── public/
│       └── docs/               ← mdBook output is COPIED here during build
│
└── .github/
    └── workflows/
        └── deploy.yml          ← GitHub Actions CI (build + verify, NOT deploy — Vercel handles deploy)
```

---

## 4. THE TECH STACK

### Landing Page
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS v3 with CSS custom properties
- **Icons:** `lucide-react`
- **Font:** Inter (via `next/font/google`)
- **Export mode:** Static export (`output: 'export'`) — generates flat HTML/CSS/JS files

### Documentation
- **Generator:** mdBook v0.4.52
- **Theme:** Custom dark theme via `docs/custom.css`
- **Sidebar:** Collapsible, fold enabled at level 0 (all collapsed by default)
- **Default theme:** Dark (forced via `book.toml`)

### Deployment
- **Platform:** Vercel
- **Build command:** `bash build.sh` (runs mdBook → fix-paths → Next.js)
- **Output directory:** `landing/out`
- **CI:** GitHub Actions (builds and verifies only, Vercel handles the actual deploy)

---

## 5. THE COLOR / DESIGN SYSTEM

All colors are defined as CSS custom properties in `landing/src/app/globals.css` and referenced in `landing/tailwind.config.ts`. Both the landing page and the docs use the same brand palette.

### Design Tokens (Dark Mode — Default)
```css
--bg-primary:    #0f1115   /* Page background */
--bg-secondary:  #161a22   /* Card/sidebar background */
--bg-tertiary:   #1e2330   /* Hover state backgrounds */
--text-primary:  #e6e6e6   /* Main body text */
--text-secondary:#8b949e   /* Muted/subdued text */
--accent-primary:#a78bfa   /* Purple — primary brand color, CTAs, links */
--accent-hover:  #c4b5fd   /* Lighter purple for hover states */
--border:        #30363d   /* All borders and dividers */
--success:       #34d399   /* Green — "live" badge, active states */
--warning:       #fbbf24   /* Amber — warnings */
--error:         #f87171   /* Red — error states */
```

### Tailwind Color Mapping
These custom properties are mapped in `tailwind.config.ts` so Tailwind utilities work:
```
bg-background    → var(--bg-primary)
bg-secondary     → var(--bg-secondary)
bg-tertiary      → var(--bg-tertiary)
text-foreground  → var(--text-primary)
text-muted       → var(--text-secondary)
bg-accent        → var(--accent-primary)
text-accent      → var(--accent-primary)
bg-accent-hover  → var(--accent-hover)
border-border    → var(--border)
bg-success       → var(--success)
text-success     → var(--success)
```

> **IMPORTANT:** The `tailwind.config.ts` does NOT include `darkMode: 'class'` for the docs — only for the landing page. The docs use their own CSS via `docs/custom.css`.

---

## 6. THE BUILD PIPELINE (build.sh)

The master build script `build.sh` runs in this exact order:

```bash
Step 1: mdbook build docs
        → Generates static HTML into docs/book/

Step 1.5: node scripts/fix-paths.js
          → Rewrites all relative asset paths in docs/book/**/*.html
          → to absolute paths starting with /docs/
          → (This is the CRITICAL CSS fix — see Section 7)

Step 2: cd landing && npm install

Step 3: rm -rf public/docs && cp -R ../docs/book/* public/docs/
        → Copies the fixed mdBook output into Next.js public folder

Step 4: npm run build
        → Runs Next.js static export → output to landing/out/
```

**The final deployed artifact is everything inside `landing/out/`.**

---

## 7. THE CRITICAL CSS BUG — FIXED (READ THIS CAREFULLY)

### The Problem
mdBook generates HTML pages with **relative paths** for CSS/JS assets. For example:
- A file at `docs/book/index.html` references `css/variables.css` (one level)
- A file at `docs/book/hackathon-alchemy/01-AI-ML/phase-2/SYSTEM_ARCHITECTURE.html` references `../../../css/variables.css` (three levels up)

When Vercel serves these as a **static site**, depending on whether it serves with or without trailing slashes, the browser can misinterpret the base directory, causing all CSS/JS to 404. This affected EVERY category page — especially deeply nested ones.

### The Fix — `scripts/fix-paths.js`
After mdBook builds, this Node.js script walks **every single `.html` file** in `docs/book/` and replaces all relative asset paths with absolute paths starting from `/docs/`:

**Before (relative — breaks on Vercel):**
```html
<link rel="stylesheet" href="../../../css/variables.css">
<link rel="stylesheet" href="../../../custom.css">
<script src="../../../book.js"></script>
```

**After (absolute — works everywhere):**
```html
<link rel="stylesheet" href="/docs/css/variables.css">
<link rel="stylesheet" href="/docs/custom.css">
<script src="/docs/book.js"></script>
```

It also rewrites the JavaScript variable:
```js
// Before
const path_to_root = "../../";
// After
const path_to_root = "/docs/";
```

**This script runs on EVERY build.** It is baked into `build.sh`. Do NOT remove it.

### The Assets It Fixes
```
css/           FontAwesome/      fonts/
favicon.svg    favicon.png
highlight.css  tomorrow-night.css  ayu-highlight.css  custom.css
book.js        elasticlunr.min.js  mark.min.js
searcher.js    searchindex.js      toc.js
```

---

## 8. THE DOCS CONTENT STRUCTURE (Hackathon Alchemy)

The main content framework has **20 categories** inside `docs/src/hackathon-alchemy/`:

| # | Category | Sub-structure |
|---|---|---|
| 01 | AI / ML Hackathons | 4 Phases |
| 02 | Non-AI / Traditional Software | 4 Phases |
| 03 | Automation & Workflow | 4 Phases |
| 04 | No-Code / Low-Code | 4 Phases |
| 05 | Data Analytics | 4 Phases |
| 06 | Web3 / Blockchain | 4 Phases |
| 07 | IoT | 4 Phases |
| 08 | AR/VR | 4 Phases |
| 09 | Cybersecurity | 4 Phases |
| 10 | Cloud DevOps | 4 Phases |
| 11 | Domain / Industry | 4 Phases |
| 12 | Creative / Gaming | 4 Phases |
| 13 | Social & Civic Tech | 4 Phases |
| 14 | Open Innovation | 4 Phases |
| 15 | Beginner / Student | 4 Phases |
| 16 | Platform-Sponsored | 4 Phases |
| 17 | Debugging | Dedicated sections |
| 18 | System Design | 8 Dimensions |
| 19 | SEO Optimization | 8 Pillars |
| 20 | Scalability | 10 Layers |

**Builder Alchemy** — exists as a stub category (`docs/src/builder-alchemy/README.md`) with "Coming Soon" status. The landing page Frameworks section shows it as a locked/greyed-out card.

### The 4-Phase Pattern (Standard)
Most hackathon categories follow this phase structure:
- **Phase 1:** Problem Definition (`PROBLEM_ANALYSIS.md`, `PRD.md`, `TRD.md`)
- **Phase 2:** Technical Blueprint (`SYSTEM_ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, `API_SPECIFICATION.md`, etc.)
- **Phase 3:** Execution & Quality (`UI_SPEC.md`, `ERROR_HANDLING.md`, `SECURITY.md`, `TESTING.md`, `EVALUATION.md`)
- **Phase 4:** Delivery & Presentation (`DEPLOYMENT.md`, `DEMO_SCRIPT.md`, `GLOSSARY.md`)

---

## 9. HOW TO ADD NEW CONTENT (The Correct Workflow)

> **The golden rule: mdBook does NOT auto-discover files. Every new `.md` file MUST be registered in `docs/SUMMARY.md` or it will be completely ignored.**

### Step-by-Step: Adding a New Category

```
1. Create the folder structure inside docs/src/
   e.g., docs/src/hackathon-alchemy/21-My-New-Category/
         docs/src/hackathon-alchemy/21-My-New-Category/README.md
         docs/src/hackathon-alchemy/21-My-New-Category/phase-1/README.md
         docs/src/hackathon-alchemy/21-My-New-Category/phase-1/MY_PROMPT.md

2. Register EVERY file in docs/SUMMARY.md
   ## 21. My New Category
   - [Category Overview](hackathon-alchemy/21-My-New-Category/README.md)
     - [Phase 1: Problem Definition](hackathon-alchemy/21-My-New-Category/phase-1/README.md)
       - [My Prompt](hackathon-alchemy/21-My-New-Category/phase-1/MY_PROMPT.md)

3. git add . && git commit -m "Add 21-My-New-Category" && git push

4. Vercel automatically deploys. Done.
```

### Step-by-Step: Adding a Single New `.md` File to an Existing Category

```
1. Create the file, e.g.:
   docs/src/hackathon-alchemy/01-AI-ML/phase-2/VECTOR_DB.md

2. Add one line to docs/SUMMARY.md under the right parent:
       - [VECTOR_DB](hackathon-alchemy/01-AI-ML/phase-2/VECTOR_DB.md)

3. git add . && git commit && git push → auto-deployed
```

---

## 10. KNOWN ISSUES AND THINGS NOT YET DONE

### ⚠️ Known Issues
- **Google Fonts timeout on local build without internet:** The Next.js build uses `next/font/google` to load Inter. In offline/sandboxed environments, this fails. On Vercel (with internet), it works fine. Locally, the font occasionally fails and the build crashes. Retry the build if this happens — it's flaky on network timeout, not a code error.

- **`tailwind.config.ts` missing `success`/`warning`/`error` colors in some older builds:** Fixed in the current commit. The `tailwind.config.ts` now correctly maps `--success`, `--warning`, and `--error` CSS variables so `bg-success`, `text-success`, etc. work. If reverting commits, re-check this.

### 🔜 Things Not Yet Done / Future Work
- **Builder Alchemy framework** — The second main framework (for non-hackathon product builders) is planned but only has a stub README. The landing page Frameworks card is greyed out and says "Coming Soon."
- **ESLint config** — When running `npm run lint` for the first time, it interactively asks which config to use. Choose "Strict". An `.eslintrc.json` file has not been committed yet, so lint requires interactive setup on fresh installs.
- **No custom 404 page** on the Next.js side — only the mdBook 404.html exists.
- **No analytics** integrated yet.
- **Landing page `/docs` link** — Points to `/docs` (the mdBook root). This works correctly after the path-fix script runs.

---

## 11. KEY FILES QUICK REFERENCE

| File | What It Does |
|---|---|
| `build.sh` | Master build script — run this to build everything |
| `vercel.json` | Vercel config: build command, output dir, trailingSlash |
| `scripts/fix-paths.js` | Post-mdbook script that makes all doc CSS absolute |
| `docs/SUMMARY.md` | Sidebar + page routing registry for all 557 lines of docs |
| `docs/book.toml` | mdBook config: theme, site-url, CSS/JS extras |
| `docs/custom.css` | The entire visual theme for the documentation site |
| `docs/custom.js` | Sidebar expand/collapse all buttons functionality |
| `landing/tailwind.config.ts` | Maps CSS vars to Tailwind utility class names |
| `landing/src/app/globals.css` | The master CSS variables (brand palette) |
| `landing/src/app/layout.tsx` | Root HTML shell: Inter font, Navbar, Footer, dark class |
| `landing/src/app/page.tsx` | Landing page sections composition |
| `landing/next.config.js` | Next.js: static export mode, image optimization off |
| `.github/workflows/deploy.yml` | CI: builds on push, uploads artifact, does NOT deploy |

---

## 12. GIT COMMIT HISTORY CONTEXT (Recent)

| Commit | What Changed |
|---|---|
| `f0b839e` | Reverted to the original simpler landing page (previous GSAP/cinematic version removed) |
| `dd5c119` | Tried a gold/amber Alchemy theme with Space Grotesk font |
| `5683c22` | Added GSAP ScrollTrigger, Lenis smooth scroll (later reverted) |
| `b1d07b4` | **THE BIG CSS FIX** — Added `scripts/fix-paths.js` to rewrite all mdBook paths to absolute `/docs/` paths |
| `501a4d3` | Adjusted Vercel cleanUrls + trailingSlash to fix CSS for category pages |
| `ef61d73` | Added `success`, `warning`, `error` colors to `tailwind.config.ts`; fixed live badge visibility |
| `91141b4` | Initial Next.js landing page + mdBook integration |

---

## 13. ENVIRONMENT & TOOLS

- **Node.js:** v20 (used in CI and locally)
- **mdBook:** v0.4.52 (binary auto-downloaded in CI if not present)
- **Next.js:** 14.2.35
- **Tailwind CSS:** v3.3.x
- **TypeScript:** v5.x
- **OS:** Linux (Ubuntu on CI, Linux locally)
- **Package manager:** npm

---

## 14. VERCEL CONFIGURATION

```json
{
  "buildCommand": "bash build.sh || bash ../build.sh",
  "outputDirectory": "landing/out",
  "framework": null,
  "trailingSlash": true
}
```

> **Why `framework: null`?** Vercel auto-detects Next.js, but because the output is a custom static export orchestrated by `build.sh` from the repo root (not the `landing/` folder), `framework: null` is required so Vercel doesn't try to run its own Next.js build logic and override our pipeline.

> **Why `trailingSlash: true`?** This ensures directory URLs (like `/docs`, `/docs/hackathon-alchemy/01-AI-ML`) get a trailing slash appended, which is required for the browser to correctly resolve relative and absolute asset paths. Without it, the CSS would break for index pages.

---

## 15. IMPORTANT WARNINGS FOR ANY AI WORKING ON THIS

1. **NEVER remove `scripts/fix-paths.js` from the build pipeline.** Every mdBook rebuild wipes and regenerates the HTML with fresh relative paths. The fix script must always run after `mdbook build`.

2. **NEVER edit files inside `landing/public/docs/` or `landing/out/` directly.** These are generated directories — they get wiped and regenerated on every build. All source edits go in `docs/src/`.

3. **NEVER edit files inside `docs/book/` directly.** Same reason — generated output.

4. **If adding a new `.md` file, ALWAYS update `docs/SUMMARY.md`.** This is the most common mistake. The file will exist on disk but will never appear in the docs without a SUMMARY.md entry.

5. **The font (Inter) is loaded via `next/font/google`.** This requires internet access during `npm run build`. On Vercel it always works. Locally it may timeout. If build fails with `NextFontError`, retry or temporarily replace with `font-family: system-ui` in globals.css for local testing.

6. **`landing/tailwind.config.ts` MUST include all color tokens** that are used as Tailwind classes in any component. If you add a new CSS variable, also add it to the tailwind config.

---

*Last updated: October 14, 2026 | By: Antigravity AI (Google DeepMind)*
