# 13. Production Readiness Report

## Gates

| Gate | Criteria |
|------|----------|
| Supabase project | `dfaqkrikdvohvvcuxoek` verified |
| RLS | All workforce tables locked by company/employee/super_admin |
| Energy isolation | Non–super_admin cannot access `/energy` |
| Office gate | Only active employees enter `/office` |
| Hire/Invite parity | Same employee shape from both paths |
| Seed idempotency | Re-running catalogue seed does not duplicate posts |
| Audit | Provision, suspend, transfer, impersonate logged |
| Cross-company | No leakage in list queries |

## Deferred

- Live BamSignal/Yike/BayRight product DB sync
- Public marketing redesign
- Commit/push until Founder review GO (implementation may land in working tree first)

## Health

Surface workforce counts on Energy overview; reuse `/api/health` for DB connectivity.
