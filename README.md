# Stankings Group

The official website for [stankings.com](https://stankings.com) — the institutional homepage of Stankings Group and its ecosystem of companies.

## Getting Started

```bash
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production (Docker / Coolify)

Deployment is **Docker-first**. See **[docs/deployment/](docs/deployment/)**.

Coolify settings (no hacks):

| Field | Value |
|-------|--------|
| Build Pack | Dockerfile |
| Dockerfile | `/Dockerfile` |
| Port | `3000` |
| Domain | `stankings.com` |
| Pre/Post commands | *(empty)* |
| Custom Docker options | *(empty)* |

```bash
npm run build
npm start
# or in container: node server.js
```

Health:

- `GET /api/health` — liveness
- `GET /api/health?ready=1` — readiness (env + Supabase)

## Structure

- **Homepage** — Mission, vision, companies, live platforms, pillars
- **Public institutional pages** — Trust, Legal, Support, Status
- **Member Access** (`/members`) — Library and constitution (verified members)
- **Energy console** (`/energy`) — Super-admin operations

## Live Platforms

- [yike.ng](https://yike.ng) — Marketplace
- [bamsignal.com](https://bamsignal.com) — Relationships & community
- [bayright.com](https://bayright.com) — Financial infrastructure

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (standalone) |
| `npm start` | Production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run seed:auth` | Local/admin user seed (requires service role) |
