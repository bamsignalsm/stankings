# Stankings Legacy Ltd — Corporate Portfolio

**Parent:** Stankings Legacy Ltd  
**Source of truth:** `src/lib/shared/company/registry.ts` (`COMPANY_REGISTRY`)  
**Last expanded:** 2026-07-22  
**Related:** [Corporate Architecture](./CORPORATE_ARCHITECTURE.md) · [Group Structure](./GROUP_STRUCTURE.md) · [Ecosystem](./ECOSYSTEM.md) · [Stankings Legacy Live](../community/STANKINGS_LEGACY_LIVE.md)

## Purpose

This document records the official subsidiary portfolio for architectural review. The TypeScript corporate registry is the single source of truth consumed by company directory pages, navigation, footer, search, ecosystem maps, institutional identity, lifecycle records, and Schedule A.

**Stankings Legacy Live is not listed here** — it is an umbrella brand for live experiences, not a subsidiary. See [CORPORATE_ARCHITECTURE.md](./CORPORATE_ARCHITECTURE.md).

## Organization structure

```
Stankings Legacy Ltd (parent / HQ)
├── BamSignal Ltd                          — Technology
├── Yike Ltd                               — Marketplace
├── BayRight Ltd                           — Financial
├── Stanhan Real Estate Ltd                — Property
├── Stankings Auto Hub Ltd                 — Automotive
├── Hannahkings Gadgets Ltd                — Technology
├── Stankings Logistics Ltd                — Logistics
├── Stankings Times Ltd                    — Media          ← NEW
├── Stankings Hotel & Suites Ltd           — Hospitality   ← NEW
├── Shodis Industries Ltd                  — Manufacturing ← NEW
├── Hannahkings Education Ltd              — Education
├── The Stankings Institute                — Education
└── Stankings Foundation                   — Foundation
```

## Business Sector taxonomy

Every subsidiary carries a `businessSector` for dashboards, filters, reports, and investor materials. Hierarchy is unchanged; sector is a classification layer only.

| Sector | Companies |
|--------|-----------|
| Technology | BamSignal, Hannahkings Gadgets |
| Marketplace | Yike |
| Financial | BayRight |
| Property | Stanhan |
| Automotive | Stankings Auto Hub |
| Logistics | Stankings Logistics |
| Media | Stankings Times |
| Hospitality | Stankings Hotel & Suites |
| Manufacturing | Shodis Industries |
| Education | Hannahkings Education, The Stankings Institute |
| Foundation | Stankings Foundation |
| Institutional | Stankings HQ |
| Community & Live Experiences | *(classification for Stankings Legacy Live — not a company)* |

## Strategic relationship summary

| Company | Provides | Supports |
|---------|----------|----------|
| Stankings Times | Media, PR, awards, brand visibility | Every subsidiary |
| Stankings Hotel & Suites | Hospitality, venues, executive accommodation | BamSignal events, Times Awards, summits |
| Shodis Industries | Factory-direct materials, manufacturing | Stanhan, Hotel & Suites |
| Yike | Marketplace infrastructure | Property & vehicle commerce |
| BayRight | Payments, billing, escrow | Ecosystem transactions |
| BamSignal | Identity, community, trust | Cross-platform reputation |
| Stankings Passport | Identity verification & auth | Every subsidiary |

## Critical lane: hospitality vs property

- **Stanhan Real Estate Ltd** — property acquisition, development, housing
- **Stankings Hotel & Suites Ltd** — hospitality operations and hospitality assets only

## Community & Leadership Initiatives (not companies)

Under **[Stankings Legacy Live](../community/STANKINGS_LEGACY_LIVE.md)** (umbrella brand owned by Stankings Legacy Ltd):

| Programme | Host | Docs |
|-----------|------|------|
| Singles Synergy | BamSignal | [SINGLES_SYNERGY.md](../community/SINGLES_SYNERGY.md) |
| The Shared Path | BamSignal | [THE_SHARED_PATH.md](../community/THE_SHARED_PATH.md) |
| Stankings Times Awards | Stankings Times Ltd | [STANKINGS_TIMES_AWARDS.md](../community/STANKINGS_TIMES_AWARDS.md) |
| Leadership Summits | The Stankings Institute | [STANKINGS_LEGACY_LIVE.md](../community/STANKINGS_LEGACY_LIVE.md) |
| Business Forums | The Stankings Institute | [STANKINGS_LEGACY_LIVE.md](../community/STANKINGS_LEGACY_LIVE.md) |
| Signature Experiences | Assigned per purpose | [SIGNATURE_EXPERIENCES.md](../community/SIGNATURE_EXPERIENCES.md) |

Ownership remains with Stankings Legacy Ltd. Hosts do not become events companies. SSOT: `LEGACY_LIVE_REGISTRY`.

## Company profile docs

- [STANKINGS_TIMES.md](../corporate/STANKINGS_TIMES.md)
- [STANKINGS_HOTEL_AND_SUITES.md](../corporate/STANKINGS_HOTEL_AND_SUITES.md)
- [SHODIS_INDUSTRIES.md](../corporate/SHODIS_INDUSTRIES.md)

## Database migration status

Deferred pending Supabase project verification tooling (`docs/engineering/PROJECT_IDENTITY.md`, `supabase/config.toml`, `npm run verify:supabase-project`). Linked project-ref in `.temp` is `dfaqkrikdvohvvcuxoek` (Stankings). No companies table exists today — portfolio is registry-driven in application code.
