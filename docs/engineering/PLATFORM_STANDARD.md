# Platform Standard — Stankings Ecosystem

Canonical approved production stack. **Coolify only** for hosting — Vercel is decommissioned and must not be reintroduced.

## Approved stack

| Layer | Technology |
|-------|------------|
| Source control | GitHub (one GitHub App per product repo) |
| CI | GitHub Actions (lint, typecheck, build — not production deploy) |
| Hosting | Hetzner |
| Orchestration | Coolify (`https://control.stankings.com`) |
| Edge & DNS | Cloudflare |
| Database & auth | Supabase |
| Email | Resend |
| Payments | Product-specific providers |
| Monitoring | Health endpoints + Coolify container health |

## Production deployment policy

1. Push to `main` on the product GitHub repo.
2. Coolify GitHub App webhook triggers Docker build from repo `Dockerfile`.
3. Runtime secrets live in **Coolify only** — never in git, never in Docker build args except public build-time vars.
4. Verify deploy: container healthy → production URL 200.
5. **Do not deploy to Vercel.**

## Architecture

```
GitHub
  │
  ▼
Coolify (control.stankings.com)
  │
  ▼
Hetzner (shared host, per-product containers)
  │
  ├── Supabase (Postgres, Auth, Storage)
  │
  └── Cloudflare (DNS, Access, CDN/WAF)
```

## Stankings references

| Item | Location |
|------|----------|
| Deployment | `docs/engineering/DEPLOYMENT_STANDARD.md` |
| Production URL | https://stankings.com |

## Engineering standards (frozen Sprint 0.7)

| Document | Purpose |
|----------|---------|
| [PLATFORM_STANDARD.md](./PLATFORM_STANDARD.md) | Canonical stack |
| [DEPLOYMENT_STANDARD.md](./DEPLOYMENT_STANDARD.md) | Deploy workflow |
| [ENVIRONMENT_STANDARD.md](./ENVIRONMENT_STANDARD.md) | Shared env vars |
| [HEALTH_STANDARD.md](./HEALTH_STANDARD.md) | Health envelope |
| [LOGGING_STANDARD.md](./LOGGING_STANDARD.md) | Startup logging |
| [PROJECT_IDENTITY.md](./PROJECT_IDENTITY.md) | Application identity |
| [PLATFORM_FREEZE.md](./PLATFORM_FREEZE.md) | Infrastructure freeze |
| [SUPABASE_REDIRECT_AUDIT.md](./SUPABASE_REDIRECT_AUDIT.md) | Auth URL checklist |

## Per-product deployment docs

| Product | Doc |
|---------|-----|
| Stankings | `docs/engineering/DEPLOYMENT_STANDARD.md` |
| BamSignal | `DEPLOYMENT_STANDARD.md` (BamSignal repo) |
| Yike | `docs/engineering/DEPLOYMENT_STANDARD.md` (Yike repo) |
| BayRight | `docs/coolify-deployment.md` (BayRight repo) |

## Deployment metadata (standard)

See `src/lib/deploy-metadata.ts`. Health: `GET /api/health`.

## Supabase Auth redirects

See [SUPABASE_REDIRECT_AUDIT.md](./SUPABASE_REDIRECT_AUDIT.md).

## Rollback

Redeploy previous successful Coolify deployment from the Coolify UI.

## Historical note

Launch-war-room and sprint audit docs may mention Vercel during migration. Those are historical only. Production authority is Coolify.
