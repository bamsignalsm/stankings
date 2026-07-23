# Unified Passport — Final Architecture Validation

**Date:** 2026-07-22  
**Repository:** `bamsignalsm/stankings`  
**Supabase:** `dfaqkrikdvohvvcuxoek`  
**Branch under review:** working tree on `main` (uncommitted Passport/Workforce milestone)  
**Mode:** Governance & architecture verification only — no feature work, no commit  

---

## Production Readiness Decision

| Field | Value |
|-------|--------|
| Identity law compliance | **PASS** (with residual observations) |
| Critical identity defects | **None found** |
| Blocking defects for commit | **None** (Founder may still hold for audit/routing hardening) |
| Recommendation | **Eligible to commit** after Founder accepts residual risks below |
| Certification | See §9 |

---

## 1. Unified Passport Compliance Report

### Principle under test

> One person = one Stankings Passport = one lifetime identity.  
> Employment is a capability attached to Passport — never a second identity.

### Evidence

| Check | Result | Evidence |
|-------|--------|----------|
| Single ensure path | PASS | `ensurePassportForUser()` in `src/lib/passport/person.ts` — idempotent by `user_id`; email collision refuses steal |
| Career apply binds Passport | PASS | `submitCareerApplication` → `ensurePassportForUser` → inserts `passport_id` on application |
| Hire/Invite extend Passport | PASS | `provisionWorkforceEmployee` always calls `ensurePassportForUser` before writing `workforce_employees` |
| Auth callback issues Passport | PASS | `src/app/auth/callback/route.ts` |
| Applicant dashboard Passport-first | PASS | `/passport/applicant`; `/career/applications` redirects there |
| No Workforce Identity table | PASS | No `workforce_identity` / employee login identity model |
| Auth user ≠ Passport | PASS | Supabase Auth is credential; Passport is institutional identity via `passport_person_links` + `shared_passport_records` |
| Termination preserves Passport | PASS | `executeEmergencyWorkforceAction` comments + never deletes/revokes Passport; law test asserts preserve |

### Residual observations (non-blocking)

| ID | Severity | Finding |
|----|----------|---------|
| O-1 | ~~Medium~~ **CLOSED** | Recovery workflow opens `passport_recovery_cases`; never auto-binds; admin rebind preserves Passport. See [14-passport-recovery-policy.md](./14-passport-recovery-policy.md). |
| O-2 | Low | Platform `PassportRegistry.suspend` / `revoke` still exist for **Passport credential lifecycle** (enterprise platform). Workforce emergency paths do **not** call them. Ops policy should forbid using credential revoke as a substitute for workforce terminate. |
| O-3 | Low | `stankings_members` remains membership/role metadata for HQ Library + Energy gate — not a parallel person identity. |

**Phase 1 verdict:** Passport is the sole **person identity authority**. Supabase Auth is the sole **credential** layer. No competing employee identity system found.

---

## 2. Identity Flow Validation (Careers)

| Step | Expected | Actual | Verdict |
|------|----------|--------|---------|
| Apply requires auth | Sign in / create Passport first | Error if no user: “Create or sign in with your Stankings Passport” | PASS |
| Apply creates/reuses Passport | `ensurePassportForUser` | Idempotent; inserts application with `passport_id` | PASS |
| No duplicate Passport on re-apply | Same user_id | Existing link returned (`created: false`) | PASS |
| Applicant Dashboard | Passport resolution | Queries by `passport_id` / email / `applicant_id` | PASS |
| Offer accept/decline | Preserve Passport | `respondToOffer` updates application only | PASS |
| Hire extends Passport | Capability only | `hireFromApplication` → provisioner with `existingUserId: applicant_id` | PASS |
| Re-apply years later | Same Passport | Same Auth → reuse; new Auth same email → recovery case (no duplicate) | PASS |

**Phase 2 verdict:** PASS.

---

## 3. Workforce Validation

Provisioner writes **only** capability fields after Passport ensure:

- `workforce_employees` (company, department, team_slug, role, workspace, hierarchy, manager, status, skl_access, passport_id, subject_id)
- `workforce_grants` (RBAC)
- `workforce_welcome_checklist`
- notification + audit

Does **not**:

- Issue a second Passport (idempotent ensure)
- Create a Workforce-only login product
- Delete Auth or Passport on terminate

Invite may call `auth.admin.createUser` / `inviteUserByEmail` — this creates a **credential** for someone who never signed up, then immediately binds Passport. Correct SSOI pattern.

**Phase 3 verdict:** PASS.

---

## 4. Authentication Validation

### Intended stack

```text
Supabase Auth (credential)
  → ensurePassportForUser (identity)
  → resolvePostAuthDestination / middleware (capability routing)
```

### Routing matrix

| Capability | Destination | Implementation |
|------------|-------------|----------------|
| Founder / `super_admin` | Energy | `resolvePostAuthDestination` + middleware Energy gate |
| Active employee + `skl_access` | `/skl` | Callback + middleware; workers hitting Energy redirected to `/skl` |
| Applicant with applications | `/passport/applicant` | Callback resolver |
| Approved member (default) | `/library` | Callback + middleware login bounce |
| Workers never Energy | Enforced | middleware `isEnergyPanelPath` → non–super_admin → `/skl` or unauthorized |

### Findings

| ID | Severity | Finding |
|----|----------|---------|
| O-4 | Medium | **Company Head → Company Dashboard** and **CEO → Executive Dashboard** are *architecture targets*, not implemented routes. Company Heads currently land on `/skl` like staff. Not an identity defect; capability UX gap. |
| O-5 | ~~Medium~~ **CLOSED** | Middleware + AuthForm now use capability routing (`/auth/continue`). Applicants are not sent to `/library` via stale `next`. |
| O-1 | ~~Medium~~ **CLOSED** | Recovery cases + admin rebind; never auto-bind; never second Passport. See [14-passport-recovery-policy.md](./14-passport-recovery-policy.md). |
| O-6 | Info | Two entry URLs (`/auth/login`, `/energy/auth`) share one Auth backend. Energy entry is capability-gated. Acceptable as long as product copy frames Passport as SSOI. |

**Phase 4 verdict:** PASS for identity; CONDITIONAL for full capability routing matrix (O-4, O-5).

---

## 5. Emergency Workforce Validation

| Action | Implemented | Passport surviving |
|--------|-------------|--------------------|
| Suspend workforce / employment | Yes | Yes |
| Disable SKL | Yes | Yes |
| Force logout / revoke sessions | Yes (`signOut` global) | Yes |
| Strip grants | Yes | Yes |
| Lock investigation | Yes | Yes |
| Terminate employment | Yes | Yes |
| Reinstate / restore | Yes | Yes |
| Transfer company / dept / role / workspace | Via `transferEmployee` (Energy employees UI) | Yes — updates profile only |
| Transfer manager | **Not dedicated** | N/A |
| Remove company/department access as named actions | Covered by terminate / strip / disable | Yes |

Emergency audit writes `workforce_emergency_actions` with `previous_state` / `new_state` / `reason` / `passport_id` and sets `passportPreserved: true` on audit payload.

**Phase 6 verdict:** PASS for Passport survival. Partial coverage vs full Founder action catalogue (manager transfer UX).

---

## 6. Audit Coverage Report

| Event | Coverage | Notes |
|-------|----------|-------|
| Passport created | PARTIAL | Passport registry + DB rows; no dedicated `workforce_audit_logs` row from `ensurePassportForUser` |
| Application submitted | PARTIAL | Row in `stankings_career_applications`; no structured audit event |
| Interview / pipeline advance | PASS | `workforce_application_events` (`from_status` → `to_status`, actor, note) |
| Offer accept/reject | PARTIAL | Status update only; no audit table write |
| Hire / invite | PASS (basic) | `workforce_audit_logs` + passportId; missing device/IP/why |
| Transfer | PASS (basic) | payload has new assignment; no previous_state snapshot |
| Suspend (simple) | PASS (basic) | action only |
| Emergency controls | PASS (strong) | who, why, previous, new, passport preserved |
| MFA enrollment | NOT YET | Flags only; TOTP UI deferred |
| Device / IP / source on all events | GAP | Not enterprise-complete across all paths |

**Phase 7 verdict:** **PASS for emergency; CONDITIONAL for enterprise audit completeness.** Not an identity-law failure. Recommend post-commit hardening sprint — not a commit blocker unless Founder requires full Who/What/When/Why/Prev/New on every career event first.

---

## 7. Legacy Findings (report only — no broad cleanup)

| Finding | Type | Risk | Action recommended |
|---------|------|------|--------------------|
| `LAUNCH_JOB_CATALOGUE` still in repo | Legacy catalogue | Low — marked legacy; seed uses Org Registry | Leave until post-commit deprecation |
| `passport-law.test.ts` still imports launch catalogue | Test smell | Low | Point tests at `ORG_ROLE_TEMPLATES` in follow-up |
| `/office` → `/skl` redirects | Legacy path | None — intentional | Keep |
| `identity_subject_id` + `subject_id` + `passport_id` on employees | Dual column naming | Low confusion | Prefer `passport_id` + `subject_id` in docs |
| Org assignments denormalized on employee (no FK to `organization_roles`) | Soft coupling | Medium integrity | Future FK or validation-on-write |
| `listUsers({ perPage: 1000 })` in provisioner | Scale risk | Medium ops | Paginate or `getUserByEmail` when available |
| Platform passport suspend/revoke APIs | Credential lifecycle | Policy risk (O-2) | Document: never use for HR terminate |
| Member login middleware vs callback routing (O-5) | Routing legacy | Medium UX | Align middleware with `resolvePostAuthDestination` |

**No critical orphaned identity services found.**

---

## 8. Organization Registry Validation

| Expectation | Status |
|-------------|--------|
| All companies in registry | PASS (14 seeded) |
| Recruitment states | PASS |
| Phase 1 published jobs | PASS (12) |
| Phase 2 templates draft | PASS |
| Employee references company/dept/role/workspace | PASS (columns present) |
| Team + manager fields | PARTIAL — `team_slug` defaulted; manager optional |
| Hard FK to `organization_*` | NOT ENFORCED — convention + seed |
| Hardcoded org trees in product UIs | LOW — invite UI uses `ORG_ROLE_TEMPLATES`; careers uses org companies |

**Phase 5 verdict:** PASS as authoritative *catalogue*; CONDITIONAL as *enforced schema graph*.

---

## 9. Final Architecture Certification

### Identity authority statement

After repository-wide search of application code, migrations, and auth/middleware paths:

> **Unified Stankings Passport is the sole person-identity authority for the Stankings HQ workforce and careers surfaces in this repository.**  
> Employment, applications, SKL access, and emergency controls attach to or revoke *capabilities* — they do not create or destroy Passport identity.

### What this certification covers

- Stankings HQ app (`bamsignalsm/stankings`)
- Careers → Applicant → Hire/Invite → SKL
- Energy Founder/super_admin gates
- Organization Registry seed + careers visibility

### What this certification does **not** yet cover

- BamSignal / Yike / BayRight product repos consuming HQ Passport as remote SSOI (ecosystem adoption = future programme)
- Full TOTP MFA enrollment UI
- Full Company Head / Executive dashboards (Phase I placeholders at `/skl/company` and `/skl/executive`)
- Complete enterprise audit schema (device, IP, why) on every career event — Phase I.1

### Certification status

| Level | Result |
|-------|--------|
| **Identity law** | **CERTIFIED** |
| **Operational completeness** | **PASS** for Phase I (O-4 placeholders shipped; full audit schema Phase I.1) |
| **Commit eligibility** | **YES — Founder GO required** |

### Recommended post-commit sequence (Founder plan)

1. Commit to `main` (or PR then merge)  
2. Push → Coolify deploy  
3. Production smoke: apply → Passport → applicant → hire → `/skl`; terminate → Passport still present; recovery collision → `/passport/recovery`  
4. Tag e.g. `v1.0.0-passport-foundation`  
5. Track remaining audit device/IP enrichment as Phase I.1  

### Explicit non-actions this validation did **not** take

- No feature additions beyond O-5 / O-1  
- No speculative refactors  
- No UI redesign  
- No commit

---

## Appendix — Primary code anchors

| Concern | Path |
|---------|------|
| Passport ensure | `src/lib/passport/person.ts` |
| Capability routing | `src/lib/passport/capability-routing.ts` |
| Passport recovery | `src/lib/passport/recovery.ts` |
| Auth continue | `src/app/auth/continue/route.ts` |
| Auth callback | `src/app/auth/callback/route.ts` |
| Career apply | `src/app/energy/(console)/actions.ts` → `submitCareerApplication` |
| Provisioner | `src/lib/workforce/provisioner.ts` |
| Emergency | `src/app/skl/emergency-actions.ts` |
| Energy isolation | `src/lib/supabase/middleware.ts` |
| Org registry | `src/lib/organization/registry.ts` |
| Architecture pack | `docs/architecture/passport-workforce/` |
