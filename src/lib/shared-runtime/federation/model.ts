/**
 * Federation model — contracts and runtime interfaces.
 * No authentication. No OAuth.
 */

import type { SharedCapabilityId } from "@/lib/shared-platform/contract";
import { SHARED_PLATFORM_CONTRACT } from "@/lib/shared-platform/contract";

export type FederatedPlatformType =
  | "hq"
  | "product"
  | "subsidiary"
  | "programme"
  | "infrastructure";

export type FederatedPlatformStatus =
  | "forming"
  | "registered"
  | "active"
  | "suspended"
  | "retired";

export interface IdentityProviderDescriptor {
  providerId: "stankings-shared-identity";
  authority: "stankings-shared-identity";
  contractVersion: string;
  runtimeVersion: string;
}

/** Runtime readiness of the consumer relative to shared contracts */
export type PlatformRuntimeReadiness =
  | "interface_only"
  | "prototype"
  | "compatible"
  | "production";

export type PlatformHealthStatus =
  | "unknown"
  | "healthy"
  | "degraded"
  | "unavailable"
  | "unregistered";

export interface PlatformFeatureAvailability {
  featureId: string;
  available: boolean;
  notes?: string;
}

export interface FederationCompatibility {
  /** Minimum shared contract version this platform can speak */
  minSharedContractVersion: string;
  /** Identity runtime versions this platform accepts */
  acceptedIdentityRuntimeVersions: string[];
  federationCompatible: boolean;
  reasons?: string[];
}

export interface ConsumerPlatformDescriptor {
  platformId: string;
  platformName: string;
  platformType: FederatedPlatformType;
  status: FederatedPlatformStatus;
  supportedCapabilities: SharedCapabilityId[];
  registryVersion: string;
  runtimeVersion: string;
  sharedContractVersion: string;
  /** Optional extended metadata (Phase 3 expansion) */
  metadata?: Record<string, string>;
  runtimeReadiness?: PlatformRuntimeReadiness;
  healthStatus?: PlatformHealthStatus;
  features?: PlatformFeatureAvailability[];
  federationCompatibility?: FederationCompatibility;
}

export interface FederationSyncRequest {
  platformId: string;
  subjectId: string;
  /** Last known subject version at consumer */
  knownVersion: number;
}

export interface FederationSyncResult {
  subjectId: string;
  authorityVersion: number;
  action: "noop" | "update" | "conflict" | "unknown_subject";
  message: string;
}

export const IDENTITY_PROVIDER: IdentityProviderDescriptor = {
  providerId: "stankings-shared-identity",
  authority: "stankings-shared-identity",
  contractVersion: SHARED_PLATFORM_CONTRACT.version,
  runtimeVersion: "1.0.0",
};

/** Semver-like major.minor.patch compare — returns -1 / 0 / 1 */
export function compareContractVersions(a: string, b: string): number {
  const pa = a.split(".").map((n) => Number.parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    const da = pa[i] ?? 0;
    const db = pb[i] ?? 0;
    if (da < db) return -1;
    if (da > db) return 1;
  }
  return 0;
}

export function assessFederationCompatibility(
  platform: Pick<
    ConsumerPlatformDescriptor,
    "sharedContractVersion" | "runtimeVersion" | "supportedCapabilities"
  >,
  options?: {
    requiredCapabilities?: SharedCapabilityId[];
    identityRuntimeVersion?: string;
  },
): FederationCompatibility {
  const reasons: string[] = [];
  const identityRuntime = options?.identityRuntimeVersion ?? IDENTITY_PROVIDER.runtimeVersion;
  const contractOk =
    compareContractVersions(platform.sharedContractVersion, SHARED_PLATFORM_CONTRACT.version) === 0;
  if (!contractOk) {
    reasons.push(
      `sharedContractVersion ${platform.sharedContractVersion} != ${SHARED_PLATFORM_CONTRACT.version}`,
    );
  }

  const required = options?.requiredCapabilities ?? (["identity"] as SharedCapabilityId[]);
  for (const cap of required) {
    if (!platform.supportedCapabilities.includes(cap)) {
      reasons.push(`missing required capability: ${cap}`);
    }
  }

  const acceptedIdentityRuntimeVersions = [
    identityRuntime,
    "1.0.0",
    "0.3.0",
    "0.2.0",
    "0.1.0",
  ];
  const runtimeAccepted =
    platform.runtimeVersion === "pending" ||
    acceptedIdentityRuntimeVersions.includes(platform.runtimeVersion);
  if (!runtimeAccepted) {
    reasons.push(`runtimeVersion ${platform.runtimeVersion} not in accepted identity runtimes`);
  }

  return {
    minSharedContractVersion: SHARED_PLATFORM_CONTRACT.version,
    acceptedIdentityRuntimeVersions,
    federationCompatible: reasons.length === 0,
    reasons: reasons.length ? reasons : undefined,
  };
}

export const FEDERATION_RULES = [
  "Shared Identity is the sole identity authority for canonical subjectIds.",
  "Consumer platforms register before receiving federation sync.",
  "Consumers may cache subjects; authority version wins on conflict.",
  "Consumers must not mint sid_* identifiers.",
  "Conflict resolution: higher authority version wins; equal versions require Shared Identity review.",
  "Identity versioning is monotonic integers on the canonical subject.",
  "Synchronization is pull-oriented in this foundation (consumer requests sync).",
  "Authentication and OAuth are out of scope for this federation model.",
] as const;

export function resolveFederationConflict(
  authorityVersion: number,
  consumerKnownVersion: number,
): FederationSyncResult["action"] {
  if (consumerKnownVersion < 0 || authorityVersion < 1) return "conflict";
  if (consumerKnownVersion === authorityVersion) return "noop";
  if (consumerKnownVersion < authorityVersion) return "update";
  return "conflict";
}
