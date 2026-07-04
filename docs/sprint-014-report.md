# Sprint 014 — Central Trust Authority

**Date:** 2026-07-04  
**Mission:** Stankings HQ is the origin of trust, security, legal, support, and compliance for every Stankings product. Policies are not duplicated across products.

---

## Build QA

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors) |
| `npm run build` | **PASS** |

---

## Centers delivered

| Center | Path | Notes |
|--------|------|--------|
| Trust Center | `/trust` | 13 topics — privacy, AI, safety, verification, incidents, rights |
| Security Center | `/security` | Disclosure, vulnerability reporting, encryption, IR, `security.txt` |
| Legal Center | `/legal` | Terms, privacy, cookies, AUP, trademark, copyright, licensing, DMCA, accessibility |
| Support Center | `/support` | Product selector: General, HQ, BamSignal, Yike, BayRight, Foundation, Institute |
| Compliance Center | `/compliance` | Overview, data protection, financial, records, reporting |
| Status | `/status` | Reusable cards — **no fake uptime or incidents** |

---

## Policy consistency

- Every center states **HQ origin** of institutional policy.
- Products implement standards; they do not publish conflicting institutional policies.
- Operational independence preserved (no shared runtime/DB/auth/payments).
- Product-specific legal pages on product domains remain product-owned; HQ is the institutional source.

---

## Shared components

| Component | Role |
|-----------|------|
| `AuthorityHub` / `AuthorityArticlePage` | Shared hub + article layout |
| `StatusCard` / `StatusGrid` / `StatusBadge` | Status dashboard |
| `SupportExperience` | Product selector, FAQs, knowledge base, email directory, contact form |

---

## Global footer (every page)

Authority column includes: Support, Trust, Legal, Security, Compliance, Status, Developers, Press, Media, Contact, Careers, Constitution.

---

## Accessibility

| Item | Status |
|------|--------|
| Semantic headings on authority pages | Pass |
| FAQ `<details>` / `<summary>` | Pass |
| Support form labels | Pass |
| Status badges text (not color-only) | Pass |
| Skip-to-content | Remaining |
| Full light-theme contrast QA | Remaining |

---

## Broken links audit

| Check | Result |
|-------|--------|
| Internal authority hrefs from section registries | Consistent (`/trust/*`, `/security/*`, `/legal/*`, `/compliance/*`, `/support/*`) |
| Footer authority links | Present |
| `/privacy`, `/terms`, `/cookies` | Redirect to Legal Center articles |
| Product external domains | Documented as external (not HQ-hosted) |
| Live production link check | **Blocked** — Coolify host may still be down (infra) |

---

## Navigation audit

| Surface | Status |
|---------|--------|
| Header | About, Companies, Trust, Security, Support, Legal, Careers, Status |
| Footer Authority | Required Sprint 014 links |
| Support queues | 7 queues with dedicated routes |

---

## Shared component audit

| Requirement | Status |
|-------------|--------|
| Reusable status components | Pass |
| No fake uptime numbers | Pass (`unknown` + honest notes) |
| No fake incidents | Pass (none listed) |
| HQ-origin notices | Pass on Trust, Legal, Security, Compliance |

---

## Production readiness

**88%** for authority content and build health.

Live production still depends on Coolify host filesystem (Sprint 012). Repository is ready; deploy when host can write application config.

---

## Files created

- `src/lib/authority/types.ts`
- `src/lib/authority/trust.ts`
- `src/lib/authority/security.ts`
- `src/lib/authority/legal.ts`
- `src/lib/authority/support.ts`
- `src/lib/authority/compliance.ts`
- `src/lib/authority/status.ts`
- `src/components/authority/AuthorityHub.tsx`
- `src/components/authority/StatusCard.tsx`
- `src/components/authority/SupportExperience.tsx`
- `src/app/security/[slug]/page.tsx`
- `src/app/compliance/page.tsx`
- `src/app/compliance/[slug]/page.tsx`
- `public/.well-known/security.txt`
- `docs/sprint-014-report.md`

## Files changed

- Trust, Legal, Support, Status hubs and article routes
- `src/app/security/page.tsx` (full Security Center)
- `src/components/Footer.tsx`, `Header.tsx`
- `src/app/sitemap.ts`
- `src/lib/institutional/public-site.ts` (audit registry)
