# Trust Runtime

**Capability:** `trust`  
**Runtime:** 1.0.0  
**Eight-Gate:** **Complete**  
**Contract:** `trust.assessment@1.0.0`  
**SDK:** `@stankings/platform-sdk/trust`

---

## What Trust is

Trust is a **policy-driven evidence evaluation service**. It:

- binds assessments to Shared Identity (`sid_*`) and Passport (`ppt_*`)
- ingests **evidence references** (never product payloads)
- evaluates versioned policies (require / contribute / risk_flag)
- emits outcomes: `eligible` | `review_required` | `ineligible` | `insufficient_evidence`
- exposes confidence bands and dimension contributions for consumers

Trust is **not** a product scoring engine, marketplace ruleset, financial product, authentication, or Explainability Runtime.

## Persistence

| Adapter | Status |
|---------|--------|
| Memory | ✅ |
| File | ✅ |
| Supabase | ✅ adapter + SQL (**apply after architectural review**) |

Migration: `20260722180000_shared_trust_persistence.sql`  
Verify: `npm run verify:trust-migration`

## Operations

`assess` · `ingestEvidence` · `reassess` · `invalidate` · `registerPolicy` · history

## Non-goals

Explainability Runtime, product-specific scoring, marketplace/financial business logic, OAuth.
