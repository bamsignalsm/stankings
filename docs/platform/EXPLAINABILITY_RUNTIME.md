# Explainability Runtime

**Capability:** `explainability`  
**Runtime:** 1.0.0  
**Eight-Gate:** **Complete**  
**Contract:** `explainability.record@1.0.0`  
**SDK:** `@stankings/platform-sdk/explainability`

---

## Separation of concerns

| Runtime | Answers |
|---------|---------|
| Trust | What is the current assessment? |
| **Explainability** | **Why was this decision reached?** |

Explainability is a **first-class** platform service — not a Trust helper. It also explains Passport state and Consent decisions, and is ready for future capabilities.

## Scope

- Generate human + machine explanations from **existing** decision records
- Reference evidence and policies — **do not re-evaluate** Trust/Passport/Consent logic
- Persist explanation records with audit history
- Emit `explainability.decision.recorded`

## Operations

`explainTrust` · `explainPassport` · `explainConsent` · `record` · `get` · `listBySubject` · `listByDecision`

## Persistence

Migration: `20260722200000_shared_explainability_persistence.sql` (**apply after review**)  
Verify: `npm run verify:explainability-migration`

## Non-goals

UI components, product business rules, authentication, marketplace/financial/matchmaking logic.
