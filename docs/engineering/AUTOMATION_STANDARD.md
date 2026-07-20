# Automation Standard — Cursor / CI merge without owner clicks

## Goal

Enable AI assistants (Cursor, logged in as **`bamsignalhq`**) to open PRs and **auto-merge** after checks pass—without the repo owner clicking **Merge** each time.

This is **Option 1**: invite `bamsignalhq` as a collaborator with **Write** (or Admin on BamSignal), enable **Allow auto-merge**, protect `main` with **0 required approving reviews**, and delete head branches on merge.

Direct push to `main` remains forbidden for agents unless the owner explicitly instructs it.

## Group repos — status (2026-07-20)

| Product | Repository | Visibility | Auto-merge | Branch protection | Agent merge |
|---------|------------|------------|------------|-------------------|-------------|
| BamSignal | `bamsignalhq/bamsignal` | Public | ✅ | ✅ (0 reviews) | ✅ |
| Stankings | `bamsignalsm/stankings` | Public | ✅ | ✅ (0 reviews) | ✅ |
| BayRight | `br9jaa/bayright` | Public | ✅ | ✅ (0 reviews) | ✅ |
| Yike | `yikeltd/yike` | Public | ✅ | ✅ (0 reviews) | ✅ |

## Personal repos vs org repos

On **personal** GitHub accounts (`br9jaa`, etc.), the invite UI often shows only **Read / Write / Admin** — not **Maintain**. **Write is enough** for daily agent work (branch, PR, merge). Repo **settings** changes (auto-merge toggle, branch protection) must be done by the **repo owner** in the GitHub UI, or by an account with **Admin** via API.

## GitHub Free + private repos

On GitHub **Free**, **private** personal repos do **not** enforce classic branch protection or allow auto-merge. BayRight was private until 2026-07-20; making it **public** unlocked Option 1 (same as Stankings and Yike). Code is visible on GitHub — secrets stay in Coolify/runtime only.

## One-time configuration (owner UI)

For each repo, as owner (or Admin):

1. **Settings → General → Pull Requests:** enable **Allow auto-merge** and **Automatically delete head branches**.
2. **Settings → Branches → Add classic rule for `main`:** check **Require a pull request before merging**; leave **Require approvals** unchecked (0 reviews).
3. **Settings → Collaborators:** invite **`bamsignalhq`** → **Write** (or Admin if you prefer).

Settings links:

- https://github.com/bamsignalsm/stankings/settings/access
- https://github.com/br9jaa/bayright/settings/access
- https://github.com/yikeltd/yike/settings/access

After inviting, **accept the invitation** on the `bamsignalhq` GitHub account if prompted.

## Optional: API script (Admin only)

`./scripts/configure-github-automation.sh owner/repo` applies the same settings via `gh` API. Requires the logged-in `gh` user to have **Admin** on the target repo. **Write collaborators get HTTP 404** — use the UI steps above instead.

```bash
./scripts/configure-github-automation.sh bamsignalhq/bamsignal   # bamsignalhq is admin
# Other repos: run as repo owner (br9jaa, bamsignalsm org admin, yikeltd org admin)
```

## Agent workflow (every change)

1. Create feature branch (`fix/*`, `feat/*`, `chore/*`).
2. Push branch.
3. `gh pr create` with summary + test plan.
4. `gh pr merge --auto --squash` (or `--merge` if repo prefers merge commits).
5. Wait for CI; GitHub merges when requirements are satisfied.
6. Report commit SHA on `main` as evidence.

## Verification

**Repo settings** (any collaborator can read):

```bash
gh api repos/OWNER/REPO --jq '{private, visibility, allow_auto_merge, delete_branch_on_merge}'
```

Expect `allow_auto_merge: true`, `delete_branch_on_merge: true`, `visibility: "public"` (for Free-tier enforcement).

**Branch protection API** (Admin only — Write returns 404 even when rules are enforced):

```bash
gh api repos/OWNER/REPO/branches/main/protection \
  --jq '.required_pull_request_reviews.required_approving_review_count'
```

Expect `0` when run as owner/admin. If 404 as `bamsignalhq`, confirm with a test PR merge instead.

**End-to-end proof:**

```bash
# trivial branch → gh pr create → gh pr merge --auto --squash
gh pr view N --repo OWNER/REPO --json state,mergedBy,mergedAt
```

## Security notes

- **Write** does not grant billing, repo deletion, or collaborator management; it is sufficient for PR workflow.
- Secrets and production deploy credentials stay in Coolify/runtime — never in git.
- Branch protection blocks direct `main` pushes; production changes go through PR + checks.

<!-- automation verified 2026-07-20 — all four Group repos -->
