# AI_MEMORY

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

State and memory management dictate whether an AI feels like a context-aware assistant or a disconnected, forgetful bot. However, implementing comprehensive cognitive memory within a 24–48 hour hackathon requires pragmatic engineering: choosing lightweight, reliable patterns over complex, fragile multi-tier architectures.

This blueprint prompt instructs your AI coding assistant to design a lightweight yet capable memory management strategy covering short-term conversation context, persistent storage, and automatic context compression.

---

## Key Memory Management Concepts

When planning AI memory for a hackathon:
- **Short-Term Context Window:** The sliding window of recent messages sent directly within the request payload. Balance context richness with token latency and cost.
- **Context Summarization:** When dialogue exceeds a token threshold (e.g., 4,000 tokens), generate a succinct rolling summary and inject it into the system prompt rather than dropping early conversation history entirely.
- **Long-Term Retrieval:** Store user preferences, key entities, and past conversation highlights in a relational database or vector store for semantic recall.
- **Session Identification:** Use clean session IDs in cookies or authorization headers so backend services can easily bind incoming prompts to ongoing threads.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your PRD and AI Rules documents:

```text
Act as an AI systems engineer.
Using the PRD and AI Rules, create the AI Memory Management document for this hackathon project.

PRD: [PASTE PRD]
AI_RULES: [PASTE AI_RULES]

Provide:
1. Short-term memory strategy (Conversation buffer, sliding window, context window token caps)
2. Long-term memory strategy (Database persistence, entity extraction, Vector DB if applicable)
3. Memory retrieval strategy (How past interactions and user facts are pulled into subsequent prompts)
4. Summarization strategy (Trigger conditions, summary prompt, and context injection method when the window fills)
5. State management architecture (How backend and client track user sessions across restarts)
6. Privacy and data retention considerations for stored memories
7. A step-by-step implementation plan feasible within a 24-48 hour hackathon sprint

Explain how memory improves user experience without creating complex backend failure modes.

-------------------------
```

---

## Expected Output Structure

A complete AI Memory blueprint should provide:
1. **Memory Flow Architecture:** Visual or text diagram detailing how user inputs trigger retrieval, augmentation, generation, and persistence.
2. **Data Model Schemas:** Exact fields for `conversation_sessions` and `context_memories`.
3. **Summarization Prompt Template:** The utility prompt used to distill past exchanges into a concise 100-token briefing.
4. **Implementation Checklist:** Minimal code snippets for storing and retrieving dialogue history.
