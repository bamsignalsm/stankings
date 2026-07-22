# Shared Identity Runtime

**Capability id:** `identity`  
**Contract maturity:** approved  
**Runtime readiness:** prototype  
**Package:** `src/lib/shared-runtime/`  
**Owner:** Stankings Legacy Ltd  

---

## What this sprint delivered

First **executable** shared platform domain:

- Identity types, lifecycle, ownership rules, validation  
- Subject create / activate / state transition (pure / in-memory)  
- Federation model (provider, consumers, sync conflict rules) — **no OAuth**  
- Platform registration + validation + seed catalogue  
- Interface-only stubs for Passport, Trust, Consent, Explainability  

**Follow-on (v0.2):** Identity persistence (`IdentityStore`), HQ subject mapping, expanded federation metadata, runtime validation utilities. See [Identity Persistence](../IDENTITY_PERSISTENCE.md) and [Platform Federation](../PLATFORM_FEDERATION.md).  

## Explicitly not included

- Passport credentials  
- Trust Graph  
- Authentication / OAuth  
- Ticketing  
- Domain product runtimes (Institute, Awards, Hotel, …)  

---

## Domain model

| Concept | Meaning |
|---------|---------|
| `IdentitySubject` | Canonical subject (`sid_…`) |
| `IdentityMembership` | Subject ↔ organization role |
| `IdentityRoleClaim` | Scoped claim |
| Lifecycle | proposed → active → suspended / merged / archived / revoked |

Authority: `stankings-shared-identity` only.

---

## Federation

- **Identity Provider:** Shared Identity  
- **Consumers:** registered platforms (HQ, BamSignal, Yike, BayRight, …)  
- **Conflict rule:** higher authority version wins; consumer ahead of authority → conflict  
- Sync is pull-oriented in this foundation  

See `FEDERATION_RULES` in `src/lib/shared-runtime/federation/model.ts`.

---

## Platform registration

Each platform declares:

- Platform ID, Name, Type, Status  
- Supported Capabilities  
- Registry Version, Runtime Version, Shared Contract Version  

Validation via `validatePlatformRegistration` / `registerPlatform`.

---

## Runtime foundation modules

| Module | Status |
|--------|--------|
| Identity | Executable prototype |
| Persistence | Storage-agnostic contracts + memory store |
| HQ mapping | Executable |
| Federation | Executable contracts (+ compatibility) |
| Platform registration | Executable (expanded metadata) |
| Runtime validation | Executable interfaces |
| Passport / Trust / Consent / Explainability | Interface only |

---

## Consumption rule

Downstream platforms must consume Shared Identity — not mint parallel global identity namespaces.
