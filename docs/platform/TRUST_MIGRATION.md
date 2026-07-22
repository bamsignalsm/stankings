# Trust Migration Playbook

**Project:** `dfaqkrikdvohvvcuxoek` (Stankings only)  
**Forward:** `supabase/migrations/20260722180000_shared_trust_persistence.sql`  
**Rollback:** `supabase/migrations/rollback/20260722180000_shared_trust_persistence_rollback.sql`

## Preconditions

1. `npm run verify:supabase-project -- --require-linked`
2. `npm run verify:trust-migration`
3. Architectural review **approved** to apply Trust SQL
4. Identity, Consent, and Passport migrations already applied

## Apply (after review only)

```bash
npm run verify:supabase-project -- --require-linked
npm run verify:trust-migration
supabase db push --linked
```

## Verify remote tables

```bash
supabase db query --linked "SELECT to_regclass('public.shared_trust_assessments') AS assessments, to_regclass('public.shared_trust_evidence') AS evidence, to_regclass('public.shared_trust_policies') AS policies, to_regclass('public.shared_trust_history') AS history;"
```

## Rollback (destructive)

Drops history → evidence → assessments → policies (FK order).
