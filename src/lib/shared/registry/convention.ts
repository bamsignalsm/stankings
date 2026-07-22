/**
 * Registry Convention — shared metadata shape for Stankings registries.
 *
 * Do NOT introduce a Registry SDK here. Registries remain independent modules
 * that optionally export a RegistryManifest conforming to this convention.
 *
 * Spec: docs/engineering/REGISTRY_CONVENTION.md
 */

export type RegistryLifecycleStatus =
  | "active"
  | "forming"
  | "planned"
  | "deprecated"
  | "archived";

export type RegistryAudience =
  | "hq"
  | "library"
  | "ecosystem"
  | "internal"
  | "public";

/**
 * Minimum metadata every Stankings registry should expose.
 * Entry record shapes remain domain-specific.
 */
export interface RegistryManifest {
  /** Stable machine id, e.g. "company-registry" */
  registryId: string;
  /** Human title */
  name: string;
  /** Owning institution or programme */
  owner: string;
  /** Lifecycle of the registry module itself */
  status: RegistryLifecycleStatus;
  /** Semver of the registry schema/convention adoption */
  version: string;
  /** Primary documentation path (repo-relative) */
  docsPath: string;
  /** What one entry represents */
  entryKind: string;
  /** Who may consume this registry */
  audience: RegistryAudience[];
  /** Canon / article references */
  governanceRefs: string[];
  /** Downstream platforms expected to consume (names only) */
  consumers: string[];
  /** Whether entries are SSOT for their domain */
  isSingleSourceOfTruth: boolean;
  /** Notes for Cursor / engineers */
  notes?: string;
}

/** Recommended filename patterns */
export const REGISTRY_FILE_CONVENTION = {
  preferred: "registry.ts",
  acceptedAlias: "register.ts",
  exportSuffix: "_REGISTRY",
  manifestExport: "REGISTRY_MANIFEST",
} as const;

/** Required conceptual fields for new registry entries (guidance). */
export const REGISTRY_ENTRY_FIELD_GUIDANCE = [
  "id (or slug / identifier — pick one primary key and document it)",
  "name or title",
  "status (domain-specific enum allowed)",
  "owner or relationship to HQ (when applicable)",
  "docsPath or href (when user-facing)",
] as const;

export function assertRegistryManifest(manifest: RegistryManifest): RegistryManifest {
  if (!manifest.registryId?.trim()) {
    throw new Error("RegistryManifest.registryId is required");
  }
  if (!manifest.name?.trim()) {
    throw new Error("RegistryManifest.name is required");
  }
  if (!manifest.version?.trim()) {
    throw new Error("RegistryManifest.version is required");
  }
  return manifest;
}
