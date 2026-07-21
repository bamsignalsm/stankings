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

## Branding

**Brand Governance: ACTIVE** (July 2026 baseline). See **[docs/branding/BRAND_GOVERNANCE.md](docs/branding/BRAND_GOVERNANCE.md)**.

Asset inventory: **[docs/branding/BRAND_ASSETS.md](docs/branding/BRAND_ASSETS.md)**.

| Path | Role |
|------|------|
| `public/images/source/logo-master.png` | Editable master |
| `public/images/*.webp` / `og-image.*` | Generated — do not edit by hand |
| `src/lib/brand.ts` | Runtime `BRAND` API for UI / SEO |

```bash
npm run optimize:brand   # regenerate derived assets (only when master artwork changes)
npm run verify:brand     # CI filesystem + import checks
```

Visual system is **frozen**. Do not perform branding infrastructure work unless official artwork changes.
## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (standalone) |
| `npm start` | Production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run optimize:brand` | Regenerate logo/icon/OG from master |
| `npm run verify:brand` | Validate brand assets + forbid logo.png imports |
| `npm run seed:auth` | Local/admin user seed (requires service role) |
