# Identity Persistence Specification

**ID:** `SPEC-IDENTITY-PERSISTENCE-001`  
**Status:** Prototype (storage-provider agnostic)  
**Owner:** Stankings Legacy Ltd  
**Runtime package:** `src/lib/shared-runtime/persistence/`  
**Depends on:** Shared Identity Runtime Foundation  

---

## Purpose

Define how Shared Identity subjects are persisted without coupling the runtime to Supabase or any single storage vendor.

Consumers interact with the `IdentityStore` interface. Adapters (memory today; Postgres/Supabase later) implement storage.

---

## Persistent model

### PersistentIdentitySubject

| Field | Description |
|-------|-------------|
| `subjectId` | Canonical global id (`sid_*`) |
| `kind` | person / organization / system / service_account |
| `state` | Lifecycle state |
| `authority` | Always `stankings-shared-identity` |
| `version` | Monotonic integer for federation |
| `createdAt` / `updatedAt` | ISO timestamps |
| `originPlatformId` | Platform that first proposed the subject |
| `externalRefs` | External platform identity mappings |
| `metadata` | Opaque string map |

### PersistentIdentityBundle

Bundles subject + memberships + role claims + platform participation history.

### PlatformParticipationRecord

Tracks which federated platforms a subject participates in (`active` / `inactive` / `blocked`).

---

## IdentityStore interface

```text
getSubject(subjectId)
findByExternalRef(system, externalId)
putSubject(bundle)   // version-aware; rejects stale writes & duplicate external refs
listSubjects(limit?)
```

**Executable reference implementation:** `MemoryIdentityStore` (`providerId: "memory"`).

**Non-goals for this sprint:**

- No Supabase migration
- No OAuth / session storage
- No Passport credential tables
- No Trust Graph edges

---

## Version tracking

- Domain transitions increment `version` on the subject.
- `putSubject` rejects writes when the store already holds a higher version.
- External refs are uniquely owned: one `(system, externalId)` → one `subjectId`.

---

## Future storage adapters

Adapters must:

1. Implement `IdentityStore` only (no product APIs).
2. Preserve authority and monotonic versions.
3. Enforce unique external ref index.

Supabase is an allowed adapter target after `npm run verify:supabase-project -- --require-linked` and an explicit migration sprint — not this foundation.

---

## Related

- [Shared Identity Runtime](./runtime/SHARED_IDENTITY_RUNTIME.md)
- [HQ Subject Mapping](./PLATFORM_FEDERATION.md) (federation + mapping)
- [Runtime Validation Guide](./RUNTIME_VALIDATION.md)
