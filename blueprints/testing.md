```markdown
# TESTING.md
## Alchemy Docs — Testing & Quality Assurance

### 1. Purpose of This Document
This document defines the testing strategy for the Alchemy Docs documentation website. Since the site is fully static (mdBook + Vercel), testing focuses on content integrity, build reliability, navigation accuracy, search functionality, and cross-device compatibility. The goal is to ensure a flawless user experience before every deployment.

### 2. Testing Philosophy
- **Test Locally First:** Never push to `main` without running `mdbook serve` and verifying the changes.
- **Content is King:** The most critical tests are content-related (links, files, structure).
- **Automated Where Possible:** Use tools like `mdbook-linkcheck` and GitHub Actions.
- **Manual Verification:** Always do a final click-through on the live site after deployment.

### 3. Testing Categories

| # | Category | Focus | Tool |
| :--- | :--- | :--- | :--- |
| 1 | Build Testing | Does `mdbook build` succeed? | mdBook CLI |
| 2 | Link Testing | Are all links working? | `mdbook-linkcheck` |
| 3 | Content Testing | Are all 330+ files rendering? | Manual |
| 4 | Navigation Testing | Does the sidebar match `SUMMARY.md`? | Manual |
| 5 | Search Testing | Does search return relevant results? | Manual |
| 6 | UI Testing | Do themes, fonts, and layout work? | Manual + DevTools |
| 7 | Responsive Testing | Does it work on mobile/tablet/desktop? | BrowserStack or DevTools |
| 8 | Performance Testing | Is the site fast? | Lighthouse |
| 9 | Accessibility Testing | Is the site accessible? | WAVE, axe DevTools |
| 10 | Deployment Testing | Does the live site work? | Vercel Dashboard |

### 4. Build Testing

**Goal:** Ensure mdBook compiles the site without errors.

**Steps:**
1. Open terminal in the project root.
2. Run:
   ```bash
   mdbook build docs
   ```
3. Check for errors in the output.
4. Verify the `docs/book/` folder is generated.

**Expected Result:**
- No errors.
- `docs/book/index.html` exists.
- `docs/book/searchindex.json` exists.

**Common Failures:**
| Error | Fix |
| :--- | :--- |
| `File not found` | Correct path in `SUMMARY.md` |
| `Invalid markdown` | Fix syntax in the `.md` file |
| `Missing book.toml` | Ensure you are in the correct directory |

### 5. Link Testing

**Goal:** Ensure no broken internal or external links.

**Install `mdbook-linkcheck`:**
```bash
cargo install mdbook-linkcheck
```

**Configure `book.toml`:**
```toml
[output.linkcheck]
follow-web-links = false
warning-policy = "warn"
```

**Run:**
```bash
mdbook build docs
```

**Expected Result:**
- No warnings about broken links.
- All internal links resolve to valid files.

**What It Checks:**
- Links in `SUMMARY.md` point to real files.
- Links inside `.md` files point to real files or URLs.
- Image paths are correct.

### 6. Content Testing

**Goal:** Verify all 330+ documents render correctly.

**Manual Checklist:**
- [ ] Open `docs/book/index.html` in a browser.
- [ ] Click through every category in the sidebar.
- [ ] Verify each Phase/Pillar/Dimension/Layer loads.
- [ ] Check that no page shows raw Markdown or unrendered syntax.
- [ ] Verify code blocks render properly.
- [ ] Verify tables render properly.
- [ ] Verify images load (if any).

**Spot-Check Pages:**
| Page | What to Verify |
| :--- | :--- |
| `introduction.md` | Welcome message, links to framework |
| `hackathon-alchemy/README.md` | Framework overview |
| `01-AI-ML/README.md` | Category landing page |
| `01-AI-ML/phase-1/PRD.md` | Prompt renders, copy button works |
| `17-Debugging/pillar-4/ROOT_CAUSE_ANALYSIS.md` | Unique structure renders |
| `20-Scalability/layer-4/DATABASE_SCALING.md` | Deeply nested content works |

### 7. Navigation Testing

**Goal:** Ensure the sidebar matches `SUMMARY.md` exactly.

**Checklist:**
- [ ] Sidebar shows "Welcome to Alchemy Docs" at top.
- [ ] Sidebar shows "Hackathon Alchemy" as a section.
- [ ] All 20 categories are visible.
- [ ] Each category expands to show its Phase/Pillar/Dimension/Layer structure.
- [ ] Clicking a category name goes to its `README.md`.
- [ ] Clicking a document loads the correct page.
- [ ] Previous/Next buttons at bottom of each page work.
- [ ] Breadcrumbs (if enabled) show correct hierarchy.

**Common Issues:**
| Issue | Cause | Fix |
| :--- | :--- | :--- |
| Item missing from sidebar | Not in `SUMMARY.md` | Add the file to `SUMMARY.md` |
| Wrong order | Order in `SUMMARY.md` | Reorder the entries |
| Broken "Next" button | Last file in section | Add a link or handle gracefully |

### 8. Search Testing

**Goal:** Ensure search returns relevant results quickly.

**Test Queries:**
| Query | Expected Result |
| :--- | :--- |
| `PRD` | Results from multiple categories |
| `system architecture` | Returns `SYSTEM_ARCHITECTURE.md` |
| `demo script` | Returns `DEMO_SCRIPT.md` |
| `scalability` | Returns Scalability category docs |
| `xyzabc` | Returns "No results found" |

**Checklist:**
- [ ] Search bar is visible on all pages.
- [ ] Typing a query shows instant results.
- [ ] Clicking a result navigates to the correct page.
- [ ] No results message is friendly.
- [ ] Search works offline (after initial load).
- [ ] Search works on mobile.

### 9. UI Testing

**Goal:** Verify the visual design matches `UI_SPEC.md`.

**Checklist:**
- [ ] Fonts load correctly (Inter, Fira Code).
- [ ] Colors match the palette.
- [ ] Dark mode toggle works.
- [ ] Light mode looks correct.
- [ ] Code blocks have syntax highlighting.
- [ ] Copy buttons appear on code blocks.
- [ ] Copy buttons work.
- [ ] "Edit on GitHub" links work.
- [ ] Sidebar scrolls independently.
- [ ] Content max-width is readable.
- [ ] No horizontal scroll on desktop.

**Tools:**
- Chrome DevTools → Inspect element
- Verify CSS variables are applied

### 10. Responsive Testing

**Goal:** Ensure the site works on all devices.

**Test Breakpoints:**
| Device | Width | Check |
| :--- | :--- | :--- |
| Mobile (iPhone SE) | 375px | Hamburger menu, no horizontal scroll |
| Mobile (iPhone 12) | 390px | Text readable, tap targets ≥ 44px |
| Tablet (iPad) | 768px | Sidebar collapses, content readable |
| Desktop | 1280px | Full sidebar, content centered |
| Large Desktop | 1920px | No stretched layout |

**Chrome DevTools Steps:**
1. Press `F12` to open DevTools.
2. Press `Ctrl+Shift+M` for device toolbar.
3. Test each breakpoint.

**Checklist:**
- [ ] No horizontal scroll on any device.
- [ ] All tap targets ≥ 44px.
- [ ] Text is readable without zoom.
- [ ] Search works on mobile.
- [ ] Sidebar opens/closes smoothly.
- [ ] Code blocks scroll horizontally.

### 11. Performance Testing

**Goal:** Lighthouse score > 95 across all categories.

**Lighthouse Steps:**
1. Open the live site in Chrome.
2. Press `F12` → Lighthouse tab.
3. Select "Performance", "Accessibility", "Best Practices", "SEO".
4. Run audit on Desktop and Mobile.

**Target Metrics:**
| Metric | Target |
| :--- | :--- |
| Performance | > 95 |
| Accessibility | > 95 |
| Best Practices | > 95 |
| SEO | > 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB | < 600ms |

**Checklist:**
- [ ] Lighthouse score > 95 on desktop.
- [ ] Lighthouse score > 90 on mobile.
- [ ] No unused CSS.
- [ ] No console errors.
- [ ] Images (if any) are optimized.

### 12. Accessibility Testing

**Goal:** WCAG 2.1 AA compliance.

**Tools:**
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome DevTools → Lighthouse → Accessibility

**Checklist:**
- [ ] All images have alt text.
- [ ] Color contrast passes 4.5:1.
- [ ] Keyboard navigation works (Tab, Enter, Escape).
- [ ] Focus states are visible.
- [ ] Screen reader reads page correctly (test with VoiceOver/NVDA).
- [ ] Headings are hierarchical (H1 → H2 → H3).
- [ ] Links have descriptive text (no "click here").

### 13. Deployment Testing

**Goal:** Verify the live site works after Vercel deploys.

**Post-Deployment Checklist:**
- [ ] Visit the live URL.
- [ ] Verify homepage loads.
- [ ] Verify sidebar renders.
- [ ] Click through 5 random pages.
- [ ] Test search.
- [ ] Test dark mode toggle.
- [ ] Test on mobile.
- [ ] Verify HTTPS works.
- [ ] Check Vercel dashboard for build errors.
- [ ] Verify custom domain (if configured).

**Vercel Dashboard Checks:**
- Build Logs: No errors.
- Deployments: Latest is "Ready".
- Analytics: Traffic flowing.

### 14. Automated Testing (Optional)

For advanced setups, automate testing with GitHub Actions.

**Example `.github/workflows/test.yml`:**
```yaml
name: Test Alchemy Docs

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
      - name: Install mdBook
        run: cargo install mdbook mdbook-linkcheck
      - name: Build
        run: mdbook build docs
      - name: Check Links
        run: mdbook-linkcheck docs
```

This ensures no broken link ever reaches `main`.

### 15. Master Testing Checklist

**Before Every Push:**
- [ ] `mdbook build docs` succeeds locally.
- [ ] `mdbook-linkcheck` shows no broken links.
- [ ] New content renders in local preview.
- [ ] Search returns correct results for new content.
- [ ] Sidebar updated in `SUMMARY.md`.

**Before Every Major Release:**
- [ ] Full Lighthouse audit.
- [ ] Accessibility audit (WAVE).
- [ ] Mobile testing on real device.
- [ ] Search stress test (10 queries).
- [ ] All 330+ pages spot-checked.

**After Every Deployment:**
- [ ] Live site loads.
- [ ] Search works on live.
- [ ] 404 page works.
- [ ] Mobile view works.
- [ ] No console errors.

### 16. Bug Reporting Template


```

### 17. Summary Table

| Test Category | Frequency | Tool | Owner |
| :--- | :--- | :--- | :--- |
| Build | Every push | `mdbook build` | Author |
| Links | Every push | `mdbook-linkcheck` | Author |
| Content | Weekly | Manual | Author |
| Navigation | Every push | Manual | Author |
| Search | Weekly | Manual | Author |
| UI | Monthly | Manual + DevTools | Author |
| Responsive | Monthly | DevTools | Author |
| Performance | Monthly | Lighthouse | Author |
| Accessibility | Monthly | WAVE | Author |
| Deployment | Every deploy | Vercel | Author |
