import { getBrand } from "@/lib/branding/registry";

/** Public site origin — override in preview/staging via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? getBrand().website;

/**
 * Single source of truth for public brand surfaces (Stankings site).
 * Backed by `src/lib/branding/` so additional Group brands can register later
 * without changing this import path for existing consumers.
 *
 * - displayName: logo, nav, OG site name, manifest
 * - legalName: copyright, legal pages, structured data legal entity
 * - logo.src / icon / og / favicon: generated assets (npm run optimize:brand)
 *
 * Email templates (when added) MUST use BRAND.logo.src — never hardcode paths.
 */
export const BRAND = getBrand("stankings");

/** @deprecated Prefer BRAND.legalName */
export const STANKINGS_LEGACY_LTD = BRAND.legalName;
