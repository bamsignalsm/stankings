# UI Standard — Stankings Group (HQ)

Applies to **stankings.com** corporate / institutional surfaces. Product apps (BamSignal, BayRight, Yike) follow their own locked design systems unless explicitly unified.

## Stankings HQ theme

- **Dark theme only** — institutional obsidian + legacy gold palette
- No public light-theme toggle; do not reintroduce `html.light` token overrides without executive approval
- Root layout: `html` carries `dark` class; `ThemeProvider` enforces dark and clears legacy `stankings-theme=light` from localStorage

## Design tokens

Defined in `src/app/globals.css` (`@theme`):

- **Gold:** `--color-legacy-gold`, `--color-gold-light`
- **Surfaces:** `--color-ink`, `--color-ink-light`, `--color-ink-muted`
- **Text:** `--color-cream`, `--color-cream-muted`
- **Motion:** `--ds-duration-*`, `--ds-easing-standard`

Use semantic Tailwind classes (`bg-ink`, `text-cream`, `text-gold`, `border-gold-subtle`)—do not invent parallel color systems.

## Typography

- Serif (headings): Cormorant Garamond
- Sans (body): DM Sans

## Accessibility

- Visible focus rings (`:focus-visible`)
- Respect `prefers-reduced-motion`
- Sufficient contrast on gold-on-ink CTAs

## Product UI freeze

Member-facing product UIs (e.g. BamSignal logged-in experience) are **frozen** except bug fixes—see each product repo rules. Do not apply HQ theme changes to product apps.

## Evidence for UI tasks

Before/after screenshot or DOM snapshot for theme/navigation changes; verify on production URL after deploy.
