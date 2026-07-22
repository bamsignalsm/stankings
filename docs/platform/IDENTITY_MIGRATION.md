# Identity Persistence Migration Playbook

**Schema version:** 1  
**Runtime:** Shared Identity 1.0.0  
**Supabase project (only):** `dfaqkrikdvohvvcuxoek`  

---

## Prerequisites

```bash
npm run verify:supabase-project -- --require-linked
```

Must report Stankings ref `dfaqkrikdvohvvcuxoek`. **Never** apply to BamSignal / Yike / BayRight.

---

## Migration file

`supabase/migrations/20260722120000_shared_identity_persistence.sql`

Creates:

- `shared_identity_subjects`
- `shared_identity_external_refs` (unique `ref_key`)

---

## Apply (post architectural review)

Use wrapped npm scripts only (verification runs first), e.g.:

```bash
npm run supabase:db:push
```

If that script is not yet wired, apply via approved Supabase CLI flow **after** verify — never cross-link projects.

This sprint **does not** push migrations until review approval.

---

## Adapters

| Adapter | providerId | Use |
|---------|------------|-----|
| Memory | `memory` | Unit tests |
| File | `file` | Durable local / CI proof |
| Supabase | `supabase` | Production path (`SupabaseIdentityStore`) |

---

## Upgrade / compatibility

- Subject `version` remains monotonic integer for federation.  
- `schema_version` column tracks persistence document shape.  
- Breaking schema changes require a new migration + `IDENTITY_SCHEMA_VERSION` bump + consumer release notes.  
- Contract `identity.subject` major bump if public SDK types break.
