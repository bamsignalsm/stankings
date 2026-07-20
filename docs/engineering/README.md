# Stankings Group — Engineering Standards

**Source of truth** for how Stankings Group products are built, validated, deployed, and operated.

Projects: **Stankings** (HQ), **BamSignal**, **BayRight**, **Yike**.

## Documents

| Standard | Scope |
|----------|--------|
| [ENGINEERING_STANDARD.md](./ENGINEERING_STANDARD.md) | Master protocol — isolation, validation, evidence, root cause |
| [GIT_STANDARD.md](./GIT_STANDARD.md) | Branches, commits, PRs, protected `main` |
| [DEPLOYMENT_STANDARD.md](./DEPLOYMENT_STANDARD.md) | GitHub App → Coolify → Hetzner → health |
| [RELEASE_STANDARD.md](./RELEASE_STANDARD.md) | Pre/post deploy gates and completion criteria |
| [SECURITY_STANDARD.md](./SECURITY_STANDARD.md) | Secrets, Access, least privilege |
| [UI_STANDARD.md](./UI_STANDARD.md) | Institutional design system (Stankings HQ) |
| [API_STANDARD.md](./API_STANDARD.md) | Health, readiness, public API conventions |
| [DATABASE_STANDARD.md](./DATABASE_STANDARD.md) | Supabase/Postgres patterns |

## Rule for engineers and AI assistants

Before introducing a new pattern, **check whether an existing standard already covers it**.

If a new reusable pattern emerges, **propose an update** to the appropriate standard instead of creating an undocumented convention.

Product-specific deployment detail may also live under `docs/deployment/` (Stankings HQ) or each product repo; ecosystem-wide rules live here.
