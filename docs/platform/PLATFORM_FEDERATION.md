# Platform Federation Specification

**ID:** `SPEC-PLATFORM-FEDERATION-001`  
**Status:** Prototype  
**Owner:** Stankings Legacy Ltd  
**Runtime package:** `src/lib/shared-runtime/federation/`, `mapping/`  

---

## Purpose

Federation synchronizes **identity subject state** across ecosystem platforms. It is not an authentication or authorization service.

```text
Shared Identity (authority)
        ↓  federation sync (pull)
Consumer platforms (cache subjects)
```

---

## Authority model

- Sole authority for canonical `subjectId`: Shared Identity (`stankings-shared-identity`).
- Consumers register before sync.
- Conflict rule: higher authority version wins; equal versions → noop; consumer ahead → conflict (review).

---

## Descriptors

### IdentityProviderDescriptor

Provider id, authority, contract version, runtime version.

### ConsumerPlatformDescriptor (expanded)

| Field | Role |
|-------|------|
| Core id/name/type/status | Registration identity |
| `supportedCapabilities` | Declared shared capabilities |
| `registryVersion` / `runtimeVersion` / `sharedContractVersion` | Versioning |
| `metadata` | Optional platform metadata |
| `runtimeReadiness` | interface_only → production |
| `healthStatus` | Operational health signal |
| `features` | Feature availability flags |
| `federationCompatibility` | Computed compatibility assessment |

---

## HQ Subject Mapping

**Module:** `src/lib/shared-runtime/mapping/`

Each HQ-originated subject supports:

| Concern | Field / mechanism |
|---------|-------------------|
| Global Subject ID | `subject.subjectId` |
| Origin Platform | `originPlatformId` / `stankings-hq` |
| External Platform IDs | `externalRefs` |
| Membership history | `memberships[]` |
| Role assignments | `roleClaims[]` |
| Platform participation | `platformParticipation[]` |
| Identity version | `subject.version` |

`mapHqMemberToSubject(store, input)` is idempotent on HQ member id: existing external ref returns the stored bundle.

**Out of scope:** login, passwords, OAuth, sessions.

---

## Federation rules (runtime constant)

See `FEDERATION_RULES` in `federation/model.ts`. Key exclusions: authentication and OAuth remain out of scope.

---

## Compatibility assessment

`assessFederationCompatibility` checks:

1. Shared contract version match
2. Required capabilities (default: `identity`)
3. Accepted identity runtime versions (includes `pending` for consumers not yet on shared runtime)

Registration rejects incompatible platforms by default (`requireFederationCompatible`).

---

## Related

- [Platform Registration Guide](./PLATFORM_REGISTRATION.md)
- [Identity Persistence](./IDENTITY_PERSISTENCE.md)
- [Runtime Validation Guide](./RUNTIME_VALIDATION.md)
