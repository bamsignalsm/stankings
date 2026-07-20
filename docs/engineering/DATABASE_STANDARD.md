# Database Standard — Stankings Group

## Platform

Primary data store: **Supabase (Postgres)** per product project.

- Migrations live in each product repo (`supabase/migrations/` or documented path)
- **Service role key:** server/runtime only—never in client bundles
- **Anon key:** client-side with RLS enforced

## Rules

- No schema changes without migration files
- RLS policies required for member-facing tables
- Do not share Supabase projects across unrelated products unless explicitly architected (HQ platform registry is the exception—document boundaries)

## Migrations

1. Write forward migration
2. Test locally or on staging branch
3. Apply to production with evidence (migration name, advisor check if available)
4. Never edit applied migration history in production

## Backups and recovery

Follow product `docs/deployment/` and Supabase dashboard PITR settings. Document recovery drills in product ops runbooks.

## Performance

Use Supabase/postgres best practices: indexes for query paths, avoid N+1 in hot routes, EXPLAIN for slow queries before guessing.

## Evidence

Schema claims require migration file reference + `list_tables` or SQL proof—not assumptions about column existence.
