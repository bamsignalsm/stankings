/**
 * Stankings Design System — tokens
 * Consumable by HQ, BamSignal, Yike, BayRight.
 * Source of truth for spacing, type, color, motion, elevation.
 */

export const colors = {
  obsidian: "#070707",
  legacyGold: "#D4A64A",
  legacyGoldLight: "#E8C97A",
  legacyGoldDark: "#A67C2E",
  bronze: "#6B4423",
  ivory: "#F4EFE6",
  ivoryMuted: "#9C958C",
  forest: "#1B4D3E",
  burgundy: "#6B1F2A",
  royal: "#1E3A8A",
  ink: "#070707",
  inkLight: "#0F0F0F",
  inkMuted: "#161616",
  cream: "#F4EFE6",
  creamMuted: "#9C958C",
  success: "#1B4D3E",
  danger: "#6B1F2A",
  info: "#1E3A8A",
  warning: "#A67C2E",
} as const;

export const gradients = {
  legacyGold:
    "linear-gradient(135deg, #E8C97A 0%, #D4A64A 50%, #6B4423 100%)",
  inkFade: "linear-gradient(180deg, #0F0F0F 0%, #070707 100%)",
  goldSubtle:
    "linear-gradient(145deg, rgba(212, 166, 74, 0.12) 0%, transparent 40%)",
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const radius = {
  none: "0",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
} as const;

export const typography = {
  fontFamily: {
    serif: '"Cormorant Garamond", Georgia, serif',
    sans: '"DM Sans", system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.625",
  },
  tracking: {
    normal: "0",
    wide: "0.05em",
    wider: "0.1em",
    widest: "0.35em",
  },
} as const;

export const elevations = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.35)",
  md: "0 4px 12px rgba(0, 0, 0, 0.4)",
  lg: "0 12px 40px rgba(0, 0, 0, 0.55)",
  focus: "0 0 0 2px var(--color-ink), 0 0 0 4px var(--color-legacy-gold)",
} as const;

export const animations = {
  duration: {
    fast: "120ms",
    normal: "200ms",
    slow: "320ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  ultrawide: "1920px",
} as const;

export const containers = {
  narrow: "48rem",
  content: "64rem",
  wide: "80rem",
  full: "100%",
} as const;

export const icons = {
  size: {
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
  },
  stroke: 1.5,
} as const;

export const designTokens = {
  colors,
  gradients,
  spacing,
  radius,
  typography,
  elevations,
  animations,
  breakpoints,
  containers,
  icons,
} as const;

export type DesignTokens = typeof designTokens;
