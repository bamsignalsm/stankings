/**
 * Enterprise Discovery Runtime — locate capabilities, contracts, services, versions.
 * Registry-backed query layer (no separate durable store required).
 */

export const DISCOVERY_RUNTIME_VERSION = "1.0.0";
export const DISCOVERY_SCHEMA_VERSION = 1;

export type DiscoveryHealth = "unknown" | "healthy" | "degraded" | "unavailable";

export interface DiscoveredCapability {
  capabilityId: string;
  name: string;
  runtimeReadiness: string;
  runtimeVersion: string;
  contractVersion: string;
  dependsOn: string[];
  docsPath: string;
  status: string;
}

export interface DiscoveredContract {
  contractId: string;
  version: string;
  capabilityId: string;
  status: string;
  publicModulePath: string;
  docsPath: string;
}

export interface DiscoveredService {
  serviceId: string;
  name: string;
  capabilityId: string;
  runtimeVersion: string;
  modulePath: string;
  health: string;
  status: string;
}

export interface DiscoveredRuntime {
  runtimeId: string;
  name: string;
  version: string;
  capabilities: string[];
  packagePath: string;
  status: string;
}

export interface DiscoveredVersion {
  artifactId: string;
  artifactKind: string;
  version: string;
  schemaVersion?: number;
  compatibleWith?: string[];
}

export interface DiscoveredFeature {
  featureId: string;
  platformId?: string;
  available: boolean;
  notes?: string;
}

export interface DiscoveryQuery {
  capabilityId?: string;
  contractId?: string;
  serviceId?: string;
  runtimeId?: string;
  platformId?: string;
  requireProductionReady?: boolean;
}

export interface DiscoverySnapshot {
  generatedAt: string;
  discoveryRuntimeVersion: string;
  health: DiscoveryHealth;
  capabilities: DiscoveredCapability[];
  contracts: DiscoveredContract[];
  services: DiscoveredService[];
  runtimes: DiscoveredRuntime[];
  versions: DiscoveredVersion[];
  features: DiscoveredFeature[];
  sdk: { id: string; version: string; packageName: string };
  compatibility: {
    sharedContractVersion: string;
    identityRuntimeVersion: string;
  };
}

export interface CapabilityNegotiationRequest {
  platformId: string;
  requiredCapabilities: string[];
  declaredContractVersions?: Record<string, string>;
}

export interface CapabilityNegotiationResult {
  ok: boolean;
  platformId: string;
  granted: string[];
  denied: Array<{ capabilityId: string; reason: string }>;
  warnings: string[];
}
