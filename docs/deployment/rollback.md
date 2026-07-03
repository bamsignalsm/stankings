# Rollback

1. In Coolify, open **Stankings Group** → Deployments
2. Select the last known-good commit / deployment
3. Redeploy that revision
4. Verify:

```bash
curl -s https://stankings.com/api/health
curl -s 'https://stankings.com/api/health?ready=1'
```

## Database

Schema migrations are forward-only via Supabase CLI. Do not roll back migrations from Coolify. If a migration must be reversed, apply a new corrective migration with `supabase db push`.
