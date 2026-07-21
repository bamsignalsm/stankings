# Stankings Brand Governance

**Status:** ACTIVE  
**Effective baseline:** Brand Hardening Certification — July 2026  
**Certification:** [HARDENING_CERTIFICATION.md](./HARDENING_CERTIFICATION.md)  
**Asset inventory:** [BRAND_ASSETS.md](./BRAND_ASSETS.md)

The Brand System Hardening initiative is complete. Branding is governed by repository policy and CI.

**No additional branding infrastructure work** should be performed unless official brand assets change.

---

## Status

| Gate | State |
|------|--------|
| Brand Governance | **ACTIVE** |
| Validation | **ENFORCED** (`npm run verify:brand`) |
| CI | **ACTIVE** (before lint / typecheck / build) |
| Visual system | **FROZEN** |
| Future updates | **PIPELINE-DRIVEN** |

---

## Canonical assets

### Master artwork (editable only when founders deliver new art)

```
public/images/source/logo-master.png
```

Version history: `logo-master-v1.png`, `logo-master-v2.png`, …

### Generated assets (immutable — never edit by hand)

```
public/images/logo.webp
public/images/icon.webp
public/images/icon-32.webp
public/images/icon-180.webp
public/images/icon-512.webp
public/images/og-image.jpg
public/images/og-image.webp
```

Regenerate exclusively with:

```bash
npm run optimize:brand
```

See `public/images/GENERATED.md`.

---

## Update workflow

When official artwork changes:

1. Replace `public/images/source/logo-master.png` (archive prior as `logo-master-vN.png`).
2. Run `npm run optimize:brand`.
3. Review generated assets.
4. Commit source + generated outputs together.
5. CI validates (`verify:brand`).
6. Merge → deploy through the normal Coolify pipeline.

Do **not** hand-edit WebP/JPEG outputs.

---

## CI policy

Every merge to `main` must pass:

1. `verify:brand`
2. `lint`
3. `typecheck`
4. `build`

Brand validation **must** execute before build (enforced in `.github/workflows/ci.yml`).

---

## Application policy

- Consume the `BRAND` export from `@/lib/brand` (backed by `src/lib/branding/`).
- Prefer `BRAND.logo.src`, `BRAND.icon.*`, `BRAND.ogImage.*`, `BRAND.favicon.*` over hardcoding paths when the abstraction exists.
- Never import `logo-master.png` (or any file under `public/images/source/`) into production UI code.
- Future email / transactional templates must use `BRAND.logo.src` (or `SITE_URL` + that path) — never hardcode filenames.

---

## Multi-brand

Continue the registry-based architecture under `src/lib/branding/`:

- Add new brands as modules in `src/lib/branding/brands/`
- Register them in `src/lib/branding/registry.ts`
- Do **not** duplicate branding logic or fork parallel asset pipelines

This repository’s default brand remains `stankings`. Product sites (BamSignal, BayRight, Yike, …) own their own brand modules.

---

## Known deferred item

Current master artwork contains the text **“STANKINGS GROUP”**.

This is the official source artwork. Do **not** alter it programmatically.

When revised artwork is received: replace the master only, then regenerate all derived assets through the existing pipeline.
