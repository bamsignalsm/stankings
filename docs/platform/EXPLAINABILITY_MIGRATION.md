# Explainability Migration Playbook

**Project:** `dfaqkrikdvohvvcuxoek`  
**Forward:** `supabase/migrations/20260722200000_shared_explainability_persistence.sql`  
**Rollback:** `supabase/migrations/rollback/20260722200000_shared_explainability_persistence_rollback.sql`

## Preconditions

1. `npm run verify:supabase-project -- --require-linked`
2. `npm run verify:explainability-migration`
3. Architectural review approved
4. Identity, Consent, Passport, Trust migrations applied

## Apply (after review only)

```bash
npm run verify:supabase-project -- --require-linked
npm run verify:explainability-migration
supabase db push --linked
```

## Rollback

Drops `shared_explainability_history` then `shared_explainability_records`.
