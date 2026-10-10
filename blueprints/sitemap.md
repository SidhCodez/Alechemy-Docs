```markdown
# SITEMAP.md
## Alchemy Docs — Navigation & Sitemap Blueprint

### 1. Purpose of This Document
In mdBook, the entire sidebar navigation is controlled by a single file called `SUMMARY.md`. This document outlines the exact structure of that file for Alchemy Docs. It defines how the platform, the framework (Hackathon Alchemy), the 20 categories, and their unique internal structures (Phases, Pillars, Layers) will be organized in the sidebar.

### 2. Navigation Principles
- **Platform First:** The top level is always "Alchemy Docs" (the platform).
- **Framework Second:** Under the platform, we have "Hackathon Alchemy" (Sub-product 1).
- **Categories Third:** The 20 categories are nested under the framework.
- **Structure Variable:** Categories 1-16 use a "4-Phase" structure. Categories 17-20 use unique structures (Pillars, Dimensions, Layers). The sitemap must accommodate both seamlessly.
- **Future-Proof:** New frameworks (e.g., Builder Alchemy) will be added as top-level items without disrupting the existing structure.

### 3. The Sidebar Tree (Visual Representation)

```text
├── Welcome to Alchemy Docs
│
├── Hackathon Alchemy (Framework)
│   ├── Framework Overview
│   ├── How to Use This Framework
│   │
│   ├── 01. AI / ML Hackathons
│   │   ├── Category Overview
│   │   ├── Phase 1: Problem Definition
│   │   ├── Phase 2: Technical Blueprint
│   │   ├── Phase 3: Execution & Quality
│   │   └── Phase 4: Delivery & Presentation
│   │
│   ├── 02. Non-AI / Traditional Software
│   │   ├── Phase 1: Problem Definition
│   │   ├── Phase 2: Technical Blueprint
│   │   ├── Phase 3: Execution & Quality
│   │   └── Phase 4: Delivery & Presentation
│   │
│   ├── ... (03 to 16 use the same 4-Phase structure)
│   │
│   ├── 17. Debugging
│   │   ├── Pillar 1: Detect & Define
│   │   ├── Pillar 2: Reproduce & Isolate
│   │   ├── Pillar 3: Instrument & Observe
│   │   ├── Pillar 4: Hypothesize & Test
│   │   ├── Pillar 5: Resolve & Verify
│   │   └── Pillar 6: Prevent & Learn
│   │
│   ├── 18. Improve System Design
│   │   ├── Dimension 1: Requirements
│   │   ├── Dimension 2: Component
│   │   ├── ... (8 Dimensions total)
│   │   └── Dimension 8: Evolution
│   │
│   ├── 19. SEO Optimization
│   │   ├── Pillar 1: Technical Foundation
│   │   ├── ... (8 Pillars total)
│   │   └── Pillar 8: Measurement
│   │
│   └── 20. Scalability
│       ├── Layer 1: Baseline & Capacity
│       ├── ... (10 Layers total)
│       └── Layer 10: Governance
│
└── Builder Alchemy (Future Framework)
    └── Overview
```

### 4. The `SUMMARY.md` Template
Below is the exact markdown structure required for the `docs/SUMMARY.md` file. 

*Note: For the sake of this sitemap, I have fully expanded Categories 01 and 02 as examples. Categories 03-20 should be expanded following the exact same pattern, replacing the folder names and document names.*

```markdown
# Summary

[Welcome to Alchemy Docs](introduction.md)

# Hackathon Alchemy

- [Framework Overview](hackathon-alchemy/README.md)
- [How to Use This Framework](hackathon-alchemy/how-to-use.md)

## 01. AI / ML Hackathons

- [Category Overview](hackathon-alchemy/01-AI-ML/README.md)
  - [Phase 1: Problem Definition](hackathon-alchemy/01-AI-ML/phase-1/README.md)
    - [PROBLEM_ANALYSIS](hackathon-alchemy/01-AI-ML/phase-1/PROBLEM_ANALYSIS.md)
    - [PRD](hackathon-alchemy/01-AI-ML/phase-1/PRD.md)
    - [TRD](hackathon-alchemy/01-AI-ML/phase-1/TRD.md)
  - [Phase 2: Technical Blueprint](hackathon-alchemy/01-AI-ML/phase-2/README.md)
    - [SYSTEM_ARCHITECTURE](hackathon-alchemy/01-AI-ML/phase-2/SYSTEM_ARCHITECTURE.md)
    - [DATABASE_SCHEMA](hackathon-alchemy/01-AI-ML/phase-2/DATABASE_SCHEMA.md)
    - [API_SPECIFICATION](hackathon-alchemy/01-AI-ML/phase-2/API_SPECIFICATION.md)
    - [AI_RULES](hackathon-alchemy/01-AI-ML/phase-2/AI_RULES.md)
    - [AI_MEMORY](hackathon-alchemy/01-AI-ML/phase-2/AI_MEMORY.md)
    - [PROMPT_LIBRARY](hackathon-alchemy/01-AI-ML/phase-2/PROMPT_LIBRARY.md)
    - [CACHE_SCHEMA](hackathon-alchemy/01-AI-ML/phase-2/CACHE_SCHEMA.md)
    - [EVIDENCE_MODEL](hackathon-alchemy/01-AI-ML/phase-2/EVIDENCE_MODEL.md)
  - [Phase 3: Execution & Quality](hackathon-alchemy/01-AI-ML/phase-3/README.md)
    - [UI_SPEC](hackathon-alchemy/01-AI-ML/phase-3/UI_SPEC.md)
    - [ERROR_HANDLING](hackathon-alchemy/01-AI-ML/phase-3/ERROR_HANDLING.md)
    - [SECURITY](hackathon-alchemy/01-AI-ML/phase-3/SECURITY.md)
    - [TESTING](hackathon-alchemy/01-AI-ML/phase-3/TESTING.md)
    - [EVALUATION](hackathon-alchemy/01-AI-ML/phase-3/EVALUATION.md)
  - [Phase 4: Delivery & Presentation](hackathon-alchemy/01-AI-ML/phase-4/README.md)
    - [DEPLOYMENT](hackathon-alchemy/01-AI-ML/phase-4/DEPLOYMENT.md)
    - [DEMO_SCRIPT](hackathon-alchemy/01-AI-ML/phase-4/DEMO_SCRIPT.md)
    - [GLOSSARY](hackathon-alchemy/01-AI-ML/phase-4/GLOSSARY.md)

## 02. Non-AI / Traditional Software

- [Category Overview](hackathon-alchemy/02-Non-AI/README.md)
  - [Phase 1: Problem Definition](hackathon-alchemy/02-Non-AI/phase-1/README.md)
    - [PROBLEM_ANALYSIS](hackathon-alchemy/02-Non-AI/phase-1/PROBLEM_ANALYSIS.md)
    - [PRD](hackathon-alchemy/02-Non-AI/phase-1/PRD.md)
    - [TRD](hackathon-alchemy/02-Non-AI/phase-1/TRD.md)
  - [Phase 2: Technical Blueprint](hackathon-alchemy/02-Non-AI/phase-2/README.md)
    - [SYSTEM_ARCHITECTURE](hackathon-alchemy/02-Non-AI/phase-2/SYSTEM_ARCHITECTURE.md)
    - [DATABASE_SCHEMA](hackathon-alchemy/02-Non-AI/phase-2/DATABASE_SCHEMA.md)
    - [API_SPECIFICATION](hackathon-alchemy/02-Non-AI/phase-2/API_SPECIFICATION.md)
    - [AUTHENTICATION_FLOW](hackathon-alchemy/02-Non-AI/phase-2/AUTHENTICATION_FLOW.md)
  - [Phase 3: Execution & Quality](hackathon-alchemy/02-Non-AI/phase-3/README.md)
    - [UI_SPEC](hackathon-alchemy/02-Non-AI/phase-3/UI_SPEC.md)
    - [ERROR_HANDLING](hackathon-alchemy/02-Non-AI/phase-3/ERROR_HANDLING.md)
    - [SECURITY](hackathon-alchemy/02-Non-AI/phase-3/SECURITY.md)
    - [TESTING](hackathon-alchemy/02-Non-AI/phase-3/TESTING.md)
    - [EVALUATION](hackathon-alchemy/02-Non-AI/phase-3/EVALUATION.md)
  - [Phase 4: Delivery & Presentation](hackathon-alchemy/02-Non-AI/phase-4/README.md)
    - [DEPLOYMENT](hackathon-alchemy/02-Non-AI/phase-4/DEPLOYMENT.md)
    - [DEMO_SCRIPT](hackathon-alchemy/02-Non-AI/phase-4/DEMO_SCRIPT.md)
    - [GLOSSARY](hackathon-alchemy/02-Non-AI/phase-4/GLOSSARY.md)

<!-- 
  INSTRUCTIONS FOR CATEGORIES 03-16:
  Copy the exact structure of Category 02 above. 
  Change the folder name (e.g., 03-Automation, 04-No-Code) 
  and update the document names inside Phase 2 to match the unique docs for that category 
  (e.g., WORKFLOW_SCHEMA for Automation, instead of DATABASE_SCHEMA).
-->

## 17. Debugging (Unique Structure)

- [Category Overview](hackathon-alchemy/17-Debugging/README.md)
  - [Pillar 1: Detect & Define](hackathon-alchemy/17-Debugging/pillar-1/README.md)
    - [SYMPTOM_REPORT](hackathon-alchemy/17-Debugging/pillar-1/SYMPTOM_REPORT.md)
    - [IMPACT_ASSESSMENT](hackathon-alchemy/17-Debugging/pillar-1/IMPACT_ASSESSMENT.md)
  - [Pillar 2: Reproduce & Isolate](hackathon-alchemy/17-Debugging/pillar-2/README.md)
    - [REPRODUCTION_STEPS](hackathon-alchemy/17-Debugging/pillar-2/REPRODUCTION_STEPS.md)
    - [ENVIRONMENT_MATRIX](hackathon-alchemy/17-Debugging/pillar-2/ENVIRONMENT_MATRIX.md)
    - [BISECT_PLAN](hackathon-alchemy/17-Debugging/pillar-2/BISECT_PLAN.md)
  - [Pillar 3: Instrument & Observe](hackathon-alchemy/17-Debugging/pillar-3/README.md)
    - [OBSERVABILITY_SETUP](hackathon-alchemy/17-Debugging/pillar-3/OBSERVABILITY_SETUP.md)
    - [LOG_TRACE_STRATEGY](hackathon-alchemy/17-Debugging/pillar-3/LOG_TRACE_STRATEGY.md)
    - [DEVTOOLS_WORKFLOW](hackathon-alchemy/17-Debugging/pillar-3/DEVTOOLS_WORKFLOW.md)
  - [Pillar 4: Hypothesize & Test](hackathon-alchemy/17-Debugging/pillar-4/README.md)
    - [HYPOTHESIS_LOG](hackathon-alchemy/17-Debugging/pillar-4/HYPOTHESIS_LOG.md)
    - [ROOT_CAUSE_ANALYSIS](hackathon-alchemy/17-Debugging/pillar-4/ROOT_CAUSE_ANALYSIS.md)
    - [EXPERIMENT_TRACKER](hackathon-alchemy/17-Debugging/pillar-4/EXPERIMENT_TRACKER.md)
  - [Pillar 5: Resolve & Verify](hackathon-alchemy/17-Debugging/pillar-5/README.md)
    - [FIX_IMPLEMENTATION](hackathon-alchemy/17-Debugging/pillar-5/FIX_IMPLEMENTATION.md)
    - [REGRESSION_TEST_PLAN](hackathon-alchemy/17-Debugging/pillar-5/REGRESSION_TEST_PLAN.md)
    - [DEPLOYMENT_PLAN](hackathon-alchemy/17-Debugging/pillar-5/DEPLOYMENT_PLAN.md)
  - [Pillar 6: Prevent & Learn](hackathon-alchemy/17-Debugging/pillar-6/README.md)
    - [POST_MORTEM](hackathon-alchemy/17-Debugging/pillar-6/POST_MORTEM.md)
    - [PREVENTION_CHECKLIST](hackathon-alchemy/17-Debugging/pillar-6/PREVENTION_CHECKLIST.md)
    - [TECH_DEBT_LOG](hackathon-alchemy/17-Debugging/pillar-6/TECH_DEBT_LOG.md)

<!-- 
  INSTRUCTIONS FOR CATEGORIES 18-20:
  Follow the exact same pattern as Category 17 above. 
  For Category 18 (System Design), replace "Pillar X" with "Dimension X".
  For Category 19 (SEO), replace "Pillar X" with "Pillar X".
  For Category 20 (Scalability), replace "Pillar X" with "Layer X".
  Ensure the README.md is included for every main folder to act as a landing page.
-->

# Builder Alchemy (Future)

- [Framework Overview](builder-alchemy/README.md)

```

### 5. Directory Mapping (How the `src/` folder looks)

To make the `SUMMARY.md` file above work, your actual `docs/src/` directory must match the paths exactly. Here is the folder structure mapping for the first two categories:

```text
docs/src/
├── introduction.md
│
├── hackathon-alchemy/
│   ├── README.md
│   ├── how-to-use.md
│   │
│   ├── 01-AI-ML/
│   │   ├── README.md
│   │   ├── phase-1/
│   │   │   ├── README.md
│   │   │   ├── PROBLEM_ANALYSIS.md
│   │   │   ├── PRD.md
│   │   │   └── TRD.md
│   │   ├── phase-2/
│   │   │   ├── README.md
│   │   │   ├── SYSTEM_ARCHITECTURE.md
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── 02-Non-AI/
│   │   ├── README.md
│   │   ├── phase-1/
│   │   └── ...
│   │
│   └── ... (up to 20)
│
└── builder-alchemy/
    └── README.md
```

### 6. How to Handle Unique Categories (17-20)

Unlike Categories 1-16, which use Phase 1-4 folders, Categories 17-20 use different structures. The `SUMMARY.md` handles this perfectly by just changing the folder names.

| Category | Folder Structure | Document Example |
| :--- | :--- | :--- |
| **17. Debugging** | `pillar-1/`, `pillar-2/`, ... `pillar-6/` | `SYMPTOM_REPORT.md`, `ROOT_CAUSE_ANALYSIS.md` |
| **18. System Design** | `dimension-1/`, `dimension-2/`, ... `dimension-8/` | `DESIGN_REQUIREMENTS.md`, `COMPONENT_MAP.md` |
| **19. SEO Optimization** | `pillar-1/`, `pillar-2/`, ... `pillar-8/` | `TECHNICAL_SEO_AUDIT.md`, `KEYWORD_RESEARCH.md` |
| **20. Scalability** | `layer-1/`, `layer-2/`, ... `layer-10/` | `CAPACITY_BASELINE.md`, `DATABASE_SCALING.md` |

### 7. The Power of `README.md` in Every Folder

To make navigation seamless, **every single folder** listed in `SUMMARY.md` must contain a `README.md` file. 

In mdBook:
1. A folder like `01-AI-ML/` becomes clickable in the sidebar because of `README.md`.
2. When a user clicks "01. AI / ML Hackathons", they are taken to `01-AI-ML/README.md`.
3. This `README.md` acts as the **Category Landing Page**. It should contain:
   - A short intro to the category.
   - A list of the phases or pillars inside.
   - Links to jump directly into Phase 1.

### 8. Future Framework Expansion

To add **Builder Alchemy** in the future, you simply:
1. Create the folder `docs/src/builder-alchemy/`.
2. Add its `README.md` and content folders.
3. Add the following to the bottom of `SUMMARY.md`:

The existing Hackathon Alchemy structure remains untouched, and the sidebar automatically updates to show both frameworks.

### 9. Checklist Before Building the Site
- [ ] Every folder has a `README.md`.
- [ ] Every `.md` file has a corresponding entry in `SUMMARY.md`.
- [ ] All file paths in `SUMMARY.md` are relative and correct (e.g., `hackathon-alchemy/01-AI-ML/phase-1/PRD.md`).
- [ ] No document is left out of the sitemap.