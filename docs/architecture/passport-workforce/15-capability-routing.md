# Capability-Based Routing

**Status:** ACTIVE — Phase I (closes O-5)  
**Canonical code:** `src/lib/passport/capability-routing.ts`

## Priority

| Order | Capability | Destination |
|------:|------------|-------------|
| 1 | Founder / `super_admin` | `/energy` |
| 2 | Executive (`ceo`) | `/skl/executive` (placeholder) |
| 3 | Company Head | `/skl/company` (placeholder) |
| 4 | Employee / Manager | `/skl` |
| 5 | Pending Passport recovery | `/passport/recovery` |
| 6 | Applicant (active applications) | `/passport/applicant` |
| 7 | Approved public member | `/library` |
| 8 | Pending membership | `/auth/pending-approval` |

## Surfaces that must use it

- `/auth/callback`
- `/auth/continue` (password login lander)
- Middleware bounce on `/auth/login`, `/auth/register`, `/login`, `/signup`
- Energy denial redirect for non–super_admin

## Deep-link rule

`?next=` is honoured **only** inside the capability home zone.  
Applicants are never sent to `/library` because of a stale `next` parameter.
