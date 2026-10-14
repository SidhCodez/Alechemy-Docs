# PROMPT_LIBRARY

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

A robust Prompt Library is the operational engine of any generative AI product. Rather than scattering raw strings across application code, a centralized prompt library defines system prompts, user personas, variable placeholders, few-shot examples, and strict output schemas.

This blueprint prompt instructs your AI coding assistant to create a modular, maintainable prompt repository tailored to your project's specific workflows and evaluation criteria.

---

## Key Prompt Engineering Components

When designing a production-ready prompt architecture:
- **System Prompts & Personas:** Establish the exact identity, constraints, domain expertise, and guardrails of the AI assistant.
- **Dynamic Variable Injection:** Clearly demarcate dynamic user inputs (e.g., `{{USER_QUERY}}`, `{{RETRIEVED_CHUNKS}}`, `{{CURRENT_DATE}}`) to prevent prompt injection and context drift.
- **Few-Shot Demonstrations:** Provide 2–3 high-quality input-output pairs that guide the model toward desired formatting and edge-case handling.
- **Structured Output Guarantees:** Enforce deterministic formats (JSON schemas, Markdown tables, or tool calls) for predictable programmatic consumption.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your PRD and AI Rules documents:

```text
Act as a principal prompt engineer and AI architect.
Using the PRD, System Architecture, and AI Rules below, design the complete Prompt Library for this AI hackathon project.

PRD: [PASTE PRD]
AI_RULES: [PASTE AI_RULES]
SYSTEM_ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]

Provide:
1. Core System Prompt (Complete, production-ready system instructions including persona, constraints, and safety guidelines)
2. Task-Specific Prompt Templates (One template for each AI-driven feature in the PRD, complete with {{VARIABLE}} placeholders)
3. Few-Shot Examples (At least two input/output pairs per complex task to demonstrate formatting and reasoning)
4. Structured Output Schemas (JSON schema or Zod definition matching the output requirements of each task)
5. Fallback & Clarification Prompts (What to send when user input is ambiguous, incomplete, or off-topic)
6. Token Optimization Notes (Guidelines on trimming unnecessary verbiage to maximize context efficiency)
7. Developer Integration Guide (How backend code should load, populate, and call these prompts)

Ensure prompts prevent hallucinations, preserve brand tone, and are immediately ready for implementation.

-------------------------
```

---

## Expected Output Structure

A complete Prompt Library document should include:
1. **Master Persona:** Defined tone, voice, reading level, and operational boundaries.
2. **Template Catalog:** Markdown-formatted files or JSON structures mapping feature names to system and user prompt pairs.
3. **Guardrails & Negative Constraints:** Explicit instructions on prohibited topics, sensitive data handling, and refusal phrasing.
4. **Few-Shot Exemplars:** Concrete examples illustrating target quality, brevity, and formatting.

---

## Hackathon Pro-Tips

- **Version Your Prompts:** Keep prompt strings in dedicated files (e.g., `prompts/v1/extract_summary.ts`) so team members can iterate on copy without breaking backend logic.
- **Test with Edge Cases:** Verify prompts with malformed inputs, empty context, and adversarially crafted queries before the judging demo.
