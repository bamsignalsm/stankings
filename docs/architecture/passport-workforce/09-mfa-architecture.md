# 9. MFA Architecture

Mandatory MFA (TOTP, Google Authenticator–compatible) for: Founder, super_admin, Energy users, Company Heads, HR, Finance, Legal, Security, Enterprise Ops.

Provider-agnostic: TOTP secret + recovery codes; future FIDO2/passkeys.

Phase I: `mfa_required` flag on `passport_person_links` + enrollment hooks. Full TOTP UI in Phase I.1.
