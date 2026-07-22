# Ecosystem Readiness

**Consumers:** BamSignal, Yike, BayRight — via `@stankings/platform-sdk` only.

| Capability | Consumable? | Notes |
|------------|-------------|-------|
| Identity | ✅ | Apply Identity SQL after review |
| Discovery | ✅ | Registry-backed |
| Consent | ✅ | Apply Consent SQL after review |
| Passport / Trust / Explainability | ❌ | Interface only |
| Notifications | Foundation | Abstraction only — no vendor |

## Gaps before ecosystem-wide adoption

1. Apply Identity + Consent migrations under controlled ops  
2. Publish SDK package beyond path alias (optional for monorepo consumers)  
3. CI gate for `npm test` + migration verifies  
4. Passport still blocked — do not start until review  

## Graceful degradation

Use Discovery negotiation: request only production-ready capabilities; treat denials as expected for Passport/Trust.
