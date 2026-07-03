# Docker deployment

## Build

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://stankings.com \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY \
  -t stankings-hq:local .
```

No `.env.local` file is required. Build args (or Coolify build-time env) supply `NEXT_PUBLIC_*`.

## Run

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://stankings.com \
  -e NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY \
  -e SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE \
  stankings-hq:local
```

## Verify

```bash
curl -s http://127.0.0.1:3000/api/health
curl -s 'http://127.0.0.1:3000/api/health?ready=1'
```

Liveness must return HTTP 200. Readiness returns 200 only when env is valid and Supabase is reachable.

## Notes

- Image runs as non-root (`nextjs`).
- CMD is `node server.js` only — no shell entrypoint.
- Database migrations are applied with Supabase CLI (`supabase db push`), not at container start.
