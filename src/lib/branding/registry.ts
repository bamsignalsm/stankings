/**
 * Multi-brand registry (holding company + future product brands).
 *
 * Today only `stankings` is registered. Future modules (bamsignal, bayright,
 * yike, …) can be added under ./brands without migrating existing `@/lib/brand`
 * consumers — they keep importing `BRAND` from `@/lib/brand`.
 */

import { stankingsBrand } from "@/lib/branding/brands/stankings";
import type { BrandDefinition } from "@/lib/branding/types";

export const BRAND_REGISTRY = {
  stankings: stankingsBrand,
  // bamsignal: bamsignalBrand,
  // bayright: bayrightBrand,
  // yike: yikeBrand,
} as const;

export type BrandId = keyof typeof BRAND_REGISTRY;

/** Default brand for this repository (Stankings Group site). */
export const DEFAULT_BRAND_ID: BrandId = "stankings";

export function getBrand(id: BrandId = DEFAULT_BRAND_ID): BrandDefinition {
  return BRAND_REGISTRY[id];
}

export function listBrandIds(): BrandId[] {
  return Object.keys(BRAND_REGISTRY) as BrandId[];
}
