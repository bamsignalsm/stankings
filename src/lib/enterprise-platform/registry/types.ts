/**
 * Enterprise Registry types — executable catalogue entries.
 */

export type RegistryEntryStatus = "active" | "forming" | "planned" | "deprecated" | "retired";

export interface CapabilityRegistryEntry {
  capabilityId: string;
  name: string;
  owner: string;
  status: RegistryEntryStatus;
  contractVersion: string;
  runtimeVersion: string;
  runtimeReadiness: string;
  dependsOn: string[];
  consumers: string[];
  docsPath: string;
}

export interface ServiceRegistryEntry {
  serviceId: string;
  name: string;
  capabilityId: string;
  status: RegistryEntryStatus;
  runtimeVersion: string;
  /** Logical endpoint / module path — not a network URL requirement */
  modulePath: string;
  health: "unknown" | "healthy" | "degraded" | "unavailable";
}

export interface RuntimeRegistryEntry {
  runtimeId: string;
  name: string;
  version: string;
  capabilities: string[];
  status: RegistryEntryStatus;
  packagePath: string;
}

export interface VersionRegistryEntry {
  artifactId: string;
  artifactKind: "contract" | "runtime" | "registry" | "schema" | "sdk";
  version: string;
  schemaVersion?: number;
  releasedAt?: string;
  notes?: string;
  compatibleWith?: string[];
}

export interface EnterpriseRegistryCatalogue {
  capabilities: CapabilityRegistryEntry[];
  services: ServiceRegistryEntry[];
  runtimes: RuntimeRegistryEntry[];
  versions: VersionRegistryEntry[];
}
