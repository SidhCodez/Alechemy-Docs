```markdown
# ERROR_HANDLING.md
## Alchemy Docs — Error Handling & Resilience

### 1. Purpose of This Document
This document defines how the Alchemy Docs documentation website handles errors, broken links, missing pages, and unexpected failures. Since the site is fully static (no backend), error handling focuses on graceful fallbacks, clear messaging, and pre-emptive checks during the build process.

### 2. Error Categories
Even a static documentation site can encounter errors. We categorize them into four types:

| Category | Type | Impact | Severity |
| :--- | :--- | :--- | :--- |
| **Build-Time** | mdBook compilation failures | Site cannot deploy | 🔴 Critical |
| **Content** | Broken links, missing files | Poor UX, dead ends | 🟡 High |
| **Runtime** | 404 pages, failed searches | User confusion | 🟡 High |
| **Asset** | Missing images, broken CSS | Broken layout | 🟢 Medium |

### 3. Build-Time Error Handling

#### 3.1 mdBook Build Failures
If mdBook fails to build (e.g., invalid `SUMMARY.md`, missing file references), the deployment will fail and Vercel will keep the previous version live.

**Common Build Errors:**

| Error | Cause | Fix |
| :--- | :--- | :--- |
| `File not found` | Path in `SUMMARY.md` doesn't exist | Correct the path or create the file |
| `Invalid markdown` | Malformed heading or link | Fix the `.md` syntax |
| `Duplicate entry` | Same file listed twice | Remove the duplicate |
| `Missing SUMMARY.md` | File was deleted | Restore from Git history |

**Prevention:**
- Always run `mdbook build docs` locally before pushing.
- Use a pre-commit hook to verify the build.

**Recovery:**
- Vercel automatically keeps the last successful deployment live.
- Fix the error locally, push again, and the new build will succeed.

### 4. Content Error Handling

#### 4.1 Broken Internal Links
mdBook does not validate links by default. We need to add a link checker to the build pipeline.

**Solution:**
Add a pre-build step using `mdbook-linkcheck` or a simple script.

**Installation:**
```bash
cargo install mdbook-linkcheck
```

**Update `book.toml`:**
```toml
[output.linkcheck]
follow-web-links = false
warning-policy = "warn"
```

**Result:**
Every build will now warn about broken links.

#### 4.2 Missing Content
If a document referenced in `SUMMARY.md` doesn't exist, mdBook will fail the build. To prevent this:
- Always create the `.md` file before adding it to `SUMMARY.md`.
- Use a placeholder `# TODO: Content coming soon` if the content isn't ready.

#### 4.3 Redirects for Renamed Files
If a document is renamed or moved, users with bookmarks may hit a 404.

**Solution:**
Since mdBook generates static HTML, we need a redirect mechanism. Add redirect pages using HTML meta refresh in the old file location.

**Example:** If `01-AI-ML/PRD.md` was moved to `01-AI-ML/phase-1/PRD.md`, create a file at `01-AI-ML/PRD.md` containing:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=../phase-1/PRD.html" />
</head>
<body>
    <p>Redirecting... <a href="../phase-1/PRD.html">Click here</a></p>
</body>
</html>
```

### 5. Runtime Error Handling

#### 5.1 Custom 404 Page
mdBook's default 404 page is functional but generic. We will create a custom 404 page tailored to Alchemy Docs.

**Create `docs/src/404.md`:**
```markdown
# 404 — Page Not Found

Looks like you've wandered off the alchemy map.

The page you're looking for doesn't exist, has been moved, or is still being written.

### Where to Go Next

- [🏠 Go to Alchemy Docs Home](../introduction.md)
- [🏆 Browse Hackathon Alchemy](../hackathon-alchemy/README.md)
- [🔍 Search the Docs](../index.html)
- [💬 Report a Broken Link](https://github.com/SidhCodez/Alchemy-Docs/issues)

### Popular Sections

- [01. AI / ML Hackathons](../hackathon-alchemy/01-AI-ML/README.md)
- [02. Non-AI Software](../hackathon-alchemy/02-Non-AI/README.md)
- [17. Debugging](../hackathon-alchemy/17-Debugging/README.md)
- [20. Scalability](../hackathon-alchemy/20-Scalability/README.md)
```

**Configure in `book.toml`:**
```toml
[output.html]
not-found-page = "404.md"
```

#### 5.2 Search Failures
mdBook's built-in search uses a locally generated `searchindex.json`. If search fails:

| Failure | Cause | Fallback |
| :--- | :--- | :--- |
| No results | Query too specific | Suggest broader terms |
| Empty index | Build didn't generate index | Check `mdbook build` output |
| Slow response | Index too large (>500 pages) | Consider Algolia DocSearch (future) |

**Mitigation:**
- Keep search queries in the URL (e.g., `?query=PRD`) so users can share them.
- Add helpful "no results" messaging via custom CSS or JS.

#### 5.3 Failed Asset Loading
If an image or CSS file fails to load, the page will still be usable but look broken.

**Prevention:**
- Verify all image paths in Markdown are relative and correct.
- Run `mdbook serve` locally and check the Network tab in DevTools.

### 6. Asset Error Handling

#### 6.1 Missing Images
If an image fails to load, the browser will show a broken image icon.

**Solution:**
Add a global CSS rule to show a fallback:
```css
img {
    min-height: 50px;
    background: var(--code-bg);
    border: 1px dashed var(--border-color);
}
```

#### 6.2 Failed Font Loading
If Google Fonts fails to load (offline, blocked), the browser will fall back to system fonts. Our typography stack already includes fallbacks (`system-ui, sans-serif`), so the layout will remain intact.

### 7. User Communication

When errors occur, users should always know:
1. **What happened** — Clear, non-technical language.
2. **Why it happened** — Brief context (if available).
3. **What to do next** — Actionable links.

**Tone Guidelines:**
- Friendly, not robotic.
- Helpful, not apologetic.
- Clear, not technical.

**Example 404 Message:**
> "Looks like you've wandered off the alchemy map. This page doesn't exist — but many others do. Try searching, or head back to the beginning."

### 8. Monitoring & Alerts

Since the site is static, there is no server to monitor. However, we can monitor:

| What to Monitor | Tool | Frequency |
| :--- | :--- | :--- |
| **Deployment failures** | Vercel Dashboard | On every push |
| **404 hits** | Vercel Analytics | Weekly |
| **Broken links** | `mdbook-linkcheck` | On every build |
| **Search queries with no results** | Custom event tracking (Phase 2) | Monthly |

### 9. Error Handling Checklist

**Before Every Push:**
- [ ] Run `mdbook build docs` locally — succeeds without errors.
- [ ] Run `mdbook-linkcheck` — no broken links.
- [ ] Verify `SUMMARY.md` paths are correct.
- [ ] Test the 404 page.
- [ ] Test search with 3 different queries.

### 10. Summary Table

| Error Type | Prevention | Recovery | User Experience |
| :--- | :--- | :--- | :--- |
| Build Failure | Local `mdbook build` test | Fix, push again | Previous version stays live |
| Broken Link | `mdbook-linkcheck` | Fix path, push | N/A (caught pre-deploy) |
| Missing Page | Placeholder file | Create content | Redirect or 404 |
| 404 Hit | Custom 404 page | N/A | Friendly message + links |
| Search Failure | Keep index fresh | Broader query suggestion | Redirect to intro |
| Asset Failure | CSS fallback | Fix path, push | Broken icon (still usable) |
