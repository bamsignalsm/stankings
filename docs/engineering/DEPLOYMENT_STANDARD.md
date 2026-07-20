# Deployment Standard — Stankings Group

Shared blueprint: **GitHub (dedicated App per product) → Cloudflare → Coolify → Hetzner → healthy production**.

Canonical Coolify control plane: **`https://control.stankings.com`**  
Compatibility alias: **`https://control.bamsignal.com`**

## Architecture

```
Product GitHub (dedicated App, repo-only install)
        │  webhook → /webhooks/source/github/events
        ▼
Cloudflare Access (dashboard protected; webhook path bypass — path only)
        ▼
Coolify (shared Hetzner)
        ▼
Dockerfile build → container on port 3000 (typical)
        ▼
Traefik + Let's Encrypt → product domain
```

## Per-product requirements

| Item | Rule |
|------|------|
| GitHub App | One app per product; **System Wide OFF**; repo-scoped install |
| Coolify Source | Dedicated; never reuse another product’s App |
| Build pack | Dockerfile (path documented per repo) |
| Auto Deploy | ON |
| Watch Paths | Empty (deploy every push to branch) |
| Domains | Product production domain(s) in Coolify General |
| Env vars | Runtime secrets in Coolify only—not in git |

## Deploy verification chain (evidence required)

1. Push received on GitHub (commit SHA)
2. Webhook delivered (Coolify deployment started)
3. Build completed (Coolify log — no ERROR)
4. Container **Running (healthy)**
5. Production HTTP 200 (homepage or agreed smoke URL)
6. Health endpoint response documented

Do not declare deploy success until steps 4–6 are verified or explicitly marked pending.

## Stankings HQ detail

Product-specific runbooks: [`docs/deployment/`](../deployment/README.md).

## Other products

- **BamSignal:** `DEPLOYMENT_STANDARD.md` in BamSignal repo (reference implementation)
- **BayRight:** `docs/coolify-deployment.md` + `docs/execution-sprint-004/GROUP-INFRASTRUCTURE-STANDARDIZATION-REPORT.md`
- **Yike:** Coolify app on same host; product repo docs

## Group status snapshot (2026-07-20)

| Product | GitHub App | Auto Deploy | Production URL | HTTP | Notes |
|---------|------------|-------------|----------------|------|-------|
| BamSignal | ✅ | ✅ | bamsignal.com | `/ready` 200 | Reference |
| Yike | ✅ | ✅ | yike.ng | 200 | — |
| BayRight | ✅ | ✅ | bayright.com | 200 | `/api/health` degraded — migrate provider secrets to Coolify |
| Stankings | ✅ | ✅ | stankings.com | apex 200 | **www.stankings.com → 503** — add www to Coolify domains |

GitHub agent merge (Option 1): **all four repos ✅** — see [AUTOMATION_STANDARD.md](./AUTOMATION_STANDARD.md).

## Infrastructure changes

DNS, Cloudflare, Coolify apps, GitHub Apps, and Traefik labels are **infrastructure tasks**—not drive-by changes during feature work.
