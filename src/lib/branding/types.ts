/**
 * Shared brand surface shapes for Stankings Group properties.
 * Product brands (BamSignal, BayRight, Yike, …) can register modules
 * under ./brands without changing consumer import paths today.
 */

export type BrandLogo = {
  /** Production WebP path served to users */
  src: string;
  /** Editable master under /images/source/ */
  master: string;
  width: number;
  height: number;
  alt: string;
};

export type BrandIcon = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type BrandOgImage = {
  src: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
};

export type BrandFavicon = {
  src32: string;
  src180: string;
  src512: string;
};

export type BrandDefinition = {
  id: string;
  displayName: string;
  legalName: string;
  website: string;
  careersUrl: string;
  supportEmail: string;
  tagline: string;
  logo: BrandLogo;
  icon: BrandIcon;
  ogImage: BrandOgImage;
  favicon: BrandFavicon;
};
