# Health endpoints

## Liveness — `GET /api/health`

- HTTP **200**
- No database dependency
- JSON:

```json
{
  "status": "ok",
  "service": "stankings-hq",
  "version": "0.1.0",
  "build": "…",
  "timestamp": "…"
}
```

Use for container HEALTHCHECK and load balancers.

## Readiness — `GET /api/health?ready=1`

- HTTP **200** when ready
- HTTP **503** when degraded
- Checks:
  - Required public env present (not placeholder)
  - Supabase `stankings_members` reachable

```json
{
  "status": "ok",
  "ready": true,
  "env": {
    "NEXT_PUBLIC_SITE_URL": true,
    "NEXT_PUBLIC_SUPABASE_URL": true,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": true
  },
  "database": "connected"
}
```

Secret values are never returned.
