# Master Launch Program v1.0

**Status:** Active  
**Priority:** Executive  
**Dashboard:** `/energy/launch`

---

## Mission

Architecture complete. Engineering complete. **Full launch execution** — every activity must place products in users' hands.

---

## Global Rules

1. Only **ONE** product in **ACTIVE LAUNCH** at a time
2. All others: Maintenance · Recovery · Frozen · Observation
3. No feature development before launch observation period completes
4. **Evidence always overrides estimates**
5. No feature may interrupt an active launch — backlog and continue

---

## Launch Order

| Stage | Product | Posture (now) | Objective | Est. date |
|-------|---------|---------------|-----------|-----------|
| **1** | **Stankings HQ** | **ACTIVE DEPLOYMENT** | Institutional headquarters | 2026-07-05 |
| 2 | BamSignal | OBSERVATION (queued) | Google Play Closed Testing | 2026-07-12 |
| 3 | Yike | FROZEN (queued) | Production candidate | 2026-08-15 |
| 4 | BayRight | RECOVERY (queued) | Provider-approved launch | 2026-09-01 |

**Current focus:** Stage 1 only. Advance when exit criteria met.

---

## Stage 1 Exit Criteria

- Production healthy
- No critical issues
- Move HQ → **MAINTENANCE**
- Then BamSignal → **ACTIVE LAUNCH**

---

## Launch Command Center

Single source of truth: `src/lib/launch-war-room/master-launch-program.ts`

Tracks:

- Current stage & product
- Launch %
- Blockers & founder actions
- Critical risks
- Completed today / tomorrow plan
- Estimated launch dates
- V2 gate checklist

---

## Success Metric

Measure **only**:

- Products successfully launched
- Products successfully operating
- Products successfully growing

Do **not** measure commits, PRs, files, or LOC.

---

## V2 Gate (no expansion until complete)

- [ ] Stankings HQ operational
- [ ] BamSignal publicly available
- [ ] Yike publicly available
- [ ] BayRight publicly available
- [ ] Ecosystem stable

---

## Founder — Immediate Actions

1. Authorize **Stankings HQ Coolify production deploy**
2. Verify **DNS · SSL · Cloudflare · email** on stankings.com
3. Production walkthrough: `/trust`, `/legal`, `/support`, `/status`
4. Confirm **support mailboxes** receive mail
5. On Stage 1 exit → begin BamSignal Stage 2

---

## Engineering Discipline

No feature may interrupt Stage 1. Ideas → backlog → continue launching.

Sprint 010 institutional pages + `robots.ts` support Stage 1 verification only.
