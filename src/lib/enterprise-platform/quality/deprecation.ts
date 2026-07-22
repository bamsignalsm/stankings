/**
 * Deprecation policy helpers.
 */

export interface DeprecationNotice {
  surface: string;
  deprecatedInVersion: string;
  removeInMajor?: string;
  replacement?: string;
  message: string;
}

export function formatDeprecationWarning(notice: DeprecationNotice): string {
  const parts = [
    `DEPRECATED: ${notice.surface} (since ${notice.deprecatedInVersion})`,
    notice.replacement ? `use ${notice.replacement}` : null,
    notice.removeInMajor ? `removal planned in major ${notice.removeInMajor}` : null,
    notice.message,
  ].filter(Boolean);
  return parts.join(" — ");
}

export const DEPRECATION_POLICY = {
  id: "enterprise-deprecation-policy",
  version: "1.0.0",
  rules: [
    "Mark deprecated in docs and types before behaviour changes.",
    "Advertise via Capability Discovery deprecations[] when available.",
    "Retain behaviour for at least one minor line within the major.",
    "Remove only on the next major of the owning package.",
    "Record in Version Registry.",
  ],
} as const;
