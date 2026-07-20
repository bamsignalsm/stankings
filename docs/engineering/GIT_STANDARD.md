# Git Standard — Stankings Group

## Branches

| Branch | Use |
|--------|-----|
| `main` | Production; protected; deploy target for Coolify |
| `fix/*`, `feat/*`, `chore/*` | Feature and fix work |

**Never push directly to `main`** unless explicitly instructed by the project owner.

Substantial features and refactors: feature branch → validate → PR → merge after checks pass.

Small, low-risk fixes: follow each repo’s branch protection and existing workflow.

## Commits

- One logical change per commit
- Conventional style: `feat(scope): …`, `fix(scope): …`, `refactor(scope): …`
- Never commit secrets, `.env`, credentials, or generated build artifacts unless explicitly requested

## Pre-push checklist

- Correct repository and remote
- Correct branch (not accidental `main` push)
- `git status` clean for intended files only
- Build passes
- No debug logging or broken TODOs in production paths

## Pull requests

- Required for `main` on all Group repos with protection enabled
- PR body: summary + test plan + evidence (commands run, results)
- Do not merge with failing CI or unverified deploy impact

## Cursor / AI automation (Option 1)

All four Group repos are configured (2026-07-20). See [AUTOMATION_STANDARD.md](./AUTOMATION_STANDARD.md).

1. Repo owner invites **`bamsignalhq`** as **Write** collaborator (Admin on BamSignal only).
2. Owner enables auto-merge + branch protection in GitHub UI (or runs `./scripts/configure-github-automation.sh` as **Admin**).
3. Agent uses feature branch → `gh pr create` → `gh pr merge --auto --squash`.

Private repos on GitHub Free cannot enforce this — product repos that need Option 1 must be **public** (code visible; secrets stay in Coolify).

## Evidence

When reporting git/deploy status, include commit SHA and branch name—not “should be deployed.”
