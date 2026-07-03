/** Stankings Group release lifecycle states. */
export const RELEASE_STATES = [
  "draft",
  "development",
  "production-candidate",
  "certification",
  "founder-review",
  "approved",
  "production",
  "monitoring",
  "released",
  "archived",
] as const;

export type ReleaseState = (typeof RELEASE_STATES)[number];

export function isValidReleaseTransition(from: ReleaseState, to: ReleaseState): boolean {
  const fromIdx = RELEASE_STATES.indexOf(from);
  const toIdx = RELEASE_STATES.indexOf(to);
  if (fromIdx === -1 || toIdx === -1) return false;
  return toIdx === fromIdx + 1 || to === "archived";
}

export interface ReleaseRecord {
  releaseId: string;
  productId: string;
  version: string;
  versionCode?: string | null;
  commitSha: string;
  state: ReleaseState;
  certification?: unknown;
  approval?: unknown;
  artifacts?: { type: string; name: string; sha256: string }[];
  createdAt: string;
  updatedAt: string;
}

export function buildReleaseRecord(input: {
  releaseId: string;
  productId: string;
  version: string;
  versionCode?: string | null;
  commitSha: string;
  state?: ReleaseState;
  certification?: unknown;
  approval?: unknown;
  artifacts?: ReleaseRecord["artifacts"];
  createdAt?: string;
}): ReleaseRecord {
  const now = new Date().toISOString();
  return {
    releaseId: input.releaseId,
    productId: input.productId,
    version: input.version,
    versionCode: input.versionCode ?? null,
    commitSha: input.commitSha,
    state: input.state ?? "production-candidate",
    certification: input.certification ?? null,
    approval: input.approval ?? null,
    artifacts: input.artifacts ?? [],
    createdAt: input.createdAt ?? now,
    updatedAt: now,
  };
}
