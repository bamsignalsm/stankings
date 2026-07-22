# Consent Migration Playbook

**Schema version:** 1  
**Project only:** `dfaqkrikdvohvvcuxoek`

## Pre-apply

```bash
npm run verify:supabase-project -- --require-linked
npm run verify:consent-migration
npm test
```

## Apply

Only after Production Foundation Review approval. Never cross-link to BamSignal/Yike/BayRight.

## Rollback

`supabase/migrations/rollback/20260722140000_shared_consent_persistence_rollback.sql`  
Drops history then records (**data loss**).

## Upgrade

Additive columns preferred. Breaking changes bump `CONSENT_SCHEMA_VERSION` + migration + consumer notes.
