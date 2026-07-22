# Sprint — Enterprise Passport Runtime (Phase I)

**Status:** Implementation complete — **awaiting architectural review**  
**Do not commit** until review.  
**Do not apply** Passport migration until review.  
**Tag baseline:** `enterprise-foundation-v1.0` (pre-Passport foundation)

---

## 1. Passport Domain Model Report

Passport is a portable trust container bound to Shared Identity — **not** a user profile.

| Field | Role |
|-------|------|
| `passportId` | Canonical passport identifier (`ppt_*`) |
| `subjectId` | Identity binding (`sid_*` required) |
| `state` | Lifecycle: draft → issued → active → suspended / revoked / expired |
| `verificationStatus` | unverified / pending / verified / contested (derived from evidence) |
| `evidenceRefs[]` | Opaque evidence references |
| `issuance` | Issued-by runtime/platform, reason, expiration policy |
| `expiresAt` | Expiration timestamp |
| Revocation / suspension timestamps | Lifecycle audit |
| `auditRef` | Audit record link |
| `version` / `schemaVersion` | Optimistic concurrency + schema |

Module: `src/lib/enterprise-platform/passport/types.ts`

---

## 2. Passport Persistence Report

| Artifact | Path |
|----------|------|
| Forward migration | `supabase/migrations/20260722160000_shared_passport_persistence.sql` |
| Rollback | `supabase/migrations/rollback/20260722160000_shared_passport_persistence_rollback.sql` |
| Verify script | `npm run verify:passport-migration` |
| Memory / File stores | `passport/store.ts` |
| Supabase adapter | `passport/supabase-store.ts` |
| Tables | `shared_passport_records`, `shared_passport_evidence`, `shared_passport_history` |

Schema version: **1**. Apply **only** after review to `dfaqkrikdvohvvcuxoek`.

---

## 3. Passport Contracts & SDK Report

| Item | Value |
|------|-------|
| Contract | `passport.record@1.0.0` |
| Contract module | `contracts/passport-contract.ts` |
| SDK | `@stankings/platform-sdk` **v1.3.0** |
| Client | `PassportClient` / `createPlatformSdk().passport` |
| Discovery | `passport` readiness = `production` |
| Registry | service `svc-enterprise-passport`, sdk module `sdk.passport` |

---

## 4. Passport Evidence Model Report

Evidence stores **references**, never product business logic.

Providers: `identity` | `consent` | `bayright` | `yike` | `bamsignal` | `enterprise` | `other`

Each ref: `evidenceId`, `provider`, `assertionType`, `assertionRef`, `status`, timestamps, optional `auditRef`.

Catalogue: `defaultEvidenceAssertionTypes()`.

---

## 5. Passport Operations Report

| Operation | Behaviour |
|-----------|-----------|
| `issue` | Creates issued→active (or draft); emits `passport.issued` |
| `attachEvidence` | Appends evidence; emits `passport.evidence.attached` |
| `suspend` | Emits `passport.suspended` |
| `revoke` | Emits `passport.revoked` |
| `expire` | Emits `passport.expired` |
| `prepareRenewal` | Draft successor; emits `passport.renewal_prepared` |
| History | Append-only via store |

Integrated with enterprise events + observability health.

---

## 6. Passport Eight-Gate Assessment

`assessPassportEightGates().complete === true`

| Gate | Status |
|------|--------|
| G1 Runtime | ✅ |
| G2 Contracts | ✅ |
| G3 Persistence | ✅ (adapters + SQL; apply pending review) |
| G4 Validation | ✅ |
| G5 Versioning | ✅ |
| G6 Documentation | ✅ |
| G7 Tests | ✅ |
| G8 Consumer readiness | ✅ |

---

## 7. Migration & Rollback Report

- Static verify: `npm run verify:passport-migration`
- Forward creates three tables with Stankings-only project marker
- Rollback drops history → evidence → records (FK order)
- **Not applied** to remote (per instruction)

---

## 8. Consumer Integration Guide

See `docs/platform/PASSPORT_CONSUMER_GUIDE.md`.

---

## 9. Updated Enterprise Capability Inventory

| Capability | Status |
|------------|--------|
| Quality Foundation | 🟢 Complete |
| Registry Framework | 🟢 Complete |
| Identity | 🟢 8/8 |
| Discovery | 🟢 8/8 |
| Consent | 🟢 8/8 |
| Passport | 🟢 8/8 (migration apply pending review) |
| Contracts | 🟢 Complete |
| SDK | 🟢 v1.3 |
| Configuration | 🟢 Complete |
| Notifications Foundation | 🟢 Complete |
| Observability | 🟢 Complete |
| Trust | ⚪ Pending |
| Explainability | ⚪ Pending |

---

## 10. Updated Completion Estimate

| Prior (post-foundation) | ~58% |
|-------------------------|------|
| **After Passport Eight-Gate (code)** | **~68%** |
| Remaining major runtimes | Trust, Explainability |
| Blockers for Passport production DB | Architectural review + migration apply |

Estimate reflects platform capability readiness, not product feature count.
