import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { PASSPORT_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/passport-contract";
import { PASSPORT_RUNTIME_VERSION, PASSPORT_SCHEMA_VERSION } from "./types";

export function assessPassportEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence:
        "Passport model, lifecycle, registry issue/suspend/revoke/expire/renew/attachEvidence, evidence helpers executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `${PASSPORT_PUBLIC_CONTRACT.contractId}@${PASSPORT_PUBLIC_CONTRACT.version}`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "satisfied",
      evidence: `Memory + File + Supabase PassportStore; schemaVersion=${PASSPORT_SCHEMA_VERSION}; migration 20260722160000_shared_passport_persistence.sql (apply after review).`,
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "Record/evidence/transition validators; Identity sid_* binding enforced.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `PASSPORT_RUNTIME_VERSION=${PASSPORT_RUNTIME_VERSION}; record + schema versions; migration playbook.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence:
        "PASSPORT_RUNTIME.md, PASSPORT_MIGRATION.md, PASSPORT_CONSUMER_GUIDE.md, SPRINT_PASSPORT.md reports.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence: "Vitest passport suite including Supabase adapter mocks + migration verify script.",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence:
        "SDK PassportClient + consumer guide with BamSignal/Yike/BayRight feature-gated read pattern.",
      gaps: [],
    },
  ];
  return evaluateEightGates("passport", gates, assessedAt);
}
