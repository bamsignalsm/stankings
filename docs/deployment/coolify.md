# Coolify deployment

One-click settings. No host hacks.

## Application

| Field | Value |
|-------|--------|
| Build Pack | **Dockerfile** |
| Dockerfile Location | `/Dockerfile` |
| Base Directory | `/` |
| Ports Exposes | `3000` |
| Domain | `stankings.com` |
| Direction | Redirect to non-www |

## Must be empty

| Field | Value |
|-------|--------|
| Pre-deployment | *(empty)* |
| Post-deployment | *(empty)* |
| Custom Docker Options | *(empty)* |
| Docker Build Stage Target | *(empty)* |

## Watch Paths (optional)

```
src/**
public/**
package.json
package-lock.json
Dockerfile
next.config.ts
```

Or leave empty to rebuild on every commit.

## Environment

Set in Coolify → Environment. Mark `NEXT_PUBLIC_*` as **build-time** (available during `docker build`).

See [environment.md](./environment.md).

## Git

| Field | Value |
|-------|--------|
| Repository | `https://github.com/bamsignalsm/stankings` |
| Branch | `main` |

## After deploy

```bash
curl -sI https://stankings.com
curl -s https://stankings.com/api/health
curl -s 'https://stankings.com/api/health?ready=1'
```

Expect HTTP 200 and `"ready":true`.

## Infrastructure vs repository

| Failure | Owner |
|---------|--------|
| Build fails on missing Dockerfile / Next config | Repository |
| Traefik `no available server` / cannot write `/data/coolify/...` | Coolify host / permissions |
| DNS / Cloudflare misconfig | Infrastructure |
