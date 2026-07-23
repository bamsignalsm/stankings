# 1. Enterprise Workforce Architecture

## Purpose

Transform Stankings HQ into the operational headquarters for recruitment, employment, role provisioning, and day-to-day work across the ecosystem — without redesigning the public marketing site.

## Layers

| Layer | Responsibility | Surface |
|-------|----------------|---------|
| Public careers | Vacancies + apply | `/career` |
| Hiring pipeline | Review → hire | Energy Applications |
| Provisioning | Hire + Invite → identical employee | `WorkforceProvisioner` |
| Identity | Subject + membership claims | Enterprise Identity (certified) |
| RBAC | Company → Dept → Role → Workspace → Feature → Action | `workforce_*` grants |
| Office | Worker day-to-day | `/office` |
| Energy | Founder oversight only | `/energy` |

## Hierarchy (default RBAC inheritance)

```
CEO (super_admin / Energy)
  → Company Head
    → Department Manager
      → Staff
```

Phase 1: Energy remains Founder/`super_admin` only. Company Heads and Managers supervise inside `/office` with scoped grants.

## Membership vs employment

- `stankings_members` — Library / Energy membership (existing)
- `workforce_employees` — employment record linked to same Auth user + Identity subject

One Auth user may hold both. Employment does not require Library approval, and Library access does not imply employment.

## Module families

Editorial, PR, Support, Moderation/Trust, Operations/Risk, Education/Foundation ops, Engineering — bound to roles via `workspace_key`.

## Exclusions

No second admin system. No duplicate Identity/Passport/Trust. No worker access to Energy. No live product-DB sync in v1 (HQ-owned queues; sync hooks later).
