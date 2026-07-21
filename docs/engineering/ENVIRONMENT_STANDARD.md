# Environment Standard — Stankings

Shared platform variables: identical names across the ecosystem. See BamSignal `docs/engineering/ENVIRONMENT_STANDARD.md` for the full table.

## Stankings-specific

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | https://stankings.com |
| `NEXT_PUBLIC_SUPABASE_URL` | Stankings HQ project only |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |

Product secrets: `.env.example`. Runtime: Coolify only.

## Shared platform vars

`APP_ENV`, `NODE_ENV`, `APP_VERSION`, `DEPLOY_PLATFORM`, `DEPLOY_PROVIDER`, `GIT_COMMIT_SHA`, `BUILD_TIME`, `LOG_LEVEL`, `PORT`
