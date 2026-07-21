/** Parent company — single source of truth for ecosystem corporate identity. */
export const CORPORATE = {
  legalName: "Stankings Legacy Ltd",
  website: "https://stankings.com",
  careersUrl: "https://stankings.com/career",
  supportEmail: "support@stankings.com",
} as const;

/** @deprecated Prefer CORPORATE.legalName */
export const STANKINGS_LEGACY_LTD = CORPORATE.legalName;

/** @deprecated Prefer CORPORATE.careersUrl */
export const STANKINGS_CAREERS_URL = CORPORATE.careersUrl;

/** @deprecated Prefer CORPORATE */
export const COMPANY = CORPORATE;
