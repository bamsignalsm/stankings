# 7. Workforce Provisioning

## Law

Hire and Invite **extend** an existing Stankings Passport. They never create a second identity.

## Single provisioner

`WorkforceProvisioner.provision({ source: 'hire' | 'invite', ... })` produces identical workforce capability profiles on the same Passport.

## On Hired / Invite

1. Resolve or ensure Passport (`ensurePassportForUser`) — Auth + Identity Subject + Passport Record
2. Ensure `stankings_members` row (library capability; Energy remains super_admin only)
3. Upsert `workforce_employees` with `passport_id` + `subject_id` (capability, not identity)
4. Apply permission grants from role template
5. Create welcome checklist + notification
6. Enable SKL access (`/skl`)
7. Audit event — Passport untouched

## Invite

May create Auth credentials if the person has no login yet, then immediately issue Passport. Same Passport is used forever after.

## Terminate / Suspend

Revoke workforce grants and SKL access only. Passport and Identity Subject remain.
