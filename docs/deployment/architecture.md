# Architecture

```
Internet
  → Cloudflare (DNS + TLS)
    → Coolify Traefik
      → Docker container (node:22-slim, non-root)
        → Next.js standalone (node server.js :3000)
          → Supabase (Auth + Postgres)
```

## Container

| Item | Value |
|------|--------|
| Base | `node:22-slim` |
| User | `nextjs` (uid 1001) |
| Port | `3000` |
| Process | `node server.js` |
| Health | `GET /api/health` |

## Build stages

1. **deps** — `npm ci`
2. **builder** — `npm run build` (standalone output)
3. **runner** — minimal runtime with standalone server + static assets

## Out of scope

- Shared runtime with BamSignal / Yike / BayRight
- Shared databases
- Host-level migrations at container start
