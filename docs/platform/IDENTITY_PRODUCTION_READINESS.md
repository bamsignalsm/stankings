# Identity Production Readiness

**Capability:** Shared Identity 1.0.0  
**Eight-Gate:** Complete  
**Supabase ref (only):** `dfaqkrikdvohvvcuxoek`  

---

## Pre-apply checklist

1. `npm run verify:supabase-project -- --require-linked` → Stankings ref  
2. `npm run verify:identity-migration` → forward + rollback integrity  
3. `npm run typecheck && npm test`  
4. Architectural approval to apply  

## Apply (post-approval)

Use verified Supabase CLI against the linked Stankings project only. Prefer wrapped npm scripts when available. Never apply to BamSignal / Yike / BayRight refs.

Forward: `supabase/migrations/20260722120000_shared_identity_persistence.sql`

## Verification after apply

```sql
SELECT to_regclass('public.shared_identity_subjects');
SELECT to_regclass('public.shared_identity_external_refs');
SELECT column_name FROM information_schema.columns
  WHERE table_name = 'shared_identity_subjects' ORDER BY 1;
```

Smoke: create subject via `SupabaseIdentityStore` / SDK, `findByExternalRef`, version conflict on stale write.

## Rollback

`supabase/migrations/rollback/20260722120000_shared_identity_persistence_rollback.sql`  
Drops external_refs then subjects. **Data loss.** Re-apply forward only after review.

## Consumer example

```ts
import { createPlatformSdk } from "@stankings/platform-sdk";
import { createFileIdentityStore } from "@/lib/shared-runtime";

const sdk = createPlatformSdk({
  platformId: "stankings-hq",
  identityStore: createFileIdentityStore(".data/identity-subjects.json"),
  declaredIdentityContractVersion: "1.0.0",
});

const mapped = await sdk.identity.mapHqMember({
  hqMemberId: "member_001",
  displayLabel: "Example",
  platformIds: ["stankings-hq"],
});
```

## Compatibility

| Surface | Version |
|---------|---------|
| Contract `identity.subject` | 1.0.0 |
| Runtime | 1.0.0 |
| Schema | 1 |
| SDK | ≥ 1.0.0 |
| Events envelope | 1 |

## Upgrade path

Additive columns preferred. Breaking schema → new migration + `IDENTITY_SCHEMA_VERSION` bump + contract major if SDK types break.
