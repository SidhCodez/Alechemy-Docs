# AI_RULES

> **Category:** 01. AI / ML Hackathons  
> **Section:** Phase 2: Technical Blueprint

---

## Overview

Deploying an AI-driven application in a high-stakes hackathon environment demands strict behavioral guardrails. Without well-defined rules, language models can hallucinate false claims, leak proprietary instructions, exceed context windows, or produce malformed responses that crash your frontend parser during a live demonstration.

This blueprint prompt guides your AI architect to establish clear system instructions, safety boundaries, hallucination mitigations, and fallback strategies for the entire development team.

---

## Key AI Governance Considerations

When creating your project guardrails:
- **System Persona & Boundaries:** Define precisely what the model is authorized to do and what requests it must decline. For example, instruct it to refuse unrelated coding requests or financial advice.
- **Output Determinism:** For programmatic pipelines, mandate JSON mode or strict schema adherence with negative constraints (e.g., "Do NOT output markdown code fences or conversational conversational preamble").
- **Hallucination Mitigation:** Enforce a "say 'I don't know' when uncertain" policy, and instruct the model to cite specific IDs or keys from supplied context rather than extrapolating facts.
- **Graceful Degradation:** Specify fallback copy for when upstream APIs trigger rate limits (HTTP 429), timeouts, or safety filters.

---

## The Blueprint Prompt

Copy and paste the following prompt into your AI coding assistant (ChatGPT, Claude, Cursor, Copilot) after providing your PRD and System Architecture documents:

```text
You are an AI safety and prompt engineering expert.
Using the PRD and System Architecture, create the AI Rules and Guardrails document for this hackathon project.

PRD: [PASTE PRD]
ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]

Create the AI_RULES.md with these sections:
1. System Prompt definition (The exact base prompt for the AI)
2. AI persona and tone guidelines
3. Context window management rules
4. Hallucination mitigation strategies
5. Fallback responses for API failures or bad outputs
6. Handling of inappropriate or off-topic user inputs
7. Data privacy rules (What should never be sent to the AI)
8. Token optimization rules
9. Output formatting rules (JSON, Markdown, etc.)
10. A checklist for developers to verify AI behavior before the demo

Ensure the rules are concise, testable, and prevent embarrassing failures during judging.

-----------------
```

---

## Expected Output Structure

A complete AI Rules document should provide:
1. **Master System Prompt:** The verbatim base prompt loaded into every LLM request.
2. **Defensive Prompting Clauses:** Concrete jailbreak defense instructions and injection protections.
3. **Structured Fallback Handlers:** Predetermined canned messages for edge cases, downtime, and out-of-scope prompts.
4. **Pre-Demo Verification Matrix:** A 5-point test script to ensure safety rules remain intact after iterative prompt tuning.
