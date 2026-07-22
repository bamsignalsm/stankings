# Technical Debt Register — Enterprise Platform

**Baseline:** `enterprise-platform-v1.3-explainability`  
**Date:** 2026-07-22  
**Owner:** Stankings Legacy Ltd  

Classification: **P0** blocker · **P1** near-term · **P2** backlog · **P3** nice-to-have

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| TD-001 | Publish `@stankings/platform-sdk` as installable package | P1 | Consumers currently path/workspace-coupled |
| TD-002 | Extract `@stankings/platform-contracts` package | P1 | Logical boundary exists; physical package pending |
| TD-003 | RLS policies for `shared_*` durable tables | P0 | Tables live; review/apply least-privilege policies before broad Data API use |
| TD-004 | Federation sync ledger beyond pull-model contracts | P2 | Identity federation descriptors executable incomplete |
| TD-005 | Notification transport providers (email/push vendors) | P2 | Foundation abstraction only |
| TD-006 | Metrics / APM vendor integration | P2 | Health + structured logs present |
| TD-007 | Expand enterprise error codes per capability | P2 | Taxonomy exists; not every failure path mapped |
| TD-008 | Rate limiting / abuse controls on shared adapters | P2 | Server callers responsible today |
| TD-009 | Contract compatibility matrix automation in CI | P1 | Manual + unit tests; add CI job for certification |
| TD-010 | HQ Trust UI vs Trust Runtime dual surfaces | P3 | Documented separation; keep clear |
| TD-011 | Local `supabase/config.toml` optional gap | P3 | verify script allows missing config |
| TD-012 | Push git tags / branch to remote for consumers | P1 | Tags exist locally; remote publish is ops |

**Rule:** Do not invent new core runtimes to clear debt. Prefer package extraction, security hardening, and consumer adoption.
