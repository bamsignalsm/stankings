# Ecosystem Adoption Report

**Baseline:** `enterprise-platform-v1.0-certified` / SDK **1.5.0**  
**Date:** 2026-07-22  

## Downstream consumers

| Consumer | Integration path | Feature gates | Degradation |
|----------|------------------|---------------|-------------|
| BamSignal | SDK identity → passport → trust → explainability | `runtime.passport`, `runtime.trust`, `runtime.explainability` | Passport unknown / outcome without rationale |
| Yike | Same | Same | Marketplace UX without local trust scores |
| BayRight | Same | Same | Never block payments on Trust/Explainability |

## Consistency checks

| Requirement | Status |
|-------------|--------|
| Consume via SDK only | Documented |
| Discovery negotiation before production calls | Documented + tested |
| Feature-gated consumption | Guides for Passport, Trust, Explainability |
| Graceful degradation | `isConsumerCapabilityReady` helper |
| No product forks of Passport/Trust/Identity | Forbidden in consumer readiness |

## Next engineering actions (outside Stankings repo)

1. Open BamSignal / Yike / BayRight PRs pinning `enterprise-platform-v1.0-certified`.  
2. Enable product flags gradually (Passport read → Trust assess → Explainability).  
3. Keep Stankings as sole owner of `shared_*` persistence.

## Stankings-side readiness

**Ready.** Documentation, certification, RLS, and SDK surfaces are in place for adoption.
