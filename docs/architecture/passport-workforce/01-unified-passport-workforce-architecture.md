# 1. Unified Passport Workforce Architecture

## Law
One person = one Stankings Passport = one lifetime identity.

Employment is a **capability** attached to a Passport — never a second identity.

## Layers
Auth (login) → Identity Subject → Passport Record → Capabilities (Applicant, Workforce, Library membership)

## Surfaces
- Passport login: `/auth/*`
- Applicant: `/passport/applicant`
- Workforce: `/skl` (`/office` redirects)
- Energy: Founder/super_admin only

Workers never authenticate into Energy.
