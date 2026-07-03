# Stankings HQ — Deployment

Docker-first. Coolify-native. No platform lock-in.

| Document | Purpose |
|----------|---------|
| [Architecture](./architecture.md) | Runtime topology |
| [Docker](./docker.md) | Local and CI image build |
| [Coolify](./coolify.md) | One-click Coolify settings |
| [Environment](./environment.md) | Required variables |
| [Health](./health.md) | Liveness and readiness |
| [Rollback](./rollback.md) | Revert a bad deploy |
| [Troubleshooting](./troubleshooting.md) | Common failures |
| [Checklist](./checklist.md) | Pre-deploy gate |
| [Known limitations](./known-limitations.md) | Explicit non-goals |

## Quick start (Coolify)

1. Build Pack: **Dockerfile**
2. Dockerfile: `/Dockerfile`
3. Port: **3000**
4. Domain: **stankings.com**
5. Set environment variables (see [environment.md](./environment.md))
6. Deploy — no pre/post commands, no custom Docker options
