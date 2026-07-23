# 5. Organization Registry Architecture

```
Stankings Group (Enterprise)
  └── Company
        └── Department
              └── Team
                    └── Role
                          └── Employee (Passport capability)
                                └── Workspace
```

Authoritative for RBAC, careers, routing, org charts, reporting lines, future payroll/leave/performance/assets.

Code: `src/lib/organization/`
