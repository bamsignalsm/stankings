# Email Readiness Report

**Program:** Master Launch Program · Stage 1  
**Generated:** 2026-07-03T19:16:35.674Z  
**Score:** 100% DNS · Inbound/outbound require Founder test

## DNS authentication

| Check | Status | Evidence |
|-------|--------|----------|
| MX records | PASS | 10 mx.zoho.com.; 20 mx2.zoho.com.; 50 mx3.zoho.com. |
| SPF record | PASS | "v=spf1 include:spf.efwd.registrar-servers.com include:zohomail.com ~all" |
| DMARC record | PASS | "v=DMARC1; p=reject; rua=mailto:dmarc@stankings.com" |
| DKIM (zmail) | PASS | zmail._domainkey present |
| Mailbox configured (hello@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Mailbox configured (support@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Mailbox configured (legal@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Mailbox configured (trust@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Mailbox configured (press@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Mailbox configured (security@stankings.com) | PASS | Zoho Mail — verify alias exists in Zoho admin |
| Inbound delivery test | PENDING | Founder: send test to hello@ from external address |
| Outbound delivery test | PENDING | Founder: send from hello@ to external address |

## Mailboxes to verify in Zoho

- hello@stankings.com
- support@stankings.com
- legal@stankings.com
- trust@stankings.com
- press@stankings.com
- security@stankings.com

Also configure: privacy@, careers@, accessibility@ (referenced on site)

## Founder email certification

1. Send external email → hello@stankings.com — confirm delivery
2. Reply from hello@ → external — confirm SPF/DKIM pass (check headers)
3. Repeat for support@, legal@, trust@, press@, security@
