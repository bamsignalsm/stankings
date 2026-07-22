# Enterprise Completion Roadmap

**Program:** Shared Enterprise Platform Completion  
**Parent:** [SHARED_ENTERPRISE_PLATFORM_PROGRAM.md](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md)  
**Date:** 2026-07-22  

Dependency-driven milestones. Order minimizes rework and maximizes contract stability.

---

## Dependency graph

```text
Q0 Quality Foundation (test runner + error/event contracts + CI)
        ↓
R0 Registry & Version Catalogue (capability + version + service registry shells)
        ↓
I0 Identity Completion (durable store + Subject Registry API + tests + consumer guide)
        ↓
M2A Enterprise Event Runtime (shared event envelope — before Passport)
        ↓
D0 Capability Discovery Runtime
        ↓
P0 Passport Runtime (eight gates)
        ↓
C0 Consent Runtime (eight gates)  ←── can start after I0; preferred before P0 production share
        ↓
T0 Trust Runtime (eight gates)
        ↓
E0 Explainability Runtime (eight gates)
        ↓
S0 Shared Services (audit + notification contracts + validation framework generalization)
        ↓
G0 Governance Runtime (policy + feature gates) — after core data planes stable
        ↓
K0 SDK / Consumer Package publish
        ↓
X1 BamSignal Integration
        ↓
X2 Yike Integration
        ↓
X3 BayRight Integration
        ↓
X4 Future companies
```

> **Amendment (approved):** M2A Enterprise Event Runtime sits immediately after Identity advances and **before** Passport, so every subsequent capability shares one event model.

---

## Recommended engineering milestones

### M0 — Quality Foundation (Q0)

| | |
|--|--|
| **Objective** | Make “complete” measurable |
| **Prerequisites** | Program approval |
| **Deliverables** | Test runner; CI `test`; `EnterpriseError`; event envelope; Quality Foundation adopted in CI docs |
| **Validation** | Sample identity tests green; typecheck/lint/verify pass |
| **Complexity** | M |
| **Consumer impact** | None yet — enables all later claims |

### M1 — Registry & Version Catalogue (R0)

| | |
|--|--|
| **Objective** | Single catalogue of capabilities, versions, services |
| **Prerequisites** | M0 |
| **Deliverables** | Capability Registry runtime module; Version Registry; Service Registry skeleton; align Platform Registration |
| **Validation** | Discovery fixtures; no inventory/`active` confusion in docs |
| **Complexity** | M |
| **Consumer impact** | Read-only catalogue becomes the planning SSOT |

### M2 — Identity Completion (I0)

| | |
|--|--|
| **Objective** | Identity meets eight gates |
| **Status (2026-07-22)** | **✅ Complete** — runtime 1.0.0; `assessIdentityEightGates().complete === true` |

### M2A — Enterprise Event Foundation

| | |
|--|--|
| **Status** | **✅ Delivered (model only — no broker)** |

### M2B — Enterprise Contract Framework

| | |
|--|--|
| **Objective** | Canonical public contract model for all runtimes |
| **Deliverables** | Contract ids, versioning, negotiation, deprecation, validation, docs template |
| **Status** | **✅ Delivered** — Identity registered |

### M2C — Enterprise SDK Foundation

| | |
|--|--|
| **Objective** | Consumer package layout + Identity client |
| **Deliverables** | `@stankings/platform-sdk`, discovery, errors, integration docs |
| **Status** | **✅ Foundation delivered** — expand per capability after each 8/8 |

### M3 — Discovery Runtime (D0)

| | |
|--|--|
| **Objective** | Machine-readable readiness + negotiation |
| **Prerequisites** | M1, M2 in progress |
| **Deliverables** | `discoverCapabilities`; feature negotiation; deprecation channel |
| **Validation** | Contract tests for discovery responses |
| **Complexity** | M |
| **Consumer impact** | Safe integration planning |

### M4 — Consent Runtime (C0)

| | |
|--|--|
| **Objective** | Consent eight gates |
| **Prerequisites** | M2 |
| **Deliverables** | Consent records, history, revocation, versioning, persistence, tests, docs |
| **Validation** | G1–G8 |
| **Complexity** | L |
| **Consumer impact** | Unlocks lawful cross-product data sharing patterns |

### M5 — Passport Runtime (P0)

| | |
|--|--|
| **Objective** | Passport eight gates |
| **Prerequisites** | M2; M4 strongly recommended before production sharing |
| **Deliverables** | Credential lifecycle, evidence framework, linking to Identity, persistence, tests, docs |
| **Validation** | G1–G8; no OAuth scope creep unless separately approved |
| **Complexity** | L |
| **Consumer impact** | Primary cross-product credential surface |
| **Status (2026-07-22)** | **✅ Complete (code)** — `assessPassportEightGates().complete === true`; migration **not applied** pending architectural review |

### M6 — Trust Runtime (T0)

| | |
|--|--|
| **Objective** | Trust eight gates |
| **Prerequisites** | M2, M5 |
| **Deliverables** | Events, policy engine, assessments, evidence refs, history, persistence, tests, docs |
| **Validation** | G1–G8 |
| **Complexity** | XL |
| **Consumer impact** | High for Yike/BayRight/BamSignal risk decisions |
| **Status (2026-07-22)** | **✅ Complete (code)** — `assessTrustEightGates().complete === true`; migration **not applied** pending architectural review |

### M7 — Explainability Runtime (E0)

| | |
|--|--|
| **Objective** | Explainability eight gates |
| **Prerequisites** | M2, M6 |
| **Deliverables** | Decision explanations, evidence/policy refs, metadata, audit trail hooks, tests, docs |
| **Validation** | G1–G8 |
| **Complexity** | L |
| **Consumer impact** | Required for trust-affecting automated decisions |
| **Status (2026-07-22)** | **✅ Complete (code)** — `assessExplainabilityEightGates().complete === true`; migration **not applied** pending review |

### M8 — Shared Services (S0)

| | |
|--|--|
| **Objective** | Cross-cutting contracts production-ready |
| **Prerequisites** | M0; parallelizable after M2 |
| **Deliverables** | Audit contracts, notification contracts, shared validation framework, utilities export set |
| **Validation** | Contract tests; no product mail/push backends required |
| **Complexity** | M |
| **Consumer impact** | Consistent errors/events/audit across capabilities |

### M9 — Governance Runtime (G0)

| | |
|--|--|
| **Objective** | Policy runtime + feature gates |
| **Prerequisites** | Core data planes M2–M7 stable enough |
| **Deliverables** | Policy evaluation interface, feature gates, compliance rule hooks bound to Constitution refs |
| **Validation** | G1–G8 for scoped policy engine (not rewriting Constitution) |
| **Complexity** | L |
| **Consumer impact** | Centralized kill-switches / compliance gates |

### M10 — SDK / Consumer Package (K0)

| | |
|--|--|
| **Objective** | Consumable without redesign |
| **Prerequisites** | M2–M3 minimum; M4–M7 for full platform bar |
| **Deliverables** | Published package boundaries; version matrix; upgrade + deprecation guides; reference fixtures |
| **Validation** | External-style consumer fixture in-repo passes CI |
| **Complexity** | L |
| **Consumer impact** | **Gate for all integrations** |

### M11–M13 — Consumer integrations (X1–X3)

| Milestone | Consumer | Prerequisites | Complexity |
|-----------|----------|---------------|------------|
| M11 | BamSignal | M10 + required caps complete | L (integration) |
| M12 | Yike | M10 + required caps complete | L |
| M13 | BayRight | M10 + required caps complete | L |

**Consumer impact:** First real production consumption. Platform changes after this require compatibility discipline.

### M14 — Future companies (X4)

Times, Hotel, Shodis, and later entities register platforms and adopt SDK — no shared capability forks.

---

## Complexity key

| Label | Meaning |
|-------|---------|
| M | Days to ~1–2 weeks engineering |
| L | Multi-week, multi-module |
| XL | Multi-sprint domain |

Estimates are relative, not calendar commitments.

---

## What “platform complete” looks like

- M0–M10 done against eight gates  
- Discovery reports production readiness for Identity, Passport, Trust, Consent, Explainability, Registry read, Platform health  
- SDK published; fixture consumer green  
- Completion estimate → **100% under durable definition**  
- Only then X1+ proceed as engineering workstreams

---

## Near-term recommendation (next implementation sprint after review)

**Close Identity G3** (durable `IdentityStore` adapter after supabase verify) and remaining Identity gates, while keeping **event model** as the required emission pattern for all new runtimes.

Do **not** start Passport executable work until Identity clears eight gates (or an explicit waiver documents remaining Identity gaps).
