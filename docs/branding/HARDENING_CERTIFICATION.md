# Brand System Hardening — Final Certification

**Repository:** bamsignalsm/stankings  
**PR:** [#9](https://github.com/bamsignalsm/stankings/pull/9)  
**Feature commit:** `a7f5119ad9474c1c23c8d64e73a01daa8188fc79`  
**Merge commit:** `75b6cbee8b57ec6b81c89c87ecd1101024b906d3`  
**Merged at:** 2026-07-21T20:37:21Z  
**Certified at:** 2026-07-21T20:41:00Z

---

## Success criteria

| Criterion | Status |
|-----------|--------|
| Brand documentation | **COMPLETE** |
| Brand validation | **ENFORCED** |
| CI protection | **ACTIVE** |
| Visual behavior | **UNCHANGED** (no regeneration) |
| Future branding updates | **PIPELINE-DRIVEN** |

**Verdict: CERTIFIED**

**Governance status:** ACTIVE — see [BRAND_GOVERNANCE.md](./BRAND_GOVERNANCE.md).

---

## Pre-merge checklist

| Check | Result |
|-------|--------|
| `docs/branding/BRAND_ASSETS.md` | Present |
| `public/images/GENERATED.md` | Present |
| `public/images/source/README.md` | Present |
| `npm run verify:brand` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| CI runs `verify:brand` before lint/build | Confirmed in run `29866316213` |
| `BRAND` / `SITE_URL` / `STANKINGS_LEGACY_LTD` exports | Backward compatible |
| PR CI | PASS |

---

## Post-merge / deploy

| Check | Result |
|-------|--------|
| Merge | `75b6cbe` on `main` |
| Main CI after merge | PASS (`29866544488`) |
| Production `/api/health` build | `75b6cbee8b57ec6b81c89c87ecd1101024b906d3` |
| Coolify deploy | Observed live (build SHA matches merge) |

### Production asset HTTP (post-deploy)

| Path | HTTP |
|------|------|
| `/images/logo.webp` | 200 |
| `/images/icon.webp` | 200 |
| `/images/icon-32.webp` | 200 |
| `/images/icon-180.webp` | 200 |
| `/images/icon-512.webp` | 200 |
| `/images/og-image.jpg` | 200 |
| `/images/og-image.webp` | 200 |
| `/site.webmanifest` | 200 |
| `/` `/auth/login` `/auth/register` | 200 |
| `/images/source/logo-master.png` | 200 (source published under `public/`) |
| `/images/logo.png` | 200 observed once post-deploy — **not in git tree**; treat as edge/CDN residue |

`git ls-tree origin/main` confirms **no** `public/images/logo.png`; masters live only under `public/images/source/`.

### Browser DOM verification (live)

| Surface | Result |
|---------|--------|
| Home header + footer logos | Loaded from `/images/logo.webp` via `_next/image` (`naturalWidth` > 0, no broken imgs) |
| Login header / auth / footer logos | 3× `logo.webp` loaded, no broken imgs |
| Register | Page 200; auth shell uses same `BrandLogo` → `logo.webp` |
| Favicon / Apple touch | `icon-32.webp`, `icon-512.webp`, `icon-180.webp` linked in `<head>` |
| Open Graph | `og-image.jpg` + `og-image.webp` present in meta |
| Broken image requests | None observed on home/login |

---

## Deferred (intentional)

Source artwork still reads **“STANKINGS GROUP”**.

Do **not** regenerate until official replacement artwork is provided.

When received:

1. Replace `public/images/source/logo-master.png` (archive as `logo-master-vN.png`)
2. `npm run optimize:brand`
3. Commit generated outputs — never hand-edit WebP/JPEG
