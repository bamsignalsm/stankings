# Runtime Readiness — Shared Identity

**Capability id:** `identity`  
**Contract maturity:** approved  
**Runtime readiness:** prototype  
**Owner:** Stankings Legacy Ltd  

> Executable foundation: see [SHARED_IDENTITY_RUNTIME.md](./SHARED_IDENTITY_RUNTIME.md).

## Responsibility

Subject identifiers, organization membership, and role claims shared across products. Platform-neutral — no product-specific assumptions.

## Executable surfaces (this phase)

| Surface | Purpose |
|---------|---------|
| `createIdentitySubject` | Create canonical subject |
| `activateIdentitySubject` / `setIdentityState` | Lifecycle |
| `validateIdentitySubject` | Validation contract |
| `resolveIdentitySubject` | Catalogue resolve |
| Federation model | Provider / consumer / conflict rules |
| Platform registration | Register consuming platforms |

## Deferred

| Interface | Status |
|-----------|--------|
| `Authenticate` | Deferred (no OAuth this sprint) |
| Passport credentials | Deferred |
| Trust Graph | Deferred |

## Data ownership

- Canonical `subjectId` owned by Shared Identity  
- HQ member records map via `externalRefs`  
- Product user tables reference `subjectId` only  

## Dependencies

None (root of shared platform stack).

## Non-goals

Not product profile UX; not authentication protocol; not Passport issuance.
