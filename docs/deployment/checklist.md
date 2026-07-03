# Deployment checklist

- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build` (with placeholder or real `NEXT_PUBLIC_*`)
- [ ] `docker build` succeeds
- [ ] `docker run` + `/api/health` → 200
- [ ] Coolify Build Pack = Dockerfile
- [ ] Coolify port = 3000
- [ ] Coolify pre/post commands empty
- [ ] Coolify custom Docker options empty
- [ ] Coolify env set (build-time `NEXT_PUBLIC_*`)
- [ ] Domain `stankings.com` attached
- [ ] Production `/api/health` → 200
- [ ] Production `/api/health?ready=1` → `"ready":true`
- [ ] Public pages load (`/`, `/trust`, `/legal`, `/status`)
