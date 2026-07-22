# Runtime Readiness — Passport

**Capability id:** `passport`  
**Contract maturity:** approved  
**Runtime readiness:** production  
**Owner:** Stankings Legacy Ltd  
**Eight-Gate:** Complete (migration apply pending review)

## Responsibility

Portable enterprise identity and verification record — aggregates verified evidence references across BamSignal, Yike, BayRight, and future platforms. Not a user profile.

## Interfaces (contract)

| Interface | Purpose |
|-----------|---------|
| `PassportIssue` | Issue (and activate) a passport for a subject |
| `PassportAttachEvidence` | Attach opaque evidence references |
| `PassportSuspend` / `PassportRevoke` / `PassportExpire` | Lifecycle controls |
| `PassportPrepareRenewal` | Draft successor for renewal |
| `PassportHistory` | Audit history |

## Data ownership

- Subject identity anchors owned by Shared Identity  
- Passport records + evidence refs owned by Passport service  
- Product-local profiles remain in product databases  

## Dependencies

- Shared Identity (required)  
- Consent (recommended for cross-product presentation)  

## Non-goals

Not matchmaking, not payments, not Trust Engine, not Explainability, not authentication.
