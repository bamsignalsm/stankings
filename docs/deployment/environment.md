# Environment variables

Source of truth: `.env.example`

## Required (Coolify)

| Variable | Build | Runtime | Notes |
|----------|:-----:|:-------:|-------|
| `NEXT_PUBLIC_SITE_URL` | ✓ | ✓ | `https://stankings.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | ✓ | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | ✓ | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | | ✓ | Server only |
| `SUPER_ADMIN_EMAIL` | | ✓ | Bootstrap identity |

## Optional

| Variable | Purpose |
|----------|---------|
| `APP_VERSION` | Surfaced on health |
| `COOLIFY_BUILD_UUID` | Surfaced as `build` on health |
| `SOURCE_COMMIT` | Fallback build id |

## Rules

- Never commit `.env` or `.env.local`
- Docker build does **not** read `.env.local`
- Pass `NEXT_PUBLIC_*` as Coolify build-time environment
- Placeholders (`your-*`, `placeholder`) fail readiness

## Supabase Auth URLs

- Site URL: `https://stankings.com`
- Redirect: `https://stankings.com/auth/callback`
