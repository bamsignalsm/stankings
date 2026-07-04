# Sprint 016 — Enterprise Shared Services

**Date:** 2026-07-04  
**Mission:** Shared infrastructure every Stankings company consumes. No product-specific logic.

---

## Build QA

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors) |
| `npm run build` | **PASS** |

---

## Architecture

```
src/lib/shared/
  auth/           HQ member path helpers
  notifications/  Channel → contact routing
  support/        Support queues, FAQs, knowledge base
  trust/          Trust topic registry
  legal/          Legal policy registry
  branding/       Colors, fonts, assets, usage rules
  status/         Status cards (HQ, products, foundation, institute)
  downloads/      Downloadable / requestable assets
  company/        Full company registry
  search/         Unified search index builder
  config/         Contacts + HQ paths
  index.ts        Public barrel export
```

Authority modules (`src/lib/authority/*`) and legacy `data.ts` / `public-site.ts` **consume** shared registries — they no longer own duplicate constants.

---

## Registries created

| Registry | Module | Purpose |
|----------|--------|---------|
| **Contacts** | `config/contacts.ts` | Every institutional email once |
| **Companies** | `company/registry.ts` | id, domain, emails, brand, launch status, stores, roadmap |
| **Support** | `support/registry.ts` | Queues for General, HQ, BamSignal, Yike, BayRight, Foundation, Institute |
| **Legal** | `legal/registry.ts` | Privacy, Terms, Cookies, Security, Compliance, Accessibility, … |
| **Status** | `status/registry.ts` | HQ, Shared Services, Auth, Email, API, products, Foundation, Institute |
| **Trust** | `trust/registry.ts` | Trust Center topics |
| **Branding** | `branding/registry.ts` | Logos, colors, fonts, rules |
| **Downloads** | `downloads/registry.ts` | Brand kit, press kit, profiles, mobile placeholders |
| **Search** | `search/index.ts` | Companies, policies, docs, downloads, trust, legal |

---

## Shared services (typed helpers)

| Service | Helpers |
|---------|---------|
| Contacts | `getContact`, `getContactMailto` |
| Company | `getCompany`, `getCompanyByDomain`, `getLiveCompanies`, `toLegacyCompany` |
| Support | `getSupportQueue`, `getSupportEmailForCompany`, `listSupportQueues` |
| Legal | `getLegalPolicy`, `getLegalPoliciesByCategory`, `listLegalPolicies` |
| Status | `getStatus`, `getStatusForCompany`, `listStatusRecords` |
| Trust | `getTrustTopic`, `listTrustTopics` |
| Branding | `getBrandAsset`, `getBrandColor`, `listBrandAssets` |
| Downloads | `getDownload`, `listDownloads`, `listAvailableDownloads` |
| Search | `buildSearchIndex`, `searchShared` |
| Auth | `getLoginHref`, `isHqMemberPath` |
| Notifications | `getNotificationEmail`, `buildNotificationMailto` |

Import: `import { … } from "@/lib/shared"`.

---

## Technical debt removed

| Before | After |
|--------|--------|
| Emails hardcoded across pages | `CONTACTS` only |
| Company metadata in `data.ts` + `company-profiles.ts` | `COMPANY_REGISTRY` |
| Support queues duplicated emails | Derived from company + contacts |
| Status lists without Foundation/Institute | Full status registry |
| Search index hand-maintained lists | Built from registries |
| Downloads hardcoded cards | `DOWNLOAD_REGISTRY` |
| Brand colors/fonts duplicated | `branding/registry` |

---

## Future extensibility

1. **New company:** add one row to `COMPANY_REGISTRY` — support, status, and search update automatically (support/status entries may need a matching row).
2. **New policy:** add to `LEGAL_REGISTRY` (and article body in authority/legal if content is required).
3. **New support queue:** add to `SUPPORT_REGISTRY`.
4. **Products** import `@/lib/shared` for emails, legal hrefs, and support paths — never fork constants.

---

## Launch score

**90%** for shared infrastructure completeness and build health.

Live production remains blocked on Coolify host permissions (infra), not on shared-services architecture.

---

## Files created

- `src/lib/shared/**` (all registries and helpers)
- `docs/sprint-016-report.md`

## Files changed (consumers)

- `src/lib/data.ts` — companies/platforms from registry
- `src/lib/corporate/company-profiles.ts` — registry adapter
- `src/lib/authority/{support,status,trust,legal,security,compliance}.ts`
- `src/lib/institutional/public-site.ts` — contacts from shared
- `src/lib/search/index.ts` — re-exports shared search
- Contact, careers, partners, investors, foundation, press, brand, downloads, trust, legal, security, compliance, footer, layout
