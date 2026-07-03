# Stankings HQ — Execution Sprint 001 Audit

**Repository:** `/Users/stanlex/Documents/stankings`  
**Stack:** Next.js 15.3 · React 19 · Supabase SSR · Tailwind 4  
**Audit mode:** Read-only

## Scores

| Dimension | Score |
|-----------|------:|
| Overall | 41 |
| Security | 47 |
| Architecture | 58 |
| Performance | 52 |
| Documentation | 36 |
| Launch Readiness | 32 |

## Quality Gates

| Command | Result |
|---------|--------|
| `npm run lint` | PASS (warnings only) |
| `npx tsc --noEmit` | **FAIL** |
| `npm run build` | **FAIL** |

## Structure Present / Missing

| Path | Status |
|------|--------|
| `src/app`, `src/components`, `src/lib` | ✓ |
| `supabase/migrations` (59 files) | ✓ |
| `scripts/` | ✓ |
| `docs/` | Partial (sprint docs only) |
| `tests/` | ✗ |
| `Dockerfile` | ✗ |
| `.github/workflows/` | ✗ |
| `docker-compose.yml` | ✗ |

## Critical Issues

1. **Build fails** — TS errors in `src/lib/iki/graph.ts`, `src/lib/lexicon-engine/seed.ts`, `src/lib/stankings-library/register.ts`
2. **Members schema missing** — `20260627120000_stankings_members_and_careers.sql` is a stub; no `CREATE TABLE stankings_members` in repo
3. **Seed script defaults** — `scripts/seed-auth-users.mjs` hardcoded password fallbacks

## High Issues

4. No CSP / HSTS / security headers (`next.config.ts`)
5. No rate limiting
6. `/api/*` not in middleware matcher — lexicon API public
7. Signup does not provision `stankings_members` row
8. No CI, no automated tests
9. Broken import: `getAllKnowledgeObjects` vs `getAllStaticKnowledgeObjects`

## Medium Issues

10. RLS only on library/lexicon tables in migrations
11. Middleware DB query per protected request
12. No `typecheck` npm script
13. No `robots.txt` / deployment runbook

## Low Issues

14. 20+ ESLint unused-var warnings
15. `next lint` deprecated
16. Sitemap hardcodes `https://stankings.com`

## Strengths

- Solid Supabase SSR auth middleware for `/library`, `/energy`, `/constitution`
- Super-admin gating on Energy console
- Rich institutional domain model (Library, Governance Code, Canons)
- Comprehensive static seed for knowledge objects
- `.env.example` aligns with code usage

## Immediate Wins

1. Fix 3 TypeScript failure clusters → green build
2. Add `typecheck` script + security headers
3. Commit real `stankings_members` migration with RLS + signup trigger
4. Remove seed password defaults

## Recommended Next Steps

1. CI: lint + typecheck + build
2. Dockerfile + `/api/health` for Coolify
3. E2E: signup → approve → library access
4. Document Coolify deploy independently from other products
