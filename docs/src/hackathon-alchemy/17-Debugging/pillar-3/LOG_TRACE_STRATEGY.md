# LOG_TRACE_STRATEGY

> **Category:** 17. Debugging  
> **Section:** Pillar 3: Instrument & Observe

---

### 7. `LOG_TRACE_STRATEGY.md`
```text
You are a senior SRE.
Create a log and trace strategy specific to this bug.

INPUTS:
Observability Setup: [PASTE OBSERVABILITY_SETUP]
Symptom Report: [PASTE SYMPTOM_REPORT]

Provide:
1. Log levels to use (DEBUG, INFO, WARN, ERROR)
2. What to log at each level (Specific to this bug)
3. Log format (JSON, Text, Structured)
4. Required fields (Timestamp, Request ID, User ID, Component)
5. What NEVER to log (PII, Passwords, Tokens)
6. Trace spans for the affected request flow
7. Sampling strategy (If high volume)
8. Where logs are stored
9. Retention policy
10. Example log entries (Before/After fix)
11. A checklist to verify logging

Focus logs on the bug's suspected area.
Explain each concept in beginner-friendly language.
```
