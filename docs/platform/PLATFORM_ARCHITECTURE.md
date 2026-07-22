# Platform Architecture (Foundation)

**Audience:** Future enterprise teams consuming Stankings without redesign.

```text
Quality Foundation
    ↓
Registry Runtime (capability/service/runtime/version)
    ↓
Identity (8/8 — gold standard)
    ↓
Enterprise Events (catalogue, no broker)
    ↓
Contracts + SDK
    ↓
Discovery (8/8)
    ↓
Consent (foundation)
    ↓
Governance primitives
    ↓
[Passport / Trust / Explainability — not started]
```

## Runtime lifecycle

1. Define domain + lifecycle  
2. Register contract (M2B framework)  
3. Emit events from catalogue  
4. Persist via provider-agnostic store  
5. Expose validators  
6. Version + document  
7. Tests in Vitest  
8. SDK client + Discovery registration  
9. `assess*EightGates()` until `complete === true`  
10. Only then production consumer integration  

## Consumer rule

Import `@stankings/platform-sdk` only. Never fork Identity/Consent/Discovery into product repos.
