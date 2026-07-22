# Stankings Legacy Ltd — Ecosystem Architecture

**Status:** Architecture documentation  
**Last updated:** 2026-07-22  
**Related:** [Corporate Architecture](./CORPORATE_ARCHITECTURE.md) · [Group Structure](./GROUP_STRUCTURE.md) · [Legacy Live](../community/STANKINGS_LEGACY_LIVE.md)

---

## Principle

Every institution has a defined lane. Subsidiaries do not become events companies. Live experiences sit under **Stankings Legacy Live**, owned by Stankings Legacy Ltd.

## Final ecosystem shape

```
Stankings Legacy Ltd
│
├── Companies
│      ├── BamSignal · BayRight · Yike · Stanhan · …
│      ├── Times · Hotel & Suites · Shodis · …
│
├── Shared Infrastructure
│      ├── Passport · Constitution · Trust · Governance · Identity
│
└── Legacy Live (umbrella brand — not a company)
       ├── Singles Synergy          ← hosted by BamSignal
       ├── The Shared Path          ← hosted by BamSignal
       ├── Stankings Times Awards   ← hosted by Times (award institution)
       ├── Leadership Summits       ← hosted by Institute
       ├── Business Forums          ← hosted by Institute
       └── Signature Experiences    ← operator by purpose
```

## Live experiences map

```
Stankings Legacy Ltd
        owns
        ▼
Stankings Legacy Live
        │
        ├── Programme → Edition → Event → Session
        └── Awards: Institution → Edition → Ceremony (+ categories, jury, archive)
                │
                ├── venue  → Hotel & Suites
                ├── media  → Stankings Times
                ├── pay    → BayRight (future)
                ├── id     → Passport (future)
                └── market → Yike (future)
```

## Lane clarity

| Actor | Does | Does not |
|-------|------|----------|
| Stankings Legacy Ltd | Own Legacy Live and all programmes | — |
| BamSignal | Host Synergy & Shared Path | Own events; become an events company |
| Institute | Host Leadership Summits & Business Forums | Own Legacy Live |
| Stankings Times | Media + host Awards institution | Operate hospitality |
| Hotel & Suites | Venues, VIP hospitality | Real estate development |
| BayRight / Yike / Passport | Future ticketing / listings / credentials | Programme ownership |

## Signature Experiences

Operating company assigned per purpose (technology → Institute, real estate → Stanhan, finance → BayRight, community → BamSignal, etc.). See [SIGNATURE_EXPERIENCES.md](../community/SIGNATURE_EXPERIENCES.md).

## Implementation freeze (product)

- No BamSignal event UI, navigation, or ticketing
- No public programme exposure yet
- Architecture and governance only until official launch
