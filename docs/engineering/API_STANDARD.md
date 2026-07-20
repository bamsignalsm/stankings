# API Standard — Stankings Group

## Health endpoints

Each production app exposes machine-readable health for Coolify/Traefik and operators.

| Product | Primary health path | Notes |
|---------|---------------------|--------|
| Stankings HQ | `GET /api/health` | JSON: `status`, `service`, `version`, `build`, `timestamp` |
| BamSignal | `GET /health` (liveness), `GET /ready` (readiness) | `/ready` 503 when critical deps missing |
| BayRight | `GET /api/health` | Provider sub-status may show `degraded` |
| Yike | Product repo docs | Align with Coolify healthcheck path |

Coolify healthcheck path must match the app’s actual route (commonly port **3000**).

## Response conventions

- **200** — process up; body explains degraded subsystems if applicable
- **503** — not ready for traffic (readiness / missing deps)
- JSON responses include service name and build/commit identifier when available

## Public vs authenticated APIs

- Public SEO/marketing routes must not trigger member session restore
- Admin and diagnostics routes require auth or secret headers
- Rate limiting and CSRF patterns per product—do not duplicate auth systems

## Evidence

API changes: `curl` with status code and truncated JSON in reports. Do not claim “API works” without a live request.

## Versioning

Breaking API changes require migration notes and coordinated mobile/web deploy where applicable.
