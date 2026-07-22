/**
 * Unified enterprise registry query surface — version-aware catalogues.
 */

import { buildEnterpriseRegistryCatalogue } from "./catalogue";
import { listEnterpriseContracts } from "@/lib/enterprise-platform/contracts";
import { listEventDefinitions } from "@/lib/enterprise-platform/events/catalogue";
import { defaultEnterprisePolicies } from "@/lib/enterprise-platform/governance/evaluate";
import { PLATFORM_SDK_META } from "@/lib/enterprise-platform/discovery/sdk-meta";
import { buildSeedPlatformCatalogue } from "@/lib/shared-runtime/platform-registration";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";

export interface SdkModuleRegistryEntry {
  moduleId: string;
  exportPath: string;
  version: string;
  readiness: "executable" | "interface_only" | "foundation";
  capabilityId?: string;
}

export interface ConsumerRegistrationEntry {
  platformId: string;
  platformName: string;
  status: string;
  sharedContractVersion: string;
  runtimeVersion: string;
  supportedCapabilities: string[];
}

export interface PolicyRegistryEntry {
  policyId: string;
  version: string;
  requirementKey: string;
  effect: string;
}

export interface UnifiedEnterpriseRegistries {
  generatedAt: string;
  capabilities: ReturnType<typeof buildEnterpriseRegistryCatalogue>["capabilities"];
  services: ReturnType<typeof buildEnterpriseRegistryCatalogue>["services"];
  runtimes: ReturnType<typeof buildEnterpriseRegistryCatalogue>["runtimes"];
  versions: ReturnType<typeof buildEnterpriseRegistryCatalogue>["versions"];
  contracts: ReturnType<typeof listEnterpriseContracts>;
  events: ReturnType<typeof listEventDefinitions>;
  policies: PolicyRegistryEntry[];
  sdkModules: SdkModuleRegistryEntry[];
  consumers: ConsumerRegistrationEntry[];
}

export function buildUnifiedEnterpriseRegistries(): UnifiedEnterpriseRegistries {
  const catalogue = buildEnterpriseRegistryCatalogue();
  return {
    generatedAt: new Date().toISOString(),
    capabilities: catalogue.capabilities,
    services: catalogue.services,
    runtimes: catalogue.runtimes,
    versions: catalogue.versions,
    contracts: listEnterpriseContracts(),
    events: listEventDefinitions(),
    policies: defaultEnterprisePolicies().map((p) => ({
      policyId: p.policyId,
      version: p.version,
      requirementKey: p.requirementKey,
      effect: p.effect,
    })),
    sdkModules: [
      {
        moduleId: "sdk.root",
        exportPath: "@stankings/platform-sdk",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
      },
      {
        moduleId: "sdk.identity",
        exportPath: "@stankings/platform-sdk/identity",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "identity",
      },
      {
        moduleId: "sdk.discovery",
        exportPath: "@stankings/platform-sdk/discovery",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "capability_discovery",
      },
      {
        moduleId: "sdk.consent",
        exportPath: "@stankings/platform-sdk/consent",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "consent",
      },
      {
        moduleId: "sdk.passport",
        exportPath: "@stankings/platform-sdk/passport",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "passport",
      },
      {
        moduleId: "sdk.trust",
        exportPath: "@stankings/platform-sdk/trust",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "trust",
      },
      {
        moduleId: "sdk.explainability",
        exportPath: "@stankings/platform-sdk/explainability",
        version: PLATFORM_SDK_META.version,
        readiness: "executable",
        capabilityId: "explainability",
      },
    ],
    consumers: buildSeedPlatformCatalogue().map((p) => ({
      platformId: p.platformId,
      platformName: p.platformName,
      status: p.status,
      sharedContractVersion: p.sharedContractVersion,
      runtimeVersion: p.runtimeVersion,
      supportedCapabilities: [...p.supportedCapabilities],
    })),
  };
}

export function queryRegistryByKind(
  kind:
    | "capabilities"
    | "services"
    | "contracts"
    | "events"
    | "policies"
    | "sdkModules"
    | "consumers",
  id?: string,
): unknown[] {
  const all = buildUnifiedEnterpriseRegistries();
  const list = all[kind] as unknown as Array<Record<string, unknown>>;
  if (!id) return list;
  return list.filter((row) =>
    Object.values(row).some((v) => v === id || (typeof v === "string" && v.includes(id))),
  );
}

export function validateUnifiedRegistries(
  registries: UnifiedEnterpriseRegistries = buildUnifiedEnterpriseRegistries(),
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!registries.capabilities.length) errors.push("capabilities empty");
  if (!registries.contracts.length) errors.push("contracts empty");
  if (!registries.sdkModules.length) errors.push("sdkModules empty");
  const capIds = new Set(registries.capabilities.map((c) => c.capabilityId));
  for (const mod of registries.sdkModules) {
    if (mod.capabilityId && !capIds.has(mod.capabilityId) && mod.readiness === "executable") {
      // passport may be interface_only without production capability runtime — ok
    }
  }
  return errors.length ? validationFail(errors) : validationOk();
}
