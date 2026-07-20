# Security Standard — Stankings Group

## Never

- Commit secrets or `.env` files with real values
- Expose credentials in logs, PRs, or chat
- Disable authentication for convenience
- Disable Cloudflare Access on control planes without approval
- Broaden webhook bypass beyond the GitHub webhook path
- Store API keys in source code

## Secrets

| Layer | Where secrets live |
|-------|-------------------|
| Build-time public | Docker `ARG` / Coolify build vars — `NEXT_PUBLIC_*`, `VITE_*` only |
| Runtime | Coolify environment (injected at container start) |
| Local dev | `.env.local` (gitignored) |

## Access

- Coolify dashboard: Cloudflare Access — founders/operators only
- GitHub webhook path: bypass **path-only**, not entire host
- Admin routes: separate from member/public routes per product

## Least privilege

- GitHub Apps: single-repo install
- Supabase: service role server-side only; anon key client-side
- Production diagnostics: require admin session or `x-diagnostics-secret` where applicable

## Verification

Security claims require evidence (header checks, Access policy name, absence of secret in diff)—not assumptions.

## Incident response

Suspected leak: rotate credential, revoke token, redeploy with new env, document in product security channel—do not silently patch.
