# Enterprise Platform v1.0 — Production Deployment Checklist

**Project:** `dfaqkrikdvohvvcuxoek` (Stankings only)  
**SDK:** `@stankings/platform-sdk` **1.5.0**  
**Tag:** `enterprise-platform-v1.3-explainability`

## Pre-flight

- [ ] `npm run verify:supabase-project -- --require-linked`
- [ ] `npm run verify:platform-certification`
- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] Confirm linked ref is `dfaqkrikdvohvvcuxoek` (never BamSignal/Yike/BayRight)

## Durable schema

- [x] Identity migration applied
- [x] Consent migration applied
- [x] Passport migration applied
- [x] Trust migration applied
- [x] Explainability migration applied
- [ ] RLS policies reviewed for all `shared_*` tables (TD-003)
- [ ] Backup / point-in-time recovery confirmed on project

## Runtime certification

- [x] Identity Eight-Gate
- [x] Discovery Eight-Gate
- [x] Consent Eight-Gate
- [x] Passport Eight-Gate
- [x] Trust Eight-Gate
- [x] Explainability Eight-Gate
- [x] `assessPlatformCertification().recommendation === "GO"`

## SDK / consumers

- [x] SDK exports: identity, discovery, consent, passport, trust, explainability
- [x] Feature-gate consumer guides published
- [x] Tag pushed to remote (`enterprise-platform-v1.0-certified`)
- [ ] BamSignal integration PR against tag (feature-gated)
- [ ] Yike integration PR against tag (feature-gated)
- [ ] BayRight integration PR against tag (feature-gated)

## Operations

- [x] Migration verify scripts present
- [x] Rollback SQL present for each durable runtime
- [x] Health report includes all six cores
- [x] RLS enabled+forced on all shared_* tables (TD-003 mitigated)
- [ ] On-call runbook ownership assigned
- [ ] Incident response path includes IIAF for material platform incidents

## GO decision

| Condition | Required |
|-----------|----------|
| Certification GO | Yes |
| Migrations applied on Stankings only | Yes |
| RLS accepted or explicitly waived | Yes — mitigated |
| Consumer feature gates documented | Yes |

**Current recommendation:** **GO** for foundation adoption. Consumers pin `enterprise-platform-v1.0-certified`. Remaining work is ecosystem PRs, package publish (TD-001), and monitoring (TD-006).
