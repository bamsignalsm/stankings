# Enterprise Capability Inventory

**Program:** Shared Enterprise Platform Completion  
**Parent:** [SHARED_ENTERPRISE_PLATFORM_PROGRAM.md](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md)  
**Date:** 2026-07-22  

Classification legend: **Complete** · **Executable incomplete** · **Interface only** · **Docs only** · **Missing** · **Deprecated**

---

## Identity domain

| Capability | Path / artifact | Class | Notes |
|------------|-----------------|-------|-------|
| Shared Identity | `shared-runtime/identity/*` | **Complete (8/8)** | Runtime 1.0.0; SDK consumable |
| Subject Registry | `identity/subject-registry.ts` | Complete | Events on put |
| Persistence (memory/file/supabase) | `persistence/*` | Complete | Migration pending apply-after-review |
| HQ subject mapping | `mapping/hq-subject.ts` | Complete | Via store + SDK |
| Federation descriptors | `federation/model.ts` | Executable incomplete | Sync ledger still pull-model contracts |
| Identity docs + consumer guide | `IDENTITY_*.md` | Complete | Includes upgrade notes |
| Enterprise Contract Framework | `enterprise-platform/contracts` | Complete (foundation) | M2B |
| Enterprise SDK | `@stankings/platform-sdk` | Executable incomplete | Identity surface only; expand per capability |


---

## Platform quality & catalogues

| Capability | Path / artifact | Class | Notes |
|------------|-----------------|-------|-------|
| Quality Foundation | `enterprise-platform/quality` | Executable incomplete | M0 reusable standards |
| Enterprise Events | `enterprise-platform/events` | Executable incomplete | M2A model; no transport |
| Capability/Service/Runtime/Version registries | `enterprise-platform/registry` | Executable incomplete | M1 + validation |
| Automated tests | Vitest + `*.test.ts` | Executable incomplete | Framework + core suites |

---

## Passport domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Passport contract | `SHARED_PLATFORM_CONTRACT` + `PASSPORT.md` | Docs only / contract |
| Passport runtime stub | `capabilities/passport.ts` | Interface only |
| Credential lifecycle | — | Missing |
| Verification framework | — | Missing |
| Identity linking | partial via `externalRefs` | Executable incomplete (Identity) |
| Cross-platform identity | federation model | Executable incomplete |

---

## Trust domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Trust contract | `TRUST.md` + contract entry | Docs only / contract |
| Trust runtime stub | `capabilities/trust.ts` | Interface only |
| HQ Trust registers / CTC pages | `shared/trust`, Library surfaces | Docs / HQ UI — not shared runtime |
| Reputation engine | — | Missing |
| Trust events / ledger / scores / history / policies | — | Missing |

---

## Consent domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Consent contract | `CONSENT.md` | Docs only / contract |
| Consent runtime stub | `capabilities/consent.ts` | Interface only |
| Consent history / revocation / versioning | — | Missing |

---

## Explainability domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Explainability contract | `EXPLAINABILITY.md` | Docs only / contract |
| Runtime stub | `capabilities/explainability.ts` | Interface only |
| Decision explanations / evidence / audit trail runtime | — | Missing |

---

## Registry domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Registry Convention | `shared/registry/convention.ts` + doc | Executable incomplete |
| Company Registry | `shared/company/registry.ts` | Executable incomplete (strong SSOT) |
| Legacy Live Registry | `legacy-live/registry.ts` | Executable incomplete (programme SSOT) |
| Platform Inventory Registry | `platforms/registry.ts` | Docs/inventory — **warn:** inventory `active` ≠ runtime |
| Platform Registration (runtime) | `shared-runtime/platform-registration` | Executable incomplete |
| Capability Registry (machine catalogue) | contract list in `shared-platform/contract.ts` | Executable incomplete |
| Service Registry | — | Missing |
| Version Registry | — | Missing |
| Constitutional / institutional registries (Canon, IIS, etc.) | many `src/lib/*/registry.ts` | HQ institutional — not consumer platform APIs |

---

## Platform domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Shared Platform Contract | `shared-platform/contract.ts` | Docs + TS contracts |
| Platform registration seeds | HQ, BamSignal, Yike, BayRight | Executable incomplete |
| Runtime discovery | — | Missing |
| Capability discovery API | contract only | Missing runtime |
| Health model | fields on descriptors | Executable incomplete |
| Version compatibility | `assessFederationCompatibility` | Executable incomplete |
| Feature gates (enterprise) | — | Missing |

---

## Governance domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Enterprise Constitution (Volume I) | Library + registries | Content complete; convention freeze |
| Canons (Volume 0) | Complete | Content complete |
| Governance Code Volume II | Architecture shells | Partial — not platform runtime |
| Policy Runtime | — | Missing |
| Compliance Rules engine | — | Missing |
| Feature Gates | — | Missing |

---

## Shared services domain

| Capability | Artifact | Class |
|------------|----------|-------|
| Notification contracts | `shared/notifications` | Executable incomplete (mailto routing) |
| Audit contracts (platform) | — | Missing (incident IIAF ≠ event bus) |
| Event contracts | — | Missing |
| Error contracts | — | Missing |
| Shared validation framework | identity-scoped only | Executable incomplete |
| Shared utilities | `shared/config`, search, branding | Partial HQ utilities |
| HQ auth path helpers | `shared/auth` | HQ-only — **not** shared SSO |

---

## Quality & consumption

| Capability | Artifact | Class |
|------------|----------|-------|
| Automated tests | Vitest + identity/quality/registry/event suites | Executable incomplete |
| Consumer SDK / package | — | Missing |
| Observability standard (platform) | engineering docs partial | Docs only / incomplete |
| Project Identity + Supabase verify | `PROJECT_IDENTITY.md`, npm script | Complete for safety gate |
| Quality Foundation (M0) | `enterprise-platform/quality` | Executable (foundation) |
| Enterprise Event Foundation (M2A) | `enterprise-platform/events` | Executable (model only) |

---

## Deprecated / do-not-extend

| Item | Guidance |
|------|----------|
| Treating `PLATFORM_REGISTRY` `status: "active"` as shipped API | Deprecated interpretation — use Shared Platform Contract readiness |
| Product-repo forks of Passport/Trust/Identity | Forbidden |
| “Unblock Yike” as platform success metric | Deprecated objective |

---

## Additional capabilities recommended before external consumption

Beyond the stated enterprise objective, complete these before SDK release:

1. **Shared Error Contract** — stable error codes for all runtimes  
2. **Shared Event Envelope** — identity/passport/trust/consent events  
3. **Version Registry** — contract + runtime + schema versions in one catalogue  
4. **Capability Discovery Runtime** — machine-readable readiness for consumers  
5. **Durable IdentityStore adapter** — production persistence behind the existing interface  
6. **Contract test suite** — CI-enforced consumer compatibility fixtures  
7. **Deprecation & upgrade playbook** — semver + migration notes  

Optional later (not blocking “platform complete” if deferred explicitly): OAuth/SSO protocol layer, product policy engines, notification delivery backends.
