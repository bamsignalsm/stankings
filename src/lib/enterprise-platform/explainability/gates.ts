import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { EXPLAINABILITY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/explainability-contract";
import { EXPLAINABILITY_RUNTIME_VERSION, EXPLAINABILITY_SCHEMA_VERSION } from "./types";

export function assessExplainabilityEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence:
        "Explainability model, generators for Trust/Passport/Consent, registry record/explain* operations executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `${EXPLAINABILITY_PUBLIC_CONTRACT.contractId}@${EXPLAINABILITY_PUBLIC_CONTRACT.version}`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "satisfied",
      evidence: `Memory + File + Supabase ExplainabilityStore; schemaVersion=${EXPLAINABILITY_SCHEMA_VERSION}; migration 20260722200000_shared_explainability_persistence.sql.`,
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "Explanation record validators; Identity sid_* binding enforced.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `EXPLAINABILITY_RUNTIME_VERSION=${EXPLAINABILITY_RUNTIME_VERSION}; record + schema versions; migration playbook.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence:
        "EXPLAINABILITY_RUNTIME.md, EXPLAINABILITY_MIGRATION.md, EXPLAINABILITY_CONSUMER_GUIDE.md, SPRINT_EXPLAINABILITY.md.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence: "Vitest explainability suite including generators + Supabase mocks + migration verify.",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence:
        "SDK ExplainabilityClient + consumer guide with BamSignal/Yike/BayRight feature-gated pattern.",
      gaps: [],
    },
  ];
  return evaluateEightGates("explainability", gates, assessedAt);
}
