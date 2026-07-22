# Platform Architecture Guide — Enterprise Platform v1.0

**Certified:** `enterprise-platform-v1.0-certified`  
**SDK:** 1.5.0  

## Layers

```text
Consumer apps (BamSignal, Yike, BayRight)
        ↓  @stankings/platform-sdk
Enterprise SDK façade
        ↓
Enterprise runtimes (Identity … Explainability)
        ↓
Stores (Memory / File / Supabase adapters)
        ↓
shared_* tables on dfaqkrikdvohvvcuxoek (RLS hardened)
```

## Runtime responsibilities

| Runtime | Responsibility |
|---------|----------------|
| Identity | Who the subject is (`sid_*`) |
| Consent | What processing is permitted |
| Passport | Portable verified enterprise identity record |
| Trust | Policy-driven assessment (*what*) |
| Explainability | Transparent reasoning (*why*) |
| Discovery | Capability readiness & negotiation |
| Registries | Directory of capabilities, contracts, SDK modules |
| Configuration | Defaults, toggles, feature flags |
| Notifications | Provider-agnostic delivery foundation |
| Observability | Health, structured logs, correlation |

## Non-goals (v1.0)

- Product-specific scoring / marketplace / payments logic  
- OAuth / authentication protocol implementation  
- New core runtimes beyond the certified six  

## Evolution

v1.0 is the stability baseline. Add capabilities through **backward-compatible** SDK minors and new Eight-Gate runtimes only when approved. Do not collapse Trust into Explainability or Passport into Identity.
