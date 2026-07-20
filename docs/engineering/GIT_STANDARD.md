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

So agents can merge without the owner clicking **Merge** on every PR:

1. Repo owner invites **`bamsignalhq`** as **Maintain** collaborator (see [AUTOMATION_STANDARD.md](./AUTOMATION_STANDARD.md)).
2. Run `./scripts/configure-github-automation.sh owner/repo` once per repo.
3. Agent uses feature branch → `gh pr create` → `gh pr merge --auto --squash`.

`bamsignalhq/bamsignal` is already configured. Other Group repos require the collaborator invite first.

## Evidence

When reporting git/deploy status, include commit SHA and branch name—not “should be deployed.”
