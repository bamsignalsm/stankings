import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { CONSENT_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/discovery-contract";
import { CONSENT_RUNTIME_VERSION, CONSENT_SCHEMA_VERSION } from "./types";

export function assessConsentEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence:
        "Consent model, lifecycle, registry grant/revoke/expire, definitions, evidence helpers executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `${CONSENT_PUBLIC_CONTRACT.contractId}@${CONSENT_PUBLIC_CONTRACT.version}`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "satisfied",
      evidence: `Memory + File + Supabase ConsentStore; schemaVersion=${CONSENT_SCHEMA_VERSION}; migration 20260722140000_shared_consent_persistence.sql.`,
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "Definition/record/transition validators.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `CONSENT_RUNTIME_VERSION=${CONSENT_RUNTIME_VERSION}; record + definition versions; migration playbook.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence: "CONSENT_RUNTIME.md, CONSENT_MIGRATION.md, CONSENT_CONSUMER_GUIDE.md, upgrade notes.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence: "Vitest consent suite including Supabase adapter mocks + migration verify script.",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence: "SDK ConsentClient + consumer guide; Discovery negotiates consent@production when ready.",
      gaps: [],
    },
  ];
  return evaluateEightGates("consent", gates, assessedAt);
}
