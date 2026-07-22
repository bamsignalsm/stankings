# Runtime Readiness — Explainability

**Capability id:** `explainability`  
**Contract maturity:** approved  
**Runtime readiness:** contract_only  
**Owner:** Stankings Legacy Ltd  

## Responsibility

Human-readable explanations for automated or institutional decisions that affect trust, access, or outcomes.

## Interfaces (contract)

| Interface | Purpose |
|-----------|---------|
| `ExplainDecision` | Produce explanation for a decision id |
| `AttachRationale` | Attach institutional rationale to a record |
| `ExplanationPolicy` | Declare which decisions require explanation |

## Data ownership

- Explanation artifacts owned by Explainability service  
- Decision records may live in product systems with foreign keys  

## Dependencies

Identity, Trust.

## Integration points

Yike, BayRight, BamSignal, Library / IKI (institutional decisions).

## Non-goals

Not a raw log dump; not optional marketing copy.

## Implementation note

Do not build executable explainability services in this sprint.
