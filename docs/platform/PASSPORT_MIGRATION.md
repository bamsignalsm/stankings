# Passport Migration Playbook

**Project:** `dfaqkrikdvohvvcuxoek` (Stankings only)  
**Forward:** `supabase/migrations/20260722160000_shared_passport_persistence.sql`  
**Rollback:** `supabase/migrations/rollback/20260722160000_shared_passport_persistence_rollback.sql`

## Preconditions

1. `npm run verify:supabase-project -- --require-linked`
2. `npm run verify:passport-migration`
3. Architectural review **approved** to apply Passport SQL
4. Identity + Consent migrations already applied (recommended)

## Apply (after review only)

```bash
npm run verify:supabase-project -- --require-linked
npm run verify:passport-migration
supabase db push --linked
```

## Verify remote tables

```bash
supabase db query --linked "SELECT to_regclass('public.shared_passport_records') AS records, to_regclass('public.shared_passport_evidence') AS evidence, to_regclass('public.shared_passport_history') AS history;"
```

## Rollback (destructive)

```bash
# Review SQL then execute rollback file against linked project only
```

Drops `shared_passport_history`, `shared_passport_evidence`, then `shared_passport_records`.

## Schema version

`PASSPORT_SCHEMA_VERSION = 1`
