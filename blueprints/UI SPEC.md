Here is the **`UI_SPEC.md`** (Phase 3: Execution, Quality & Security) for the Alchemy Docs platform. 

This document outlines the visual identity, theming, layout, and component customizations for your mdBook documentation site. Save this as `UI_SPEC.md` in your project.

---

```markdown
# UI_SPEC.md
## Alchemy Docs — UI Specification Document

### 1. Purpose of This Document
This document defines the visual design, layout structure, typography, and theming rules for the Alchemy Docs documentation website. While mdBook provides a robust default theme, this specification outlines the custom CSS and configuration needed to transform the default look into a branded, professional experience that matches the Alchemy Docs identity.

### 2. Design Principles
- **Readability First:** Content is king. Typography, spacing, and contrast must prioritize reading comfort.
- **Developer-Centric:** The design should feel familiar to developers (similar to Rust Docs, Nextra, or MDN).
- **Minimalist & Modern:** Clean lines, generous whitespace, subtle shadows.
- **Alchemy Branding:** A hint of magic/transformation through color accents (deep purples, golds, or ambers), but kept professional.
- **Fast & Lightweight:** No heavy custom fonts or animations that slow down load times.

### 3. Typography
We will use system fonts and Google Fonts for performance and readability.

| Element | Font Family | Size | Weight | Color |
| :--- | :--- | :--- | :--- | :--- |
| **Body Text** | Inter, system-ui, sans-serif | 16px | 400 | `#1a1a1a` (Light) / `#e0e0e0` (Dark) |
| **Headings (H1-H3)** | Inter, system-ui, sans-serif | 28px / 24px / 20px | 700 | `#111111` (Light) / `#ffffff` (Dark) |
| **Code Blocks** | Fira Code, JetBrains Mono, monospace | 14px | 400 | `#333333` (Light) / `#f8f8f2` (Dark) |
| **Sidebar Nav** | Inter, system-ui, sans-serif | 14px | 500 | `#555555` (Light) / `#a0a0a0` (Dark) |

**Implementation:**
Add this to your `book.toml`:
```toml
[output.html]
additional-css = ["custom.css"]
```

### 4. Color Palette (Light & Dark Mode)

mdBook automatically supports Light/Dark/Auto themes. We will define custom colors for both.

| Token Name | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#ffffff` | `#0f1115` | Main background |
| `--bg-secondary` | `#f6f8fa` | `#161a22` | Sidebar background |
| `--text-primary` | `#1a1a1a` | `#e6e6e6` | Body text |
| `--text-secondary` | `#555555` | `#8b949e` | Muted text |
| `--accent-primary` | `#6d28d9` | `#a78bfa` | Brand color (Purple "Alchemy") |
| `--accent-hover` | `#5b21b6` | `#c4b5fd` | Hover states |
| `--border-color` | `#e5e7eb` | `#30363d` | Dividers |
| `--code-bg` | `#f3f4f6` | `#1f242c` | Inline code background |
| `--success` | `#059669` | `#34d399` | Success messages |
| `--warning` | `#d97706` | `#fbbf24` | Warnings |

**Custom CSS Snippet (`custom.css`):**
```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f6f8fa;
    --text-primary: #1a1a1a;
    --accent-primary: #6d28d9;
    /* ... add all variables ... */
}

.dark {
    --bg-primary: #0f1115;
    --bg-secondary: #161a22;
    --text-primary: #e6e6e6;
    --accent-primary: #a78bfa;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Inter', system-ui, sans-serif;
}
```

### 5. Layout & Structure

The layout is based on the standard mdBook structure but customized:

```text
┌──────────────────────────────────────────────────────────────┐
│  [Logo] Alchemy Docs          [Search Bar]        [Theme] [GitHub] │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│  SIDEBAR      │   MAIN CONTENT AREA                          │
│               │                                              │
│  Hackathon    │   # Phase 1: Problem Analysis                │
│  Alchemy      │                                              │
│               │   ## 1. The Actual Problem                   │
│  ├─ 01. AI/ML │   Text goes here...                          │
│  │  ├─ Phase1 │                                              │
│  │  ├─ Phase2 │   ```prompt                                  │
│  │  └─ Phase3 │   Copy this prompt...                       │
│  │            │   ```                                        │
│  ├─ 02. NonAI │                                              │
│  ...          │   [◀ Previous]        [Next ▶]               │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

**Layout Details:**
- **Top Bar:** Fixed. Contains logo, global search, theme toggle, and GitHub link.
- **Sidebar (Left):** Scrollable. Contains the `SUMMARY.md` navigation tree. Collapsible sections for categories.
- **Main Content:** Max-width `800px` for optimal reading. Centered. Generous padding (32px).
- **Breadcrumbs:** Optional. Show `Hackathon Alchemy > 01. AI/ML > Phase 1` at the top of the content area.
- **Footer Navigation:** "Previous" and "Next" buttons at the bottom of every page to encourage linear reading.

### 6. mdBook Component Customization

We will customize specific mdBook components to match the Alchemy brand.

| Component | Default mdBook Behavior | Custom Requirement |
| :--- | :--- | :--- |
| **Search Bar** | Top left, simple input | Move to top center/right. Add keyboard shortcut `/` to focus. |
| **Copy Button** | Small icon on code blocks | Keep, but style with accent color. Ensure it works for prompt blocks. |
| **Theme Toggle** | Dropdown menu | Replace with a simple sun/moon icon toggle. |
| **Sidebar Toggle** | Hamburger icon on mobile | Keep, but ensure it's easy to tap (min 44px). |
| **Edit on GitHub** | Optional link | Enable. Place at bottom of each page: "Edit this page on GitHub". |
| **Page Navigation** | Simple arrows | Style as large buttons with page titles. |

**Enabling "Edit on GitHub":**
Add this to `book.toml`:
```toml
[output.html]
git-repository-url = "https://github.com/SidhCodez/Alchemy-Docs"
edit-url-template = "https://github.com/SidhCodez/Alchemy-Docs/edit/main/docs/src/{path}"
```

### 7. Responsive Design
The site must be fully functional on all devices.

| Breakpoint | Width | Layout Behavior |
| :--- | :--- | :--- |
| **Desktop** | > 1024px | Full sidebar visible, content max-width 800px. |
| **Tablet** | 768px - 1024px | Sidebar collapses to hamburger menu. Content max-width 100%. |
| **Mobile** | < 768px | Sidebar hidden. Top bar simplifies. Font size reduces to 15px. |

**Mobile Rules:**
- Tap targets must be at least 44x44px.
- Code blocks must be horizontally scrollable (no wrapping).
- Search must be accessible via a full-screen overlay.
- No horizontal scrolling on the main page.

### 8. Accessibility (WCAG 2.1 AA)
- **Contrast:** All text must pass 4.5:1 contrast ratio against its background.
- **Focus States:** All interactive elements (links, buttons, inputs) must have a visible focus outline.
- **Keyboard Navigation:** Users must be able to navigate the entire site, open search, and toggle themes using only the keyboard.
- **Semantic HTML:** mdBook generates semantic HTML by default; custom CSS must not break it.
- **Reduced Motion:** Respect `prefers-reduced-motion` for any animations.

### 9. Custom CSS Implementation Plan
To apply this UI Spec, create a file named `custom.css` in your `docs/` folder and reference it in `book.toml`.

**Step 1: Create `docs/custom.css`**
**Step 2: Update `docs/book.toml`**
```toml
[output.html]
additional-css = ["custom.css"]
default-theme = "dark"
preferred-dark-theme = "dark"
```

**Step 3: Test Locally**
Run `mdbook serve docs` and verify:
- Colors match the palette.
- Dark mode works.
- Sidebar is clean.
- Copy buttons are visible.
- Mobile responsiveness works.

### 10. Verification Checklist
- [ ] Typography is readable on all devices.
- [ ] Light and Dark modes both look professional.
- [ ] Sidebar navigation is clear.
- [ ] Search bar is accessible.
- [ ] Copy buttons work on all prompt blocks.
- [ ] "Edit on GitHub" links work.
- [ ] No horizontal scroll on mobile.
- [ ] Color contrast passes WCAG AA.
- [ ] Custom CSS loaded correctly.
- [ ] Site loads in under 1 second.
