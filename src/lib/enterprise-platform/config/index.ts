/**
 * Platform configuration & feature management.
 */

import { defaultFeatureGates, isFeatureEnabled } from "@/lib/enterprise-platform/governance";
import { SHARED_PLATFORM_CONTRACT } from "@/lib/shared-platform/contract";
import { IDENTITY_PROVIDER } from "@/lib/shared-runtime/federation/model";
import { checkContractCompatibility } from "@/lib/enterprise-platform/quality/versioning";

export type EnvironmentProfile = "development" | "staging" | "production";

export interface PlatformDefaults {
  sharedContractVersion: string;
  identityRuntimeVersion: string;
  discoveryRuntimeVersion: string;
  consentRuntimeVersion: string;
  sdkVersion: string;
}

export interface ConsumerOverrides {
  platformId: string;
  featureFlags?: Record<string, boolean>;
  capabilityToggles?: Record<string, boolean>;
  declaredContractVersions?: Record<string, string>;
  environment?: EnvironmentProfile;
}

export interface RuntimeConfiguration {
  environment: EnvironmentProfile;
  defaults: PlatformDefaults;
  overrides?: ConsumerOverrides;
  featureFlags: Record<string, boolean>;
  capabilityToggles: Record<string, boolean>;
}

export function platformDefaults(sdkVersion = "1.3.0"): PlatformDefaults {
  return {
    sharedContractVersion: SHARED_PLATFORM_CONTRACT.version,
    identityRuntimeVersion: IDENTITY_PROVIDER.runtimeVersion,
    discoveryRuntimeVersion: "1.0.0",
    consentRuntimeVersion: "1.0.0",
    sdkVersion,
  };
}

export function buildRuntimeConfiguration(
  overrides?: ConsumerOverrides,
  environment: EnvironmentProfile = "development",
): RuntimeConfiguration {
  const gates = defaultFeatureGates();
  const featureFlags: Record<string, boolean> = {};
  for (const g of gates) {
    featureFlags[g.featureId] = g.enabled;
  }
  if (overrides?.featureFlags) {
    Object.assign(featureFlags, overrides.featureFlags);
  }

  const capabilityToggles: Record<string, boolean> = {
    identity: true,
    capability_discovery: true,
    consent: true,
    passport: true,
    trust: false,
    explainability: false,
    ...(overrides?.capabilityToggles ?? {}),
  };

  return {
    environment: overrides?.environment ?? environment,
    defaults: platformDefaults(),
    overrides,
    featureFlags,
    capabilityToggles,
  };
}

export function isCapabilityEnabled(
  config: RuntimeConfiguration,
  capabilityId: string,
): boolean {
  return config.capabilityToggles[capabilityId] === true;
}

export function isConfigFeatureEnabled(
  config: RuntimeConfiguration,
  featureId: string,
): boolean {
  if (featureId in config.featureFlags) return config.featureFlags[featureId] === true;
  return isFeatureEnabled(featureId);
}

export function negotiateConfigCompatibility(
  config: RuntimeConfiguration,
  declaredSharedContractVersion: string,
): { ok: boolean; reason?: string } {
  const check = checkContractCompatibility(
    declaredSharedContractVersion,
    config.defaults.sharedContractVersion,
  );
  return check.compatible
    ? { ok: true }
    : { ok: false, reason: check.reason };
}

export const PLATFORM_CONFIGURATION = {
  id: "enterprise-platform-configuration",
  version: "1.0.0",
  docsPath: "docs/platform/PLATFORM_CONFIGURATION.md",
} as const;
