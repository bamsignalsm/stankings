# Health Standard — Stankings

## Endpoint

`GET /api/health` — liveness (standard envelope, `database: skipped`)  
`GET /api/health?ready=1` — readiness + Supabase probe

## Core fields

See ecosystem [HEALTH_STANDARD.md](https://github.com/bamsignalhq/bamsignal/blob/main/docs/engineering/HEALTH_STANDARD.md) — identical envelope across products.

Product detail in `diagnostics`: `{ ready, env, detail? }`.

Implementation: `src/lib/deploy-metadata.ts`, `src/app/api/health/route.ts`.
