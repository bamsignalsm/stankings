# Troubleshooting

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Traefik `no available server` | Container not running / Coolify cannot write app dir | Fix Coolify host permissions; restart app |
| Build fails on `npm ci` | Lockfile out of sync | Run `npm install` locally, commit lockfile |
| Build succeeds, readiness 503 `env` | Missing/placeholder `NEXT_PUBLIC_*` | Set build-time env in Coolify |
| Readiness 503 `database` | Wrong Supabase keys or network | Verify project URL/keys; check Supabase status |
| Liveness 200, site blank | Client env wrong at build | Rebuild with correct `NEXT_PUBLIC_*` build args |
| Permission denied writing `.env` under `/data/coolify/...` | Host filesystem — not repository | Fix Coolify server ownership/ACL (not app code) |

## Repository vs infrastructure

If the failure occurs **before** Docker Compose starts (cannot write `.env` / `docker-compose.yaml`), the repository cannot fix it. That is a Coolify host filesystem issue.
