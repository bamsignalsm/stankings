# Coolify — Stankings HQ (stankings.com)

Authoritative Coolify settings for Stage 1 production deploy.
Apply these in the Coolify UI — they replace Laravel/template defaults.

## General

| Field | Value |
|-------|--------|
| **Name** | Stankings Group |
| **Description** | Institutional headquarters — stankings.com |
| **Build Pack** | Dockerfile |
| **Domains** | `stankings.com` (and `www.stankings.com` if used) |
| **Direction** | Redirect to non-www |

## Build

| Field | Value |
|-------|--------|
| **Base Directory** | `/` |
| **Dockerfile Location** | `/Dockerfile` |
| **Docker Build Stage Target** | *(empty)* |
| **Watch Paths** | see below |
| **Custom Docker Options** | *(empty — remove fuse/SYS_ADMIN/php templates)* |
| **Use a Build Server?** | optional |

### Watch Paths (Next.js App Router — not Pages Router)

```
src/**
public/**
package.json
package-lock.json
Dockerfile
next.config.ts
```

Do **not** use `src/pages/**` (that is Pages Router; this app uses `src/app/**`).

Leave Watch Paths empty to rebuild on every commit to `main`.

## Network

| Field | Value |
|-------|--------|
| **Ports Exposes** | `3000` |
| **Port Mappings** | `3000:3000` (or Coolify proxy only — prefer proxy, no public host port if using Traefik) |
| **Network Aliases** | *(empty)* |
| **HTTP Basic Authentication** | Off |

## Labels

| Field | Value |
|-------|--------|
| **Container Labels** | Reset to Defaults (remove placeholder `123456789`) |

## Pre/Post Deployment

| Field | Value |
|-------|--------|
| **Pre-deployment** | *(empty)* |
| **Post-deployment** | *(empty)* |

Do **not** run `php artisan migrate`. This is Next.js. Database migrations are applied with Supabase CLI (`supabase db push`), not at container start.

## Health check (Coolify / proxy)

| Field | Value |
|-------|--------|
| **Path** | `/api/health` |
| **Readiness** | `/api/health?ready=1` |

Dockerfile includes a container HEALTHCHECK on `/api/health`.

## Environment variables (Coolify → Environment)

Mark `NEXT_PUBLIC_*` as **Build Variable** (available during `docker build`) and runtime.

```
NEXT_PUBLIC_SITE_URL=https://stankings.com
NEXT_PUBLIC_SUPABASE_URL=https://dfaqkrikdvohvvcuxoek.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
SUPER_ADMIN_EMAIL=office@stankings.com
```

Do not set seed passwords in production. Change super-admin password after first login.

## Git source

| Field | Value |
|-------|--------|
| **Repository** | `https://github.com/bamsignalsm/stankings` |
| **Branch** | `main` |

## After deploy

1. `curl -sI https://stankings.com` → `200`
2. `curl -s https://stankings.com/api/health?ready=1` → `"ready":true`
3. Walkthrough: `/`, `/trust`, `/legal`, `/status`, `/sitemap.xml`, `/robots.txt`
4. Supabase Auth URL config: Site URL `https://stankings.com`, redirect `https://stankings.com/auth/callback`
