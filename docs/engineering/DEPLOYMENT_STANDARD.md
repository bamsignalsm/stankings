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
- **BayRight:** `docs/coolify-deployment.md` in BayRight repo
- **Yike:** Coolify app on same host; product repo docs

## Infrastructure changes

DNS, Cloudflare, Coolify apps, GitHub Apps, and Traefik labels are **infrastructure tasks**—not drive-by changes during feature work.
