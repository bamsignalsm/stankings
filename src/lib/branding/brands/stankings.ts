import { CORPORATE } from "@/lib/shared/config/corporate";
import type { BrandDefinition } from "@/lib/branding/types";

/**
 * Stankings Group (holding company) brand definition.
 * Assets: docs/branding/BRAND_ASSETS.md
 */
export const stankingsBrand = {
  id: "stankings",
  displayName: "Stankings",
  legalName: CORPORATE.legalName,
  website: CORPORATE.website,
  careersUrl: CORPORATE.careersUrl,
  supportEmail: CORPORATE.supportEmail,
  tagline: "Building institutions that empower generations.",
  logo: {
    /** Production WebP — DO NOT EDIT; npm run optimize:brand */
    src: "/images/logo.webp",
    /** Active master — public/images/source/logo-master.png */
    master: "/images/source/logo-master.png",
    width: 1824,
    height: 460,
    alt: "Stankings",
  },
  icon: {
    src: "/images/icon.webp",
    width: 512,
    height: 512,
    alt: "Stankings mark",
  },
  ogImage: {
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
} as const satisfies BrandDefinition;
