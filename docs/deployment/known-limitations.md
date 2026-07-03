# Known limitations

1. **`NEXT_PUBLIC_*` are build-time** — Next.js inlines them into the client bundle. Changing only runtime env without rebuild will not update browser-side Supabase URL/keys. Always rebuild after changing public env.

2. **No migrations at container start** — Schema changes use Supabase CLI. Coolify must not run migrate scripts.

3. **Coolify host permissions** — If Coolify cannot write `/data/coolify/applications/<id>/`, that is infrastructure. The repository cannot work around it.

4. **Member library content** — Full constitution text remains auth-gated; public `/constitution` is an overview only.

5. **packages/core** — Internal TypeScript path alias for release-governance types; not a separate deployable service.
