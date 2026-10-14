# EVIDENCE_MODEL

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

Modern AI hackathons frequently hinge on Retrieval-Augmented Generation (RAG) and grounded question-answering. However, judges are quick to spot hallucinations or hand-waving AI outputs. A formal Evidence Model defines the authoritative sources of truth, chunking algorithms, vector similarity metrics, citation formats, and validation checks that ground your model's outputs.

This blueprint prompt instructs your AI specialist to construct a robust evidence and grounding framework that gives judges confidence in your system's accuracy.

---

## Core Grounding & RAG Principles

When architecting an Evidence Model:
- **Corpus Boundaries:** Explicitly define the boundaries of your knowledge base. Ingesting clean, well-curated documents yields far superior demo results compared to dumping raw, unparsed web scrapes.
- **Chunking Strategy:** Tailor chunk size to your retrieval unit. Semantic chunking or recursive character splitting (e.g., 500–800 characters with 100-character overlap) preserves context while preventing token overflow.
- **Top-K & Similarity Filtering:** Retrieve a focused set of chunks (typically Top 3–5) and apply a similarity threshold cutoff (e.g., cosine similarity >0.78) to prevent irrelevant noise from contaminating the LLM context.
- **Verifiable Citations:** Require the AI to cite specific source names, chunk IDs, or page numbers in every factual claim so judges can verify answers in real time.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your PRD and AI Rules documents:

```text
You are a RAG and knowledge grounding expert.
Using the PRD, System Architecture, and AI Rules below, create the Evidence and Grounding Model for this AI hackathon project.

PRD: [PASTE PRD]
AI_RULES: [PASTE AI_RULES]
ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]

Provide:
1. Primary source of truth definition (Where does the AI obtain its validated facts?)
2. Document ingestion and chunking strategy (Optimal chunk size, overlap, and preprocessing rules)
3. Embedding model selection (Model name, dimensions, cost, and latency rationale)
4. Vector storage solution (Database selection and indexing strategy)
5. Retrieval logic (Top-K parameter, similarity metric, threshold cutoffs, and reranking if necessary)
6. Grounded prompt template (The exact wrapper prompt injecting context chunks with strict adherence rules)
7. Source citation format (How the model references specific documents, pages, or chunk IDs in its output)
8. Hallucination detection and verification checklist (Pre-output checks and refusal handling when evidence is lacking)
9. Non-RAG alternative grounding (If RAG is unnecessary, provide few-shot or structured injection alternatives)

Ensure the evidence model is simple to implement and yields rock-solid, demonstrable grounding during judging.

-------------------------
```

---

## Expected Output Structure

A complete Evidence Model document should include:
1. **Pipeline Data Flow:** Ingestion, chunking, embedding, indexing, retrieval, and prompt injection steps.
2. **Chunk Metadata Schema:** Fields stored alongside vector embeddings (e.g., `document_id`, `source_url`, `chunk_index`, `text_snippet`).
3. **Grounding Prompt Specification:** Verbatim system instructions forcing the LLM to rely exclusively on supplied context.
4. **Citation UI Specification:** How frontend components render clickable source pills or footnotes from citations.
