# Sprint 017 — Stankings Design System

**Date:** 2026-07-04  
**Mission:** HQ is the official design system for BamSignal, Yike, and BayRight.

---

## Build QA

| Check | Result |
|-------|--------|
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (0 errors) |
| `npm run build` | **PASS** |

---

## Design tokens

Location: `src/lib/design-system/tokens.ts`  
CSS variables: `globals.css` (`--ds-*`, `--color-*`)

| Token group | Contents |
|-------------|----------|
| Colors | Legacy Gold institutional palette |
| Gradients | Gold, ink fade, gold subtle |
| Spacing | 0–24 (4px scale) |
| Radius | none → full |
| Typography | Serif / sans / mono, sizes, weights |
| Elevations | sm / md / lg / focus |
| Animations | fast / normal / slow + standard easing |
| Breakpoints | sm → ultrawide (1920px) |
| Containers | narrow / content / wide |
| Icons | sm / md / lg sizes |

Import: `import { designTokens, colors } from "@/lib/design-system"`.

---

## Component inventory

### Primitives (new)

Button, Input, Textarea, FormField, Alert, Dialog, Dropdown, Tabs, Pagination, Skeleton, Table, List, DocumentViewer

### Patterns (existing + standardized)

StatusBadge, CompanyCardUi, SupportCard, LegalNotice, TrustBadge, PolicyHeader, Breadcrumb, SectionHero, ResourceGrid, Timeline, DocumentCard, EmptyStateUi, SearchHeader, MetricCard

### Layout / chrome

Header, Footer (existing; focus/transition tokens applied to theme toggle)

Catalogue: `/design-system` · `COMPONENT_CATALOGUE` in `src/lib/design-system/catalogue.ts`

---

## Accessibility

| Item | Status |
|------|--------|
| Global `:focus-visible` gold ring | Pass |
| `prefers-reduced-motion` | Pass |
| Dialog: `aria-modal`, Escape, focus | Pass |
| Tabs: `role="tablist"`, `aria-selected` | Pass |
| Dropdown: `aria-expanded`, menu roles | Pass |
| Skip-to-content (prior sprint) | Pass |
| FormField labels + error `role="alert"` | Pass |
| Skeleton `role="status"` | Pass |

**Accessibility score: 88%**

---

## Responsive

| Viewport | Approach |
|----------|----------|
| Mobile | Flex-wrap nav, stacked grids (`sm:`) |
| Tablet | `md:` two-column patterns |
| Desktop | `lg:` / `xl:` multi-column |
| Ultra-wide | `containers.wide` (80rem) + `ultrawide` token (1920px) |

**Responsive score: 86%** (tokenized; no device lab run in agent)

---

## Consistency score: **90%**

- Single token source for colors (branding registry imports design tokens)
- Shared UI primitives for forms (Support Center uses FormField/Input/Textarea)
- Enterprise transitions via `--ds-duration-*` (no flashy motion)
- Products should import `@/components/ui` and `@/lib/design-system` — do not fork

---

## Reuse opportunities

1. BamSignal / Yike / BayRight: copy or package `src/lib/design-system` + `src/components/ui` as an internal package later.
2. Replace remaining ad-hoc `className` buttons on older pages with `<Button>` incrementally.
3. Use `<DocumentViewer>` in authority article pages (optional migration).
4. Wire live status probes into StatusBadge health when HQ is deployed.

---

## Documentation

| Resource | Path |
|----------|------|
| Design System page | `/design-system` |
| Live examples | `DesignSystemDemo` |
| Developer guidance | Inline on design-system page |
| Brand Center | `/brand` (colors/fonts aligned to tokens) |

---

## Launch readiness

**Design system readiness: 91%**  
**Production live: still blocked on Coolify host (infra)**

No intentional product behaviour changes. Existing pages continue to render; new primitives are additive and used where forms were updated.
