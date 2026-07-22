/**
 * Executable Capability / Service / Runtime / Version registries.
 */

import {
  SHARED_CAPABILITY_CONTRACTS,
  SHARED_PLATFORM_CONTRACT,
} from "@/lib/shared-platform/contract";
import { IDENTITY_PROVIDER } from "@/lib/shared-runtime/federation/model";
import { QUALITY_FOUNDATION } from "@/lib/enterprise-platform/quality";
import { ENTERPRISE_EVENT_FOUNDATION } from "@/lib/enterprise-platform/events";
import type {
  CapabilityRegistryEntry,
  EnterpriseRegistryCatalogue,
  RuntimeRegistryEntry,
  ServiceRegistryEntry,
  VersionRegistryEntry,
} from "./types";

/** Keep aligned with SHARED_RUNTIME_FOUNDATION.version (avoid circular barrel imports). */
const SHARED_RUNTIME_VERSION = "1.0.0";

export function buildCapabilityRegistry(): CapabilityRegistryEntry[] {
  return SHARED_CAPABILITY_CONTRACTS.map((c) => {
    let runtimeVersion = "0.0.0";
    if (c.id === "identity") runtimeVersion = IDENTITY_PROVIDER.runtimeVersion;
    else if (
      c.id === "consent" ||
      c.id === "passport" ||
      c.id === "trust" ||
      c.id === "explainability" ||
      c.id === "capability_discovery"
    ) {
      runtimeVersion = "1.0.0";
    } else if (c.runtimeReadiness === "prototype") {
      runtimeVersion = "0.0.0-prototype";
    }
    return {
      capabilityId: c.id,
      name: c.name,
      owner: c.owner,
      status: c.maturity === "deprecated" ? "deprecated" : "active",
      contractVersion: SHARED_PLATFORM_CONTRACT.version,
      runtimeVersion,
      runtimeReadiness: c.runtimeReadiness,
      dependsOn: [...c.dependsOn],
      consumers: [...c.consumers],
      docsPath: c.docsPath,
    };
  });
}

export function buildServiceRegistry(): ServiceRegistryEntry[] {
  return [
    {
      serviceId: "svc-shared-identity",
      name: "Shared Identity Runtime",
      capabilityId: "identity",
      status: "active",
      runtimeVersion: IDENTITY_PROVIDER.runtimeVersion,
      modulePath: "src/lib/shared-runtime/identity",
      health: "healthy",
    },
    {
      serviceId: "svc-identity-persistence",
      name: "Identity Persistence",
      capabilityId: "identity",
      status: "active",
      runtimeVersion: IDENTITY_PROVIDER.runtimeVersion,
      modulePath: "src/lib/shared-runtime/persistence",
      health: "healthy",
    },
    {
      serviceId: "svc-platform-registration",
      name: "Platform Registration",
      capabilityId: "platform_status",
      status: "forming",
      runtimeVersion: IDENTITY_PROVIDER.runtimeVersion,
      modulePath: "src/lib/shared-runtime/platform-registration",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-discovery",
      name: "Enterprise Discovery Runtime",
      capabilityId: "capability_discovery",
      status: "active",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/discovery",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-consent",
      name: "Enterprise Consent Runtime",
      capabilityId: "consent",
      status: "active",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/consent",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-passport",
      name: "Enterprise Passport Runtime",
      capabilityId: "passport",
      status: "active",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/passport",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-trust",
      name: "Enterprise Trust Runtime",
      capabilityId: "trust",
      status: "active",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/trust",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-explainability",
      name: "Enterprise Explainability Runtime",
      capabilityId: "explainability",
      status: "active",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/explainability",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-governance",
      name: "Enterprise Governance Foundation",
      capabilityId: "platform_status",
      status: "forming",
      runtimeVersion: "1.0.0",
      modulePath: "src/lib/enterprise-platform/governance",
      health: "healthy",
    },
    {
      serviceId: "svc-enterprise-events",
      name: "Enterprise Event Foundation",
      capabilityId: "capability_discovery",
      status: "active",
      runtimeVersion: ENTERPRISE_EVENT_FOUNDATION.version,
      modulePath: "src/lib/enterprise-platform/events",
      health: "healthy",
    },
    {
      serviceId: "svc-quality-foundation",
      name: "Quality Foundation",
      capabilityId: "capability_discovery",
      status: "active",
      runtimeVersion: QUALITY_FOUNDATION.version,
      modulePath: "src/lib/enterprise-platform/quality",
      health: "healthy",
    },
  ];
}

export function buildRuntimeRegistry(): RuntimeRegistryEntry[] {
  return [
    {
      runtimeId: "shared-runtime-foundation",
      name: "Shared Runtime Foundation",
      version: SHARED_RUNTIME_VERSION,
      capabilities: ["identity", "registry_access", "platform_status", "capability_discovery"],
      status: "forming",
      packagePath: "src/lib/shared-runtime",
    },
    {
      runtimeId: "enterprise-platform-quality",
      name: "Enterprise Quality Foundation",
      version: QUALITY_FOUNDATION.version,
      capabilities: ["capability_discovery"],
      status: "active",
      packagePath: "src/lib/enterprise-platform/quality",
    },
    {
      runtimeId: "enterprise-passport-runtime",
      name: "Enterprise Passport Runtime",
      version: "1.0.0",
      capabilities: ["passport"],
      status: "active",
      packagePath: "src/lib/enterprise-platform/passport",
    },
    {
      runtimeId: "enterprise-trust-runtime",
      name: "Enterprise Trust Runtime",
      version: "1.0.0",
      capabilities: ["trust"],
      status: "active",
      packagePath: "src/lib/enterprise-platform/trust",
    },
    {
      runtimeId: "enterprise-explainability-runtime",
      name: "Enterprise Explainability Runtime",
      version: "1.0.0",
      capabilities: ["explainability"],
      status: "active",
      packagePath: "src/lib/enterprise-platform/explainability",
    },
    {
      runtimeId: "enterprise-event-foundation",
      name: "Enterprise Event Foundation",
      version: ENTERPRISE_EVENT_FOUNDATION.version,
      capabilities: ["capability_discovery"],
      status: "forming",
      packagePath: "src/lib/enterprise-platform/events",
    },
  ];
}

export function buildVersionRegistry(): VersionRegistryEntry[] {
  return [
    {
      artifactId: "shared-platform-contract",
      artifactKind: "contract",
      version: SHARED_PLATFORM_CONTRACT.version,
      notes: "Cross-cutting contract for ecosystem platforms",
    },
    {
      artifactId: "shared-runtime-foundation",
      artifactKind: "runtime",
      version: SHARED_RUNTIME_VERSION,
      compatibleWith: [SHARED_PLATFORM_CONTRACT.version],
    },
    {
      artifactId: "identity-runtime",
      artifactKind: "runtime",
      version: IDENTITY_PROVIDER.runtimeVersion,
      schemaVersion: 1,
      compatibleWith: [SHARED_PLATFORM_CONTRACT.version],
    },
    {
      artifactId: "passport-runtime",
      artifactKind: "runtime",
      version: "1.0.0",
      schemaVersion: 1,
      compatibleWith: [SHARED_PLATFORM_CONTRACT.version],
    },
    {
      artifactId: "trust-runtime",
      artifactKind: "runtime",
      version: "1.0.0",
      schemaVersion: 1,
      compatibleWith: [SHARED_PLATFORM_CONTRACT.version],
    },
    {
      artifactId: "explainability-runtime",
      artifactKind: "runtime",
      version: "1.0.0",
      schemaVersion: 1,
      compatibleWith: [SHARED_PLATFORM_CONTRACT.version],
    },
    {
      artifactId: "quality-foundation",
      artifactKind: "runtime",
      version: QUALITY_FOUNDATION.version,
    },
    {
      artifactId: "enterprise-event-envelope",
      artifactKind: "schema",
      version: ENTERPRISE_EVENT_FOUNDATION.version,
      schemaVersion: 1,
    },
    {
      artifactId: "company-registry",
      artifactKind: "registry",
      version: "1.1.0",
    },
    {
      artifactId: "platform-inventory-registry",
      artifactKind: "registry",
      version: "1.1.0",
      notes: "Inventory status ≠ runtime readiness",
    },
  ];
}

export function buildEnterpriseRegistryCatalogue(): EnterpriseRegistryCatalogue {
  return {
    capabilities: buildCapabilityRegistry(),
    services: buildServiceRegistry(),
    runtimes: buildRuntimeRegistry(),
    versions: buildVersionRegistry(),
  };
}
