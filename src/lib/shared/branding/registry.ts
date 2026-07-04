/**
 * Branding registry — shared brand tokens and assets.
 */

export const BRAND_COLORS = [
  { id: "obsidian", name: "Obsidian Black", hex: "#070707" },
  { id: "legacy-gold", name: "Legacy Gold", hex: "#D4A64A" },
  { id: "warm-ivory", name: "Warm Ivory", hex: "#F4EFE6" },
  { id: "deep-bronze", name: "Deep Bronze", hex: "#6B4423" },
  { id: "forest", name: "Forest Green", hex: "#1B4D3E" },
  { id: "burgundy", name: "Burgundy", hex: "#6B1F2A" },
  { id: "royal", name: "Royal Blue", hex: "#1E3A8A" },
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
