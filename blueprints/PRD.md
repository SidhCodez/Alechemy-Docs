# PRD.md
## Alchemy Docs — Product Requirements Document

### 1. Product Name
**Alchemy Docs**

### 2. One-Line Product Description
A seamless, searchable, and auto-updating documentation platform that hosts prompt-driven frameworks (starting with Hackathon Alchemy) to help builders, developers, and creators ship faster.

### 3. Product Hierarchy
- **Main Product:** Alchemy Docs (the platform)
- **Sub-Product 1 (Launch):** Hackathon Alchemy (20 categories of prompt books)
- **Sub-Product 2 (Future):** Builder Alchemy (planned)
- **Website Structure:** Landing Page (Root `/`) + Documentation (`/docs`)

### 4. Problem Statement
Currently, frameworks like Hackathon Alchemy exist only as raw Markdown files on GitHub. With 330+ documents across 20 categories, users find it difficult to navigate, search, and read the content comfortably. There is no unified sidebar, no global search, and no polished reading experience. Additionally, there is no central platform to host future frameworks, meaning every new framework would require a separate repository and documentation setup. Alchemy Docs solves this by providing a single, scalable, "Docs-as-Code" platform.

### 5. Target Users
- **Hackathon Participants:** Beginners looking for quick prompts during a hackathon.
- **Developers & Builders:** Professionals using the frameworks for real-world projects.
- **Students:** Learners looking for structured guidance.
- **Prompt Engineers:** Users searching for specific AI prompt structures.
- **Future Framework Creators:** People who will use Alchemy Docs to host their own frameworks.

### 6. User Pain Points
- Navigating 330+ files across folders on GitHub is slow and frustrating.
- No global search to find a specific prompt (e.g., "Demo Script").
- Raw Markdown is unreadable on mobile and lacks visual hierarchy.
- No way to copy prompt templates in one click.
- Future frameworks have no unified home; each needs a separate setup.
- The current experience feels like a code repository, not a professional platform.

### 7. Proposed Solution
Build **Alchemy Docs** as a two-part website:

1. **Landing Page (`/`):** A marketing page that introduces Alchemy Docs, showcases the Hackathon Alchemy framework, and drives users to the documentation.
2. **Documentation (`/docs`):** An mdBook-powered static site that reads Markdown files directly from the repository and generates a fully searchable, professional documentation experience. Future frameworks can be added as sub-folders without rebuilding the infrastructure.

### 8. Product Goals
1. Zero manual content duplication (content lives in Markdown, site auto-builds).
2. Instant search across all 330+ documents.
3. Fast, mobile-friendly reading experience.
4. Scalable architecture to host multiple frameworks (Hackathon Alchemy, Builder Alchemy, etc.).
5. Automated deployment (push to GitHub → site updates).
6. Author-friendly: Adding a new framework or category requires zero web development.

### 9. User Stories
- As a visitor, I want to understand what Alchemy Docs offers on the landing page so I can decide to explore.
- As a user, I want to search for "PRD" so I can quickly find the prompt template.
- As a user, I want to browse a clean sidebar with all 20 Hackathon Alchemy categories.
- As a user, I want to copy a prompt with one click.
- As a user, I want a comfortable dark/light mode reading experience.
- As the author, I want to add a new framework (Builder Alchemy) without rebuilding the site.
- As the author, I want to push a new `.md` file to GitHub and have the site update automatically.

### 10. Functional Requirements

#### Landing Page (Phase 2)
- Hero section with the Alchemy Docs tagline.
- Feature highlights (search, speed, frameworks).
- Showcase of Hackathon Alchemy (20 categories).
- CTA button to enter the documentation.
- Footer with social links.

#### Documentation (Phase 1 — Current Focus)
- Sidebar navigation generated via `SUMMARY.md`.
- Global search (built-in mdBook search).
- Dark/light mode toggle.
- Code copy buttons on all prompts.
- Responsive layout.
- Sub-product separation (Hackathon Alchemy as v1 framework).
- Future extensibility for new frameworks.

### 11. Non-Functional Requirements
- **Performance:** Lighthouse score > 95; page load < 1 second.
- **Accessibility:** Semantic HTML, keyboard navigable.
- **Maintainability:** All content in Markdown.
- **Scalability:** Support 1,000+ pages across multiple frameworks.
- **Hosting Cost:** Free tier on Vercel.

### 12. Core Features
- **Documentation Engine:** mdBook
- **Content Source:** Existing `.md` files from Hackathon Alchemy repo
- **Navigation:** `SUMMARY.md`
- **Search:** mdBook built-in
- **Hosting:** Vercel
- **Repo:** GitHub
- **Landing Page:** Next.js or static HTML (Phase 2)

### 13. Nice-to-Have Features
- Custom domain (`alchemy-docs.vercel.app` or custom).
- Branded theming (custom CSS with Alchemy colors).
- Page analytics (Vercel Analytics or Plausible).
- Edit-on-GitHub links on each page.
- RSS feed for updates.
- Multi-framework landing page selector.

### 14. User Journeys

**Journey 1: The First-Time Visitor (Phase 2)**
1. Lands on the Alchemy Docs landing page.
2. Reads the pitch: "Prompt frameworks for builders."
3. Sees the Hackathon Alchemy showcase.
4. Clicks "Explore Documentation."
5. Redirected to `/docs`.
6. Reads `introduction.md`.
7. Starts browsing the sidebar.

**Journey 2: The Quick Lookup User (Phase 1)**
1. Lands directly on `/docs` (via Google search or bookmark).
2. Clicks the search bar (or presses `/`).
3. Types "system architecture".
4. Sees instant results from all 20 categories.
5. Clicks the relevant result.
6. Copies the prompt and uses it.

**Journey 3: The Author (You)**
1. Writes a new framework (e.g., `builder-alchemy/`).
2. Pushes the `.md` files to GitHub.
3. Updates `SUMMARY.md` to include the new framework.
4. Pushes to `main`.
5. Vercel rebuilds the site automatically.
6. New framework is live within 2 minutes.

### 15. MVP Scope (Phase 1 — Documentation)
1. mdBook initialized and configured.
2. All 20 Hackathon Alchemy categories in the sidebar.
3. 330+ documents rendering properly.
4. Global search working.
5. Dark/light mode toggle.
6. Deployed to Vercel.
7. Auto-deploy from GitHub on push.

### 16. Out-of-Scope (V1)
- No user accounts or login.
- No comments section.
- No CMS.
- No custom backend or database.
- No multi-language support.
- No custom analytics (Phase 2).

### 17. Success Metrics
- **Traffic:** 500+ unique visitors in first month.
- **Search Usage:** 30%+ of visitors use search.
- **Engagement:** Average session > 2 minutes.
- **Author Efficiency:** Zero manual duplication.
- **Deployment:** Updates within 2 minutes of push.
- **Scalability:** Adding a new framework takes < 10 minutes.

### 18. Risks and Assumptions
- **Risk:** mdBook search may be slow with 330+ pages.  
  *Mitigation:* Optimize with logical file splitting; fallback to Algolia DocSearch if needed.
- **Risk:** Over-customizing mdBook theme may break defaults.  
  *Mitigation:* Keep custom CSS minimal.
- **Risk:** Vercel build may fail without Rust installation.  
  *Mitigation:* Use `vercel.json` with build commands.
- **Assumption:** Existing Markdown files are well-formatted.
- **Assumption:** Vercel free tier is sufficient.
- **Assumption:** Future frameworks (Builder Alchemy) will follow the same 4-phase, 20-category structure, making integration seamless.