# Enterprise Platform — Operations Handbook

**Baseline:** `enterprise-platform-v1.0-certified`  

## Health

```ts
const health = createPlatformSdk({ … }).health();
// overall + per-component: identity, discovery, consent, passport, trust, explainability, notifications
```

Certification aggregate:

```ts
import { assessPlatformCertification } from "@/lib/enterprise-platform/certification";
assessPlatformCertification(); // recommendation GO | CONDITIONAL_GO | NO_GO
```

## Logging & correlation

- SDK `platform.log(message, meta)`  
- `correlateEventLog(event)` for event-linked structured lines  
- Prefer attaching `correlationId` on enterprise events

## Metrics & alerting (foundation)

| Signal | Source | Alerting |
|--------|--------|----------|
| Component health ≠ healthy | `buildPlatformHealthReport` | Hook into ops monitor (vendor TBD — TD-006) |
| Eight-Gate regression | `assess*EightGates` / certification | CI gate |
| Migration verify fail | `verify:*` scripts | CI gate |

## Audit retention

Consent, Passport, Trust, Explainability maintain append-only history tables. Retention policy: retain indefinitely unless a future governance decision specifies archival.

## Disaster recovery

1. Supabase PITR / backups for `dfaqkrikdvohvvcuxoek`  
2. Rollback SQL under `supabase/migrations/rollback/` for each durable runtime + RLS  
3. Re-verify with `npm run verify:platform-certification` and `verify:enterprise-rls`  
4. Material incidents follow IIAF (CANON-015)

## Runbooks

| Concern | Doc |
|---------|-----|
| Identity migration | `IDENTITY_MIGRATION.md` |
| Consent migration | `CONSENT_MIGRATION.md` |
| Passport migration | `PASSPORT_MIGRATION.md` |
| Trust migration | `TRUST_MIGRATION.md` |
| Explainability migration | `EXPLAINABILITY_MIGRATION.md` |
| RLS | `SECURITY_HANDBOOK.md` |
| Production gates | `docs/architecture/enterprise-platform/PRODUCTION_CHECKLIST.md` |

## Daily / release checks

```bash
npm run verify:supabase-project -- --require-linked
npm run verify:platform-certification
npm run verify:enterprise-rls
npm test
npm run typecheck
```
