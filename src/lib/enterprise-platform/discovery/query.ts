/**
 * Discovery query + negotiation — executable runtime.
 */

import { SHARED_PLATFORM_CONTRACT } from "@/lib/shared-platform/contract";
import { IDENTITY_PROVIDER } from "@/lib/shared-runtime/federation/model";
import { buildSeedPlatformCatalogue } from "@/lib/shared-runtime/platform-registration";
import { buildEnterpriseRegistryCatalogue } from "@/lib/enterprise-platform/registry/catalogue";
import { listEnterpriseContracts } from "@/lib/enterprise-platform/contracts";
import { PLATFORM_SDK_META } from "@/lib/enterprise-platform/discovery/sdk-meta";
import type {
  CapabilityNegotiationRequest,
  CapabilityNegotiationResult,
  DiscoveredCapability,
  DiscoveredContract,
  DiscoveredFeature,
  DiscoveryHealth,
  DiscoveryQuery,
  DiscoverySnapshot,
} from "./types";
import { DISCOVERY_RUNTIME_VERSION } from "./types";
import { validateDiscoverySnapshot } from "./validation";

function mapCapabilities(): DiscoveredCapability[] {
  return buildEnterpriseRegistryCatalogue().capabilities.map((c) => ({
    capabilityId: c.capabilityId,
    name: c.name,
    runtimeReadiness: c.runtimeReadiness,
    runtimeVersion: c.runtimeVersion,
    contractVersion: c.contractVersion,
    dependsOn: [...c.dependsOn],
    docsPath: c.docsPath,
    status: c.status,
  }));
}

function mapContracts(): DiscoveredContract[] {
  return listEnterpriseContracts().map((c) => ({
    contractId: c.contractId,
    version: c.version,
    capabilityId: c.capabilityId,
    status: c.status,
    publicModulePath: c.publicModulePath,
    docsPath: c.docsPath,
  }));
}

function mapFeatures(): DiscoveredFeature[] {
  const features: DiscoveredFeature[] = [];
  for (const p of buildSeedPlatformCatalogue()) {
    for (const f of p.features ?? []) {
      features.push({
        featureId: f.featureId,
        platformId: p.platformId,
        available: f.available,
        notes: f.notes,
      });
    }
  }
  return features;
}

export function assessDiscoveryHealth(): DiscoveryHealth {
  const caps = mapCapabilities();
  if (!caps.some((c) => c.capabilityId === "identity")) return "unavailable";
  if (!listEnterpriseContracts().length) return "degraded";
  return "healthy";
}

export function buildDiscoverySnapshot(): DiscoverySnapshot {
  const catalogue = buildEnterpriseRegistryCatalogue();
  const snapshot: DiscoverySnapshot = {
    generatedAt: new Date().toISOString(),
    discoveryRuntimeVersion: DISCOVERY_RUNTIME_VERSION,
    health: assessDiscoveryHealth(),
    capabilities: mapCapabilities(),
    contracts: mapContracts(),
    services: catalogue.services.map((s) => ({
      serviceId: s.serviceId,
      name: s.name,
      capabilityId: s.capabilityId,
      runtimeVersion: s.runtimeVersion,
      modulePath: s.modulePath,
      health: s.health,
      status: s.status,
    })),
    runtimes: catalogue.runtimes.map((r) => ({
      runtimeId: r.runtimeId,
      name: r.name,
      version: r.version,
      capabilities: [...r.capabilities],
      packagePath: r.packagePath,
      status: r.status,
    })),
    versions: catalogue.versions.map((v) => ({
      artifactId: v.artifactId,
      artifactKind: v.artifactKind,
      version: v.version,
      schemaVersion: v.schemaVersion,
      compatibleWith: v.compatibleWith ? [...v.compatibleWith] : undefined,
    })),
    features: mapFeatures(),
    sdk: {
      id: PLATFORM_SDK_META.id,
      version: PLATFORM_SDK_META.version,
      packageName: "@stankings/platform-sdk",
    },
    compatibility: {
      sharedContractVersion: SHARED_PLATFORM_CONTRACT.version,
      identityRuntimeVersion: IDENTITY_PROVIDER.runtimeVersion,
    },
  };
  const check = validateDiscoverySnapshot(snapshot);
  if (!check.valid) {
    snapshot.health = "degraded";
  }
  return snapshot;
}

export function queryDiscovery(query: DiscoveryQuery = {}): DiscoverySnapshot {
  const full = buildDiscoverySnapshot();
  let capabilities = full.capabilities;
  let contracts = full.contracts;
  let services = full.services;
  let runtimes = full.runtimes;
  let features = full.features;

  if (query.capabilityId) {
    capabilities = capabilities.filter((c) => c.capabilityId === query.capabilityId);
    services = services.filter((s) => s.capabilityId === query.capabilityId);
    contracts = contracts.filter((c) => c.capabilityId === query.capabilityId);
  }
  if (query.requireProductionReady) {
    capabilities = capabilities.filter((c) => c.runtimeReadiness === "production");
  }
  if (query.contractId) {
    contracts = contracts.filter((c) => c.contractId === query.contractId);
  }
  if (query.serviceId) {
    services = services.filter((s) => s.serviceId === query.serviceId);
  }
  if (query.runtimeId) {
    runtimes = runtimes.filter((r) => r.runtimeId === query.runtimeId);
  }
  if (query.platformId) {
    features = features.filter((f) => f.platformId === query.platformId);
  }

  return {
    ...full,
    capabilities,
    contracts,
    services,
    runtimes,
    features,
  };
}

export function negotiateCapabilities(
  request: CapabilityNegotiationRequest,
): CapabilityNegotiationResult {
  const snap = buildDiscoverySnapshot();
  const byId = new Map(snap.capabilities.map((c) => [c.capabilityId, c]));
  const granted: string[] = [];
  const denied: Array<{ capabilityId: string; reason: string }> = [];
  const warnings: string[] = [];

  if (!request.platformId?.trim()) {
    return {
      ok: false,
      platformId: request.platformId ?? "",
      granted: [],
      denied: [{ capabilityId: "*", reason: "platformId required" }],
      warnings,
    };
  }

  for (const capId of request.requiredCapabilities) {
    const cap = byId.get(capId);
    if (!cap) {
      denied.push({ capabilityId: capId, reason: "unknown capability" });
      continue;
    }
    if (cap.runtimeReadiness === "interface_only" || cap.runtimeReadiness === "contract_only") {
      denied.push({
        capabilityId: capId,
        reason: `not production-ready (${cap.runtimeReadiness})`,
      });
      continue;
    }
    if (cap.runtimeReadiness === "prototype") {
      warnings.push(`${capId} is prototype — dogfood only`);
    }
    const declared = request.declaredContractVersions?.[capId];
    if (declared) {
      const contract = snap.contracts.find((c) => c.capabilityId === capId);
      if (contract && declared.split(".")[0] !== contract.version.split(".")[0]) {
        denied.push({
          capabilityId: capId,
          reason: `contract major mismatch declared=${declared} available=${contract.version}`,
        });
        continue;
      }
    }
    granted.push(capId);
  }

  return {
    ok: denied.length === 0,
    platformId: request.platformId,
    granted,
    denied,
    warnings,
  };
}
