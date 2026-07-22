import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { DISCOVERY_RUNTIME_VERSION } from "./types";
import { DISCOVERY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/discovery-contract";

export function assessDiscoveryEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence: "buildDiscoverySnapshot, queryDiscovery, negotiateCapabilities executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `${DISCOVERY_PUBLIC_CONTRACT.contractId}@${DISCOVERY_PUBLIC_CONTRACT.version}`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "na",
      evidence:
        "Discovery is a registry-backed query runtime; durable state owned by Registry/Identity stores.",
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "validateDiscoverySnapshot + negotiation denial rules.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `DISCOVERY_RUNTIME_VERSION=${DISCOVERY_RUNTIME_VERSION}; contract 1.0.0.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence: "docs/platform/DISCOVERY_RUNTIME.md + consumer notes in SDK docs.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence: "Vitest discovery suite (query, negotiate, gates).",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence: "@stankings/platform-sdk DiscoveryClient + createPlatformSdk().discovery",
      gaps: [],
    },
  ];
  return evaluateEightGates("capability_discovery", gates, assessedAt);
}
