import { CORPORATE } from "@/lib/shared/config/corporate";

/** Public site origin — override in preview/staging via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? CORPORATE.website;

/**
 * Single source of truth for public brand surfaces.
 * - displayName: logo, nav, OG site name, manifest
 * - legalName: copyright, legal pages, structured data legal entity
 */
export const BRAND = {
  displayName: "Stankings",
  legalName: CORPORATE.legalName,
  website: CORPORATE.website,
  careersUrl: CORPORATE.careersUrl,
  supportEmail: CORPORATE.supportEmail,
  tagline: "Building institutions that empower generations.",
  logo: {
    /** Production WebP — derived from logo.png */
    src: "/images/logo.webp",
    /** Editable raster master (run optimize:brand after edits) */
    master: "/images/logo.png",
    width: 1209,
    height: 288,
    alt: "Stankings",
  },
  icon: {
    src: "/images/icon.webp",
    width: 512,
    height: 512,
    alt: "Stankings mark",
  },
  ogImage: {
    /** JPEG for WhatsApp / Telegram / Facebook crawlers; WebP as alternate */
    src: "/images/og-image.jpg",
    webp: "/images/og-image.webp",
    width: 1200,
    height: 630,
    alt: "Stankings",
  },
  favicon: {
    src32: "/images/icon-32.webp",
    src180: "/images/icon-180.webp",
    src512: "/images/icon-512.webp",
  },
} as const;

/** @deprecated Prefer BRAND.legalName */
export const STANKINGS_LEGACY_LTD = BRAND.legalName;
