# Runtime Validation Guide

**ID:** `GUIDE-RUNTIME-VALIDATION-001`  
**Status:** Active  
**Runtime:** `src/lib/shared-runtime/validation/`  

---

## Purpose

Expose validation interfaces for Shared Runtime integrity checks. Consumers call validators; they do not re-implement identity or federation rules.

Surface: `sharedRuntimeValidator` / individual functions.

---

## Validators

| Function | Validates |
|----------|-----------|
| `validateIdentityLifecycleIntegrity` | Subject shape + optional transition legality |
| `validateMappingIntegrity` | Persistent bundle, external refs, membership/role alignment; HQ rules when HQ ref present |
| `validatePlatformRegistrationIntegrity` | Catalogue uniqueness + re-validation of each platform |
| `validateFederationRuleCompliance` | Sync request vs registered platforms + conflict action |
| `validateContractVersionCompatibility` | Platform vs Shared Platform Contract + federation compatibility |

Each returns `{ valid, errors, warnings }`.

---

## Usage pattern

```text
1. Create / map subject
2. Persist via IdentityStore
3. validateMappingIntegrity(bundle)
4. Register platform → validatePlatformRegistrationIntegrity(catalogue)
5. Before sync → validateFederationRuleCompliance(request, authorityVersion, ids)
```

---

## Non-goals

- Not a test framework
- Not authorization policy evaluation
- Not Passport credential validation
- Not Trust Graph traversal

---

## Version meta

`RUNTIME_VALIDATION_META` records validation package version alongside identity provider and shared contract versions.

---

## Related

- [Identity Persistence](./IDENTITY_PERSISTENCE.md)
- [Platform Federation](./PLATFORM_FEDERATION.md)
- [Shared Identity Runtime](./runtime/SHARED_IDENTITY_RUNTIME.md)
