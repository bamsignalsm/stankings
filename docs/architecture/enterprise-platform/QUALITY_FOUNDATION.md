# Quality Foundation Specification

**ID:** `SPEC-QUALITY-FOUNDATION-001`  
**Program:** Shared Enterprise Platform Completion  
**Parent:** [SHARED_ENTERPRISE_PLATFORM_PROGRAM.md](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md)  
**Date:** 2026-07-22  

Every shared capability must satisfy these standards before status **complete**.

---

## 1. Testing

| Requirement | Bar |
|-------------|-----|
| Unit tests | Domain rules, lifecycle, validators |
| Contract tests | Public types/fixtures frozen per version |
| Persistence tests | Store semantics (version conflict, unique external refs) |
| Federation/compatibility tests | Conflict resolution + registration gates |
| CI gate | `npm test` (or workspace equivalent) required; typecheck + lint remain mandatory |
| Coverage target (initial) | Critical paths for capability under review — not vanity 100% |

**Current gap:** addressed in M0 — Vitest + `npm test` introduced; expand coverage per capability before Eight-Gate complete.

---

## 2. Runtime validation

- Every write path validates before persist.  
- Every federation/sync path validates registration + version rules.  
- Validators return `{ valid, errors, warnings }` consistently.  
- Invalid states must be unrepresentable where TypeScript can enforce; remainder checked at runtime.

---

## 3. Schema evolution

- Durable schemas versioned (`schemaVersion` integer or semver).  
- Migrations are explicit, reversible where feasible, and verified against linked Supabase project only after `verify:supabase-project -- --require-linked`.  
- Never silent reshape of persisted documents.  
- Expand/contract pattern for breaking field changes.

---

## 4. Contract compatibility

- Public contracts live in the contracts boundary.  
- Breaking changes = major version.  
- Consumers pin majors; platform publishes compatibility matrix.  
- Discovery must advertise supported ranges.

---

## 5. Error handling

- Shared `EnterpriseError` shape: `code`, `message`, `capability`, `retryable`, `details?`.  
- Stable machine codes (e.g. `IDENTITY_VERSION_CONFLICT`).  
- No leaking HQ internals or stack traces to consumers.

---

## 6. Logging

- Structured logs with `capability`, `subjectId?`, `platformId?`, `correlationId`.  
- No PII in log bodies by default; subject ids preferred over emails/names.  
- Log levels documented per runtime.

---

## 7. Auditability

- Material state changes emit audit events (append-only contract).  
- Include actor (system/service subject), action, entity ids, before/after version.  
- Align with Article XII trust obligations without product-specific audit UIs.

---

## 8. Observability

- Health: liveness for process; readiness for dependency/store.  
- Metrics: operation counts, validation failure rates, conflict rates.  
- Tracing hooks: optional correlation ids through federation calls.  
- Platform registration `healthStatus` must reflect real probes once services exist (not static “healthy”).

---

## 9. Security

- Authority boundaries enforced (Shared Identity mints `sid_*` only).  
- Consumers never receive write access to constitutional registries.  
- Secrets never in contracts or docs.  
- Supabase project isolation: Stankings ref `dfaqkrikdvohvvcuxoek` only.  
- OAuth/SSO is a separate security design; not smuggled into Identity completion unless scoped and approved.

---

## 10. Performance

- Pure validators O(n) bounded for typical payloads.  
- Store operations documented with expected complexity.  
- No N+1 federation patterns; pull sync is explicit.  
- Performance budgets set per capability before production readiness.

---

## Completeness checklist (per capability)

Copy into every capability’s “Exit” section:

- [ ] G1 Executable runtime  
- [ ] G2 Stable public contracts  
- [ ] G3 Persistence (N/A only if explicitly stateless)  
- [ ] G4 Validation  
- [ ] G5 Versioning + migration path  
- [ ] G6 Documentation (spec + consumer guide)  
- [ ] G7 Automated tests in CI  
- [ ] G8 Consumer readiness (SDK surface + compatibility notes)  
- [ ] Quality Foundation §§1–10 addressed or explicitly N/A with rationale  

**No checklist → not complete.**
