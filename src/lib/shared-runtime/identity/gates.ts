/**
 * Identity Eight-Gate assessment — mark complete only with objective evidence.
 */

import {
  evaluateEightGates,
  type CapabilityGateReport,
  type GateAssessment,
} from "@/lib/enterprise-platform/quality/eight-gates";
import { IDENTITY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/identity-contract";
import { IDENTITY_RUNTIME_VERSION, IDENTITY_SCHEMA_VERSION } from "./versions";

export function assessIdentityEightGates(
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const gates: GateAssessment[] = [
    {
      gateId: "G1_executable_runtime",
      status: "satisfied",
      evidence:
        "Identity domain, lifecycle, HQ mapping, SubjectRegistry, federation, platform registration executable.",
      gaps: [],
    },
    {
      gateId: "G2_stable_public_contracts",
      status: "satisfied",
      evidence: `Enterprise Contract Framework registers ${IDENTITY_PUBLIC_CONTRACT.contractId}@${IDENTITY_PUBLIC_CONTRACT.version}; public module ${IDENTITY_PUBLIC_CONTRACT.publicModulePath}.`,
      gaps: [],
    },
    {
      gateId: "G3_persistence",
      status: "satisfied",
      evidence: `IdentityStore adapters: memory, file (durable), supabase (production path). schemaVersion=${IDENTITY_SCHEMA_VERSION}. Migration: supabase/migrations/20260722120000_shared_identity_persistence.sql. Playbook: docs/platform/IDENTITY_MIGRATION.md.`,
      gaps: [],
    },
    {
      gateId: "G4_validation",
      status: "satisfied",
      evidence: "Domain validators + mapping/lifecycle/platform/federation runtime validation.",
      gaps: [],
    },
    {
      gateId: "G5_versioning",
      status: "satisfied",
      evidence: `IDENTITY_RUNTIME_VERSION=${IDENTITY_RUNTIME_VERSION}; schema ${IDENTITY_SCHEMA_VERSION}; contract 1.0.0; Version Registry + migration playbook.`,
      gaps: [],
    },
    {
      gateId: "G6_documentation",
      status: "satisfied",
      evidence:
        "Runtime specs, persistence, federation, consumer guide, migration playbook, upgrade notes, SDK docs.",
      gaps: [],
    },
    {
      gateId: "G7_automated_tests",
      status: "satisfied",
      evidence:
        "Vitest suites: identity domain, file durability, supabase adapter (mocked), contracts, SDK client.",
      gaps: [],
    },
    {
      gateId: "G8_consumer_readiness",
      status: "satisfied",
      evidence:
        "@stankings/platform-sdk IdentityClient + createPlatformSdk + discovery/negotiation; consumer integration guide.",
      gaps: [],
    },
  ];

  return evaluateEightGates("identity", gates, assessedAt);
}
