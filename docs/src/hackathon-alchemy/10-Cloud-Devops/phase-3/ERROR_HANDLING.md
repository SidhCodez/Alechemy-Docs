# ERROR_HANDLING

> **Category:** 10. Cloud / DevOps / Platform  
> **Section:** Phase 3: Execution & Quality

---

### 11. ERROR_HANDLING.md
**Purpose:** To define what happens when a build fails, deployment rolls back, or a node crashes.
```text
You are a senior DevOps reliability engineer.
Using the System Architecture and Pipeline Spec below, create an Error Handling document for a DevOps hackathon project.

ARCHITECTURE: [PASTE SYSTEM_ARCHITECTURE]
PIPELINE_SPEC: [PASTE PIPELINE_SPEC]

Provide:
1. Common failure modes (Build failure, Test failure, Deployment failure, Node crash)
2. CI error handling (Fail fast, Retry transient failures)
3. CD error handling (Automatic rollback, Manual approval)
4. Infrastructure error handling (Auto-healing, Auto-scaling)
5. Container error handling (CrashLoopBackOff, OOMKilled)
6. Observability error handling (Alert on failure)
7. Notification strategy (Slack, Email on failure)
8. Recovery procedures (Re-run pipeline, Rollback, Restore from backup)
9. A checklist for developers to verify error handling before the demo

Focus on making the pipeline resilient so the live demo does not crash.
Explain each error handling approach in beginner-friendly language.
```

---
