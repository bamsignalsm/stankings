# Stankings Legacy Ltd — Corporate Architecture

**Status:** Architecture documentation  
**Last updated:** 2026-07-22  
**Related:** [Group Structure](./GROUP_STRUCTURE.md) · [Ecosystem](./ECOSYSTEM.md) · [Corporate Portfolio](./CORPORATE_PORTFOLIO.md) · [Legacy Live](../community/STANKINGS_LEGACY_LIVE.md)

---

## Purpose

Describe how Stankings Legacy Ltd is structured: parent company, subsidiaries, umbrella brands, and community initiatives — without conflating brands with legal entities.

## Legal vs brand layers

| Layer | What it is | Example |
|-------|------------|---------|
| Parent company | Legal entity | Stankings Legacy Ltd |
| Subsidiary | Legal / operating company | BamSignal, Yike, Stankings Times Ltd |
| Umbrella brand | Brand identity only — **not** a company | **Stankings Legacy Live** |
| Programme / Series | Owned initiative under umbrella | Singles Synergy |
| Edition | Annual or named instance | Singles Synergy 2027 |
| Event / Session | Day and segment under an edition | Day 1 → Opening Ceremony |
| Award Institution | Enduring awards body | Stankings Times Awards |

## Group hierarchy (summary)

```
Stankings Legacy Ltd
├── Operating subsidiaries          → CORPORATE_PORTFOLIO.md
├── Shared infrastructure           → Passport, Trust, Constitution, Governance
└── Stankings Legacy Live           → umbrella (NOT a subsidiary)
        ├── Singles Synergy         → Editions → Events → Sessions
        ├── The Shared Path         → Editions → Events → Sessions
        ├── Stankings Times Awards  → Award Institution → Edition → Ceremony
        ├── Leadership Summits      → hosted by Institute
        ├── Business Forums         → hosted by Institute
        └── Signature Experiences   → operator assigned per purpose
```

## Community & Leadership Initiatives

SSOT: `LEGACY_LIVE_REGISTRY` (`src/lib/legacy-live/registry.ts`).

| Programme | Host | Operator | Docs |
|-----------|------|----------|------|
| Singles Synergy | BamSignal | Stankings Legacy Ltd | [SINGLES_SYNERGY.md](../community/SINGLES_SYNERGY.md) |
| The Shared Path | BamSignal | Stankings Legacy Ltd | [THE_SHARED_PATH.md](../community/THE_SHARED_PATH.md) |
| Stankings Times Awards | Stankings Times Ltd | Stankings Legacy Ltd | [STANKINGS_TIMES_AWARDS.md](../community/STANKINGS_TIMES_AWARDS.md) |
| Leadership Summits | The Stankings Institute | Stankings Legacy Ltd | Legacy Live doc |
| Business Forums | The Stankings Institute | Stankings Legacy Ltd | Legacy Live doc |
| Signature Experiences | Per experience | Per purpose | [SIGNATURE_EXPERIENCES.md](../community/SIGNATURE_EXPERIENCES.md) |

## Constitutional objective (Legacy Live)

> To educate, connect, inspire and celebrate individuals, families, professionals, entrepreneurs and communities through transformational live experiences that advance the constitutional mission and legacy of Stankings Legacy Ltd.

## Architecture rules

1. Do not register umbrella brands in `COMPANY_REGISTRY`.
2. Do not create subsidiaries for live programmes.
3. Do not integrate Legacy Live into BamSignal until official launch.
4. Prefer `LEGACY_LIVE_REGISTRY` for all programme metadata.
5. Business sector **Community & Live Experiences** classifies Legacy Live for reports — it is not a company row.

## Source of truth

| Concern | Location |
|---------|----------|
| Subsidiaries | `COMPANY_REGISTRY` |
| Legacy Live programmes | `LEGACY_LIVE_REGISTRY` |
| Community docs | `docs/community/` |
