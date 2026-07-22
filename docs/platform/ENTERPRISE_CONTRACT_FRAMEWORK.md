# Enterprise Contract Framework

**ID:** `SPEC-ENTERPRISE-CONTRACTS-001`  
**Milestone:** M2B  
**Package:** `src/lib/enterprise-platform/contracts/`  
**Version:** 1.0.0  

---

## Purpose

Canonical framework for all public enterprise contracts. Every future runtime (Passport, Trust, Consent, Explainability, Governance) must register contracts here instead of inventing ad-hoc shapes.

---

## Contract metadata

| Field | Purpose |
|-------|---------|
| `contractId` | Stable machine id |
| `version` | Semver |
| `capabilityId` | Owning capability |
| `status` | draft / active / deprecated / retired |
| `compatibleMajors` | Allowed consumer majors |
| `publicModulePath` | SDK import path |
| `docsPath` | Human documentation |
| Deprecation fields | `deprecatedInVersion`, `removeInMajor`, `replacementContractId` |

---

## Operations

- `listEnterpriseContracts` / `getEnterpriseContract`
- `validateEnterpriseContract`
- `negotiateContract` — consumer platform + declared version → negotiated version or errors
- `registerEnterpriseContract` — framework extension point for new runtimes

---

## First registered contract

`identity.subject@1.0.0` → `@stankings/platform-sdk/identity`

---

## Documentation template

See `CONTRACT_DOCUMENTATION_TEMPLATE` — required sections for every new contract.
