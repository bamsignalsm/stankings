#!/usr/bin/env bash
# Configure GitHub Option 1 automation for a Stankings Group repo:
# - allow auto-merge + delete branch on merge
# - branch protection: PR required, 0 approving reviews
#
# Usage:
#   ./scripts/configure-github-automation.sh owner/repo [branch]
#
# Requires: gh CLI logged in as admin or maintain on the target repo.

set -euo pipefail

REPO="${1:?Usage: $0 owner/repo [branch]}"
BRANCH="${2:-main}"

echo "==> Repo: $REPO (branch: $BRANCH)"

PERMS="$(gh api "repos/$REPO" --jq '.permissions.push' 2>/dev/null || echo false)"
if [[ "$PERMS" != "true" ]]; then
  echo "ERROR: gh account cannot push to $REPO."
  echo "Invite bamsignalhq as Maintain collaborator, accept the invite, then re-run."
  exit 1
fi

echo "==> Enabling auto-merge and delete-branch-on-merge"
gh api -X PATCH "repos/$REPO" \
  -f allow_auto_merge=true \
  -f delete_branch_on_merge=true \
  --jq '{full_name, allow_auto_merge, delete_branch_on_merge}'

echo "==> Applying branch protection (PR required, 0 reviews)"
gh api -X PUT "repos/$REPO/branches/$BRANCH/protection" \
  --input - <<'JSON'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON

echo "==> Done. Cursor can: gh pr create && gh pr merge --auto --squash"
