# Enterprise Platform v1.0 — Release Notes

**Tag:** `enterprise-platform-v1.0-certified`  
**SDK:** `@stankings/platform-sdk` **1.5.0**  
**Project:** `dfaqkrikdvohvvcuxoek`  
**Date:** 2026-07-22  

## Summary

Stankings Enterprise Platform v1.0 is certified for ecosystem adoption. Six core runtimes are live, durable, and reachable through the Enterprise SDK.

## What's included

| Capability | Contract | Status |
|------------|----------|--------|
| Identity | `identity.subject@1.0.0` | Live |
| Discovery | `discovery.runtime@1.0.0` | Live |
| Consent | `consent.record@1.0.0` | Live |
| Passport | `passport.record@1.0.0` | Live |
| Trust | `trust.assessment@1.0.0` | Live |
| Explainability | `explainability.record@1.0.0` | Live |

Supporting: Contracts, Registries, Configuration, Notifications foundation, Observability, Certification tooling.

## Architectural flow

```text
Identity → Consent → Passport → Trust → Explainability
```

- **Trust** answers *what* the assessment is.
- **Explainability** answers *why*, without re-evaluating policies.

## Security (post-certification)

RLS enabled + forced on all 13 `shared_*` enterprise tables.  
`anon` / `authenticated` privileges revoked. Access via `service_role` server adapters only.

## Consumer guidance

Feature-gated SDK consumption for BamSignal, Yike, BayRight with graceful degradation. See consumer guides under `docs/platform/`.

## Related tags

- `enterprise-foundation-v1.0`
- `enterprise-platform-v1.1-passport`
- `enterprise-platform-v1.2-trust`
- `enterprise-platform-v1.3-explainability`
- `enterprise-platform-v1.0-certified`
