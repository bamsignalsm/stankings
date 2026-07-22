# Consent Runtime

**Capability:** `consent`  
**Runtime:** 1.0.0  
**Eight-Gate:** **Complete**  
**Contract:** `consent.record@1.0.0`  
**SDK:** `@stankings/platform-sdk/consent`

---

## Scope

Enterprise consent: definitions, lifecycle, history, revocation, expiration, evidence (audit refs), validation, events, durable adapters.

## Persistence

| Adapter | Status |
|---------|--------|
| Memory | ✅ |
| File | ✅ |
| Supabase | ✅ adapter + SQL (apply after review) |

Migration: `20260722140000_shared_consent_persistence.sql`  
Verify: `npm run verify:consent-migration`  
Rollback: `supabase/migrations/rollback/…consent…_rollback.sql`

## Non-goals

Marketing preference centres, product UX, Passport issuance.
