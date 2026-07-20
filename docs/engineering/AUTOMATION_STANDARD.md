# Automation Standard — Cursor / CI merge without owner clicks

## Goal

Enable AI assistants (Cursor, logged in as **`bamsignalhq`**) to open PRs and **auto-merge** after checks pass—without the repo owner clicking **Merge** each time.

This is **Option 1**: add `bamsignalhq` as a **Maintain** collaborator on each Group repo, enable **Allow auto-merge**, and protect `main` with **0 required approving reviews**.

Direct push to `main` remains forbidden for agents unless the owner explicitly instructs it.

## Group repos

| Product | Repository | Owner action required |
|---------|------------|------------------------|
| Stankings HQ | `bamsignalsm/stankings` | Invite `bamsignalhq` → **Maintain** |
| BamSignal | `bamsignalhq/bamsignal` | Already configured |
| BayRight | `br9jaa/bayright` | Invite `bamsignalhq` → **Maintain** (as `br9jaa`) |
| Yike | `yikeltd/yike` | Invite `bamsignalhq` → **Maintain** (org admin) |

Settings links (owner only):

- https://github.com/bamsignalsm/stankings/settings/access
- https://github.com/br9jaa/bayright/settings/access
- https://github.com/yikeltd/yike/settings/access

After inviting, **accept the invitation** on the `bamsignalhq` GitHub account if prompted.

## One-time repo configuration

From the Stankings repo (after `bamsignalhq` has push access):

```bash
./scripts/configure-github-automation.sh bamsignalsm/stankings
./scripts/configure-github-automation.sh bamsignalhq/bamsignal
./scripts/configure-github-automation.sh br9jaa/bayright
./scripts/configure-github-automation.sh yikeltd/yike
```

## Agent workflow (every change)

1. Create feature branch (`fix/*`, `feat/*`, `chore/*`).
2. Push branch.
3. `gh pr create` with summary + test plan.
4. `gh pr merge --auto --squash` (or `--merge` if repo prefers merge commits).
5. Wait for CI; GitHub merges when requirements are satisfied.
6. Report commit SHA on `main` as evidence.

## Verification

```bash
gh api repos/OWNER/REPO --jq '{permissions: .permissions, allow_auto_merge, delete_branch_on_merge}'
gh api repos/OWNER/REPO/branches/main/protection --jq '.required_pull_request_reviews'
```

Expect `permissions.push: true`, `allow_auto_merge: true`, `required_approving_review_count: 0`.

## Security notes

- **Maintain** (not Admin) is enough for PRs and branch protection updates; it does not grant billing or repo deletion.
- Secrets and production deploy credentials stay in Coolify/runtime—never in git.
- Branch protection still blocks direct `main` pushes; all production changes go through PR + checks.
