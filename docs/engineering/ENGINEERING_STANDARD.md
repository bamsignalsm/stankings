# Engineering Standard — Stankings Group

Permanent engineering protocol for **Stankings**, **BamSignal**, **BayRight**, and **Yike**.

These are independent production systems on shared infrastructure (Coolify on Hetzner, Cloudflare, GitHub).

---

## Primary objective

Every change must be:

- Correct
- Tested
- Isolated
- Reversible
- Production-ready

Optimize for **correctness over speed**. Never trade reliability for convenience.

---

## Project isolation (mandatory)

Before **any** task:

1. Identify the target project.
2. Confirm the repository.
3. Confirm the current branch.
4. Confirm the remote origin.
5. Confirm the deployment target.
6. Confirm the production domain.

Never assume. Never work in the wrong repository. Never mix changes across repos.

**One task. One repository. One deployment.**

---

## Evidence before claims

Never state that something is **fixed**, **working**, **deployed**, **healthy**, **secure**, **production-ready**, or **completed** unless objective evidence has been collected.

Whenever possible, include:

- Command executed
- Relevant output
- HTTP status
- Build result
- Deployment ID / Coolify deployment UUID
- Commit SHA
- Health endpoint response
- Screenshots (if UI)

If evidence cannot be obtained, explicitly state:

> Implementation completed but verification is pending.

**Do not guess.**

---

## Root cause engineering

Do not patch symptoms.

Investigate until the root cause is identified.

When fixing an issue:

1. Identify the root cause.
2. Explain why it occurred.
3. Implement the smallest correct fix.
4. Verify the issue cannot recur.
5. Document any preventive improvements.

Avoid stacking workarounds on top of previous workarounds.

---

## Stankings architecture preservation

The ecosystem follows shared engineering principles.

Before introducing any new technology, package, framework, library, service, or architectural pattern, ask:

- Does another Stankings project already solve this?
- Can an existing shared component be reused?
- Will this increase long-term maintenance?
- Will this create configuration drift?

**Default to standardization.** Avoid unnecessary diversity across projects.

When a reusable solution is discovered, recommend promoting it into a shared standard (update the docs in `docs/engineering/`).

---

## Before writing code

Inspect existing architecture, conventions, business rules, dependencies, and security implications.

Prefer extending existing architecture over rewriting. Avoid duplicate logic.

---

## Implementation standards

Production-grade code: readable, maintainable, modular, strongly typed, consistent with project architecture.

Avoid hacks, quick fixes, duplicated code, unnecessary abstractions, and breaking public APIs without approval.

---

## Self review

Before considering work complete, review for bugs, edge cases, regressions, race conditions, security, performance, accessibility, responsiveness, and UX consistency.

---

## Mandatory validation

Before every commit, run every project validation available (lint, type-check, tests, build, project-specific scripts).

If any step fails: **STOP**, investigate, fix, repeat. Never commit failing code.

---

## Commit discipline

One logical change per commit. Meaningful messages (`feat`, `fix`, `refactor` scopes). Avoid `update`, `misc`, `fix stuff`.

---

## Git and deploy

See [GIT_STANDARD.md](./GIT_STANDARD.md) and [DEPLOYMENT_STANDARD.md](./DEPLOYMENT_STANDARD.md).

Never push directly to `main` unless explicitly instructed. Use feature branches for substantial work; merge only after checks pass.

---

## Change safety

Do not modify infrastructure (DNS, Cloudflare, Coolify, Traefik, GitHub Apps, pipelines) while implementing product features unless the task explicitly requires infrastructure work.

---

## Rollback principle

Ensure rollback is possible before significant changes. On deploy failure, restore last known healthy state, document failure, retry only after root cause is understood.

---

## Final completion check

A task is **not** complete until all are true (with evidence):

- Implementation complete
- Self-review complete
- Lint / type-check / tests / build pass (as applicable)
- Commit created
- Push successful (correct branch)
- GitHub webhook verified (if deploying)
- Coolify deployment successful
- Production reachable
- Health endpoint healthy (or degraded reason documented)
- No regressions observed

See [RELEASE_STANDARD.md](./RELEASE_STANDARD.md).

---

## Mission

Infrastructure is production-ready. Protect stability. Ship high-quality software. Focus on exceptional products—not unnecessary infrastructure churn.
