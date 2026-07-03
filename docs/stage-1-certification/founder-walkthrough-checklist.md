# Stage 1 — Founder Production Walkthrough

**Phase 5 checklist** — complete after Coolify deploy succeeds.

Sign each item when verified on **https://stankings.com** (not localhost).

---

## Core pages

| Route | Professional | Navigation | Branding | Performance | No 404 |
|-------|:------------:|:----------:|:--------:|:-----------:|:------:|
| `/` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/about` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/companies` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/library` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/trust` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/support` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/legal` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/status` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/contact` | ☐ | ☐ | ☐ | ☐ | ☐ |
| `/careers` | ☐ | ☐ | ☐ | ☐ | ☐ |

## SEO & infra

| Check | Pass |
|-------|:----:|
| `/sitemap.xml` loads and lists public URLs | ☐ |
| `/robots.txt` loads · `/library` not blocked | ☐ |
| `/api/health` returns 200 | ☐ |
| `/api/health?ready=1` returns 200 + database connected | ☐ |
| SSL padlock valid | ☐ |
| Header/footer links work | ☐ |
| Mobile layout acceptable | ☐ |

## Phase 6 — Exit sign-off

Founder signature: ______________________ Date: __________

On pass:

1. Update `master-launch-program.ts` — HQ posture → `maintenance`
2. Update `CURRENT_LAUNCH_STAGE` → 2
3. BamSignal posture → `active-launch`
4. Mark `stage1Certification.status` → `closed`
5. Mark V2 gate "Stankings HQ operational" → done

**Stage 2 must not begin until this sign-off.**
