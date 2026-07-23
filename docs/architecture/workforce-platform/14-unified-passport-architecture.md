# 14. Unified Stankings Passport Architecture

**Status:** ACTIVE — single source of identity law  
**Principle:** One person = one Passport = one lifetime identity.

## Law

The Stankings Passport is the **one and only** identity system across the Stankings ecosystem. There must never be multiple identity systems for different categories of people.

Identity is permanent. Roles are temporary. Permissions evolve. The Passport never changes as a person moves from visitor → applicant → employee → manager → executive.

## Product ↔ Platform mapping

| Product language | Platform layer | Persistence |
|------------------|----------------|-------------|
| Stankings Passport | Auth user + Identity Subject + Passport Record | Lifetime |
| Workforce access | `workforce_employees` capability | Temporary |
| Applicant status | Applications + applicant dashboard | Temporary |
| Library membership | `stankings_members` | Separate capability |

Employment does **not** create a new identity. Hire/Invite only extend an existing Passport with workforce capabilities.

Emergency controls may suspend employment and revoke SKL access. They must **never** destroy or revoke the Passport or Identity Subject for HR reasons.

## Surfaces

| Capability | Path |
|------------|------|
| Workforce portal | `/skl` (canonical); `/office` redirects here |
| Applicant dashboard | `/passport/applicant` |
| Energy (CEO only) | `/energy` |
| Passport login | `/auth/login` |

## Flow

Careers apply → Passport issued if missing → Application linked to passport_id → Applicant Dashboard → Hire → Workforce capability on **same** Passport → `/skl` access.

See also: `07-workforce-provisioning.md`, `12-employee-experience.md`, `13-production-readiness.md`.
