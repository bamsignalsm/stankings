# Sprint 019 — Zero-Debt Engineering Audit

**Date:** 2026-07-04  
**Constraint:** No visual changes, no new features, no breaking changes.

---

## Build QA (post-cleanup)

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** (run after commit) |
| `npm run lint` | **PASS** (0 errors) |
| `npm run build` | **PASS** (run after commit) |

---

## Files cleaned

| Action | Path |
|--------|------|
| **Deleted** | `src/lib/institutional/trust-content.ts` (superseded by `src/lib/authority/trust.ts` + shared trust registry) |
| **Deleted** | `src/lib/institutional/legal-content.ts` (superseded by `src/lib/authority/legal.ts` + shared legal registry) |
| **Slimmed** | `src/lib/institutional/public-site.ts` — removed dead `TRUST_CENTER_SECTIONS`, `LEGAL_DOCUMENTS`, `SUPPORT_PRODUCTS`, `STATUS_SNAPSHOT`, and unused footer groups (~300 lines) |

---

## Technical debt removed

1. Duplicate trust/legal article bodies no longer imported by any route  
2. Duplicate support/status/legal section lists removed from `public-site.ts`  
3. Hardcoded institutional constants consolidated under `@/lib/shared` (Sprint 016) — audit confirmed consumers use shared contacts  

---

## Remaining intentional debt

| Item | Why kept |
|------|----------|
| Member Library governance hubs (Volume II shells, SLPS, publication engine) | Constitutional / editorial platform — not public HQ marketing; active member routes |
| ESLint unused-var warnings in library hubs | Non-blocking; cleanup risks editorial UI churn |
| No app-level CSP / rate limiting | Prefer Cloudflare WAF; add in maintenance if required |
| No Lighthouse CI | Optional for HQ scale |
| ECOSYSTEM_WAR_ROOM background panel | Historical ops context on Founder dashboard — still referenced |

---

## Architecture observations

```
Public HQ
  → pages consume @/lib/shared + @/lib/authority + @/components/ui
  → design tokens @/lib/design-system

Member Library (gated)
  → canon / constitution / frameworks / SLPS (intentional depth)

Energy console (super_admin)
  → Launch Command Center + careers/members ops
```

**Dependency direction (healthy):**

- Pages → shared registries / authority / design-system / ui  
- Authority → shared (not reverse)  
- No circular imports detected between `shared` and `authority`

---

## Shared registry / design-system consumption

| Registry | Consumed by |
|----------|-------------|
| `CONTACTS` | Footer, contact, press, careers, authority articles, security |
| `COMPANY_REGISTRY` | `data.ts`, company profiles, search |
| `SUPPORT_REGISTRY` | Support Center |
| `LEGAL_REGISTRY` / `TRUST_REGISTRY` | Legal / Trust hubs |
| `STATUS_REGISTRY` | Status page |
| `DOWNLOAD_REGISTRY` / `BRAND_*` | Downloads / Brand |
| Design tokens | Branding registry, CSS variables, UI primitives |

---

## Recommendations for Stage 2 (BamSignal)

1. Point BamSignal trust/legal/support links to `stankings.com` centers — do not fork policies.  
2. Do not add HQ features; only monitoring and policy edits.  
3. Protect `main` (PR required) — even solo.  
4. Keep backups checklist current (`docs/backups-pre-stage-2.md`).  
5. BamSignal engineering lives in the BamSignal repo only.

---

## Outcome

HQ is in the cleanest practical state for freeze. Public platform code paths are registry-driven; dead institutional content modules removed. Member Library depth remains intentional institutional debt, not launch blockers.
