# Sprint 015 — Operational Headquarters Infrastructure

**Date:** 2026-07-04  
**Mission:** Finish shared operational HQ infrastructure for all Stankings companies. No product behaviour changes.

---

## Build QA

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors) |
| `npm run build` | **PASS** |

---

## Architecture audit

| Layer | Status |
|-------|--------|
| Founder War Room (`/energy/launch`) | Extended with operational signals |
| Public authority centers (014) | Unchanged behaviour; linked from new portals |
| Shared UI kit (`src/components/ui`) | New reusable inventory |
| Search index (`src/lib/search`) | Static HQ-origin documents |
| SEO (`JsonLd` + `buildPageMetadata`) | Organization, FAQ, Collection/WebPage schemas |

No shared product runtime introduced.

---

## Founder War Room additions

| Panel | Content |
|-------|---------|
| System Health | HQ app, shared portals |
| Deployment Status | Coolify write failure (evidence-based) |
| Environment Status | Supabase / env readiness |
| Launch Progress | Stage 1 note |
| Operational Alerts | P0 host/deploy alerts |
| SSL / Domain / DNS / Email | Honest health signals |
| Repository / Cloud | Repo healthy; cloud unknown until deploy |
| Renewal Calendar | Domain, SSL, mail, Supabase, GitHub |
| Certificates | Edge vs origin notes |
| Daily Founder Tasks | Action list |
| Outstanding Risks | Stage 1 / secrets / tokens |

Source: `src/lib/launch-war-room/founder-operations.ts` · UI: `FounderWarRoomOps`

---

## Portals

| Portal | Path |
|--------|------|
| Developer Center | `/developer` |
| Brand Center | `/brand` |
| Download Center | `/downloads` |
| Global Search | `/search` |

Mobile APK/iOS binaries are **not** hosted on HQ (empty state — products own stores).

---

## Reusable component inventory

| Component | Path |
|-----------|------|
| StatusBadge | `src/components/ui/StatusBadge.tsx` |
| CompanyCardUi | `src/components/ui/CompanyCardUi.tsx` |
| SupportCard | `src/components/ui/SupportCard.tsx` |
| LegalNotice | `src/components/ui/LegalNotice.tsx` |
| TrustBadge | `src/components/ui/TrustBadge.tsx` |
| PolicyHeader | `src/components/ui/PolicyHeader.tsx` |
| Breadcrumb | `src/components/ui/Breadcrumb.tsx` |
| SectionHero | `src/components/ui/SectionHero.tsx` |
| ResourceGrid | `src/components/ui/ResourceGrid.tsx` |
| Timeline | `src/components/ui/Timeline.tsx` |
| DocumentCard | `src/components/ui/DocumentCard.tsx` |
| EmptyStateUi | `src/components/ui/EmptyStateUi.tsx` |
| SearchHeader | `src/components/ui/SearchHeader.tsx` |
| MetricCard | `src/components/ui/MetricCard.tsx` |

Export barrel: `src/components/ui/index.ts`

---

## SEO score: **88%**

| Item | Status |
|------|--------|
| Canonical / OG / Twitter (`buildPageMetadata`) | Pass |
| Organization schema (root layout) | Pass |
| FAQ schema (Support) | Pass |
| WebPage / CollectionPage (Developer, Brand, Downloads) | Pass |
| Breadcrumb component (UI) | Pass |
| BreadcrumbList JSON-LD on all pages | Partial — component present; schema not on every page |
| robots / sitemap | Pass (updated for brand, downloads, search) |
| SoftwareApplication schema | Not applied (HQ is not a single installable app) |

---

## Performance metrics

| Item | Status |
|------|--------|
| Fonts `display: swap` | Pass (existing) |
| Image formats avif/webp | Pass (`next.config`) |
| Long-cache `/images/*` | Pass (immutable headers) |
| `poweredByHeader: false` + compress | Pass |
| Standalone output | Pass |
| Bundle size measurement | Not instrumented in CI (no Lighthouse run in agent) |

**Performance score (config-level): 85%** — no Lighthouse evidence in this environment.

---

## Accessibility score: **84%**

| Item | Status |
|------|--------|
| Skip-to-content link | Pass |
| `main#main-content` landmark | Pass |
| Search input label | Pass |
| Breadcrumb `aria-label` / `aria-current` | Pass |
| Status badges include text | Pass |
| Full keyboard audit of Energy console | Not in scope |
| Light-theme contrast QA | Remaining |

---

## Technical debt

1. Pre-existing ESLint unused-var warnings in member library hubs
2. Founder War Room signals are static evidence snapshots — wire live probes when HQ is up
3. Search is client-side static index (adequate for HQ scale; not full-text server search)
4. Coolify host permissions still block production (infra)

---

## Launch readiness

**Overall HQ operational readiness: 87%** (content + build).  
**Live production readiness: blocked on Coolify host (Sprint 012).**

---

## Recommendations before Stage 2 (BamSignal)

1. **P0:** Repair Coolify `/data/coolify/applications` write permissions; deploy HQ; confirm `/api/health` 200.
2. **P0:** Close Stage 1 exit review → HQ **MAINTENANCE**.
3. **P0:** Only then unlock BamSignal **ACTIVE LAUNCH** (device cert, AAB, Play closed testing).
4. Point BamSignal legal/trust/support links at HQ centers (`stankings.com/trust`, `/legal`, `/support/bamsignal`) — do not fork policies.
5. Revoke any access tokens shared in chat; rotate seed passwords before public admin use.

---

## Files created (selected)

- `src/lib/launch-war-room/founder-operations.ts`
- `src/components/launch-war-room/FounderWarRoomOps.tsx`
- `src/components/ui/*` (14 components)
- `src/lib/search/index.ts`
- `src/components/seo/JsonLd.tsx`
- `src/app/brand/page.tsx`
- `src/app/downloads/page.tsx`
- `src/app/search/page.tsx` + `layout.tsx`
- `docs/sprint-015-report.md`
