# CACHE_SCHEMA

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

In AI hackathon prototypes, latency and rate limits are the primary enemies of a successful presentation. Calling frontier LLMs repeatedly for identical queries consumes precious seconds and exhausts API quotas. A pragmatic caching strategy drastically improves UI responsiveness and shields your application from upstream downtime.

This blueprint prompt guides your backend team in architecting an effective caching layer, covering in-memory key-value stores, semantic caching, and cache invalidation policies.

---

## Core AI Caching Paradigms

When designing a caching schema for generative applications:
- **Exact-Match Key Caching:** Cache responses based on a deterministic hash of the model name, temperature, and sanitized prompt string. If an exact duplicate query arrives, return the stored response in <10 milliseconds.
- **Semantic Caching:** For natural language queries that share identical intent but differ in phrasing, use vector embeddings and cosine similarity thresholds (e.g. >0.95 similarity) to serve cached completions.
- **Embedding Caching:** Generating vector embeddings for static documents or FAQs should happen once; cache all generated embeddings locally to eliminate duplicate embedding API calls.
- **Cache TTL & Volatility:** Set generous Time-To-Live (TTL) values for static queries and demo workflows to ensure zero-latency responses during your live pitch.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your System Architecture and API Specification documents:

```text
Act as a backend and DevOps engineer.
Using the System Architecture and API Specification below, create a comprehensive Caching Strategy document for this AI hackathon project.

ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]
API_SPEC: [PASTE API_SPECIFICATION]

Provide:
1. Cache strategy selection (In-memory, Redis, Upstash, or Semantic Cache)
2. Cache key naming convention (How to uniquely identify prompt requests, sessions, and embeddings)
3. Time-to-live (TTL) rules for each data tier (Static responses, dynamic chats, user profiles)
4. Cache invalidation strategy (Trigger events for clearing or updating stale cache entries)
5. Content whitelist (What should be cached: common LLM outputs, embeddings, metadata)
6. Content blacklist (What must never be cached: auth tokens, personal data, sensitive credentials)
7. Fallback behavior (How the application handles cache misses or connection failures)
8. A practical implementation checklist tailored for a 24-48 hour hackathon

Explain how this caching strategy saves money, prevents rate limit crashes, and accelerates the demo.

-------------------------
```

---

## Expected Output Structure

A complete Caching Strategy document should include:
1. **Architecture Blueprint:** Storage technology decision (e.g., Upstash Redis for serverless Next.js, or local in-memory node-cache).
2. **Key Schema Catalog:** Structured table of key patterns (e.g., `ai:cache:v1:{hash(prompt)}`, `emb:v1:{doc_id}`).
3. **Invalidation Matrix:** Clear triggers defining when records expire or get purged.
4. **Resilience Strategy:** Graceful bypass logic ensuring that if the cache fails, queries pass directly to the LLM without crashing the app.
