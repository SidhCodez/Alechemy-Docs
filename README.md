# Alchemy Docs

> **The ultimate prompt framework for hackathons, builders, and creators.**

Alchemy Docs is a production-grade documentation platform built using [mdBook](https://github.com/rust-lang/mdBook), designed to host structured prompt frameworks including **Hackathon Alchemy** (20 categories, 4 phases, 330+ prompt packs) and future frameworks like **Builder Alchemy**.

---

## 🚀 Features

- **Docs-as-Code Architecture:** Pure Markdown source files compiled into an ultra-fast static website.
- **Client-Side Instant Search:** Global search powered by elasticlunr.js.
- **Dark & Light Mode:** Custom typography and responsive theme engineered according to `UI_SPEC.md`.
- **One-Click Copy Prompts:** Instant code copying for fast integration with AI assistants (Claude, ChatGPT, Cursor).
- **Automated CI/CD:** GitHub Actions test pipeline and continuous deployment to Vercel.

---

## 📁 Repository Structure

```text
alchemy-docs/
├── README.md               # Repository documentation
├── vercel.json             # Vercel deployment & routing configuration
├── .gitignore              # Git ignore rules
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD build & link verification workflow
│
├── blueprints/             # Architecture specifications (PRD, TRD, UI Spec, Sitemap)
│   ├── PROBLEM_ANALYSIS.md
│   ├── PRD.md
│   ├── TRD.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── sitemap.md
│   ├── UI SPEC.md
│   ├── error handling.md
│   ├── testing.md
│   └── deployemt.md
│
├── scripts/
│   └── build_docs.py       # Framework extraction & organization script
│
└── docs/                   # mdBook Root
    ├── book.toml           # mdBook configuration
    ├── SUMMARY.md          # Sidebar navigation tree
    ├── custom.css          # Branded styling & responsive rules
    └── src/                # Markdown content
        ├── introduction.md # Welcome landing page
        ├── 404.md          # Branded not found page
        ├── SUMMARY.md      # mdBook source summary
        │
        ├── hackathon-alchemy/
        │   ├── README.md   # Framework overview
        │   ├── how-to-use.md
        │   ├── 01-AI-ML/
        │   ├── 02-Non-AI/
        │   └── ... (20 Categories)
        │
        └── builder-alchemy/
            └── README.md   # Future framework overview
```

---

## 🛠️ Local Development

### Prerequisites
- [Rust toolchain](https://rustup.rs/)
- [mdBook](https://github.com/rust-lang/mdBook) (v0.4.52 recommended)
- [mdbook-linkcheck](https://github.com/Michael-F-Bryan/mdbook-linkcheck) (v0.7.7)

### Installation
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install mdBook & linkcheck
cargo install mdbook --version 0.4.52
cargo install mdbook-linkcheck
```

### Local Preview
```bash
# Serve docs locally with live-reload at http://localhost:3000
mdbook serve docs

# Build static output to docs/book/
mdbook build docs

# Verify links
mdbook-linkcheck -s docs
```

---

## 🌐 Deployment to Vercel

The site is configured for zero-touch automatic deployment via `vercel.json`:

1. Push changes to `main`:
   ```bash
   git push origin main
   ```
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Vercel automatically runs the build command specified in `vercel.json` and distributes the output to its global CDN.

---

## 📄 License & Credits
Content sourced and organized from [Hackathon Alchemy](https://github.com/SidhCodez/Hackathon-Alchemy).
Built and maintained by [Siddiq](https://github.com/SidhCodez).
