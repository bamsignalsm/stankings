# Consumer Readiness Report

**Program:** Shared Enterprise Platform Completion  
**Parent:** [SHARED_ENTERPRISE_PLATFORM_PROGRAM.md](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md)  
**Date:** 2026-07-22  

**Goal:** BamSignal, Yike, BayRight, Times, Hotel, Shodis, and future companies adopt the platform **without architectural redesign**.

---

## Principle

Consumers integrate against **stable, versioned contracts**.  
They must not copy Stankings domain modules or re-implement Passport/Trust/Consent/Identity.

---

## Package boundaries (target design)

| Package / boundary | Contents | Consumers see |
|--------------------|----------|---------------|
| `@stankings/platform-contracts` | Public types, error codes, event envelopes, capability ids, version constants | Always |
| `@stankings/platform-runtime` | Executable clients / pure validators / discovery helpers safe for server use | Server |
| `@stankings/platform-sdk` | Ergonomic façade: discovery, identity client interfaces, passport verify client interfaces | Server (+ limited isomorphic utils) |
| HQ-only modules | Library UI, constitutional editors, Energy console | **Never published** |

Until packages are extracted, treat these as **logical boundaries** under `src/lib/shared-platform/`, `src/lib/shared-runtime/`, and a future `packages/` workspace — same import rules apply.

### Import structure (target)

```text
consumer-app
  └─ @stankings/platform-sdk
        ├─ contracts (re-exported)
        ├─ identity.*
        ├─ passport.*
        ├─ trust.*
        ├─ consent.*
        ├─ explainability.*
        ├─ registry.read.*
        └─ discovery.*
```

Forbidden in consumers:

- Importing `@/lib/canon`, Library session records, Energy routes  
- Forking credential or trust score logic  
- Minting `sid_*` subject ids  

---

## Version compatibility

| Version surface | Policy |
|-----------------|--------|
| Shared Platform Contract | Semver; major = breaking public contract |
| Capability runtime version | Independent semver per capability |
| Schema / persistence version | Monotonic; migrations required for durable stores |
| Consumer declared `sharedContractVersion` | Must match supported matrix or negotiation fails |

**Compatibility matrix** (to be maintained in Version Registry):

```text
platform-sdk@X.Y.Z
  requires contract >= A.B.C < A+1
  supports identity-runtime ∈ {…}
  supports passport-runtime ∈ {…} | none
```

---

## Runtime compatibility & feature negotiation

1. Consumer calls **Capability Discovery** with its platform id + declared versions.  
2. Platform returns readiness per capability: `unavailable | interface_only | prototype | production`.  
3. Consumer **must not** call production APIs for non-production readiness.  
4. Optional features negotiated via `features[]` on platform registration (already prototyped on descriptors).

`runtimeReadiness: "interface_only"` means: **do not assume executable behaviour**.

---

## Capability discovery (consumer flow)

```text
registerPlatform (once, ops-time)
        ↓
discoverCapabilities(platformId)
        ↓
negotiate(requiredCapabilities)
        ↓
use SDK clients only for production-ready capabilities
```

---

## Backward compatibility

- Additive changes preferred within a major version.  
- Removals require deprecation window (minimum one minor release + migration note).  
- Persistent ids (`sid_*`, credential ids, consent ids) never reused after revoke.  
- Federation: authority version wins (already specified).

---

## Deprecation policy

1. Mark contract field / API `deprecated` in docs + types (JSDoc / changelog).  
2. Emit warning in discovery response `deprecations[]`.  
3. Keep behaviour for at least one minor line.  
4. Remove only on next major of the owning package.  
5. Record in Version Registry.

---

## Upgrade strategy

| Step | Owner |
|------|-------|
| Publish changelog + migration guide with each capability release | Stankings Platform |
| Bump consumer `sharedContractVersion` / SDK pin | Consumer repo |
| Run consumer contract tests against published fixtures | Consumer CI |
| Dual-run period for persistence migrations when needed | Stankings + consumer ops |

---

## Per-consumer adoption without redesign

| Consumer | Required capabilities (minimum) | Adoption constraint |
|----------|----------------------------------|---------------------|
| BamSignal | Identity, Passport, Trust, Consent, Registry read | Replace any local identity/passport forks with SDK |
| Yike | Identity, Passport, Trust, Explainability, Registry | No property-domain logic in platform |
| BayRight | Identity, Passport, Trust, Consent, Registry | Security alignment via Trust/Consent contracts |
| Times | Identity, Passport, Registry | Accreditation via Passport later |
| Hotel | Identity, Passport, Registry | Guest credentials via Passport later |
| Shodis | Identity, Registry | Minimal surface |
| Future | Discovery-first | Register platform before any integration |

**Architectural guarantee:** If a consumer is built as “auth + product DB + calls platform SDK,” adopting Stankings Platform does not require redesign — only replacement of local shared-capability code.

---

## Interim rule (until SDK exists)

Downstream repos **must not** begin production consumption.  
They may read published docs and plan integration boundaries only.

HQ continues to dogfood Identity persistence internally without exporting unstable APIs.
