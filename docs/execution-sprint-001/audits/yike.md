# Yike — Execution Sprint 001 Audit

**Repository:** `/Users/stanlex/Documents/yike`  
**Live:** https://yike.ng (Vercel) · Coolify migration in progress  
**Stack:** Next.js · Supabase · Docker/Coolify  
**Audit mode:** Read-only

## Scores

| Dimension | Score |
|-----------|------:|
| Overall | 48 |
| Security | 55 |
| Architecture | 62 |
| Performance | 60 |
| Documentation | 70 |
| Launch Readiness | 35 (V2 cutover blocked) |

## Quality Gates

| Command | Result |
|---------|--------|
| `npm run typecheck` | PASS |
| `npm run build` | Not verified (8GB heap) |
| `npm run lint` | Not completed |
| CI/CD | **None** |

## Critical Issues

1. **~200 uncommitted files** — V2 exists only locally; branch ahead 3
2. **27+ untracked Supabase migrations** not on production
3. **`/listing/:id` → `/properties/:id` permanent redirect** breaks unified autos/marketplace
4. Code ↔ DB drift — APIs call tables from unapplied migrations
5. **No CI/CD pipeline**
6. **Dual deploy drift** — Vercel crons (6) vs Coolify template (13+) vs 13 route files

## High Issues

7. Payment keys unset; monetization UI present
8. WhatsApp webhook POST unauthenticated; default verify token in code
9. Crypto keys on disk (`privatekey.pem`, `safehaven-keys/`)
10. No security headers; `images.remotePatterns` allows any HTTPS host
11. Docker CMD uses `npm start` not standalone server despite `output: "standalone"`
12. `AGENTS.md` contradicts Coolify-first README
13. Scope exceeds locked MVP (social, developer platform, trust economy)

## Medium Issues

14. Only 6 Playwright E2E tests
15. No production APM (Sentry/Datadog)
16. Rate limiting only on developer API
17. WhatsApp lead routing incomplete
18. Middleware bypasses session for all `/api/*`

## Strengths

- All 13 cron routes use `authorizeCronRequest` — fails closed
- Health + readiness endpoints (`/api/health`, `/api/public-health`)
- Staff/admin API capability guards
- Paystack webhook signature verification
- Comprehensive `.env.example` (160 lines)
- Audit ledger architecture designed
- Launch feature flags default safe (payments off)
- `coolify/cron.jobs.example` complete

## Immediate Wins

1. **Do not cut over** until atomic commit + migration apply
2. Fix listing route redirect in `next.config.ts`
3. Rotate `CRON_SECRET`, `WHATSAPP_VERIFY_TOKEN`
4. Remove PEM keys from workspace
5. Configure Coolify crons from template

## Recommended Next Steps

**Phase A (release gate):** Atomic push → apply migrations → fix routing → Coolify deploy  
**Phase B (week 1):** GitHub Actions CI, WhatsApp signature verification, security headers  
**Phase C (week 2):** E2E expansion, scope reconciliation with product lock

**Verdict:** Property MVP may remain on Vercel. **V2 unified marketplace + Coolify cutover blocked.**
