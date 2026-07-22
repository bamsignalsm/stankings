# Registry Convention

**Status:** ACTIVE (convention) — SDK deferred  
**Baseline:** Enterprise Architecture Audit (approved 2026-07-22)  
**Module:** `src/lib/shared/registry/convention.ts`

---

## Purpose

Standardize how Stankings registries are named, documented, owned, and consumed — **without** introducing a Registry SDK yet.

Order of maturity:

```
Registry Convention
        ↓
Registry Compliance
        ↓
Registry Validation
        ↓
Registry SDK (only if duplication justifies it)
```

Gold standards today: `COMPANY_REGISTRY`, `LEGACY_LIVE_REGISTRY`.

---

## Naming

| Rule | Example |
|------|---------|
| Preferred file | `registry.ts` |
| Accepted alias | `register.ts` (constitutional portals already using this) |
| Primary export | `SCREAMING_SNAKE` ending in `_REGISTRY` |
| Manifest export | `REGISTRY_MANIFEST` (or `<DOMAIN>_REGISTRY_MANIFEST`) |
| Registry id | kebab-case, stable (`company-registry`) |

---

## File structure

```
src/lib/<domain>/
  registry.ts          # entries + REGISTRY_MANIFEST
  types.ts             # optional domain types
  index.ts             # public barrel
```

Documentation lives under `docs/` and is referenced by `docsPath` on the manifest.

---

## Manifest (required metadata)

Every registry should export a `RegistryManifest`:

| Field | Meaning |
|-------|---------|
| `registryId` | Stable machine id |
| `name` | Human title |
| `owner` | Owning institution / programme |
| `status` | active \| forming \| planned \| deprecated \| archived |
| `version` | Semver of this registry’s schema |
| `docsPath` | Repo-relative docs |
| `entryKind` | What one row represents |
| `audience` | hq / library / ecosystem / internal / public |
| `governanceRefs` | Canons, articles, decisions |
| `consumers` | Downstream platforms (BamSignal, Yike, …) |
| `isSingleSourceOfTruth` | Whether this is the domain SSOT |

Entry **shapes remain domain-specific**. The convention does not force a single entry interface.

---

## Entry field guidance (new registries)

Prefer documenting a primary key and including:

- id / slug / identifier (one primary)
- name or title
- status
- owner / HQ relationship when applicable
- docsPath or href when user-facing

---

## Lifecycle

1. **Propose** — new domain needs a registry  
2. **Manifest** — add `RegistryManifest`  
3. **Populate** — domain entries  
4. **Consume** — UI/APIs import from the registry only  
5. **Deprecate** — set status; do not delete history without ILR/archive discipline  

---

## Validation (lightweight)

- TypeScript compile must pass  
- `assertRegistryManifest()` may be used in scripts  
- Future: `npm run verify:registries` (not in this sprint)  

Do **not** block product work on a heavy validation framework yet.

---

## Consumption by downstream platforms

Downstream repos (BamSignal, Yike, BayRight, Times, Hotel, Shodis) should:

1. Treat Stankings registries as **authoritative for institutional facts** (companies, Legacy Live programmes, platform inventory).  
2. **Not** fork company lists or programme ownership locally.  
3. Consume via published contracts / packages when runtime exists; until then, align docs and IDs to Stankings SSOTs.

---

## Explicit non-goals

- No Registry SDK in this sprint  
- No forced migration of every historical `register.ts` in one PR  
- No change to approved responsibilities of COMPANY or LEGACY_LIVE registries  

---

## Adopted registries (this sprint)

| Registry | Manifest |
|----------|----------|
| `COMPANY_REGISTRY` | `COMPANY_REGISTRY_MANIFEST` |
| `LEGACY_LIVE_REGISTRY` | `LEGACY_LIVE_REGISTRY_MANIFEST` |
| `PLATFORM_REGISTRY` | `PLATFORM_REGISTRY_MANIFEST` |

Additional registries adopt the manifest opportunistically during touch-ups.
