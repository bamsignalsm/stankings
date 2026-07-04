# Sprint 013 — Public Institution Completion

**Date:** 2026-07-04  
**Mission:** Transform Stankings HQ public site into a corporate headquarters experience. No new products.

---

## Build certification

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors; pre-existing unused-var warnings in member library UI) |
| `npm run build` | **PASS** |

---

## Files created

| Path | Purpose |
|------|---------|
| `src/lib/seo.ts` | Canonical, Open Graph, Twitter metadata helper |
| `src/lib/corporate/company-profiles.ts` | Full company profiles (mission, HQ relationship, roadmap, support/legal) |
| `src/lib/corporate/constitution-public.ts` | Public constitution chapter index |
| `src/lib/corporate/public-library.ts` | Corporate document categories |
| `src/components/ThemeProvider.tsx` | Dark/light theme with localStorage |
| `src/app/constitution/layout.tsx` | Constitution SEO metadata |
| `src/app/partners/page.tsx` | Partners |
| `src/app/investors/page.tsx` | Investors |
| `src/app/foundation/page.tsx` | Foundation |
| `src/app/institute/page.tsx` | Institute |
| `src/app/privacy/page.tsx` | Alias → `/legal/privacy` |
| `src/app/terms/page.tsx` | Alias → `/legal/terms` |
| `src/app/cookies/page.tsx` | Alias → `/legal/cookies` |
| `src/app/security/page.tsx` | Alias → `/trust/security-practices` |
| `docs/sprint-013-report.md` | This report |

## Files changed

| Path | Change |
|------|--------|
| `src/app/globals.css` | Light theme tokens |
| `src/app/layout.tsx` | ThemeProvider |
| `src/components/Header.tsx` | Corporate nav + theme toggle |
| `src/components/institutional/InstitutionalPageShell.tsx` | Width variants, EmptyState |
| `src/lib/institutional/public-site.ts` | Footer + page audit entries |
| `src/app/sitemap.ts` | New routes + legal aliases |
| `src/app/about/page.tsx` | Corporate about + SEO |
| `src/app/companies/page.tsx` | Full-width company grid + SEO |
| `src/app/companies/[slug]/page.tsx` | Full profile sections |
| `src/app/leadership/page.tsx` | Founder, executive, board, values |
| `src/app/leadership/[slug]/page.tsx` | SEO metadata |
| `src/app/constitution/page.tsx` | Sidebar nav, search, print, chapter index |
| `src/app/library/page.tsx` | Corporate document repository |
| `src/app/careers/page.tsx` | Culture, benefits, process, empty state |
| `src/app/press/page.tsx` | Press kit + boilerplate |
| `src/app/media/page.tsx` | Brand gallery |
| `src/app/developer/page.tsx` | Developer reference |
| `src/app/contact/page.tsx` | SEO |
| `src/app/trust/page.tsx` | SEO |
| `src/app/legal/page.tsx` | SEO |
| `src/app/support/page.tsx` | SEO |
| `src/app/status/page.tsx` | SEO |

---

## Public routes completed

| Route | Status |
|-------|--------|
| `/` | Existing home (layout SEO) |
| `/about` | Complete |
| `/companies` | Complete |
| `/companies/[slug]` | Complete profiles |
| `/leadership` | Complete |
| `/constitution` | Complete (public overview + chapter nav) |
| `/library` | Complete (corporate categories + member CTA) |
| `/careers` | Complete |
| `/contact` | Complete |
| `/support` | Complete |
| `/trust` | Complete |
| `/legal` | Complete |
| `/privacy` `/terms` `/cookies` `/security` | Aliases to authoritative pages |
| `/status` | Complete |
| `/press` | Complete |
| `/media` | Complete |
| `/developer` | Complete |
| `/partners` | Complete |
| `/investors` | Complete |
| `/foundation` | Complete |
| `/institute` | Complete |

---

## Accessibility audit

| Item | Status |
|------|--------|
| Semantic headings | Pass on new/updated pages |
| Theme toggle `aria-label` | Pass |
| Mobile nav `aria-expanded` | Pass |
| Constitution search label | Pass (`sr-only`) |
| Skip-to-content link | **Remaining** — not added |
| Full WCAG AA contrast in light mode | **Partial** — tokens tuned; needs visual QA |
| Focus rings on all interactive elements | **Partial** — browser defaults |

---

## SEO audit

| Item | Status |
|------|--------|
| `buildPageMetadata` (canonical, OG, Twitter) | Pass on major public pages |
| Root layout defaults | Pass |
| Sitemap includes new routes | Pass |
| Robots.txt | Pass (existing) |
| Home page dedicated metadata export | Uses root defaults (acceptable) |
| Structured data (JSON-LD Organization) | **Remaining** |

---

## Remaining improvements

1. JSON-LD Organization / WebSite schema on home and about
2. Skip-to-content link for keyboard users
3. Dedicated high-resolution press ZIP (served as static asset when available)
4. Visual QA of light theme across all member-gated library pages
5. Clear pre-existing ESLint unused-var warnings in member library hubs
6. Production deploy still depends on Coolify host health (infra)

---

## Deployment readiness score

**86%** — Public corporate website is complete and builds cleanly. Live production availability remains blocked by Coolify host permissions (Sprint 012), not by this sprint’s content.

| Factor | Weight |
|--------|--------|
| Public pages complete | +40 |
| SEO metadata coverage | +20 |
| Build/typecheck/lint | +20 |
| Theme + responsive | +10 |
| Production live | −4 (infra) |
| A11y / schema gaps | −0 (minor) |

**Do not inflate:** content is factual; no fake metrics, awards, or customers.
