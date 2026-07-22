# Enterprise Gap Analysis

**Program:** Shared Enterprise Platform Completion  
**Parent:** [SHARED_ENTERPRISE_PLATFORM_PROGRAM.md](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md)  
**Date:** 2026-07-22  

For each incomplete capability: missing runtime, persistence, validation, tests, documentation, versioning, migration path, and downstream dependencies.

---

## Cross-cutting gaps (block every “complete” claim)

| Gap | Impact |
|-----|--------|
| **No automated tests** | Nothing can pass G7 |
| **No consumer SDK / package boundary** | Nothing can pass G8 cleanly |
| **No shared error / event contracts** | Consumers will invent incompatible shapes |
| **No durable production IdentityStore** | Identity cannot be production-ready |
| **Inventory vs readiness confusion** | Downstream may assume APIs exist |
| **No enterprise quality gate checklist in CI** | Completeness is subjective |

---

## Identity

| Dimension | Status | Gap |
|-----------|--------|-----|
| Runtime | Partial | Subject Registry query API; membership/role store APIs |
| Persistence | Partial | Memory only; need Postgres/Supabase adapter + migrations (after verify) |
| Validation | Partial | Domain validators exist; need store-level + migration validators |
| Tests | Missing | Lifecycle, mapping, store conflict, federation conflict |
| Documentation | Partial | Specs exist; consumer guide + upgrade notes missing |
| Versioning | Partial | Runtime 0.2.0; no published compatibility matrix |
| Migration path | Missing | Schema evolution playbook for subjects/memberships |
| Downstream deps | All products | Block Passport and everything above |

**Class:** Executable but incomplete  

---

## Passport

| Dimension | Status |
|-----------|--------|
| Runtime | Missing (interface_only stub) |
| Persistence | Missing (credentials, status, revocation) |
| Validation | Missing |
| Tests | Missing |
| Documentation | Contract readiness doc only |
| Versioning | Contract entry only |
| Migration path | Missing |
| Downstream deps | BamSignal, Yike, BayRight, Legacy Live, Hotel, Times |

**Depends on:** Identity complete (eight gates). Consent for cross-product sharing.  

**Class:** Interface only  

---

## Trust

| Dimension | Status |
|-----------|--------|
| Runtime | Missing |
| Persistence | Missing (events, ledger, scores, history, policies) |
| Validation | Missing |
| Tests | Missing |
| Documentation | Contract + HQ narrative; not runtime spec |
| Versioning | Missing |
| Migration path | Missing |
| Downstream deps | Yike, BayRight, BamSignal, Stanhan, Auto Hub |

**Depends on:** Identity + Passport.  

**Class:** Interface only  

---

## Consent

| Dimension | Status |
|-----------|--------|
| Runtime | Missing |
| Persistence | Missing (records, history, revocation, versions) |
| Validation | Missing |
| Tests | Missing |
| Documentation | Contract only |
| Versioning | Missing |
| Migration path | Missing |
| Downstream deps | BamSignal, Yike, BayRight, HQ |

**Depends on:** Identity. Required before Passport cross-product sharing at production bar.  

**Class:** Interface only  

---

## Explainability

| Dimension | Status |
|-----------|--------|
| Runtime | Missing |
| Persistence | Missing (explanations, evidence, decision metadata) |
| Validation | Missing |
| Tests | Missing |
| Documentation | Contract only |
| Versioning | Missing |
| Migration path | Missing |
| Downstream deps | Yike, BayRight, BamSignal, Library/IKI |

**Depends on:** Identity + Trust (and often Consent for disclosure).  

**Class:** Interface only  

---

## Registry

| Sub-capability | Gap summary |
|----------------|-------------|
| Company Registry | Strong SSOT; missing tests, versioned export package, read-API contract for consumers |
| Platform Registration | Prototype OK; missing durable registry, health probes, discovery service |
| Capability Registry | Static TS list; missing runtime discovery endpoint/module API |
| Service Registry | **Missing** entirely |
| Version Registry | **Missing** entirely |
| Convention | Manifests optional; not enforced across all registries |

**Downstream:** All consumers need read-only registry access without copying HQ modules.  

---

## Platform (discovery, health, compatibility)

| Dimension | Gap |
|-----------|-----|
| Runtime discovery | Missing |
| Capability discovery | Contract only |
| Service registration | Missing |
| Health | Enum fields only; no health aggregation service |
| Version compatibility | Federation helper only; not enterprise matrix |

---

## Governance (platform runtime)

| Dimension | Gap |
|-----------|-----|
| Constitution content | Strong — not a gap for content |
| Policy Runtime | Missing |
| Feature Gates | Missing |
| Compliance Rules engine | Missing |

Constitutional law is a prerequisite **input** to policy runtime, not a substitute for it.

---

## Shared services

| Capability | Gap |
|------------|-----|
| Notification | Mailto helpers only — need event→channel contracts, not product mailers |
| Audit | Need shared audit event schema + append-only contract |
| Events | Need envelope + capability-specific payloads |
| Errors | Need stable `EnterpriseError` codes |
| Shared validation | Generalize beyond identity |
| Shared utilities | Publish only what consumers need; avoid leaking HQ UI |

---

## Consumer package & quality

| Capability | Gap |
|------------|-----|
| Package boundaries | Today everything is `@/lib/...` inside Next app |
| Import structure | No `@stankings/platform` (or equivalent) publish path |
| Feature negotiation | Missing |
| Deprecation policy | Missing as platform doc |
| Upgrade strategy | Missing |
| Testing | Zero product/unit tests in repo |
| Observability | Not standardized for shared runtimes |

---

## Gap severity ranking (implementation order drivers)

1. **P0** — Quality foundation + Identity durable completion (gates G1–G8)  
2. **P0** — Shared errors/events/version registry + capability discovery  
3. **P1** — Passport runtime to eight gates  
4. **P1** — Consent runtime to eight gates (parallelizable after Identity)  
5. **P2** — Trust runtime  
6. **P2** — Explainability runtime  
7. **P2** — Registry expansion (service + version + consumer read APIs)  
8. **P3** — Policy runtime / feature gates  
9. **P3** — SDK polish + reference consumer fixtures  
10. **P4** — Downstream integrations (BamSignal → Yike → BayRight → future)

---

## What is deliberately not a gap

- OAuth implementation (deferred; not required to mark Identity “complete” if Identity remains subject/membership/federation scoped as today)  
- Yike/BamSignal/BayRight product features  
- Volume II chapter writing (constitutional editorial track, separate from platform runtime)  
- Legacy Live ticketing / Institute product runtimes
