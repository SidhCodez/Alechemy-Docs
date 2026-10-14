# DATABASE_SCHEMA

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

Designing a resilient database schema for an AI/ML hackathon application requires balancing traditional application data (users, organizations, payments) with AI-specific data structures (chat threads, message histories, embeddings, prompt telemetry, and evaluation logs).

In a fast-paced 24–48 hour sprint, over-engineering the database is a common failure mode. This blueprint prompt guides your LLM to generate an efficient, production-ready SQL or NoSQL schema that covers core application state without introducing unnecessary complexity.

---

## Key AI Database Considerations

When architecting data storage for AI hackathon prototypes:
- **Vector Storage:** Decide early between an all-in-one database with vector support (e.g., PostgreSQL with `pgvector`, Supabase) versus a dedicated vector database (Pinecone, Qdrant, Chroma). For hackathons, an integrated solution like PostgreSQL + `pgvector` eliminates multi-database sync issues.
- **Conversation State:** Store distinct `threads` (or `sessions`) and `messages`. Every message should record `role` (system, user, assistant, tool), `content`, `token_count`, and optional metadata like `finish_reason` or latency.
- **Audit & Cost Tracking:** Track model invocations, prompt versions, and token usage to monitor API costs and debug hallucinations during live judging.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your Project PRD and Architecture documents:

```text
Act as a senior database engineer.
Using the PRD and System Architecture below, design the database schema for an AI hackathon project.

PRD: [PASTE PRD]
ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]

Provide:
1. Tables (Include standard tables + AI-specific tables like ChatHistory, PromptLogs, Embeddings)
2. Columns
3. Data types
4. Primary keys
5. Foreign keys
6. Relationships
7. Required fields
8. Optional fields
9. Indexes where useful (including HNSW or IVFFlat vector indexes if applicable)
10. Example records
11. Complete SQL schema (PostgreSQL dialect preferred)

Explain why each table exists. 
Keep the database simple enough for a beginner hackathon team to understand and maintain.

-------------------------
```

---

## Expected Output Structure

A successful schema generation should provide:
1. **Core Relational Tables:** `users`, `workspaces`/`projects`, `sessions`.
2. **AI History Tables:** `chat_messages` with parent-message tracking for branching, token metrics, and timestamping.
3. **Knowledge Base / Vector Tables:** `documents`, `document_chunks` with `vector(1536)` (or matching your embedding dimension) and content hashing.
4. **Indexes & Constraints:** Foreign key constraints with cascading deletes where appropriate, plus B-Tree indexes on lookup keys (`user_id`, `created_at`) and vector indexes for nearest-neighbor similarity.

---

## Best Practices for Hackathon Sprints

- **Use UUIDs or CUIDs:** Prevents collision issues when seeding demo data or running parallel tests.
- **Avoid Premature Sharding:** Keep all tables in a single relational database; hackathon data volume rarely exceeds standard single-instance capacity.
- **Seed Scripts Ready:** Prepare a deterministic SQL seed script with 5–10 realistic records so your demo UI looks vibrant and lived-in immediately upon deployment.
