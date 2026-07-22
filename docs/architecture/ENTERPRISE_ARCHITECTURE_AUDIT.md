# Stankings Legacy — Enterprise Architecture Audit

**Status:** Master blueprint (audit only — no implementation in this sprint)  
**Repository:** `bamsignalsm/stankings`  
**Supabase ref:** `dfaqkrikdvohvvcuxoek`  
**Audit date:** 2026-07-22  
**Baseline commit (already on remote):** `fd862be` — portfolio + Legacy Live governance  

> **Workflow note:** Feature development is frozen pending review of this audit. The prior commit was created when explicitly requested; this audit does **not** add further commits. Prefer holding additional feature commits until the master roadmap is approved.

---

## 1. Executive Summary

Stankings HQ is already functioning as an **institutional operating system**: Volume 0 Canons (001–025), Volume I Constitution (Articles I–XVII), dozens of frameworks, Library/IKI surfaces, company portfolio, and Legacy Live governance are in place as TypeScript-first registries and protected Library routes.

What is **not** yet true is a complete **shared runtime platform**. Passport/identity, trust scoring, ticketing, cross-subsidiary APIs, automated tests, and Supabase project-safety tooling remain thin or documentation-ahead-of-code. Hard-coded company lists still duplicate `COMPANY_REGISTRY` in places. Volume II Governance Code is architecture-locked (Book I focus) with limited chapter content.

**Verdict:** Stop opportunistic feature builds. Consolidate registries, harden shared infrastructure readiness, then expand programmes (Institute hosting, Awards institution runtime, Hotel/Times product surfaces) in dependency order.

**Estimated overall completion (Shared Enterprise Platform):** ~58%  
**Estimated shared platform runtime readiness:** ~32%  
**Estimated documentation completeness (constitutional + corporate):** ~78%  

> **Refinement (approved):** Prefer the label **Shared Enterprise Platform Completion** over “OS completion,” so constitutional documentation and executable runtime are not weighed as equal. Documentation ahead of runtime is **planned sequencing**, not debt.

---

## 2. Enterprise Inventory

| Domain | Purpose | Maturity | Dependencies | Reuse |
|--------|---------|----------|--------------|-------|
| Constitution (Vol I) | Highest internal law | Strong (18 articles + schedules) | Canons | All institutions |
| Canon (Vol 0) | Philosophical law | Complete (001–025) | — | All frameworks |
| Governance Code (Vol II) | Operational manual | Partial (Book I architecture) | Constitution | Board/ops |
| Institutional Identity | IIS per institution | Strong (14 enrichments) | Ecosystem map, companies | Board/IIS portal |
| Trust / CTC | Digital trust centre | Partial (registers + HQ pages) | Passport (planned) | All products |
| Excellence | Department standards | Partial (10 standards) | CANON-008 | Ops audits |
| Companies | Portfolio SSOT | Strong (`COMPANY_REGISTRY`) | Corporate config | UI, search, ecosystem |
| Business sectors | Taxonomy | Strong (incl. Community & Live) | Companies | Reports |
| Legacy Live | Live experiences umbrella | Strong (governance/registry) | Companies, Hotel, Times, BamSignal | Events future |
| Foundation / Institute | Society + leadership | Partial (pages + IIS) | Constitution | Stewardship |
| Education / Logistics / Media / Hospitality / Manufacturing | Sector companies | Forming (registry + docs) | Companies | Future ops |
| Shared platforms inventory | CANON-012 registry | Strong as inventory; weak as runtime | Identity | Ecosystem |
| Passport / Identity | Cross-platform auth | Thin (claimed active; HQ auth only) | Supabase auth | All products |
| Policies / Legal / Support / Status | HQ authority surfaces | Strong | Brand, contacts | Public site |
| Library / IKI / Lexicon | Knowledge infrastructure | Strong (seed + migrations) | Auth, Supabase | Custodians |
| Launch War Room | Product portfolio ops | Partial | Products | Founder console |
| Documentation (docs/) | Engineering + corporate | Partial–strong | — | Humans/Cursor |
| Testing | Quality gate | Missing | — | CI |

---

## 3. Architecture Assessment

### Strengths

- Clear **constitutional → framework → registry → Library UI** pattern repeated successfully.
- `COMPANY_REGISTRY` and `LEGACY_LIVE_REGISTRY` establish the correct SSOT pattern.
- Ownership boundaries for Legacy Live vs BamSignal vs Hotel vs Times are clean.
- TypeScript domain modules under `src/lib/*` (~75 domain folders, ~697 TS/TSX files) map well to institutional concepts.
- Brand pipeline is governed and CI-verified.
- Member Library is auth-gated; public HQ remains institutional, not product-runtime.

### Risks

| Risk | Severity | Notes |
|------|----------|-------|
| Documentation ahead of runtime | High | Platforms marked `active` while Passport is not a real cross-product runtime |
| Registry proliferation without schema | High | 20+ registries/registers; inconsistent shapes; `register.ts` vs `registry.ts` |
| Duplicate company lists | Medium | `ECOSYSTEM_COMPANIES`, `TRUST_NETWORK_INSTITUTIONS`, Schedule A items |
| No automated tests | High | Zero product test suite; only brand verify script |
| Supabase safety tooling incomplete | High | No `config.toml`, no `PROJECT_IDENTITY.md`, no `verify:supabase-project` |
| Volume II expansion temptation | Medium | Architecture freeze exists — protect it |
| Feature accretion without dependency order | High | Exactly what this audit is meant to stop |

### Technical snapshot

- **Stack:** Next.js 15, React 19, Supabase SSR, Tailwind 4, TypeScript
- **Scripts:** `dev`, `build`, `lint`, `typecheck`, brand verify — no `test`
- **Migrations:** 59 SQL migrations (Library/Constitution seeds) — no companies table; portfolio is code-first
- **Folder clarity:** Good domain split; `shared/` emerging but incomplete consolidation

---

## 4. Constitutional Audit

| Area | Status | Notes |
|------|--------|-------|
| Canons 001–025 | Complete | Full extended metadata registry |
| Constitution Articles I–XVII | Complete (text + Library) | Convention freeze discipline in force |
| Schedules | Active | Schedule A updated for new subsidiaries |
| Frameworks | Strong (~47) | PAF/TIA/EIA/GRF and constitutional portals |
| Institutional Identity | Strong | All operating companies enriched |
| Excellence | Partial | Core companies + engineering; not every subsidiary deep |
| Constitutional Trust | Partial | Identity/consent sample registers; not production Passport |
| Lifecycle (ILR) | Strong | Includes new subsidiaries + BamBet conclusion |
| Governance Code Vol II | Partial | Book shells; Book I architecture focus; chapter writing gated |
| Consent / Explainability | Thin | Referenced in platforms; limited operational UI |
| Policies | Partial | HQ legal/trust/security strong; product policy alignment external |

**Completed:** Volume 0, Volume I surface, Canon dashboards, most Article frameworks.  
**Partial:** CTC runtime, Excellence coverage, Vol II content.  
**Missing:** Cross-product consent service, explainability SDK, enforceable policy sync with BamSignal/Yike/BayRight.

---

## 5. Registry Audit

### Inventory (primary)

| Registry | Location | Role |
|----------|----------|------|
| `COMPANY_REGISTRY` | `shared/company` | Corporate SSOT |
| `LEGACY_LIVE_REGISTRY` | `legacy-live` | Live programmes SSOT |
| `PLATFORM_REGISTRY` | `platforms` | Shared platform inventory |
| `CANON_REGISTRY` (internal) | `canon/registry` | Canon metadata |
| `COMMITMENT_REGISTRY` | `commitments` | External commitments |
| `INCIDENT_REGISTRY` | `incidents` | IIAF |
| `IMPROVEMENT_REGISTRY` | `improvements` | ASR/IIR |
| `JUDGMENT_REGISTRY` | `decision-intelligence` | IDI |
| `KNOWLEDGE_GRAPH_REGISTRY` | `knowledge-graph` | IKG |
| `KNOWLEDGE_CHALLENGE_REGISTRY` | `knowledge-challenges` | KCP |
| `INDUSTRY_LEADERSHIP_REGISTRY` | `industry-leadership` | ILD |
| `CANON_MATURITY_REGISTRY` | `canon-maturity` | CMD |
| `STEWARDSHIP_REPORT_REGISTRY` | `legacy` | Legacy dashboard |
| `BOARD_PROPOSAL_REGISTRY` | `constitutional-alignment` | CAE |
| `BRAND_REGISTRY` | `branding` | Brand tokens |
| `TRUST/LEGAL/SUPPORT/STATUS/DOWNLOAD_REGISTRY` | `shared/*` | HQ authority |
| `IDENTITY_REGISTRY` (+ CTC registers) | `constitutional-trust` | Trust centre samples |
| Asset / ILR / IEP / Ceremony / etc. | various `register.ts` | Constitutional portals |

### Findings

1. **Pattern works** — COMPANY + LEGACY_LIVE are the gold standard.
2. **No Registry SDK** — each registry invents its own shape (`id` vs `slug` vs `identifier`).
3. **Naming drift** — `registry.ts` vs `register.ts`.
4. **Duplicates** — company slug lists not always derived from `COMPANY_REGISTRY`.

### Recommendation (do not build yet — roadmap item)

Introduce a thin **Registry Convention** (not a heavy SDK first):

```
id: string
title: string
status: enum
owner?: string
updatedAt?: string
docsPath?: string
```

Migrate opportunistic lists to derive from SSOTs. A full Registry SDK is P1 after convention lands — avoid big-bang rewrite.

---

## 6. Corporate Architecture Assessment

| Check | Result |
|-------|--------|
| Parent = Stankings Legacy Ltd | Consistent |
| Subsidiaries in COMPANY_REGISTRY | Consistent (Times, Hotel & Suites, Shodis added) |
| Legacy Live not a company | Consistent |
| Hotel ≠ Stanhan | Consistent (documented boundaries) |
| BamSignal host ≠ owner for Synergy/Shared Path | Consistent |
| Times Awards as institution | Consistent |
| Signature Experiences flexible operator | Consistent |
| Business sector taxonomy | Consistent (+ Community & Live Experiences) |
| Schedule A / IIS / ILR / ecosystem map | Largely aligned; some secondary lists still manual |

**Architectural consistency: Approved.** No redesign required. Consolidation and consumption discipline are the next moves.

---

## 7. Shared Platform Readiness

| Consumer | What HQ can give today | Gap |
|----------|------------------------|-----|
| BamSignal | Trust/legal/support links, hosting role for Legacy Live docs | No Passport federation; no events product; no shared reputation API |
| Yike | Institutional trust narrative, marketplace lane clarity | No shared verification/Passport runtime from HQ |
| BayRight | Lane clarity, future ticketing role in Legacy Live | No shared billing SDK from HQ |
| Times | Company profile, media role, Awards institution architecture | No publishing CMS/awards runtime |
| Hotel & Suites | Company profile, venue role in Legacy Live | No PMS/venue booking |
| Shodis | Company profile, supply relationships | No industrial ops systems |
| Future subsidiaries | Registry + IIS + ILR pattern | Onboarding checklist not formalized |

**Reusable today:** Company registry, constitutional docs, brand, HQ auth (members), Library knowledge objects, platform *inventory*.  
**Not reusable yet as product APIs:** Passport, Trust Graph runtime, ticketing, event credentials.

---

## 8. Documentation Audit

| Area | Assessment |
|------|------------|
| Engineering standards (`docs/engineering`) | Strong set; missing `PROJECT_IDENTITY.md` |
| Corporate architecture (`docs/architecture`) | Strong after portfolio + audit |
| Community / Legacy Live | Strong |
| Corporate company profiles | Strong (3 new + portfolio) |
| Sprint / launch docs | Many historical; risk of staleness |
| Deployment docs | Present |
| Brand governance | Active / frozen visual system |

**Missing:** Master roadmap (this document), Registry Convention, Passport Interface Spec, Subsidiary Onboarding Checklist, Investor Portal architecture.  
**Duplication:** Sprint reports vs living architecture — prefer architecture docs as source of truth going forward.  
**Outdated risk:** Launch war room / execution sprint docs may predate portfolio expansion — treat as historical unless refreshed.

---

## 9. Dependency Graph

```
Volume 0 Canons ─────────────────────────────────────┐
Volume I Constitution ───────────────────────────────┤
        ↓                                            │
Registry Convention (derive from COMPANY / LEGACY)   │
        ↓                                            │
Shared Identity Contract (Passport interface)        │
        ↓                                            │
Trust / Consent / Permissions contracts              │
        ↓                                            │
Corporate SSOT consumption (kill duplicate lists)    │
        ↓                                            │
Legacy Live governance freeze (already strong)       │
        ↓              ↓              ↓              │
   Institute host   Awards institution  Hotel venue  │
   (summits)        (categories/jury)   readiness    │
        ↓              ↓              ↓              │
   Public HQ polish ←──── Times media surfaces       │
        ↓                                            │
   Investor / Partner portals                        │
        ↓                                            │
   Product integrations (BamSignal host UI, ticketing)
```

**Parallel tracks (after P0):**

- Track A: Registry consolidation + identity contract  
- Track B: Documentation consolidation (onboarding, Passport spec)  
- Track C: Vol II Book I architecture only (no chapter sprawl)  
- Track D: Brand/ops maintenance (frozen visual system)

---

## 10. Master Roadmap (phased)

### Phase 0 — Freeze & Blueprint (current)
- Accept this audit as master blueprint  
- Hold feature commits unless they reduce architectural risk  

### Phase 1 — Foundations (P0)
1. Supabase project identity + verify script  
2. Registry Convention + eliminate duplicate company lists  
3. Passport / Identity **interface** spec (contract only)  
4. Platform Registry status honesty (planned vs active)  

### Phase 2 — Corporate OS cohesion (P1)
1. Formal Subsidiary Onboarding Checklist (IIS, ILR, Schedule A, ecosystem, sector)  
2. Excellence standards for remaining subsidiaries  
3. Legacy Live edition/session/speaker/venue registries (governance data only)  
4. CTC consent/explainability stubs aligned to Article XII  

### Phase 3 — Institutional programmes (P1–P2)
1. Institute as host for Leadership Summits / Business Forums (docs + IIS only until ready)  
2. Times Awards institution data model (categories, jury — no public product yet)  
3. Hotel venue capability register  

### Phase 4 — Public & capital surfaces (P2)
1. Companies / Legacy Live public storytelling (still no BamSignal events UI)  
2. Investor Portal architecture  
3. Partner Portal alignment  

### Phase 5 — Cross-product runtime (P2–P3)
1. Passport federation with BamSignal / Yike / BayRight  
2. BayRight ticketing for Legacy Live  
3. BamSignal host surfaces for Synergy / Shared Path  
4. Automated test harness for registries + critical auth paths  

---

## 11. Priority Matrix

| Priority | Item |
|----------|------|
| **P0** | Registry Convention + kill duplicate company lists |
| **P0** | Supabase project identity verification tooling |
| **P0** | Passport/Identity interface specification |
| **P0** | Correct Platform Registry maturity labels |
| **P1** | Subsidiary onboarding checklist |
| **P1** | Legacy Live edition/speaker/venue governance registries |
| **P1** | Awards institution data architecture |
| **P1** | Minimal automated tests for registries |
| **P2** | Investor Portal architecture |
| **P2** | Institute summit hosting readiness |
| **P2** | Hotel venue capability model |
| **P3** | BamSignal event host UI |
| **P3** | BayRight ticketing |
| **P3** | Full Registry SDK (only if Convention proves insufficient) |

---

## 12. Estimated Overall Completion

| Layer | Estimate |
|-------|----------|
| Constitutional content | 85% |
| Corporate portfolio & ownership | 90% |
| Legacy Live governance | 80% |
| Library / IKI presentation | 75% |
| Shared platform runtime | 32% |
| Cross-product integration | 20% |
| Testing / delivery safety | 15% |
| **Weighted institutional OS** | **~58%** |

---

## 13. Architectural Risks (top)

1. Building Institute/Awards/Hotel product features before Passport/registry discipline  
2. Treating HQ platform inventory as shipped runtime  
3. Registry sprawl without convention  
4. Migration work without project-ref verification  
5. BamSignal “events leakage” if Synergy is built inside BamSignal first  
6. Volume II chapter writing before architecture approval  

---

## 14. Recommended Next Sprint

**Superseded by Shared Platform Foundation sprint outcomes.**  
See [ENTERPRISE_ROADMAP.md](./ENTERPRISE_ROADMAP.md) — next: **Shared Identity Runtime (contract-first)**.

---

## Approval

Enterprise Architecture Audit **APPROVED** 2026-07-22 — architectural baseline for this repository.

---

## Appendix — Counts (audit snapshot)

- Canons: 25  
- Constitution articles: 17 (+ schedules)  
- Framework modules (~): 47  
- Company registry entries: 14 (incl. HQ)  
- Legacy Live programmes: 6  
- Named `*_REGISTRY` modules: 20+  
- `register.ts` constitutional portals: 11  
- Supabase migrations: 59  
- Docs markdown files: ~65  
- Automated tests: 0  

---

*End of Enterprise Architecture Audit. Shared Platform Foundation sprint follows the approved baseline.*
