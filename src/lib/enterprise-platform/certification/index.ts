/**
 * Platform certification helpers — aggregate Eight-Gate + health + contract readiness.
 * Not a new enterprise runtime; certification tooling only.
 */

import { assessIdentityEightGates } from "@/lib/shared-runtime/identity/gates";
import { assessDiscoveryEightGates } from "@/lib/enterprise-platform/discovery/gates";
import { assessConsentEightGates } from "@/lib/enterprise-platform/consent/gates";
import { assessPassportEightGates } from "@/lib/enterprise-platform/passport/gates";
import { assessTrustEightGates } from "@/lib/enterprise-platform/trust/gates";
import { assessExplainabilityEightGates } from "@/lib/enterprise-platform/explainability/gates";
import { buildPlatformHealthReport } from "@/lib/enterprise-platform/observability";
import { buildUnifiedEnterpriseRegistries } from "@/lib/enterprise-platform/registry/unified";
import { PLATFORM_SDK_META } from "@/lib/enterprise-platform/discovery/sdk-meta";
import type { CapabilityGateReport } from "@/lib/enterprise-platform/quality/eight-gates";

export interface RuntimeCertificationEntry {
  capabilityId: string;
  eightGateComplete: boolean;
  healthStatus: string;
  contractId?: string;
  sdkModuleId?: string;
  report: CapabilityGateReport;
}

export interface PlatformCertificationReport {
  certifiedAt: string;
  sdkVersion: string;
  overall: "certified" | "conditional" | "not_ready";
  runtimes: RuntimeCertificationEntry[];
  healthOverall: string;
  contractCount: number;
  sdkExecutableModules: string[];
  gaps: string[];
  recommendation: "GO" | "CONDITIONAL_GO" | "NO_GO";
}

const CORE_CONTRACTS = [
  "identity.subject",
  "discovery.runtime",
  "consent.record",
  "passport.record",
  "trust.assessment",
  "explainability.record",
] as const;

const CORE_SDK_MODULES = [
  "sdk.identity",
  "sdk.discovery",
  "sdk.consent",
  "sdk.passport",
  "sdk.trust",
  "sdk.explainability",
] as const;

export function assessPlatformCertification(
  certifiedAt = new Date().toISOString(),
): PlatformCertificationReport {
  const health = buildPlatformHealthReport();
  const registries = buildUnifiedEnterpriseRegistries();
  const healthById = new Map(health.components.map((c) => [c.id, c.status]));

  const gateReports: Array<{
    capabilityId: string;
    contractId: string;
    sdkModuleId: string;
    report: CapabilityGateReport;
  }> = [
    {
      capabilityId: "identity",
      contractId: "identity.subject",
      sdkModuleId: "sdk.identity",
      report: assessIdentityEightGates(certifiedAt),
    },
    {
      capabilityId: "capability_discovery",
      contractId: "discovery.runtime",
      sdkModuleId: "sdk.discovery",
      report: assessDiscoveryEightGates(certifiedAt),
    },
    {
      capabilityId: "consent",
      contractId: "consent.record",
      sdkModuleId: "sdk.consent",
      report: assessConsentEightGates(certifiedAt),
    },
    {
      capabilityId: "passport",
      contractId: "passport.record",
      sdkModuleId: "sdk.passport",
      report: assessPassportEightGates(certifiedAt),
    },
    {
      capabilityId: "trust",
      contractId: "trust.assessment",
      sdkModuleId: "sdk.trust",
      report: assessTrustEightGates(certifiedAt),
    },
    {
      capabilityId: "explainability",
      contractId: "explainability.record",
      sdkModuleId: "sdk.explainability",
      report: assessExplainabilityEightGates(certifiedAt),
    },
  ];

  const runtimes: RuntimeCertificationEntry[] = gateReports.map((g) => ({
    capabilityId: g.capabilityId === "capability_discovery" ? "discovery" : g.capabilityId,
    eightGateComplete: g.report.complete,
    healthStatus: healthById.get(
      g.capabilityId === "capability_discovery" ? "discovery" : g.capabilityId,
    ) ?? "unknown",
    contractId: g.contractId,
    sdkModuleId: g.sdkModuleId,
    report: g.report,
  }));

  const gaps: string[] = [];
  for (const rt of runtimes) {
    if (!rt.eightGateComplete) gaps.push(`${rt.capabilityId}: eight-gate incomplete`);
    if (rt.healthStatus !== "healthy") {
      gaps.push(`${rt.capabilityId}: health=${rt.healthStatus}`);
    }
  }
  for (const contractId of CORE_CONTRACTS) {
    if (!registries.contracts.some((c) => c.contractId === contractId)) {
      gaps.push(`missing contract ${contractId}`);
    }
  }
  for (const moduleId of CORE_SDK_MODULES) {
    const mod = registries.sdkModules.find((m) => m.moduleId === moduleId);
    if (!mod || mod.readiness !== "executable") {
      gaps.push(`sdk module not executable: ${moduleId}`);
    }
  }

  const allGates = runtimes.every((r) => r.eightGateComplete);
  const allHealthy = runtimes.every((r) => r.healthStatus === "healthy");
  const overall =
    allGates && allHealthy && gaps.length === 0
      ? "certified"
      : allGates
        ? "conditional"
        : "not_ready";

  return {
    certifiedAt,
    sdkVersion: PLATFORM_SDK_META.version,
    overall,
    runtimes,
    healthOverall: health.overall,
    contractCount: registries.contracts.length,
    sdkExecutableModules: registries.sdkModules
      .filter((m) => m.readiness === "executable")
      .map((m) => m.moduleId),
    gaps,
    recommendation:
      overall === "certified" ? "GO" : overall === "conditional" ? "CONDITIONAL_GO" : "NO_GO",
  };
}

/**
 * Consumer feature-gate helper — graceful degradation without throwing.
 */
export function isConsumerCapabilityReady(
  capabilityToggles: Record<string, boolean>,
  featureFlags: Record<string, boolean>,
  capabilityId: string,
  featureId: string,
): boolean {
  return capabilityToggles[capabilityId] === true && featureFlags[featureId] === true;
}
