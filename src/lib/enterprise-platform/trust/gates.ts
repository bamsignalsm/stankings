import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { TRUST_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/trust-contract";
import { TRUST_RUNTIME_VERSION, TRUST_SCHEMA_VERSION } from "./types";

export function assessTrustEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence:
        "Trust model, policy engine, registry assess/reassess/invalidate/ingestEvidence, evidence helpers executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `${TRUST_PUBLIC_CONTRACT.contractId}@${TRUST_PUBLIC_CONTRACT.version}`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "satisfied",
      evidence: `Memory + File + Supabase TrustStore; schemaVersion=${TRUST_SCHEMA_VERSION}; migration 20260722180000_shared_trust_persistence.sql.`,
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "Assessment/evidence/policy/transition validators; Identity sid_* + Passport binding enforced.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `TRUST_RUNTIME_VERSION=${TRUST_RUNTIME_VERSION}; assessment + policy versions; migration playbook.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence:
        "TRUST_RUNTIME.md, TRUST_MIGRATION.md, TRUST_CONSUMER_GUIDE.md, SPRINT_TRUST.md reports.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence: "Vitest trust suite including policy evaluation + Supabase adapter mocks + migration verify.",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence:
        "SDK TrustClient + consumer guide with BamSignal/Yike/BayRight feature-gated assess pattern.",
      gaps: [],
    },
  ];
  return evaluateEightGates("trust", gates, assessedAt);
}
