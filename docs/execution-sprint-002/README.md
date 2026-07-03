# Execution Sprint 002 — Launch War Room

**Status:** APPROVED  
**Owner:** Founder  
**Mission:** Ship production-ready applications within 24–72 hours.

## Launch Pipeline (not repository-first)

| Priority | Product | Target |
|----------|---------|--------|
| 1 | BamSignal | Production candidate → submit |
| 2 | BayRight | Ready except provider approvals |
| 3 | Stankings HQ | Green build, stable deploy, no features |
| 4 | Yike | Stabilize, atomic release plan only |

## Founder Command Center

**Route:** `/energy/launch` (super_admin only, read-only)

- Product cards with launch readiness %
- Health probe API: `/api/launch-war-room/probe`
- Stankings health: `/api/health` and `/api/health?ready=1`

## Daily Reports

Generated from `src/lib/launch-war-room/daily-report.ts`

## Rules

- No product merging
- No shared production secrets
- No UI standardization across products
- Engineering standardization only
- If task doesn't increase ship probability in 72h → backlog, don't execute

## Prior Audit

See [Sprint 001 Master Report](./execution-sprint-001/MASTER-REPORT.md)
