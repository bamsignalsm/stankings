/**
 * Branding registry — shared brand tokens and assets.
 * Colors align with @/lib/design-system tokens.
 */

import { colors } from "@/lib/design-system/tokens";

export const BRAND_COLORS = [
  { id: "obsidian", name: "Obsidian Black", hex: colors.obsidian },
  { id: "legacy-gold", name: "Legacy Gold", hex: colors.legacyGold },
  { id: "warm-ivory", name: "Warm Ivory", hex: colors.ivory },
  { id: "deep-bronze", name: "Deep Bronze", hex: colors.bronze },
  { id: "forest", name: "Forest Green", hex: colors.forest },
  { id: "burgundy", name: "Burgundy", hex: colors.burgundy },
  { id: "royal", name: "Royal Blue", hex: colors.royal },
] as const;

export const BRAND_FONTS = [
  { id: "serif", name: "Cormorant Garamond", role: "Headings and institutional titles" },
  { id: "sans", name: "DM Sans", role: "Body and interface text" },
] as const;

export const BRAND_ASSETS = [
  { id: "logo", title: "Primary logo", src: "/images/logo.webp", note: "Horizontal wordmark" },
  { id: "icon", title: "App icon", src: "/images/icon.webp", note: "Square mark" },
  { id: "icon-512", title: "Icon 512", src: "/images/icon-512.webp", note: "Large icon" },
  { id: "og", title: "Open Graph", src: "/images/og-image.jpg", note: "Social preview (JPEG)" },
  { id: "og-webp", title: "Open Graph WebP", src: "/images/og-image.webp", note: "Social preview (WebP)" },
] as const;

export const BRAND_USAGE_RULES = [
  "Maintain clear space around the logo equal to the height of the mark’s gold element.",
  "Do not recolor Legacy Gold or stretch the wordmark.",
  "Do not imply endorsement without written permission.",
  "Prefer WebP assets for web; request print packages from Press.",
] as const;

export function getBrandAsset(id: string) {
  return BRAND_ASSETS.find((a) => a.id === id);
}

export function getBrandColor(id: string) {
  return BRAND_COLORS.find((c) => c.id === id);
}

export function listBrandAssets() {
  return BRAND_ASSETS;
}
