# Passport Runtime

**Capability:** `passport`  
**Runtime:** 1.0.0  
**Eight-Gate:** **Complete**  
**Contract:** `passport.record@1.0.0`  
**SDK:** `@stankings/platform-sdk/passport`

---

## What Passport is

Passport is the enterprise identity and verification record — a **portable trust container** that:

- binds to Shared Identity (`sid_*`)
- aggregates **evidence references** from Identity, Consent, BayRight, Yike, BamSignal, and future providers
- exposes lifecycle operations (issue, suspend, revoke, expire, renew preparation)
- emits enterprise events and audit refs

Passport is **not** a user profile, social graph, product verification engine, Trust Runtime, or Explainability Runtime.

## Scope

| Included | Excluded |
|----------|----------|
| Domain model + lifecycle | Trust scoring |
| Evidence reference framework | Product-specific verification flows |
| Persistence (memory/file/supabase) | Authentication / OAuth |
| Contracts + SDK client | Marketplace / payments business logic |
| Events + health + discovery | Explainability engine |

## Persistence

| Adapter | Status |
|---------|--------|
| Memory | ✅ |
| File | ✅ |
| Supabase | ✅ adapter + SQL (**apply after architectural review**) |

Migration: `20260722160000_shared_passport_persistence.sql`  
Verify: `npm run verify:passport-migration`  
Rollback: `supabase/migrations/rollback/20260722160000_shared_passport_persistence_rollback.sql`

## Operations

- `issue` → issued then activated (or draft)
- `attachEvidence`
- `suspend` / `revoke` / `expire`
- `prepareRenewal` → draft successor
- `listHistory` / `listEvidence`

## Non-goals

Trust Engine, Explainability Engine, authentication, financial scoring, matchmaking logic.
