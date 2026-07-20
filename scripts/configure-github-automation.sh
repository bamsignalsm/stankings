#!/usr/bin/env bash
# Configure GitHub Option 1 automation for a Stankings Group repo:
# - allow auto-merge + delete branch on merge
# - branch protection: PR required, 0 approving reviews
#
# Usage:
#   ./scripts/configure-github-automation.sh owner/repo [branch]
#
# Requires: gh CLI logged in as repo ADMIN (not Write-only).
# On GitHub Free, repo must be PUBLIC for branch protection to enforce.
# Write collaborators: use Settings UI — see docs/engineering/AUTOMATION_STANDARD.md

set -euo pipefail

REPO="${1:?Usage: $0 owner/repo [branch]}"
BRANCH="${2:-main}"

echo "==> Repo: $REPO (branch: $BRANCH)"

ADMIN="$(gh api "repos/$REPO" --jq '.permissions.admin' 2>/dev/null || echo false)"
PUSH="$(gh api "repos/$REPO" --jq '.permissions.push' 2>/dev/null || echo false)"
PRIVATE="$(gh api "repos/$REPO" --jq '.private' 2>/dev/null || echo true)"

if [[ "$ADMIN" != "true" ]]; then
  echo "ERROR: gh account is not Admin on $REPO (push=$PUSH)."
  echo "Run this script as the repo owner, or configure via GitHub UI:"
  echo "  docs/engineering/AUTOMATION_STANDARD.md"
  exit 1
fi

if [[ "$PRIVATE" == "true" ]]; then
  echo "WARN: $REPO is private. On GitHub Free, branch protection may not enforce."
  echo "      Make the repo public first (owner decision), then re-run."
fi

echo "==> Enabling auto-merge and delete-branch-on-merge"
gh api -X PATCH "repos/$REPO" \
  -f allow_auto_merge=true \
  -f delete_branch_on_merge=true \
  --jq '{full_name, private, allow_auto_merge, delete_branch_on_merge}'

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

echo "==> Verify:"
gh api "repos/$REPO" --jq '{allow_auto_merge, delete_branch_on_merge}'
gh api "repos/$REPO/branches/$BRANCH/protection" \
  --jq '{approvals: .required_pull_request_reviews.required_approving_review_count}'

echo "==> Done. Cursor can: gh pr create && gh pr merge --auto --squash"
