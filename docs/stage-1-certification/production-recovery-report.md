# Stage 1 Production Recovery Report

**Status:** NOT READY  
**Date:** 2026-07-03T19:58Z  
**Recommendation:** READY FOR FOUNDER DEPLOYMENT SIGN-OFF — **after** Coolify deploy succeeds

---

## Root cause

Traefik on the Coolify origin returns **`no available server`**.  
No healthy container is registered for `stankings.com`. Application code is never reached.

Full chain analysis: `503-root-cause-report.md`

## Coolify certification (external evidence)

| Check | Result |
|-------|--------|
| Application Status | FAIL — no backend |
| Container Status | FAIL — not serving |
| Image / Build Logs | UNKNOWN — requires Coolify UI |
| Runtime Logs | UNKNOWN — requires Coolify UI |
| Port 3000 config | PASS (configured in Coolify UI) |
| Traefik Routing | FAIL — no available server |
| Health Checks | FAIL — not reached |
| Environment Variables | PASS locally / in `.env.local` — must be set **in Coolify** as Build Variables |

## Environment validation (local secrets ready for Coolify)

| Variable | Status |
|----------|--------|
| NEXT_PUBLIC_SITE_URL | PASS (`https://stankings.com`) |
| NEXT_PUBLIC_SUPABASE_URL | PASS (Stankings project `dfaqkrikdvohvvcuxoek`) |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | PASS (set, not placeholder) |
| SUPABASE_SERVICE_ROLE_KEY | PASS (set, not placeholder) |
| SUPER_ADMIN_EMAIL | PASS |
| DB migrations | PASS (59/59 applied via CLI) |
| Coolify env applied | **FAIL / UNKNOWN** — must verify in Coolify UI |

## Post-recovery certification

| Endpoint | Status |
|----------|--------|
| `/` | FAIL 503 |
| `/about` | FAIL 503 |
| `/trust` | FAIL 503 |
| `/legal` | FAIL 503 |
| `/status` | FAIL 503 |
| `/api/health` | FAIL 503 |
| `/api/health?ready=1` | FAIL 503 |

Re-run after deploy:

```bash
curl -sI https://stankings.com
curl -s https://stankings.com/api/health
curl -s 'https://stankings.com/api/health?ready=1'
```

Expect HTTP 200 and `"ready":true`.

## Resolution

| Item | Owner | Action |
|------|-------|--------|
| Clear `php artisan migrate` pre/post | Founder | Coolify UI |
| Clear Custom Docker Options | Founder | Coolify UI |
| Set Build+Runtime env vars | Founder | Coolify UI (copy from `.env.local`) |
| Deploy / Restart | Founder | Coolify UI |
| Confirm container Running | Founder | Coolify UI |
| Post-recovery curl checks | Engineering | After deploy |

## Deployment time

Not started — blocked on Coolify control plane (no agent access).

## Health status

**DOWN** — Traefik has zero healthy backends for `stankings.com`.

## Remaining risks

1. Build fails if `NEXT_PUBLIC_*` not marked as Build Variables
2. Pre-deploy PHP commands abort pipeline
3. Super-admin password still default until changed post-launch
4. Access token was shared in chat — revoke when convenient

## Recommendation

**NOT READY** for Stage 1 exit.

**READY FOR FOUNDER DEPLOYMENT SIGN-OFF** once:

1. Coolify shows container **Running**
2. `https://stankings.com/api/health` → 200
3. `https://stankings.com/api/health?ready=1` → `"ready":true`
4. Founder walkthrough checklist signed

Then: HQ → **MAINTENANCE**, Stage 2 BamSignal → **ACTIVE LAUNCH**.
