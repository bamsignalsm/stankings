# Supabase Migration Safety Standard

Applies to **this repository only**. Each Stankings ecosystem app has its own Supabase project — see `PROJECT_IDENTITY.md` in this repo.

## Repository identity

Before any Supabase or database work:

1. Confirm you are in the **Stankings** repository.
2. Open `docs/engineering/PROJECT_IDENTITY.md`.
3. Record the **expected project reference**: `dfaqkrikdvohvvcuxoek`.

## Required verification before every migration

```bash
cat docs/engineering/PROJECT_IDENTITY.md | grep 'project reference'
grep project_id supabase/config.toml
cat supabase/.temp/project-ref
supabase projects list
```

**If expected reference ≠ linked project → STOP.** Do not migrate. Do not relink without owner approval.

## Required verification after every migration

1. Supabase dashboard → project `dfaqkrikdvohvvcuxoek` → confirm migration history.
2. Production smoke on https://stankings.com (auth, careers, member routes).
3. Coolify build args: `NEXT_PUBLIC_SUPABASE_URL` uses correct host.

## Safe migration workflow (Stankings)

| Step | Action |
|------|--------|
| 1 | Pre-checks above |
| 2 | Add timestamped SQL under `supabase/migrations/` |
| 3 | Test against Stankings-only database |
| 4 | Apply via approved deploy path |
| 5 | Post-checks above |

## Rollback expectations

- Forward-only migrations in production.
- Rollback = corrective migration or Supabase backup restore.
- Never `supabase db reset` on production.

## Environment requirements

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Must be `https://dfaqkrikdvohvvcuxoek.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key for **this** project |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; **this** project |

## Forbidden operations

- Cross-linking to BamSignal (`nswiwxmavuqpuzlsascs`), Yike (`hlpojfurfldvcxfxhveg`), or BayRight (`rnltzcfndsodelfdbaoh`)
- Migrating without identity verification
- Guessing `project-ref` on link failure

## CLI authentication

```bash
supabase login
cd /path/to/stankings
supabase link --project-ref dfaqkrikdvohvvcuxoek
```

Requires Supabase org access for Stankings Group's Project. If link fails with **privileges** errors, request org access from the Stankings project owner.

## Related documents

- `docs/engineering/PROJECT_IDENTITY.md`
- `supabase/config.toml`
- `.env.example`
- `docs/deployment/environment.md`
