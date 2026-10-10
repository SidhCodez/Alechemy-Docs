```markdown
# DEPLOYMENT.md
## Alchemy Docs — Deployment & Automation Guide

### 1. Purpose of This Document
This document defines the complete deployment strategy for the Alchemy Docs documentation website. It covers the Vercel configuration, GitHub integration, build commands, environment setup, custom domain configuration, and rollback procedures. The goal is a **zero-touch deployment pipeline**: push to GitHub → site updates automatically.

### 2. Deployment Architecture Overview

```text
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│                  │        │                  │        │                  │
│   LOCAL MACHINE  │───────▶│     GITHUB       │───────▶│     VERCEL       │
│                  │  push  │                  │webhook │                  │
│  mdbook serve    │        │  main branch     │        │  Build + Deploy  │
│  mdbook build    │        │  (Source of      │        │  (Global CDN)    │
│                  │        │   Truth)         │        │                  │
└──────────────────┘        └──────────────────┘        └──────────────────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────────┐
                                                        │                  │
                                                        │   LIVE SITE      │
                                                        │                  │
                                                        │  alchemy-docs.   │
                                                        │  vercel.app      │
                                                        │                  │
                                                        └──────────────────┘
```

### 3. Hosting Platform: Vercel

**Why Vercel:**
- Free tier covers all needs (static site).
- Automatic deployments on every GitHub push.
- Global CDN (fast load times worldwide).
- Automatic HTTPS/SSL.
- Built-in preview deployments for PRs.
- Zero DevOps overhead.

**Alternative Platforms:**
| Platform | Free Tier | Best For |
| :--- | :--- | :--- |
| **Vercel** | ✅ Generous | Recommended |
| **Netlify** | ✅ Generous | Similar features |
| **GitHub Pages** | ✅ Free | Simple, no build step |
| **Cloudflare Pages** | ✅ Free | Fast edge network |

### 4. Prerequisites

Before deploying, ensure:
- [ ] GitHub repository exists (`Alchemy-Docs`).
- [ ] Vercel account created (free tier).
- [ ] `docs/book.toml` is finalized.
- [ ] `docs/SUMMARY.md` is complete.
- [ ] All `.md` files are in `docs/src/`.
- [ ] `mdbook build docs` runs successfully locally.

### 5. The `vercel.json` Configuration

Create a file named `vercel.json` at the **root** of your repository. This tells Vercel how to build and serve your site.

```json
{
  "version": 2,
  "buildCommand": "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install mdbook && mdbook build docs",
  "outputDirectory": "docs/book",
  "installCommand": "echo 'Skipping Node install'",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/",
      "destination": "/index.html"
    },
    {
      "source": "/docs/:path*",
      "destination": "/:path*"
    }
  ]
}
```

**Explanation of Each Field:**

| Field | Value | Purpose |
| :--- | :--- | :--- |
| `version` | `2` | Vercel API version |
| `buildCommand` | Rust + mdBook | Installs Rust, mdBook, and builds the site |
| `outputDirectory` | `docs/book` | Where mdBook outputs the static site |
| `installCommand` | echo | We don't need Node.js packages |
| `framework` | `null` | Tells Vercel this is a custom build |
| `cleanUrls` | `true` | Removes `.html` from URLs (cleaner links) |
| `trailingSlash` | `false` | No trailing slashes in URLs |
| `rewrites` | See above | Maps `/` to landing page, `/docs/*` to mdBook |

### 6. GitHub Actions Workflow (Optional but Recommended)

While Vercel can build automatically, using GitHub Actions gives you more control and lets you test the build before deploying.

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy Alchemy Docs

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable

      - name: Cache Cargo
        uses: actions/cache@v4
        with:
          path: |
            ~/.cargo/bin/
            ~/.cargo/registry/
            ~/.cargo/git/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}

      - name: Install mdBook and linkcheck
        run: |
          cargo install mdbook --no-confirm || true
          cargo install mdbook-linkcheck --no-confirm || true

      - name: Build the book
        run: mdbook build docs

      - name: Verify build output
        run: |
          test -f docs/book/index.html
          test -f docs/book/searchindex.json
          echo "Build verified successfully."

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: alchemy-docs-build
          path: docs/book/
```

**What This Does:**
- Runs on every push to `main` and every PR.
- Installs Rust, mdBook, and mdbook-linkcheck.
- Builds the site.
- Verifies the build output.
- Uploads the build as an artifact (for debugging).

**Vercel Integration:**
Vercel will still handle the actual deployment. The GitHub Action acts as a **quality gate** — if the build fails, you know immediately.

### 7. Step-by-Step Deployment Guide

#### Step 1: Push Code to GitHub

```bash
# From your project root
git add .
git commit -m "Initial commit: Alchemy Docs with Hackathon Alchemy framework"
git branch -M main
git remote add origin https://github.com/SidhCodez/Alchemy-Docs.git
git push -u origin main
```

#### Step 2: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"**.
3. Select **"Import Git Repository"**.
4. Find and select `Alchemy-Docs` from your GitHub repos.
5. Click **"Import"**.

#### Step 3: Configure Project Settings

On the configuration screen:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | Other |
| **Root Directory** | `./` (leave default) |
| **Build Command** | (Auto-detected from `vercel.json`) |
| **Output Directory** | (Auto-detected from `vercel.json`) |
| **Install Command** | (Auto-detected from `vercel.json`) |
| **Environment Variables** | None needed |

Click **"Deploy"**.

#### Step 4: Wait for First Deployment

Vercel will:
1. Clone your repository.
2. Install Rust.
3. Install mdBook.
4. Build the site.
5. Deploy to the global CDN.

This takes approximately **3-5 minutes** the first time (cached on subsequent deploys, ~1 minute).

#### Step 5: Verify Deployment

Once complete, Vercel provides a URL like:
```
https://alchemy-docs.vercel.app
```

Visit it and verify:
- [ ] Homepage loads.
- [ ] Sidebar shows all categories.
- [ ] Search works.
- [ ] Dark mode toggle works.
- [ ] All pages load.

### 8. Custom Domain Setup (Optional)

To use a custom domain like `alchemy-docs.com` or `docs.siddiq.dev`:

#### Step 1: Buy a Domain

Recommended registrars:
- [Namecheap](https://namecheap.com)
- [Cloudflare Registrar](https://cloudflare.com/products/registrar/) (cheapest)
- [Google Domains](https://domains.google)

#### Step 2: Add Domain to Vercel

1. Go to your project on Vercel.
2. Click **"Settings"** → **"Domains"**.
3. Enter your domain: `alchemy-docs.com`.
4. Click **"Add"**.

#### Step 3: Configure DNS

Vercel will show you DNS records to add at your registrar:

**Option A (Recommended): Using Vercel Nameservers**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Using A/CNAME Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step 4: Wait for DNS Propagation

Takes 5 minutes to 48 hours (usually < 1 hour).

#### Step 5: Verify SSL

Vercel automatically provisions an SSL certificate. Check:
- [ ] `https://alchemy-docs.com` loads.
- [ ] SSL is valid (green lock in browser).
- [ ] HTTP redirects to HTTPS.

### 9. Environment Variables

**Good news:** No environment variables are needed for the documentation site.

For Phase 2 (Landing Page), you may need:
- `NEXT_PUBLIC_SITE_URL` (for OG images)
- Analytics keys (if using Vercel Analytics)

But for Phase 1 (Documentation), the site is fully static.

### 10. Automatic Deployment

Once connected, every push to `main` triggers an automatic deployment:

```text
Developer pushes to main
        │
        ▼
GitHub sends webhook to Vercel
        │
        ▼
Vercel starts a new build
        │
        ▼
Rust + mdBook installed
        │
        ▼
mdbook build docs runs
        │
        ▼
Build succeeds → Deploy to CDN
        │
        ▼
Live URL updated in ~60 seconds
```

**Preview Deployments:**
Every Pull Request creates a **preview deployment** with a unique URL. This lets you review changes before merging to `main`.

### 11. Rollback Strategy

If a deployment breaks the site:

#### Method 1: Vercel Dashboard (Fastest)

1. Go to **Deployments** in Vercel.
2. Find the last working deployment.
3. Click **"..."** → **"Promote to Production"**.
4. Site is instantly reverted.

#### Method 2: Git Revert

```bash
git revert HEAD
git push origin main
```
Vercel will build and deploy the reverted commit.

#### Method 3: Hotfix

Fix the issue locally, commit, and push:
```bash
git add .
git commit -m "Fix: correct broken link in PRD.md"
git push origin main
```

### 12. Post-Deployment Verification

After every deployment, run this checklist:

**Immediate (First 5 Minutes):**
- [ ] Site loads at the live URL.
- [ ] Homepage (`introduction.md`) renders.
- [ ] Sidebar shows all categories.
- [ ] Search returns results.
- [ ] Dark mode toggle works.
- [ ] No console errors in DevTools.

**Critical Path (First 30 Minutes):**
- [ ] Click through 10 random pages.
- [ ] Test 404 page (`/nonexistent-page`).
- [ ] Test search on mobile.
- [ ] Verify HTTPS (green lock).
- [ ] Check Vercel dashboard for build warnings.

**Broader (First 24 Hours):**
- [ ] Run Lighthouse audit.
- [ ] Test on real mobile device.
- [ ] Check analytics (if configured).
- [ ] Submit sitemap to Google Search Console (Phase 2).

### 13. Monitoring & Analytics

**Vercel Built-In:**
- Deploy logs.
- Build duration.
- Bandwidth usage.
- Error logs (rare for static sites).

**Optional Add-Ons (Phase 2):**
| Tool | Purpose | Cost |
| :--- | :--- | :--- |
| Vercel Analytics | Traffic insights | Free tier |
| Plausible | Privacy-first analytics | $9/mo |
| Umami | Self-hosted analytics | Free |
| Google Search Console | SEO monitoring | Free |

### 14. Common Deployment Issues & Fixes

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| **Build fails: `mdbook: command not found`** | Rust/mdBook not installed | Ensure `vercel.json` installs Rust |
| **Build fails: `File not found`** | Bad path in `SUMMARY.md` | Fix path, commit, push |
| **404 on all pages** | Wrong `outputDirectory` | Set to `docs/book` in `vercel.json` |
| **Site loads with no styles** | CSS not copied | Check `additional-css` in `book.toml` |
| **Search doesn't work** | `searchindex.json` missing | Rebuild; verify mdBook output |
| **Slow build times** | No caching | Vercel auto-caches; first build is slowest |
| **HTTPS not working** | DNS not propagated | Wait up to 48 hours |
| **Custom domain shows error** | Wrong DNS records | Verify A/CNAME records |

### 15. Cost Breakdown

| Item | Cost | Notes |
| :--- | :--- | :--- |
| **Vercel Hosting** | $0 | Free tier: 100GB bandwidth/month |
| **GitHub Repo** | $0 | Public repo |
| **Custom Domain** | ~$10/year | Optional |
| **SSL Certificate** | $0 | Auto-provisioned by Vercel |
| **Build Minutes** | $0 | Free tier: 6,000 minutes/month |
| **Total (Phase 1)** | **$0** | Fully free |
| **Total (with domain)** | **~$10/year** | Optional upgrade |

### 16. Deployment Checklist

**Pre-Deployment:**
- [ ] `mdbook build docs` succeeds locally.
- [ ] `mdbook-linkcheck` shows no broken links.
- [ ] `vercel.json` is present in repo root.
- [ ] `book.toml` has `additional-css` configured.
- [ ] All content is committed and pushed.

**Deployment:**
- [ ] Vercel connected to GitHub repo.
- [ ] Build succeeds (check Vercel dashboard).
- [ ] Live URL is accessible.
- [ ] SSL certificate active.

**Post-Deployment:**
- [ ] Homepage loads correctly.
- [ ] Sidebar navigation works.
- [ ] Search returns results.
- [ ] Mobile view works.
- [ ] Dark mode toggle works.
- [ ] 404 page works.
- [ ] No console errors.
- [ ] Lighthouse score > 95.

**After 24 Hours:**
- [ ] Check Vercel analytics.
- [ ] Verify bandwidth usage is within free tier.
- [ ] Review deployment logs for warnings.
- [ ] Submit sitemap to search engines (Phase 2).

### 17. Summary Table

| Element | Value |
| :--- | :--- |
| **Hosting Platform** | Vercel |
| **Build Command** | Rust + mdBook + `mdbook build docs` |
| **Output Directory** | `docs/book` |
| **Auto-Deploy** | On push to `main` |
| **Preview Deployments** | On every PR |
| **Rollback Method** | Vercel dashboard or Git revert |
| **Custom Domain** | Optional |
| **SSL** | Automatic |
| **Cost (Phase 1)** | $0 |
| **Deploy Time** | ~60 seconds (cached) |
| **First Deploy** | ~3-5 minutes |
