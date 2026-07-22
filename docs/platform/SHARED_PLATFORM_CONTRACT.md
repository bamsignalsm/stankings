# Shared Platform Contract

**Status:** APPROVED (contract)  
**Version:** 0.1.0  
**Owner:** Stankings Legacy Ltd  
**Baseline:** Enterprise Architecture Audit (approved 2026-07-22)  
**Module:** `src/lib/shared-platform/contract.ts`

---

## Principle

> Build shared capabilities once in Stankings. Consume them in BamSignal, Yike, BayRight, and future platforms. Avoid product-specific forks of Passport, Trust, Consent, Registry, or Identity.

Passport is **one service** within this broader shared platform — not the only integration point.

---

## Governance rule

| Do | Do not |
|----|--------|
| Implement shared contracts/runtimes in Stankings | Re-implement Passport/Trust/Consent inside Yike or BayRight |
| Consume HQ contracts from product repos | Fork company or programme registries |
| Separate inventory status from runtime readiness | Claim “active platform” when only docs exist |

---

## Capabilities

| Capability | Responsibility | Runtime readiness (now) |
|------------|----------------|-------------------------|
| Passport | Portable credentials & accreditation | Contract only |
| Identity | Auth subjects, membership, roles | **Prototype** (executable domain) |
| Trust | Trust signals, verification outcomes | Contract only |
| Consent | Purpose-bound consent (Art. XII) | Contract only |
| Explainability | Human explanations for consequential decisions | Contract only |
| Registry Access | Read institutional SSOTs | Contract only |
| Platform Status | Honest inventory vs runtime reporting | Contract only |
| Capability Discovery | Catalogue of capabilities + versions | Contract only |

Detailed specs: `docs/platform/runtime/`.

---

## Dependency order (shared platform)

```
Identity
   ↓
Passport
   ↓
Trust + Consent
   ↓
Explainability
   ↓
Registry Access + Capability Discovery + Platform Status
```

Product repos integrate **after** contracts are stable; runtime implementation follows the enterprise roadmap.

---

## Consumers

| Platform | Expected consumption |
|----------|----------------------|
| BamSignal | Identity, Passport, Consent, Trust; Legacy Live host alignment |
| Yike | Identity, Passport, Trust, Explainability |
| BayRight | Identity, Passport, Trust, Consent (payments adjacency) |
| Stankings Times | Identity, Passport (press/accreditation), Registry Access |
| Stankings Hotel & Suites | Passport (guest/VIP), Registry Access |
| Shodis Industries | Identity (enterprise), Registry Access |

---

## Inventory vs runtime

`PLATFORM_REGISTRY` remains the architectural inventory (CANON-012).  

**Inventory `status` ≠ shipped cross-product API.**  
Runtime readiness for each capability is recorded in `SHARED_CAPABILITY_CONTRACTS.runtimeReadiness`.

---

## Non-goals (foundation era)

- No Passport credential issuance yet  
- No Trust Graph yet  
- No OAuth / authentication protocol yet  
- No Institute / Awards / Hotel domain runtimes  

Identity domain prototype is executable under `src/lib/shared-runtime/`.


- [Registry Convention](../engineering/REGISTRY_CONVENTION.md)  
- [Project Identity](../engineering/PROJECT_IDENTITY.md)  
- [Enterprise Roadmap](../architecture/ENTERPRISE_ROADMAP.md)  
- Runtime specs under `docs/platform/runtime/`
