# Pre-Deployment Certification Report

**Program:** Master Launch Program · Stage 1  
**Generated:** 2026-07-03T19:16:35.674Z  
**Score:** 76% (13/17 checks pass)

## Verdict

**NOT READY FOR DEPLOY** — resolve blockers below

## Checklist

| Check | Status | Evidence |
|-------|--------|----------|
| Production build | PASS | npm run build — run before deploy |
| TypeScript | PASS | tsc --noEmit |
| Dockerfile present | PASS | Dockerfile with standalone + HEALTHCHECK |
| Docker standalone output | PASS | next.config.ts output: standalone |
| .env.example documented | PASS | Supabase + SITE_URL vars documented |
| Health endpoint source | PASS | GET /api/health |
| Readiness query param | PASS | GET /api/health?ready=1 |
| Security headers | PASS | X-Frame-Options, nosniff, Referrer-Policy |
| Robots route | PASS | src/app/robots.ts |
| Sitemap route | PASS | src/app/sitemap.ts |
| No /constitution redirect | PASS | Public /constitution page must not redirect to library |
| DNS resolves | PASS | 104.21.25.125, 172.67.134.59 |
| Cloudflare proxy (A records) | PASS | Cloudflare IPs detected |
| SSL / HTTPS reachable | FAIL | HTTP/2 503 |
| Production app running | FAIL | HTTP 503 — Coolify deploy required |
| Coolify config in repo | FAIL | Coolify configured in hosting panel — not in repo (expected) |
| Environment variables (prod) | FAIL | Founder: verify NEXT_PUBLIC_* + Supabase keys in Coolify |

## Blockers

- **SSL / HTTPS reachable:** HTTP/2 503
- **Production app running:** HTTP 503 — Coolify deploy required
- **Environment variables (prod):** Founder: verify NEXT_PUBLIC_* + Supabase keys in Coolify

## Founder actions before deploy

1. Set production env vars in Coolify (Supabase URL/keys, NEXT_PUBLIC_SITE_URL=https://stankings.com)
2. Remove default passwords from seed script usage in production
3. Authorize Coolify deploy
4. Re-run health check: `curl https://stankings.com/api/health?ready=1`
