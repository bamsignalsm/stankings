# 8. Office Workspace System

## Entry

Workers access `/skl` only (canonical workforce portal). `/office` permanently redirects to `/skl`. Middleware requires an active workforce capability on the Passport. Workers hitting `/energy` are redirected to `/skl` (or unauthorized).

## Shared chrome

Home · My Tasks · My Queue · Calendar · Documents · Messages · Notifications · Knowledge Base · Performance · Team · Announcements · Quick Actions

## Resolution

`workspace_key` on employee → module registry → dashboard + feature routes under `/office/w/[workspaceKey]/...` or feature segments.

## Isolation

All queries filter by `company_id` (and grants). Cross-company data never listed.
