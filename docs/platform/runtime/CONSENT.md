# Runtime Readiness — Consent

**Capability id:** `consent`  
**Contract maturity:** approved  
**Runtime readiness:** contract_only  
**Owner:** Stankings Legacy Ltd  
**Constitution:** Article XII  

## Responsibility

Purpose-bound consent records, withdrawal, and auditability across platforms.

## Interfaces (contract)

| Interface | Purpose |
|-----------|---------|
| `ConsentGrant` | Record consent for a purpose |
| `ConsentWithdraw` | Withdraw consent |
| `ConsentQuery` | Check whether purpose is permitted |
| `ConsentAudit` | Audit trail for regulators / trust centre |

## Data ownership

- Consent records owned by Consent service  
- Purposes catalogued centrally; products must not invent opaque purpose strings  

## Dependencies

Identity.

## Integration points

BamSignal, Yike, BayRight, Stankings HQ (CTC).

## Non-goals

Not merely a marketing preference centre.

## Implementation note

Do not build executable consent services in this sprint.
