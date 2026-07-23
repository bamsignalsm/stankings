/**
 * Stankings careers location — HQ and work arrangement labels.
 */

export const STANKINGS_HQ_LOCATION = {
  label: "Stankings HQ",
  locality: "Abia State",
  country: "Nigeria",
  /** Default display line for vacancies */
  display: "Stankings HQ, Abia State, Nigeria",
} as const;

export type WorkLocationType =
  | "on_site"
  | "hybrid"
  | "remote_nigeria"
  | "remote_global";

export const WORK_LOCATION_TYPE_LABELS: Record<WorkLocationType, string> = {
  on_site: "On-site (Abia State)",
  hybrid: "Hybrid (Abia State)",
  remote_nigeria: "Remote (Nigeria)",
  remote_global: "Remote (Global)",
};

export const DEFAULT_WORK_LOCATION_TYPE: WorkLocationType = "hybrid";

/** Default vacancy location string (human-readable) */
export const DEFAULT_CAREER_LOCATION = `${STANKINGS_HQ_LOCATION.display} / Hybrid`;

export function formatCareerLocation(
  location?: string | null,
  workLocationType?: WorkLocationType | string | null
): string {
  const typeLabel =
    workLocationType && workLocationType in WORK_LOCATION_TYPE_LABELS
      ? WORK_LOCATION_TYPE_LABELS[workLocationType as WorkLocationType]
      : null;
  if (typeLabel && location) return `${location} · ${typeLabel}`;
  if (typeLabel) return typeLabel;
  if (location?.toLowerCase().includes("lagos")) {
    return DEFAULT_CAREER_LOCATION;
  }
  return location?.trim() || DEFAULT_CAREER_LOCATION;
}
