# Supabase Auth Redirect Audit — Stankings Ecosystem

**Last audit:** 2026-07-21 (Sprint 0.6.1)  
**Policy:** Production Supabase Auth must allow **Coolify production domains only**. Remove all `*.vercel.app` and obsolete preview URLs.

Auth redirect configuration lives in the **Supabase Dashboard** (Authentication → URL Configuration). It is not stored in application git repos.

## Per-product Supabase projects

| Product | Project ref | Production domain(s) | Dashboard |
|---------|-------------|----------------------|-----------|
| BamSignal | `nswiwxmavuqpuzlsascs` | `https://bamsignal.com` | [Auth URL settings](https://supabase.com/dashboard/project/nswiwxmavuqpuzlsascs/auth/url-configuration) |
| Yike | `hlpojfurfldvcxfxhveg` | `https://yike.ng`, `https://www.yike.ng` | [Auth URL settings](https://supabase.com/dashboard/project/hlpojfurfldvcxfxhveg/auth/url-configuration) |
| Stankings | `dfaqkrikdvohvvcuxoek` | `https://stankings.com` | [Auth URL settings](https://supabase.com/dashboard/project/dfaqkrikdvohvvcuxoek/auth/url-configuration) |
| BayRight | *(see BayRight repo `.env.example`)* | `https://bayright.com` | BayRight Supabase project dashboard |

## Checklist (each project)

- [ ] **Site URL** = production apex (HTTPS, no trailing slash unless required)
- [ ] **Redirect URLs** include only:
  - Production apex + `www` (if used)
  - `http://localhost:3000/**` (local dev only)
  - Staging subdomain **only if actively used** (e.g. `https://staging.bayright.com/**`)
- [ ] **Remove** all entries matching:
  - `https://*.vercel.app/**`
  - `https://*-*.vercel.app/**`
  - Old sslip.io / Coolify preview hosts no longer in use
- [ ] **Password reset** and **email confirmation** links resolve to production domain (smoke test after changes)
- [ ] **OAuth providers** (if any): callback URLs updated to production domain

## Automated audit note

Supabase MCP access from engineering tooling currently verified **BamSignal** project (`nswiwxmavuqpuzlsascs`) only. Redirect URL lists are dashboard-only and require **manual verification** per project above.

## After cleanup

1. Send a test password-reset email per product and confirm link host is production.
2. Confirm signup/email OTP flows on production.
3. Document completion date in Coolify deploy notes.

## Historical

Migration runbooks may reference Vercel preview URLs. Those are archive-only. Do not re-add Vercel URLs for production auth.
