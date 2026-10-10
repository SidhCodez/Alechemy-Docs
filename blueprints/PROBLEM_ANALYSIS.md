#  Hackathon Alchemy Documentation Website

### 1. The Actual Problem Being Solved
Hackathon Alchemy currently exists as a GitHub repository containing 330+ Markdown files organized into 20 distinct hackathon categories, each with 4 phases. While the content is highly structured, consuming it is a poor user experience. Users must navigate raw file directories, read unstyled Markdown on GitHub, and manually search across files to find specific prompts. There is no unified navigation, no global search, and no way to read the content as a cohesive guide. 

The problem is not the content itself, but the **delivery mechanism**. We need a way to transform this repository of files into a seamless, professional, and easily navigable documentation website without manually rewriting or copy-pasting 330+ documents.

### 2. Target Users
- **Hackathon Participants:** Beginners looking for quick, actionable prompts during a high-pressure 24-48 hour event.
- **Developers & Builders:** Professionals using the Alchemy framework for real-world projects outside of hackathons.
- **Students:** Learners looking for structured guidance on building software, portfolios, or businesses.
- **Prompt Engineers:** Users searching for specific prompt structures to adapt to their own AI workflows.

### 3. User Pain Points
- **Navigation Nightmare:** Finding a specific prompt (e.g., "PRD for Web3") requires clicking through multiple folders on GitHub.
- **No Search:** GitHub's search is code-centric, not document-centric. Users cannot easily search "How to write a Demo Script."
- **Poor Readability:** Raw Markdown on GitHub lacks proper typography, spacing, and visual hierarchy.
- **Mobile Experience:** Reading raw GitHub Markdown on a mobile device is cumbersome.
- **Lack of Branding:** The current experience feels like a code repository, not a polished educational product.

### 4. Existing Ways People Solve This
1. **Raw GitHub Repo:** The current method. Free, but poor UX.
2. **GitBook / Notion:** Popular for docs, but requires moving content away from GitHub, breaking the "Docs-as-Code" workflow. Often expensive for large volumes of content.
3. **Custom React/Next.js Site:** Full control over design, but requires building a CMS, database, and frontend from scratch. High maintenance burden.
4. **Docusaurus / MkDocs:** Good alternatives, but require a Node.js or Python environment and heavier configuration for simple static content.

### 5. Limitations of Existing Solutions
- **GitHub:** Cannot handle hierarchical sidebar navigation elegantly.
- **Notion/GitBook:** Content becomes siloed. Updates must be made in two places. Expensive at scale.
- **Custom Build:** Overkill. Building a custom site for static Markdown files is reinventing the wheel.
- **Docusaurus:** Too heavy for a purely static, Markdown-only project.

### 6. Proposed Solution
Implement a **"Docs-as-Code"** product name "**ALECHEMY DOCS**" architecture using **mdBook** - **https://github.com/rust-lang/mdBook.git**
(a Rust-based static site generator built for Markdown documentation). 

The solution will:
1. Read the existing `.md` files directly from the repository.
2. Automatically generate a sidebar, global search, and paginated pages.
3. Deploy automatically to Vercel via GitHub Actions. 
4. Allow the creator to continue writing in Markdown; the website updates itself on every push.

### 7. Core Features
- **Global Search:** Instant client-side search across all 330+ documents.
- **Hierarchical Sidebar:** A `SUMMARY.md` file that auto-generates the navigation for all 20 categories and their phases.
- **Dark/Light Mode:** Built-in theme toggling for readability.
- **Landing Page:** A custom `introduction.md` acting as a hero section to welcome users.
- **Mobile Responsive:** Built-in responsive design for all devices.
- **Code Copy Buttons:** One-click copy for all prompts.
- **Syntax Highlighting:** For any technical code blocks.

### 8. Nice-to-Have Features
- Custom CSS branding (matching the Hackathon Alchemy brand colors).
- Edit-on-GitHub links on every page (allows community contributions).
- Page analytics (Vercel Analytics or Plausible).
- Multi-language support (i18n).

### 9. What Should NOT Be Built (Out of Scope)
- **No Backend/Database:** The site is 100% static. No user accounts, no login, no saved progress.
- **No Comments Section:** V1 will not have user interaction features to keep it simple and secure.
- **No CMS:** We will not build a GUI for adding content. Content is managed in Git.
- **No Custom Search Server:** We will use mdBook's built-in search, avoiding Algolia/Elasticsearch costs.

### 10. Realistic MVP
The MVP is a deployed version of the site on Vercel that:
1. Contains all 20 categories in the sidebar.
2. Has functioning global search.
3. Loads in under 1 second.
4. Reflects the current content of the GitHub repository.
5. Has a professional landing page.

### 11. Potential Tools and Platforms
- **mdBook:** The core static site generator (Rust-based).
- **GitHub:** Repository hosting and version control.
- **GitHub Actions / Vercel:** CI/CD automation. When we push to `main`, the site rebuilds.
- **Markdown:** Content format.
- **Custom CSS:** For branding and theming overrides.
- **Vercel:** Hosting platform (free tier is sufficient).