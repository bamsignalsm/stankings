# Pre–Stage 2 Backup Checklist

Complete before heavy BamSignal release work.

| Asset | Owner | Verified | Notes |
|-------|-------|:--------:|-------|
| Coolify application backup / snapshot | Founder | ☐ | Include volumes if any |
| Coolify env vars export (offline secure store) | Founder | ☐ | Never commit |
| Supabase project backup / PITR enabled | Founder | ☐ | Stankings Group project |
| GitHub `bamsignalsm/stankings` | Engineering | ☐ | `main` + tag `v1.0.0` |
| DNS zone export (registrar) | Founder | ☐ | stankings.com |
| Cloudflare zone settings export | Founder | ☐ | DNS, SSL, page rules |
| Zoho Mail admin notes | Founder | ☐ | Mailbox list + aliases |

Store exports in an encrypted founder-only location — not in the repository.
