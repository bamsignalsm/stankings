# Platform Registration Guide

**ID:** `GUIDE-PLATFORM-REGISTRATION-001`  
**Status:** Active  
**Runtime:** `src/lib/shared-runtime/platform-registration/`  

---

## When to register

Every ecosystem platform that will consume Shared Identity (or other shared capabilities) must appear in the platform catalogue before federation sync.

---

## Required fields

| Field | Notes |
|-------|--------|
| `platformId` | kebab-case, unique |
| `platformName` | Human label |
| `platformType` | hq / product / subsidiary / programme / infrastructure |
| `supportedCapabilities` | Non-empty; must exist in Shared Platform Contract |
| `registryVersion` | Platform’s registry convention version |
| `runtimeVersion` | Consumer runtime version, or `pending` |
| `sharedContractVersion` | Must match current Shared Platform Contract |

## Optional expansions

| Field | Notes |
|-------|--------|
| `status` | Defaults to `registered` |
| `metadata` | Free-form string map |
| `runtimeReadiness` | Defaults to `prototype` |
| `healthStatus` | Defaults to `unknown` |
| `features` | Feature availability list |
| `requireFederationCompatible` | Default `true` — blocks incompatible registration |

---

## Seed catalogue

Current seeds (canonical moving forward):

1. `stankings-hq`
2. `bamsignal`
3. `yike`
4. `bayright`

Build with `buildSeedPlatformCatalogue()`.

Subsidiary products (Times, Hotel, Shodis) are **not** seeded until they have a platform registration decision — company registry ≠ platform catalogue.

---

## Validation before register

```text
validatePlatformRegistration(input)
        ↓
assessFederationCompatibility
        ↓
registerPlatform(input, catalogue)
```

Integrity over an existing catalogue: `getPlatformRegistrationIntegrity(catalogue)`.

---

## Do not

- Do not register platforms that mint their own `sid_*` ids.
- Do not treat registration as authentication.
- Do not assume Passport/Trust/Consent runtimes exist when `runtimeReadiness` is `interface_only`.

---

## Related

- [Platform Federation Specification](./PLATFORM_FEDERATION.md)
- [Shared Platform Contract](./SHARED_PLATFORM_CONTRACT.md)
