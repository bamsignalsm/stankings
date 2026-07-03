# 503 Root Cause Report

**Date:** 2026-07-03T19:58Z  
**Domain:** stankings.com  
**Verdict:** Failure at Coolify/Traefik — no healthy application container

---

## Deployment chain

| Hop | Status | Evidence |
|-----|--------|----------|
| Internet | PASS | Reachable |
| Cloudflare | PASS | `server: cloudflare`, `cf-ray` present, SSL verify OK |
| DNS | PASS | A `104.21.25.125`, `172.67.134.59` (Cloudflare proxy) |
| Server / origin | REACHABLE | Origin answers through CF |
| Coolify / Traefik | **FAIL** | Body: `no available server` |
| Container | **FAIL** | No backend registered for route |
| Application | NOT REACHED | Never invoked |
| Health endpoint | NOT REACHED | Same 503 body |

## Exact failure point

**Coolify Traefik reverse proxy → no available server**

```
HTTP/2 503
content-type: text/plain; charset=utf-8
content-length: 20
server: cloudflare
body: no available server
```

This is Traefik’s response when no healthy container is attached to the `stankings.com` router. The request never reaches Node/Next.js.

## Ruled out

| Cause | Why ruled out |
|-------|----------------|
| DNS misconfiguration | Resolves to Cloudflare anycast |
| SSL mismatch | `ssl_verify_result=0` |
| Cloudflare outage | BamSignal (`bamsignal.com`) returns HTTP 200 on same CF path |
| Application crash at request time | App never receives traffic |
| Port mismatch at edge | Failure is “no server”, not connection refused to a bad port |

## Most likely Coolify causes (ordered)

1. **Container not running** (never deployed, stopped, or exited)
2. **Failed build** (image never produced)
3. **Failed startup** (crash loop — Traefik marks unhealthy)
4. **Missing build-time env** (`NEXT_PUBLIC_*` empty → build/runtime fail)
5. **Domain not linked** to running service in Coolify
6. **Wrong pre/post deploy** (`php artisan migrate` can fail the deploy pipeline)
7. **Watch path / labels** misconfig (secondary — does not alone cause 503 if a prior deploy never succeeded)

## Comparison

| Host | Status | Body |
|------|--------|------|
| stankings.com | 503 | `no available server` |
| bamsignal.com | 200 | App HTML / `/ready` ok |

Infrastructure (CF + origin host) is up. **Stankings app service is not.**

## Resolution path

Founder action in Coolify (only path to recovery — no agent access to Coolify control plane):

1. Open **Stankings Group** application
2. Clear Pre/Post deploy commands (remove `php artisan migrate`)
3. Clear Custom Docker Options
4. Set Watch Paths to App Router paths or empty
5. Set Environment (Build + Runtime) per `docs/coolify.md`
6. **Deploy** (or Restart if a prior image exists)
7. Confirm container status **Running** and Traefik route healthy
8. Verify `curl https://stankings.com/api/health` → 200
