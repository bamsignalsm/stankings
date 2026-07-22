# Runtime Readiness — Passport

**Capability id:** `passport`  
**Contract maturity:** approved  
**Runtime readiness:** contract_only  
**Owner:** Stankings Legacy Ltd  

## Responsibility

Portable verified identity credentials and accreditation across ecosystem products (members, guests, speakers, VIPs).

## Interfaces (contract)

| Interface | Purpose |
|-----------|---------|
| `PassportIssue` | Issue or refresh a credential for a subject |
| `PassportVerify` | Verify credential presentation |
| `PassportRevoke` | Revoke or suspend credential |
| `AccreditationGrant` | Event/guest/VIP/speaker accreditation |

## Data ownership

- Subject identity anchors owned by Shared Identity  
- Credential attestations owned by Passport service  
- Product-local profiles remain in product databases  

## Dependencies

- Shared Identity (required)  
- Consent (for cross-product sharing)  

## Integration points

BamSignal, Yike, BayRight, Legacy Live events, Hotel guest flows, Times press accreditation.

## Non-goals

Not matchmaking, not payments, not a social graph.

## Implementation note

Do not build executable services in this sprint.
