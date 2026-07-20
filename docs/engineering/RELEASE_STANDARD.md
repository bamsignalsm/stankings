# Release Standard — Stankings Group

Defines when work is **complete** and safe to report as shipped.

## Pre-merge gate

- [ ] Correct repo, branch, remote confirmed
- [ ] Root cause documented (if fixing a bug)
- [ ] Lint / type-check / test / build run (record commands + pass/fail)
- [ ] Only intended files staged
- [ ] PR opened (if `main` is protected)
- [ ] No secrets in diff

## Post-merge / post-deploy gate

- [ ] GitHub shows target commit on `main`
- [ ] Coolify deployment **Finished** (not Failed / stuck Queued)
- [ ] App status **Running** (healthy if healthcheck enabled)
- [ ] Production URL returns expected HTTP status
- [ ] Health endpoint JSON captured (status, build SHA if exposed)
- [ ] Primary user path smoke-tested (auth, critical API—product-specific)
- [ ] No new errors in Coolify logs for 5 minutes after deploy

## Reporting template

```
Root cause: …
Commit: <sha> on <branch> → merged to main
Build: <command> → pass/fail
Deploy: Coolify <app name> deployment <id/time> → Success/Failed
Production: GET / → <code>, GET /api/health → <code> <summary>
Regressions: none | <list>
Pending: …
```

## Rollback

If post-deploy validation fails: stop feature work, rollback or redeploy last good SHA per [DEPLOYMENT_STANDARD.md](./DEPLOYMENT_STANDARD.md) and product rollback docs. Document failure before retry.

## Incomplete work

If blocked (e.g. protected branch, missing secrets, owner-only Cloudflare/GitHub action):

State **what is done**, **what is blocked**, and **exactly one action** the owner must take. Do not claim production-ready.
