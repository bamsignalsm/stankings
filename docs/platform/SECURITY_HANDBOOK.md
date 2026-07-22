# Enterprise Platform — Security Handbook

**Project:** `dfaqkrikdvohvvcuxoek` only  
**Baseline:** Platform v1.0 certified + RLS hardening  

## Trust boundaries

1. Consumer apps **never** hold Stankings `service_role` keys.  
2. Consumer apps integrate via SDK + Discovery + feature gates.  
3. Durable enterprise data lives in `shared_*` tables on Stankings Supabase.  
4. Adapters run server-side with injected clients.

## Shared table access model

| Role | Access |
|------|--------|
| `service_role` | Full access (bypasses RLS) — Stankings server only |
| `anon` | **Revoked** + RLS deny |
| `authenticated` | **Revoked** + RLS deny |
| `PUBLIC` | **Revoked** |

RLS is **enabled and forced** on all 13 enterprise `shared_*` tables (migration `20260722220000_shared_enterprise_rls.sql`).

## Policy inventory

No permissive SELECT/INSERT policies for Data API roles. Absence of policies + RLS = deny for `anon`/`authenticated`. This is intentional least privilege for platform-owned tables.

Future subject-scoped policies (if ever needed for HQ UI) must be introduced via reviewed migration and must not grant cross-tenant access.

## Secrets

- Never commit `.env` / service keys.  
- Never expose `service_role` as `NEXT_PUBLIC_*`.  
- Prefer publishable keys only in browsers.

## Migration safety

Always run:

```bash
npm run verify:supabase-project -- --require-linked
```

Refuse migrations if linked ref ≠ `dfaqkrikdvohvvcuxoek`.

## Verify

```bash
npm run verify:enterprise-rls
```
