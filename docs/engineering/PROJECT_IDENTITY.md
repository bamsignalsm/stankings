# Project Identity — Stankings

**Status:** ACTIVE  
**Repository:** `bamsignalsm/stankings`  
**Role:** Constitutional HQ and Shared Platform foundation for the Stankings Legacy ecosystem  

---

## Identity

| Field | Value |
|-------|-------|
| Legal parent | Stankings Legacy Ltd |
| Product / site | Stankings HQ (`stankings.com`) |
| GitHub | `bamsignalsm/stankings` |
| Supabase project ref | `dfaqkrikdvohvvcuxoek` |
| Supabase project name | Stankings Group's Project |
| Organization slug | `attamclaruyisozpiysc` |
| Primary branch | `main` |
| Ecosystem role | Shared Platform + Constitutional OS |

---

## Ecosystem project refs (never cross-link)

| Application | Repository | Supabase ref |
|-------------|------------|--------------|
| BamSignal | bamsignalhq/bamsignal | `nswiwxmavuqpuzlsascs` |
| Yike | yikeltd/yike | `hlpojfurfldvcxfxhveg` |
| BayRight | br9jaa/bayright | `rnltzcfndsodelfdbaoh` |
| **Stankings** | **bamsignalsm/stankings** | **`dfaqkrikdvohvvcuxoek`** |

---

## Verification

Run from repository root:

```bash
npm run verify:supabase-project -- --require-linked
```

The script checks:

1. This file’s expected Supabase ref  
2. `supabase/.temp/project-ref` (after `supabase link`)  
3. Optional: `supabase/config.toml` `project_id` when present  

**If verification fails:** do not generate or push migrations. Link this repository only:

```bash
supabase link --project-ref dfaqkrikdvohvvcuxoek
```

---

## Platform metadata (for downstream discovery)

| Key | Value |
|-----|-------|
| `platform.owner` | Stankings Legacy Ltd |
| `platform.contract` | Shared Platform Contract v0.1.0 |
| `platform.registry_convention` | Registry Convention (ACTIVE) |
| `platform.baseline` | Enterprise Architecture Audit 2026-07-22 |

Downstream repos should treat this repository as the source of:

- Company portfolio facts (`COMPANY_REGISTRY`)  
- Legacy Live programme facts (`LEGACY_LIVE_REGISTRY`)  
- Shared capability contracts (`SHARED_CAPABILITY_CONTRACTS`)  
- Constitutional / trust documentation  

---

## Environment verification approach

| Check | Method |
|-------|--------|
| Node | `>=22` (package engines) |
| Typecheck | `npm run typecheck` |
| Brand | `npm run verify:brand` |
| Supabase link | `npm run verify:supabase-project` |
| Lint | `npm run lint` |

Status reporting for shared capabilities: use contract `runtimeReadiness`, not marketing language.

---

## Related

- [Shared Platform Contract](../platform/SHARED_PLATFORM_CONTRACT.md)  
- [Registry Convention](./REGISTRY_CONVENTION.md)  
- [Database Standard](./DATABASE_STANDARD.md)  
- Cursor rule: `.cursor/rules/supabase-migration-safety.mdc`
