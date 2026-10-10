# DATABASE_SCALING

> **Category:** 20. Scalability  
> **Section:** Layer 4: Data Layer Scaling

---

### 7. `DATABASE_SCALING.md`
```text
You are a senior database scaling expert.
Design a scaling strategy for this database.

INPUTS:
Capacity Baseline: [PASTE CAPACITY_BASELINE]
Data Model: [PASTE DATA MODEL IF AVAILABLE]

Provide:
1. Current database setup (Engine, Size, QPS)
2. Read vs Write ratio
3. Read scaling strategies (Replicas, Read-only DBs)
4. Write scaling strategies (Sharding, Partitioning)
5. Connection pooling (PgBouncer, ProxySQL)
6. Vertical vs Horizontal scaling for the DB
7. Indexing strategy at scale
8. Query optimization at scale
9. Vacuum/Maintenance at scale
10. When to move to NoSQL / NewSQL
11. Common database scaling mistakes
12. A database scaling checklist

Explain each technique in beginner-friendly language.
Warn about the complexity of sharding.
Recommend progressive scaling (Replicas → Partitioning → Sharding).
```
