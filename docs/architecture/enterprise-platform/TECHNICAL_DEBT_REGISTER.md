# Technical Debt Register — Enterprise Platform

**Baseline:** `enterprise-platform-v1.0-certified` + RLS hardening  
**Date:** 2026-07-22  
**Owner:** Stankings Legacy Ltd  

Classification: **P0** blocker · **P1** near-term · **P2** backlog · **P3** nice-to-have

| ID | Item | Priority | Status | Notes |
|----|------|----------|--------|-------|
| TD-001 | Publish `@stankings/platform-sdk` as installable package | P1 | Open | Metadata/CHANGELOG ready; consume via git tag today |
| TD-002 | Extract `@stankings/platform-contracts` package | P1 | Open | Logical boundary exists |
| TD-003 | RLS policies for `shared_*` durable tables | P0 | **Mitigated** | RLS enable+force + revoke anon/authenticated (20260722220000) |
| TD-004 | Federation sync ledger beyond pull-model contracts | P2 | Open | |
| TD-005 | Notification transport providers (email/push vendors) | P2 | Open | Foundation abstraction only |
| TD-006 | Metrics / APM vendor integration | P2 | Open | Health + structured logs present |
| TD-007 | Expand enterprise error codes per capability | P2 | Open | |
| TD-008 | Rate limiting / abuse controls on shared adapters | P2 | Open | |
| TD-009 | Contract compatibility matrix automation in CI | P1 | Open | Unit + verify scripts exist |
| TD-010 | HQ Trust UI vs Trust Runtime dual surfaces | P3 | Open | Documented separation |
| TD-011 | Local `supabase/config.toml` optional gap | P3 | Open | |
| TD-012 | Push git tags / branch to remote for consumers | P1 | **Done** | Tags pushed including `enterprise-platform-v1.0-certified` |
| TD-013 | Subject-scoped HQ policies for shared tables (if UI needs) | P2 | Open | Deny-by-default is intentional; add only with review |

**Rule:** Do not invent new core runtimes to clear debt. Prefer package extraction, monitoring, and consumer adoption.
