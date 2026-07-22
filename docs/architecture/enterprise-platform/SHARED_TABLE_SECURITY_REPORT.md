# Shared Table Security Report

**Date:** 2026-07-22  
**Migration:** `20260722220000_shared_enterprise_rls.sql`  
**Project:** `dfaqkrikdvohvvcuxoek`  
**Status:** Applied & verified  

## Scope

All 13 durable enterprise tables:

| Runtime | Tables |
|---------|--------|
| Identity | `shared_identity_subjects`, `shared_identity_external_refs` |
| Consent | `shared_consent_records`, `shared_consent_history` |
| Passport | `shared_passport_records`, `shared_passport_evidence`, `shared_passport_history` |
| Trust | `shared_trust_policies`, `shared_trust_assessments`, `shared_trust_evidence`, `shared_trust_history` |
| Explainability | `shared_explainability_records`, `shared_explainability_history` |

## Controls applied

1. `ENABLE ROW LEVEL SECURITY`  
2. `FORCE ROW LEVEL SECURITY` (applies even to table owners)  
3. `REVOKE ALL` from `PUBLIC`, `anon`, `authenticated`  
4. `GRANT ALL` to `service_role` for Stankings server adapters  

## Consumer access pattern

Consumers (BamSignal, Yike, BayRight) **must not** query `shared_*` tables directly.  
They consume via `@stankings/platform-sdk` against Stankings-hosted adapters.

## Verification

- `npm run verify:enterprise-rls` ✅  
- Remote query confirms `rls_enabled=true` and `rls_forced=true` for all 13 tables ✅  
- Rollback: `supabase/migrations/rollback/20260722220000_shared_enterprise_rls_rollback.sql`  

## Residual

Subject-scoped HQ UI policies (if needed later) require a separate reviewed migration. Until then, deny-by-default for Data API roles remains the correct least-privilege posture.
