# Passport Recovery Policy

**Status:** ACTIVE — Phase I  
**Related:** O-1 (identity continuity)  
**Supabase:** `dfaqkrikdvohvvcuxoek`

## Principle

One person = one lifetime Stankings Passport.

When a new Auth account attempts to claim an email already bound to a Passport under a different Auth user:

1. **Do not** create a second Passport.
2. **Do not** automatically rebind Auth → Passport.
3. **Do** open a `passport_recovery_cases` record.
4. **Do** audit `passport.recovery.opened`.
5. **Do** route the requesting user to `/passport/recovery`.
6. **Do** require Founder / Super Admin verification in Energy (`/energy/passport-recovery`).

## Lifecycle

```text
Collision detected (ensurePassportForUser)
        ↓
Recovery case: pending_admin_review
        ↓
Admin verifies identity
        ↓
┌───────────────┬────────────────┐
│ Approve       │ Reject         │
│ Rebind Auth   │ Case closed    │
│ Same Passport │ No Passport    │
│ MFA required  │ change         │
└───────────────┴────────────────┘
```

## Identity continuity

- Approve moves `passport_person_links` to the requesting Auth user **without** issuing a new Passport ID.
- Workforce rows for that Passport are remapped to the new Auth user_id.
- Reject leaves the original binding untouched.

## Future self-service

Self-service recovery (email OTP, document upload) can attach evidence to the same case model and statuses without changing the Passport schema or SSOI law.

## Admin governance

Only `super_admin` may approve or reject. Every decision writes `workforce_audit_logs` with previous/new Auth binding and `passportPreserved: true`.
