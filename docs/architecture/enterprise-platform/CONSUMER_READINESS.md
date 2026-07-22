# Consumer Readiness Report

**Program:** Shared Enterprise Platform Completion  
**Date:** 2026-07-22 (updated for Platform v1.0 certification)  
**SDK:** `@stankings/platform-sdk` **1.5.0**  
**Tag:** `enterprise-platform-v1.3-explainability`

**Goal:** BamSignal, Yike, BayRight, and future companies adopt the platform **without architectural redesign**.

---

## Principle

Consumers integrate against **stable, versioned contracts** via the Enterprise SDK.  
They must not copy Stankings domain modules or re-implement Passport/Trust/Consent/Identity/Explainability.

---

## Current SDK surface (certified)

```text
createPlatformSdk({ platformId, identityStore, … })
  .identity
  .discovery
  .consent
  .passport
  .trust
  .explainability
  .registries()
  .configuration()
  .health()
  .log()
```

Feature gates (platform defaults enabled; product flags still required):

| Feature id | Capability |
|------------|------------|
| `runtime.passport` | Passport reads/issue |
| `runtime.consent` | Consent grant/revoke |
| `runtime.trust` | Trust assess |
| `runtime.explainability` | Explain Trust/Passport/Consent |

Helper: `isConsumerCapabilityReady(capabilityToggles, featureFlags, capabilityId, featureId)`.

---

## Package boundaries (target design)

| Package / boundary | Contents | Status |
|--------------------|----------|--------|
| `@stankings/platform-sdk` | Consumer façade | **Executable in-repo (1.5.0)** — publish pending (TD-001) |
| `@stankings/platform-contracts` | Public types / errors / versions | Logical — extract pending (TD-002) |
| HQ-only modules | Library UI, Energy, constitutional editors | **Never published** |

Forbidden in consumers:

- Importing `@/lib/canon`, Library session records, Energy routes  
- Forking credential or trust score logic  
- Minting `sid_*` subject ids  
- Inventing local Explainability rationale strings  

---

## Version compatibility

| Surface | Policy |
|---------|--------|
| Shared Platform Contract | Semver; major = breaking |
| Capability contracts | `identity.subject`, `consent.record`, `passport.record`, `trust.assessment`, `explainability.record`, `discovery.runtime` @ 1.x |
| SDK | 1.5.0; minor per capability addition |

Declare contract versions on Discovery negotiation. Fail closed on major mismatch.

---

## Runtime compatibility & feature negotiation

1. Call Discovery with platform id + declared versions.  
2. Require `runtimeReadiness: production` for production calls.  
3. Apply product feature flags even when platform toggles are on.  
4. Degrade gracefully when negotiation or flags fail.

---

## Certification

See [SPRINT_PLATFORM_CERTIFICATION.md](./SPRINT_PLATFORM_CERTIFICATION.md).  
`assessPlatformCertification().recommendation === "GO"`.
