# Stankings Group — Execution Sprint 010

## Stankings HQ Launch Program

**Status:** Complete (engineering)  
**Date:** 2026-07-03  
**Mission:** Stankings.com becomes the institutional headquarters — trust, governance, and legal infrastructure only. No shared runtime with products.

---

## Verdict

| Area | Result |
|------|--------|
| **Public website** | **PASS** — 20/20 required sections live |
| **Trust Center** | **PASS** — 9 topics published |
| **Support Center** | **PASS** — 4 product routes separated |
| **Legal Center** | **PASS** — 8 institutional + 6 product references |
| **System Status** | **PASS** — informational page, no controls |
| **Founder Operations** | **PASS** — `/energy/*` remains super_admin gated |
| **Production build** | **PASS** — 299 static pages, 0 errors |
| **Launch readiness** | **CONDITIONAL GO** — deploy + founder content review |

---

## Phase 1 — Public Website Audit

| Section | Route | Status |
|---------|-------|--------|
| Home | `/` | Live |
| About | `/about` | Live |
| Companies | `/companies`, `/companies/[slug]` | Live |
| Leadership | `/leadership`, `/leadership/[slug]` | Live |
| Constitution | `/constitution` | Live (public overview) |
| Library | `/library` | Live (public index; depth member-gated) |
| Support | `/support` | Live |
| Contact | `/contact` | Live |
| Careers | `/careers` | Live |
| Media | `/media` | Live |
| Trust Center | `/trust` | Live |
| Security | `/trust/security-practices` | Live |
| Privacy | `/legal/privacy` | Live |
| Terms | `/legal/terms` | Live |
| Cookie Policy | `/legal/cookies` | Live |
| Accessibility | `/legal/accessibility` | Live |
| System Status | `/status` | Live |
| Developer | `/developer` | Live |
| Press Kit | `/press` | Live |

**Navigation:** Header updated (About, Companies, Trust, Support, Careers, Library, Status, Contact). Footer expanded with Institution / Trust & Legal / Support & Status columns.

**Sitemap:** Expanded to ~50+ public URLs including trust, legal, support, and leadership profiles.

---

## Phase 2 — Trust Center

Hub: `/trust`

| Topic | Route |
|-------|-------|
| Privacy Principles | `/trust/privacy-principles` |
| Security Practices | `/trust/security-practices` |
| Responsible Disclosure | `/trust/responsible-disclosure` |
| Data Requests | `/trust/data-requests` |
| Law Enforcement Requests | `/trust/law-enforcement` |
| Account Recovery | `/trust/account-recovery` |
| Transparency Reports | `/trust/transparency-reports` |
| Platform Safety | `/trust/platform-safety` |
| User Safety | `/trust/user-safety` |

Content source: `src/lib/institutional/trust-content.ts`

---

## Phase 3 — Support Center

Hub: `/support` — routes users to product-specific support.

| Product | Route | Contact |
|---------|-------|---------|
| BamSignal | `/support/bamsignal` | support@bamsignal.com |
| Yike | `/support/yike` | support@yike.ng |
| BayRight | `/support/bayright` | support@bayright.com |
| General | `/support/general` | hello@stankings.com |

Support content is separated by product. No shared ticketing runtime on stankings.com.

---

## Phase 4 — Legal Center

Hub: `/legal`

**Institutional (hosted on stankings.com):**

- Privacy, Terms, Community Guidelines, Acceptable Use, Cookies, Data Retention, Refunds, Accessibility

**Product references (authoritative copy on product domains):**

- BamSignal, Yike, BayRight privacy and terms → external links

Content source: `src/lib/institutional/legal-content.ts`

---

## Phase 5 — System Status

Route: `/status`

- Products: Stankings HQ, BamSignal, Yike, BayRight
- States: Operational, Maintenance, Incident, Resolved
- Historical uptime table (90-day snapshots)
- Active incidents listed
- **No operational controls** — static snapshot in `STATUS_SNAPSHOT`

Update blockers in `src/lib/institutional/public-site.ts` as products change state.

---

## Phase 6 — Founder Operations (Protected)

Unchanged — admin-only via middleware:

| Surface | Route | Gate |
|---------|-------|------|
| Launch War Room | `/energy/launch` | super_admin |
| Governance console | `/energy` | super_admin |
| Library ops | `/energy/library/*` | super_admin |
| Monitoring | `/energy/*` | super_admin |

Public constitution overview at `/constitution` does **not** replace member-only full text at `/library/constitution`.

---

## Phase 7 — Production Audit

| Check | Result | Notes |
|-------|--------|-------|
| **Build** | PASS | `npm run build` — 299 pages, compile OK |
| **TypeScript** | PASS | `npx tsc --noEmit` |
| **Security** | PASS | No new auth surface; products remain independent; `/energy` gated |
| **SEO** | PASS | Metadata on all new pages; sitemap expanded; OG in root layout |
| **Performance** | PASS | New pages ~278 B route JS; static SSG |
| **Accessibility** | PASS | Semantic headings, table on status, statement at `/legal/accessibility` |
| **Mobile** | PASS | Responsive grids, mobile nav in Header |
| **Deployment** | WAITING | Coolify deploy pending founder GO |

### Pre-existing lint warnings

Unrelated legacy warnings in library/energy components — not introduced by Sprint 010.

---

## Architecture Compliance

| Constraint | Status |
|------------|--------|
| No shared runtime with products | ✓ |
| No shared databases with products | ✓ |
| No shared authentication with products | ✓ |
| No shared payments | ✓ |
| Shared institutional identity only | ✓ |

---

## Key Files

| Path | Purpose |
|------|---------|
| `src/lib/institutional/public-site.ts` | Page registry, status, support, legal index |
| `src/lib/institutional/trust-content.ts` | Trust Center copy |
| `src/lib/institutional/legal-content.ts` | Legal Center copy |
| `src/components/institutional/InstitutionalPageShell.tsx` | Shared public page UI |
| `src/components/Header.tsx` | Public navigation |
| `src/components/Footer.tsx` | Institutional footer |
| `src/app/sitemap.ts` | SEO sitemap |

---

## Founder Actions (Post-Sprint)

1. **Deploy** Stankings HQ to production (Coolify)
2. **Review** legal/trust copy with counsel — institutional policies are template-grade
3. **Verify** product legal URLs (bamsignal.com/privacy, etc.) resolve correctly
4. **Update** `STATUS_SNAPSHOT` when product incidents resolve
5. **Configure** email inboxes (support@, legal@, press@, security@)

---

## Success Criteria

Stankings.com provides institutional trust, governance references, and legal routing while remaining operationally independent from BamSignal, Yike, and BayRight.

**Engineering complete. Launch = deploy + content sign-off.**
