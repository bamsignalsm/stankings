# Runtime Readiness — Shared Trust

**Capability id:** `trust`  
**Contract maturity:** approved  
**Runtime readiness:** contract_only  
**Owner:** Stankings Legacy Ltd  

## Responsibility

Trust signals, verification outcomes, reputation portability, and fraud intelligence interfaces for high-value decisions.

## Interfaces (contract)

| Interface | Purpose |
|-----------|---------|
| `TrustSignalRead` | Read trust signals for a subject or asset |
| `VerificationRecord` | Record / fetch verification outcomes |
| `ReputationExport` | Portable reputation summary (consent-gated) |
| `FraudSignal` | Share fraud intelligence indicators |

## Data ownership

- Trust outcomes owned by Trust service  
- Underlying evidence may remain in verifying product (Yike, Stanhan, etc.)  
- Cross-product reputation requires Consent  

## Dependencies

Identity, Passport.

## Integration points

Yike, BayRight, BamSignal, Stanhan, Auto Hub.

## Non-goals

Not a substitute for product compliance programmes.

## Implementation note

Do not build executable Trust Graph services in this sprint.
