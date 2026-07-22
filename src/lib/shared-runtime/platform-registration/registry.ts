/**
 * Platform registration — executable registration + validation.
 * Expanded: metadata, readiness, health, features, federation compatibility.
 */

import type { SharedCapabilityId } from "@/lib/shared-platform/contract";
import {
  SHARED_CAPABILITY_CONTRACTS,
  SHARED_PLATFORM_CONTRACT,
} from "@/lib/shared-platform/contract";
import type {
  ConsumerPlatformDescriptor,
  FederatedPlatformStatus,
  FederatedPlatformType,
  PlatformFeatureAvailability,
  PlatformHealthStatus,
  PlatformRuntimeReadiness,
} from "@/lib/shared-runtime/federation/model";
import {
  assessFederationCompatibility,
  IDENTITY_PROVIDER,
} from "@/lib/shared-runtime/federation/model";

export interface PlatformRegistrationInput {
  platformId: string;
  platformName: string;
  platformType: FederatedPlatformType;
  status?: FederatedPlatformStatus;
  supportedCapabilities: SharedCapabilityId[];
  registryVersion: string;
  runtimeVersion: string;
  sharedContractVersion?: string;
  metadata?: Record<string, string>;
  runtimeReadiness?: PlatformRuntimeReadiness;
  healthStatus?: PlatformHealthStatus;
  features?: PlatformFeatureAvailability[];
  /** When true (default), reject registration if federationCompatible is false */
  requireFederationCompatible?: boolean;
}

export interface PlatformRegistrationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  platform?: ConsumerPlatformDescriptor;
}

const PLATFORM_TYPES: FederatedPlatformType[] = [
  "hq",
  "product",
  "subsidiary",
  "programme",
  "infrastructure",
];

const KNOWN_CAPABILITIES = new Set(SHARED_CAPABILITY_CONTRACTS.map((c) => c.id));

const READINESS: PlatformRuntimeReadiness[] = [
  "interface_only",
  "prototype",
  "compatible",
  "production",
];

const HEALTH: PlatformHealthStatus[] = [
  "unknown",
  "healthy",
  "degraded",
  "unavailable",
  "unregistered",
];

export function validatePlatformRegistration(
  input: PlatformRegistrationInput,
): PlatformRegistrationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!/^[a-z][a-z0-9-]{1,63}$/.test(input.platformId ?? "")) {
    errors.push("platformId must be kebab-case (2–64 chars)");
  }
  if (!input.platformName?.trim()) errors.push("platformName is required");
  if (!PLATFORM_TYPES.includes(input.platformType)) {
    errors.push(`platformType must be one of: ${PLATFORM_TYPES.join(", ")}`);
  }
  if (!input.registryVersion?.trim()) errors.push("registryVersion is required");
  if (!input.runtimeVersion?.trim()) errors.push("runtimeVersion is required");

  const contractVersion = input.sharedContractVersion ?? SHARED_PLATFORM_CONTRACT.version;
  if (contractVersion !== SHARED_PLATFORM_CONTRACT.version) {
    errors.push(
      `sharedContractVersion must be ${SHARED_PLATFORM_CONTRACT.version} (got ${contractVersion})`,
    );
  }

  if (!Array.isArray(input.supportedCapabilities) || input.supportedCapabilities.length === 0) {
    errors.push("supportedCapabilities must be a non-empty array");
  } else {
    for (const cap of input.supportedCapabilities) {
      if (!KNOWN_CAPABILITIES.has(cap)) {
        errors.push(`unknown capability: ${cap}`);
      }
    }
  }

  if (input.runtimeReadiness && !READINESS.includes(input.runtimeReadiness)) {
    errors.push(`runtimeReadiness must be one of: ${READINESS.join(", ")}`);
  }
  if (input.healthStatus && !HEALTH.includes(input.healthStatus)) {
    errors.push(`healthStatus must be one of: ${HEALTH.join(", ")}`);
  }
  for (const f of input.features ?? []) {
    if (!f.featureId?.trim()) errors.push("features[].featureId is required");
  }

  if (errors.length) return { valid: false, errors, warnings };

  const draft: ConsumerPlatformDescriptor = {
    platformId: input.platformId,
    platformName: input.platformName.trim(),
    platformType: input.platformType,
    status: input.status ?? "registered",
    supportedCapabilities: [...input.supportedCapabilities],
    registryVersion: input.registryVersion,
    runtimeVersion: input.runtimeVersion,
    sharedContractVersion: contractVersion,
    metadata: input.metadata ? { ...input.metadata } : undefined,
    runtimeReadiness: input.runtimeReadiness ?? "prototype",
    healthStatus: input.healthStatus ?? "unknown",
    features: input.features ? [...input.features] : undefined,
  };

  const federationCompatibility = assessFederationCompatibility(draft);
  draft.federationCompatibility = federationCompatibility;

  if (!federationCompatibility.federationCompatible) {
    const msg = `federation incompatible: ${(federationCompatibility.reasons ?? []).join("; ")}`;
    if (input.requireFederationCompatible !== false) {
      errors.push(msg);
    } else {
      warnings.push(msg);
    }
  }

  if (errors.length) return { valid: false, errors, warnings };

  return { valid: true, errors: [], warnings, platform: draft };
}

export function registerPlatform(
  input: PlatformRegistrationInput,
  catalogue: ConsumerPlatformDescriptor[] = [],
):
  | {
      ok: true;
      platform: ConsumerPlatformDescriptor;
      catalogue: ConsumerPlatformDescriptor[];
      warnings: string[];
    }
  | { ok: false; errors: string[]; warnings: string[] } {
  const result = validatePlatformRegistration(input);
  if (!result.valid || !result.platform) {
    return { ok: false, errors: result.errors, warnings: result.warnings };
  }
  if (catalogue.some((p) => p.platformId === result.platform!.platformId)) {
    return {
      ok: false,
      errors: [`platform already registered: ${result.platform.platformId}`],
      warnings: result.warnings,
    };
  }
  return {
    ok: true,
    platform: result.platform,
    catalogue: [...catalogue, result.platform],
    warnings: result.warnings,
  };
}

/** Seed registrations for known ecosystem platforms (declarative, not live sync). */
export const SEED_PLATFORM_REGISTRATIONS: PlatformRegistrationInput[] = [
  {
    platformId: "stankings-hq",
    platformName: "Stankings HQ",
    platformType: "hq",
    status: "active",
    supportedCapabilities: [
      "identity",
      "registry_access",
      "platform_status",
      "capability_discovery",
    ],
    registryVersion: "1.1.0",
    runtimeVersion: IDENTITY_PROVIDER.runtimeVersion,
    runtimeReadiness: "prototype",
    healthStatus: "healthy",
    features: [
      { featureId: "identity-persistence", available: true },
      { featureId: "hq-subject-mapping", available: true },
      { featureId: "federation-sync", available: false, notes: "pull model contracts only" },
    ],
    metadata: { role: "canonical-hq", owner: "Stankings Legacy Ltd" },
  },
  {
    platformId: "bamsignal",
    platformName: "BamSignal",
    platformType: "product",
    supportedCapabilities: ["identity", "passport", "trust", "consent", "registry_access"],
    registryVersion: "1.0.0",
    runtimeVersion: "pending",
    runtimeReadiness: "interface_only",
    healthStatus: "unknown",
    features: [{ featureId: "consume-shared-identity", available: false }],
    metadata: { product: "BamSignal" },
  },
  {
    platformId: "yike",
    platformName: "Yike",
    platformType: "product",
    supportedCapabilities: ["identity", "passport", "trust", "explainability", "registry_access"],
    registryVersion: "1.0.0",
    runtimeVersion: "pending",
    runtimeReadiness: "interface_only",
    healthStatus: "unknown",
    features: [{ featureId: "consume-shared-identity", available: false }],
    metadata: { product: "Yike" },
  },
  {
    platformId: "bayright",
    platformName: "BayRight",
    platformType: "product",
    supportedCapabilities: ["identity", "passport", "trust", "consent", "registry_access"],
    registryVersion: "1.0.0",
    runtimeVersion: "pending",
    runtimeReadiness: "interface_only",
    healthStatus: "unknown",
    features: [{ featureId: "consume-shared-identity", available: false }],
    metadata: { product: "BayRight" },
  },
];

export function buildSeedPlatformCatalogue(): ConsumerPlatformDescriptor[] {
  let catalogue: ConsumerPlatformDescriptor[] = [];
  for (const input of SEED_PLATFORM_REGISTRATIONS) {
    const result = registerPlatform(input, catalogue);
    if (!result.ok) {
      throw new Error(`Seed platform registration failed: ${result.errors.join("; ")}`);
    }
    catalogue = result.catalogue;
  }
  return catalogue;
}

export function getPlatformRegistrationIntegrity(
  catalogue: readonly ConsumerPlatformDescriptor[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const p of catalogue) {
    if (seen.has(p.platformId)) errors.push(`duplicate platformId: ${p.platformId}`);
    seen.add(p.platformId);
    const check = validatePlatformRegistration({
      platformId: p.platformId,
      platformName: p.platformName,
      platformType: p.platformType,
      status: p.status,
      supportedCapabilities: p.supportedCapabilities,
      registryVersion: p.registryVersion,
      runtimeVersion: p.runtimeVersion,
      sharedContractVersion: p.sharedContractVersion,
      metadata: p.metadata,
      runtimeReadiness: p.runtimeReadiness,
      healthStatus: p.healthStatus,
      features: p.features,
      requireFederationCompatible: true,
    });
    if (!check.valid) {
      errors.push(...check.errors.map((e) => `${p.platformId}: ${e}`));
    }
  }
  return { valid: errors.length === 0, errors };
}
