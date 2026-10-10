#!/usr/bin/env python3
import os
import re
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(ROOT_DIR, "hackathon-alchemy-source")
DOCS_SRC_DIR = os.path.join(ROOT_DIR, "docs", "src")
HACKATHON_DIR = os.path.join(DOCS_SRC_DIR, "hackathon-alchemy")

CATEGORIES_SPEC = [
    {
        "id": "01-AI-ML",
        "title": "01. AI / ML Hackathons",
        "source_folder": "AI-ML",
        "type": "phases",
        "desc": "Focused on Artificial Intelligence, Machine Learning, LLMs, and RAG architectures."
    },
    {
        "id": "02-Non-AI",
        "title": "02. Non-AI / Traditional Software",
        "source_folder": "Non-AI Traditional Software",
        "type": "phases",
        "desc": "Standard software development focusing on logic, UI/UX, and robust database architectures."
    },
    {
        "id": "03-Automation",
        "title": "03. Automation & Workflow",
        "source_folder": "Automation & Workflow",
        "type": "phases",
        "desc": "Automating repetitive processes and connecting platforms via n8n, Make, and webhooks."
    },
    {
        "id": "04-No-Code",
        "title": "04. No-Code / Low-Code",
        "source_folder": "low-no-code-development",
        "type": "phases",
        "desc": "Building functional applications rapidly using visual and declarative development platforms."
    },
    {
        "id": "05-Data-Analytics",
        "title": "05. Data & Analytics",
        "source_folder": "Data & Analytics",
        "type": "phases",
        "desc": "Data processing, warehousing, analytical pipelines, ETL, and interactive dashboards."
    },
    {
        "id": "06-Web3",
        "title": "06. Web3 / Blockchain",
        "source_folder": "Web3-Blockchain",
        "type": "phases",
        "desc": "Decentralized applications, smart contracts, wallet integrations, and tokenomics."
    },
    {
        "id": "07-IoT",
        "title": "07. IoT / Hardware / Robotics",
        "source_folder": "IoT - Hardware - Robotics",
        "type": "phases",
        "desc": "Physical computing, embedded microcontrollers, sensors, firmware, and telemetry."
    },
    {
        "id": "08-AR-VR",
        "title": "08. AR / VR / XR / Metaverse",
        "source_folder": "AR-VR-XR-Metaverse",
        "type": "phases",
        "desc": "Spatial computing, 3D engines, immersive interactions, and asset rendering pipelines."
    },
    {
        "id": "09-Cybersecurity",
        "title": "09. Cybersecurity",
        "source_folder": "CyberSecurity",
        "type": "phases",
        "desc": "Threat modeling, application security, attack surface reduction, and incident response."
    },
    {
        "id": "10-Cloud-Devops",
        "title": "10. Cloud / DevOps / Platform",
        "source_folder": "Cloud-Devops",
        "type": "phases",
        "desc": "Infrastructure as Code, CI/CD pipelines, container orchestration, and platform engineering."
    },
    {
        "id": "11-Domain-Industry",
        "title": "11. Domain / Industry Hackathons",
        "source_folder": "Domain & Industry",
        "type": "phases",
        "desc": "Specialized solutions for regulated industries including FinTech, HealthTech, and GovTech."
    },
    {
        "id": "12-Creative-Gaming",
        "title": "12. Creative / Media / Gaming",
        "source_folder": "Creative - Media - Gaming",
        "type": "phases",
        "desc": "Game mechanics, storytelling engines, generative creative workflows, and digital media."
    },
    {
        "id": "13-Social-Civic",
        "title": "13. Social Impact / Civic",
        "source_folder": "Social & Civic",
        "type": "phases",
        "desc": "Public good technologies, accessibility-first platforms, sustainability, and community impact."
    },
    {
        "id": "14-Open-Innovation",
        "title": "14. Open Innovation / Corporate",
        "source_folder": "Open-Innovation",
        "type": "phases",
        "desc": "Corporate innovation sprints, partner integrations, stakeholder alignment, and venture models."
    },
    {
        "id": "15-Beginner-Student",
        "title": "15. Beginner / Student / Community",
        "source_folder": "Newbie-Student-Community",
        "type": "phases",
        "desc": "First-time hackers, structured learning paths, mentorship frameworks, and team collaboration."
    },
    {
        "id": "16-Platform-Sponsored",
        "title": "16. Platform-Sponsored",
        "source_folder": "Platform-Sponsored",
        "type": "phases",
        "desc": "Ecosystem and sponsor-focused projects maximizing official SDKs, APIs, and partner quotas."
    },
    {
        "id": "17-Debugging",
        "title": "17. Debugging",
        "source_folder": "DEBUGGING",
        "type": "pillars",
        "desc": "A 6-pillar methodical debugging lifecycle to detect, reproduce, observe, hypothesize, fix, and prevent bugs."
    },
    {
        "id": "18-System-Design",
        "title": "18. Improve System Design",
        "source_folder": "GAP BUILDER",
        "type": "dimensions",
        "desc": "An 8-dimension architectural guide covering requirements, components, storage, APIs, partitioning, resilience, observability, and trade-offs."
    },
    {
        "id": "19-SEO",
        "title": "19. SEO Optimization",
        "source_folder": "SEO-OPTIMIZATION",
        "type": "pillars",
        "desc": "An 8-pillar search engine optimization system covering technical foundation, on-page, content, keywords, and authority."
    },
    {
        "id": "20-Scalability",
        "title": "20. Scalability",
        "source_folder": "Scalability",
        "type": "layers",
        "desc": "A 10-layer scalability stack progressing from baseline capacity, vertical scaling, and horizontal replication to multi-region architectures."
    }
]

def extract_sections_from_file(filepath):
    """Parses a prompt book markdown file into structured sections."""
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    lines = content.split("\n")
    
    sections = []
    current_container = "General"
    current_doc_name = None
    current_lines = []
    
    for line in lines:
        cont_match = re.match(r"^#{1,3}\s+((?:Phase|Pillar|Layer|Dimension)\s+\d+[^:\n]*)(?::\s*([^\n]+))?", line, re.I)
        doc_match = re.match(r"^#{2,3}\s+(?:\d+[\.\s]+)?`?([A-Za-z0-9_ -]+\.md)`?", line)
        if not doc_match and not cont_match:
            doc_alt = re.match(r"^(?:##|###)\s+(?:\d+[\.\s]+)([A-Za-z0-9_ -]+)", line)
            if doc_alt and not re.search(r"(Phase|Pillar|Layer|Dimension|PROMPT|PROMPTS)", line, re.I):
                name = doc_alt.group(1).strip()
                if not name.endswith(".md"):
                    name += ".md"
                doc_match = re.match(r"^(.*)$", name)

        if cont_match:
            if current_doc_name:
                sections.append({
                    "container": current_container,
                    "doc": current_doc_name,
                    "content": "\n".join(current_lines).strip()
                })
                current_doc_name = None
                current_lines = []
            current_container = cont_match.group(1).strip()
            if cont_match.group(2):
                current_container += f": {cont_match.group(2).strip()}"
        elif doc_match:
            if current_doc_name:
                sections.append({
                    "container": current_container,
                    "doc": current_doc_name,
                    "content": "\n".join(current_lines).strip()
                })
            current_doc_name = doc_match.group(1).strip().replace("`", "")
            if not current_doc_name.endswith(".md"):
                current_doc_name += ".md"
            current_lines = [line]
        else:
            if current_doc_name:
                current_lines.append(line)
                
    if current_doc_name and current_lines:
        sections.append({
            "container": current_container,
            "doc": current_doc_name,
            "content": "\n".join(current_lines).strip()
        })
        
    return sections

def extract_numbered_sections(filepath):
    if not os.path.exists(filepath):
        return {}
    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        text = f.read()
    pattern = re.compile(r"^(?:##|###)\s+(\d+)\s+([^\n]+)", re.M)
    matches = list(pattern.finditer(text))
    res = {}
    for i, m in enumerate(matches):
        num = int(m.group(1))
        title = m.group(2).strip()
        start = m.end()
        end = matches[i+1].start() if i + 1 < len(matches) else len(text)
        content = text[start:end].strip()
        res[num] = {"title": title, "content": content}
    return res

AI_ML_NUM_MAP = {
    "PROBLEM_ANALYSIS.md": 1,
    "PRD.md": 2,
    "TRD.md": 3,
    "SYSTEM_ARCHITECTURE.md": 4,
    "DATABASE_SCHEMA.md": 5,
    "API_SPECIFICATION.md": 6,
    "AI_RULES.md": 7,
    "AI_MEMORY.md": 8,
    "PROMPT_LIBRARY.md": 9,
    "CACHE_SCHEMA.md": 10,
    "EVIDENCE_MODEL.md": 11,
    "UI_SPEC.md": 12,
    "ERROR_HANDLING.md": 13,
    "SECURITY.md": 14,
    "TESTING.md": 15,
    "EVALUATION.md": 16,
    "DEPLOYMENT.md": 17,
    "DEMO_SCRIPT.md": 18,
    "GLOSSARY.md": 19,
}

NON_AI_NUM_MAP = {
    "PROBLEM_ANALYSIS.md": 1,
    "PRD.md": 2,
    "TRD.md": 3,
    "SYSTEM_ARCHITECTURE.md": 4,
    "DATABASE_SCHEMA.md": 5,
    "API_SPECIFICATION.md": 6,
    "AUTHENTICATION_FLOW.md": 7,
    "UI_SPEC.md": 8,
    "ERROR_HANDLING.md": 9,
    "SECURITY.md": 10,
    "TESTING.md": 11,
    "EVALUATION.md": 12,
    "DEPLOYMENT.md": 13,
    "DEMO_SCRIPT.md": 14,
    "GLOSSARY.md": 15,
}

def wrap_prompt_code(text):
    clean = text.strip()
    if "```" in clean:
        return clean
    return f"```text\n{clean}\n```"

def clean_doc_filename(raw_name):
    clean = raw_name.replace("`", "").strip()
    clean = re.sub(r"^\d+[\.\s]+", "", clean)
    clean = re.sub(r"\s*\(.*?\)", "", clean)
    clean = clean.strip()
    clean = clean.replace(" ", "_").upper()
    if not clean.endswith(".MD"):
        clean += ".MD"
    return clean.replace(".MD", ".md")

def normalize_container_slug(container_str, container_type):
    # Extracts phase-1, pillar-1, layer-1, dimension-1
    m = re.search(rf"({container_type})[\s-]+(\d+)", container_str, re.I)
    if m:
        return f"{m.group(1).lower()}-{m.group(2)}"
    return f"{container_type}-1"

def write_phase_readme(folder_path, cat_title, phase_name, docs):
    os.makedirs(folder_path, exist_ok=True)
    readme_path = os.path.join(folder_path, "README.md")
    content = f"# {phase_name}\n\n"
    content += f"> **Category:** {cat_title}\n\n"
    content += f"Welcome to **{phase_name}** for **{cat_title}**. This section provides dedicated prompt frameworks and templates to guide your project.\n\n"
    content += "## Documents in this Section\n\n"
    for d in docs:
        d_title = os.path.splitext(d)[0]
        content += f"- [{d_title}]({d})\n"
    content += "\n---\n*Use the navigation in the sidebar to jump directly into each prompt.*"
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)

def write_category_readme(folder_path, cat_title, cat_desc, subcontainers):
    os.makedirs(folder_path, exist_ok=True)
    readme_path = os.path.join(folder_path, "README.md")
    content = f"# {cat_title}\n\n"
    content += f"> {cat_desc}\n\n"
    content += "## Overview\n\n"
    content += f"This category provides structured prompt packs tailored for **{cat_title}** projects.\n"
    content += "Follow the structured workflow below to build from concept to delivery.\n\n"
    content += "## Structure & Navigation\n\n"
    for sub in subcontainers:
        sub_title = sub["title"]
        sub_rel = f"{sub['slug']}/README.md"
        content += f"### [{sub_title}]({sub_rel})\n"
        for doc in sub["docs"]:
            d_name = os.path.splitext(doc)[0]
            content += f"- [{d_name}]({sub['slug']}/{doc})\n"
        content += "\n"
    content += "---\n*Select any document from the list above or use the sidebar to proceed.*"
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)

def build_all():
    print("Beginning documentation build...")
    os.makedirs(HACKATHON_DIR, exist_ok=True)

    summary_lines = [
        "# Summary\n",
        "[Welcome to Alchemy Docs](introduction.md)\n",
        "# Hackathon Alchemy\n",
        "- [Framework Overview](hackathon-alchemy/README.md)",
        "- [How to Use This Framework](hackathon-alchemy/how-to-use.md)\n"
    ]

    for cat in CATEGORIES_SPEC:
        cat_id = cat["id"]
        cat_title = cat["title"]
        cat_folder = os.path.join(HACKATHON_DIR, cat_id)
        os.makedirs(cat_folder, exist_ok=True)
        summary_lines.append(f"## {cat_title}\n")
        summary_lines.append(f"- [Category Overview](hackathon-alchemy/{cat_id}/README.md)")

        src_folder_path = os.path.join(SOURCE_DIR, cat["source_folder"])
        src_files = [f for f in os.listdir(src_folder_path) if f.endswith(".md")] if os.path.exists(src_folder_path) else []
        
        extracted_sections = []
        if src_files:
            main_src_file = os.path.join(src_folder_path, src_files[0])
            extracted_sections = extract_sections_from_file(main_src_file)
            # Copy source file as reference
            shutil.copy(main_src_file, os.path.join(cat_folder, "SOURCE_PROMPT_BOOK.md"))

        subcontainers = []
        c_type = cat["type"]

        if c_type == "phases":
            if cat_id == "01-AI-ML":
                default_phases = [
                    {"num": 1, "slug": "phase-1", "title": "Phase 1: Problem Definition", "default_docs": ["PROBLEM_ANALYSIS.md", "PRD.md", "TRD.md"]},
                    {"num": 2, "slug": "phase-2", "title": "Phase 2: Technical Blueprint", "default_docs": ["SYSTEM_ARCHITECTURE.md", "DATABASE_SCHEMA.md", "API_SPECIFICATION.md", "AI_RULES.md", "AI_MEMORY.md", "PROMPT_LIBRARY.md", "CACHE_SCHEMA.md", "EVIDENCE_MODEL.md"]},
                    {"num": 3, "slug": "phase-3", "title": "Phase 3: Execution & Quality", "default_docs": ["UI_SPEC.md", "ERROR_HANDLING.md", "SECURITY.md", "TESTING.md", "EVALUATION.md"]},
                    {"num": 4, "slug": "phase-4", "title": "Phase 4: Delivery & Presentation", "default_docs": ["DEPLOYMENT.md", "DEMO_SCRIPT.md", "GLOSSARY.md"]}
                ]
            elif cat_id == "02-Non-AI":
                default_phases = [
                    {"num": 1, "slug": "phase-1", "title": "Phase 1: Problem Definition", "default_docs": ["PROBLEM_ANALYSIS.md", "PRD.md", "TRD.md"]},
                    {"num": 2, "slug": "phase-2", "title": "Phase 2: Technical Blueprint", "default_docs": ["SYSTEM_ARCHITECTURE.md", "DATABASE_SCHEMA.md", "API_SPECIFICATION.md", "AUTHENTICATION_FLOW.md"]},
                    {"num": 3, "slug": "phase-3", "title": "Phase 3: Execution & Quality", "default_docs": ["UI_SPEC.md", "ERROR_HANDLING.md", "SECURITY.md", "TESTING.md", "EVALUATION.md"]},
                    {"num": 4, "slug": "phase-4", "title": "Phase 4: Delivery & Presentation", "default_docs": ["DEPLOYMENT.md", "DEMO_SCRIPT.md", "GLOSSARY.md"]}
                ]
            else:
                default_phases = [
                    {"num": 1, "slug": "phase-1", "title": "Phase 1: Problem Definition", "default_docs": ["PROBLEM_ANALYSIS.md", "PRD.md", "TRD.md"]},
                    {"num": 2, "slug": "phase-2", "title": "Phase 2: Technical Blueprint", "default_docs": ["SYSTEM_ARCHITECTURE.md", "DATABASE_SCHEMA.md", "API_SPECIFICATION.md"]},
                    {"num": 3, "slug": "phase-3", "title": "Phase 3: Execution & Quality", "default_docs": ["UI_SPEC.md", "ERROR_HANDLING.md", "SECURITY.md", "TESTING.md", "EVALUATION.md"]},
                    {"num": 4, "slug": "phase-4", "title": "Phase 4: Delivery & Presentation", "default_docs": ["DEPLOYMENT.md", "DEMO_SCRIPT.md", "GLOSSARY.md"]}
                ]
                if cat_id == "16-Platform-Sponsored":
                    default_phases[0]["default_docs"] = ["PLATFORM_ANALYSIS.md", "PRD.md", "TRD.md"]

            for dp in default_phases:
                p_slug = dp["slug"]
                p_title = dp["title"]
                p_folder = os.path.join(cat_folder, p_slug)
                os.makedirs(p_folder, exist_ok=True)

                if cat_id in ["01-AI-ML", "02-Non-AI"]:
                    num_sections = extract_numbered_sections(main_src_file)
                    num_map = AI_ML_NUM_MAP if cat_id == "01-AI-ML" else NON_AI_NUM_MAP
                    final_docs = dp["default_docs"]
                    for d in final_docs:
                        doc_path = os.path.join(p_folder, d)
                        content = ""
                        num = num_map.get(d)
                        if num and num in num_sections:
                            raw_body = num_sections[num]["content"]
                            content = wrap_prompt_code(raw_body)
                        if not content:
                            d_title = os.path.splitext(d)[0]
                            content = f"### Overview\nThis document defines the prompt template for **{d_title}** in **{cat_title}**.\n\n### Prompt Template\n```text\nYou are a senior technical advisor assisting a hackathon team building a {cat_title} project.\nGenerate the {d_title} covering all essential requirements, architectures, schemas, or procedures.\n```\n"
                        with open(doc_path, "w", encoding="utf-8") as f:
                            f.write(f"# {os.path.splitext(d)[0]}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{content}\n")
                else:
                    matched_docs = []
                    for s in extracted_sections:
                        if f"phase {dp['num']}" in s["container"].lower():
                            c_doc = clean_doc_filename(s["doc"])
                            if c_doc not in matched_docs:
                                matched_docs.append((c_doc, s["content"]))

                    final_docs = []
                    for doc_name, doc_content in matched_docs:
                        final_docs.append(doc_name)
                        doc_path = os.path.join(p_folder, doc_name)
                        with open(doc_path, "w", encoding="utf-8") as f:
                            f.write(f"# {os.path.splitext(doc_name)[0]}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{doc_content}\n")

                    for def_doc in dp["default_docs"]:
                        if def_doc not in final_docs:
                            final_docs.append(def_doc)
                            doc_path = os.path.join(p_folder, def_doc)
                            if not os.path.exists(doc_path):
                                with open(doc_path, "w", encoding="utf-8") as f:
                                    d_title = os.path.splitext(def_doc)[0]
                                    f.write(f"# {d_title}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}  \n> **Status:** Standard Framework Specification\n\n---\n\n### Overview\nThis document defines the prompt template for **{d_title}** in **{cat_title}**.\n\n### Prompt Template\n```text\nYou are a senior technical advisor assisting a hackathon team building a {cat_title} project.\nGenerate the {d_title} covering all essential requirements, architectures, schemas, or procedures.\n```\n")

                write_phase_readme(p_folder, cat_title, p_title, final_docs)
                subcontainers.append({"title": p_title, "slug": p_slug, "docs": final_docs})

                summary_lines.append(f"  - [{p_title}](hackathon-alchemy/{cat_id}/{p_slug}/README.md)")
                for doc in final_docs:
                    d_title = os.path.splitext(doc)[0]
                    summary_lines.append(f"    - [{d_title}](hackathon-alchemy/{cat_id}/{p_slug}/{doc})")

        elif c_type == "pillars" and cat_id == "17-Debugging":
            pillars_def = [
                {"num": 1, "slug": "pillar-1", "title": "Pillar 1: Detect & Define", "docs": ["SYMPTOM_REPORT.md", "IMPACT_ASSESSMENT.md"]},
                {"num": 2, "slug": "pillar-2", "title": "Pillar 2: Reproduce & Isolate", "docs": ["REPRODUCTION_STEPS.md", "ENVIRONMENT_MATRIX.md", "BISECT_PLAN.md"]},
                {"num": 3, "slug": "pillar-3", "title": "Pillar 3: Instrument & Observe", "docs": ["OBSERVABILITY_SETUP.md", "LOG_TRACE_STRATEGY.md", "DEVTOOLS_WORKFLOW.md"]},
                {"num": 4, "slug": "pillar-4", "title": "Pillar 4: Hypothesize & Test", "docs": ["HYPOTHESIS_LOG.md", "ROOT_CAUSE_ANALYSIS.md", "EXPERIMENT_TRACKER.md"]},
                {"num": 5, "slug": "pillar-5", "title": "Pillar 5: Resolve & Verify", "docs": ["FIX_IMPLEMENTATION.md", "REGRESSION_TEST_PLAN.md", "DEPLOYMENT_PLAN.md"]},
                {"num": 6, "slug": "pillar-6", "title": "Pillar 6: Prevent & Learn", "docs": ["POST_MORTEM.md", "PREVENTION_CHECKLIST.md", "TECH_DEBT_LOG.md", "DEBUG_TOOLING.md", "GLOSSARY.md"]}
            ]
            for pil in pillars_def:
                p_slug = pil["slug"]
                p_title = pil["title"]
                p_folder = os.path.join(cat_folder, p_slug)
                os.makedirs(p_folder, exist_ok=True)
                final_docs = pil["docs"]
                for d in final_docs:
                    doc_path = os.path.join(p_folder, d)
                    content = ""
                    for s in extracted_sections:
                        if clean_doc_filename(s["doc"]) == d:
                            content = s["content"]
                            break
                    if not content:
                        content = f"### Overview\nThis document defines the prompt template for **{os.path.splitext(d)[0]}** in Debugging."
                    with open(doc_path, "w", encoding="utf-8") as f:
                        f.write(f"# {os.path.splitext(d)[0]}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{content}\n")
                write_phase_readme(p_folder, cat_title, p_title, final_docs)
                subcontainers.append({"title": p_title, "slug": p_slug, "docs": final_docs})
                summary_lines.append(f"  - [{p_title}](hackathon-alchemy/{cat_id}/{p_slug}/README.md)")
                for doc in final_docs:
                    d_title = os.path.splitext(doc)[0]
                    summary_lines.append(f"    - [{d_title}](hackathon-alchemy/{cat_id}/{p_slug}/{doc})")

        elif c_type == "dimensions" and cat_id == "18-System-Design":
            dimensions_def = [
                {"num": 1, "slug": "dimension-1", "title": "Dimension 1: Requirements & Scope", "docs": ["DESIGN_REQUIREMENTS.md", "CAPACITY_ESTIMATION.md"]},
                {"num": 2, "slug": "dimension-2", "title": "Dimension 2: Component Architecture", "docs": ["COMPONENT_MAP.md", "DATA_FLOW.md"]},
                {"num": 3, "slug": "dimension-3", "title": "Dimension 3: Data Storage & Modeling", "docs": ["STORAGE_CHOICE.md", "SCHEMA_DESIGN.md"]},
                {"num": 4, "slug": "dimension-4", "title": "Dimension 4: Communication & APIs", "docs": ["API_PROTOCOLS.md", "INTERFACE_CONTRACTS.md"]},
                {"num": 5, "slug": "dimension-5", "title": "Dimension 5: Scalability & Partitioning", "docs": ["PARTITIONING_STRATEGY.md", "REPLICATION_PLAN.md"]},
                {"num": 6, "slug": "dimension-6", "title": "Dimension 6: Resilience & Fault Tolerance", "docs": ["FAILURE_MODES.md", "REDUNDANCY_FAILOVER.md"]},
                {"num": 7, "slug": "dimension-7", "title": "Dimension 7: Observability & Operations", "docs": ["METRICS_LOGS.md", "DEPLOYMENT_RUNBOOK.md"]},
                {"num": 8, "slug": "dimension-8", "title": "Dimension 8: Evolution & Trade-offs", "docs": ["TRADEOFF_ANALYSIS.md", "FUTURE_EVOLUTION.md"]}
            ]
            for dim in dimensions_def:
                p_slug = dim["slug"]
                p_title = dim["title"]
                p_folder = os.path.join(cat_folder, p_slug)
                os.makedirs(p_folder, exist_ok=True)
                final_docs = dim["docs"]
                for d in final_docs:
                    doc_path = os.path.join(p_folder, d)
                    d_name = os.path.splitext(d)[0]
                    content = f"### Purpose & Context\nGuide the architectural design of **{d_name}** in modern distributed systems.\n\n### Prompt Template\n```text\nYou are a Principal System Architect.\nDesign the {d_name} for the system specified below:\n[PASTE SYSTEM CONTEXT]\n```\n"
                    with open(doc_path, "w", encoding="utf-8") as f:
                        f.write(f"# {d_name}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{content}\n")
                write_phase_readme(p_folder, cat_title, p_title, final_docs)
                subcontainers.append({"title": p_title, "slug": p_slug, "docs": final_docs})
                summary_lines.append(f"  - [{p_title}](hackathon-alchemy/{cat_id}/{p_slug}/README.md)")
                for doc in final_docs:
                    d_title = os.path.splitext(doc)[0]
                    summary_lines.append(f"    - [{d_title}](hackathon-alchemy/{cat_id}/{p_slug}/{doc})")

        elif c_type == "pillars" and cat_id == "19-SEO":
            seo_pillars_def = [
                {"num": 1, "slug": "pillar-1", "title": "Pillar 1: Technical Foundation", "docs": ["TECHNICAL_SEO_AUDIT.md", "CORE_WEB_VITALS.md", "CRAWLABILITY_INDEXING.md"]},
                {"num": 2, "slug": "pillar-2", "title": "Pillar 2: On-Page Optimization", "docs": ["ON_PAGE_SEO.md", "SCHEMA_MARKUP.md"]},
                {"num": 3, "slug": "pillar-3", "title": "Pillar 3: Content Strategy", "docs": ["CONTENT_STRATEGY.md", "TOPIC_CLUSTERS.md", "CONTENT_QUALITY.md"]},
                {"num": 4, "slug": "pillar-4", "title": "Pillar 4: Keyword Architecture", "docs": ["KEYWORD_RESEARCH.md", "KEYWORD_MAPPING.md"]},
                {"num": 5, "slug": "pillar-5", "title": "Pillar 5: Off-Page Authority", "docs": ["BACKLINK_STRATEGY.md", "BRAND_SIGNALS.md"]},
                {"num": 6, "slug": "pillar-6", "title": "Pillar 6: Local & International", "docs": ["LOCAL_SEO.md", "INTERNATIONAL_SEO.md"]},
                {"num": 7, "slug": "pillar-7", "title": "Pillar 7: User Experience Signals", "docs": ["UX_SEO_SIGNALS.md", "MOBILE_SEO.md"]},
                {"num": 8, "slug": "pillar-8", "title": "Pillar 8: Measurement & Iteration", "docs": ["SEO_ANALYTICS.md", "SEO_TESTING.md", "SEO_ROADMAP.md", "SEO_TOOLING.md", "GLOSSARY.md"]}
            ]
            for pil in seo_pillars_def:
                p_slug = pil["slug"]
                p_title = pil["title"]
                p_folder = os.path.join(cat_folder, p_slug)
                os.makedirs(p_folder, exist_ok=True)
                final_docs = pil["docs"]
                for d in final_docs:
                    doc_path = os.path.join(p_folder, d)
                    content = ""
                    for s in extracted_sections:
                        if clean_doc_filename(s["doc"]) == d:
                            content = s["content"]
                            break
                    if not content:
                        content = f"### Overview\nThis document defines the prompt template for **{os.path.splitext(d)[0]}** in SEO Optimization."
                    with open(doc_path, "w", encoding="utf-8") as f:
                        f.write(f"# {os.path.splitext(d)[0]}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{content}\n")
                write_phase_readme(p_folder, cat_title, p_title, final_docs)
                subcontainers.append({"title": p_title, "slug": p_slug, "docs": final_docs})
                summary_lines.append(f"  - [{p_title}](hackathon-alchemy/{cat_id}/{p_slug}/README.md)")
                for doc in final_docs:
                    d_title = os.path.splitext(doc)[0]
                    summary_lines.append(f"    - [{d_title}](hackathon-alchemy/{cat_id}/{p_slug}/{doc})")

        elif c_type == "layers" and cat_id == "20-Scalability":
            layers_def = [
                {"num": 1, "slug": "layer-1", "title": "Layer 1: Baseline & Capacity", "docs": ["CAPACITY_BASELINE.md", "LOAD_PROFILE.md"]},
                {"num": 2, "slug": "layer-2", "title": "Layer 2: Vertical Scaling", "docs": ["VERTICAL_SCALING.md", "INSTANCE_SIZING.md"]},
                {"num": 3, "slug": "layer-3", "title": "Layer 3: Horizontal Scaling", "docs": ["HORIZONTAL_SCALING.md", "STATELESS_DESIGN.md"]},
                {"num": 4, "slug": "layer-4", "title": "Layer 4: Data Layer Scaling", "docs": ["DATABASE_SCALING.md", "REPLICATION_PARTITIONING.md", "CACHE_STRATEGY.md"]},
                {"num": 5, "slug": "layer-5", "title": "Layer 5: Caching & CDN", "docs": ["CDN_STRATEGY.md", "EDGE_COMPUTING.md"]},
                {"num": 6, "slug": "layer-6", "title": "Layer 6: Async & Queues", "docs": ["ASYNC_ARCHITECTURE.md", "EVENT_DRIVEN_DESIGN.md"]},
                {"num": 7, "slug": "layer-7", "title": "Layer 7: Cost & Efficiency", "docs": ["COST_OPTIMIZATION.md", "EFFICIENCY_METRICS.md"]},
                {"num": 8, "slug": "layer-8", "title": "Layer 8: Resilience at Scale", "docs": ["RESILIENCE_AT_SCALE.md", "OBSERVABILITY_AT_SCALE.md"]},
                {"num": 9, "slug": "layer-9", "title": "Layer 9: Multi-Region", "docs": ["MULTI_REGION_STRATEGY.md", "GLOBAL_DATA_STRATEGY.md"]},
                {"num": 10, "slug": "layer-10", "title": "Layer 10: Governance at Scale", "docs": ["SCALE_GOVERNANCE.md", "SCALE_ROADMAP.md", "SCALABILITY_GLOSSARY.md", "SCALE_TOOLING.md"]}
            ]
            for lay in layers_def:
                p_slug = lay["slug"]
                p_title = lay["title"]
                p_folder = os.path.join(cat_folder, p_slug)
                os.makedirs(p_folder, exist_ok=True)
                final_docs = lay["docs"]
                for d in final_docs:
                    doc_path = os.path.join(p_folder, d)
                    content = ""
                    for s in extracted_sections:
                        if clean_doc_filename(s["doc"]) == d:
                            content = s["content"]
                            break
                    if not content:
                        content = f"### Overview\nThis document defines the prompt template for **{os.path.splitext(d)[0]}** in Scalability."
                    with open(doc_path, "w", encoding="utf-8") as f:
                        f.write(f"# {os.path.splitext(d)[0]}\n\n> **Category:** {cat_title}  \n> **Section:** {p_title}\n\n---\n\n{content}\n")
                write_phase_readme(p_folder, cat_title, p_title, final_docs)
                subcontainers.append({"title": p_title, "slug": p_slug, "docs": final_docs})
                summary_lines.append(f"  - [{p_title}](hackathon-alchemy/{cat_id}/{p_slug}/README.md)")
                for doc in final_docs:
                    d_title = os.path.splitext(doc)[0]
                    summary_lines.append(f"    - [{d_title}](hackathon-alchemy/{cat_id}/{p_slug}/{doc})")

        write_category_readme(cat_folder, cat_title, cat["desc"], subcontainers)
        summary_lines.append("")

    # Builder Alchemy Section
    summary_lines.append("# Builder Alchemy (Future)\n")
    summary_lines.append("- [Framework Overview](builder-alchemy/README.md)\n")

    # Write SUMMARY.md
    summary_content = "\n".join(summary_lines)
    summary_src_path = os.path.join(DOCS_SRC_DIR, "SUMMARY.md")
    with open(summary_src_path, "w", encoding="utf-8") as f:
        f.write(summary_content)

    summary_root_path = os.path.join(ROOT_DIR, "docs", "SUMMARY.md")
    with open(summary_root_path, "w", encoding="utf-8") as f:
        f.write(summary_content)

    print("SUMMARY.md generated successfully.")

if __name__ == "__main__":
    build_all()
