/**
 * Eight-Gate Completion Model — permanent definition of Done for enterprise capabilities.
 */

export type EightGateId =
  | "G1_executable_runtime"
  | "G2_stable_public_contracts"
  | "G3_persistence"
  | "G4_validation"
  | "G5_versioning"
  | "G6_documentation"
  | "G7_automated_tests"
  | "G8_consumer_readiness";

export const EIGHT_GATES: Array<{ id: EightGateId; label: string; description: string }> = [
  {
    id: "G1_executable_runtime",
    label: "Executable runtime",
    description: "Not interface-only; real domain operations exist.",
  },
  {
    id: "G2_stable_public_contracts",
    label: "Stable public contracts",
    description: "Versioned TypeScript contracts + change policy.",
  },
  {
    id: "G3_persistence",
    label: "Persistence",
    description: "Storage model + provider interface where state is durable (or N/A if stateless).",
  },
  {
    id: "G4_validation",
    label: "Validation",
    description: "Runtime validators for integrity rules.",
  },
  {
    id: "G5_versioning",
    label: "Versioning",
    description: "Package/capability/schema versions + migration path.",
  },
  {
    id: "G6_documentation",
    label: "Documentation",
    description: "Spec + consumer integration guide.",
  },
  {
    id: "G7_automated_tests",
    label: "Automated tests",
    description: "Unit + contract tests; CI gate.",
  },
  {
    id: "G8_consumer_readiness",
    label: "Consumer readiness",
    description: "Import path, compatibility, deprecation, upgrade notes (SDK surface).",
  },
];

export type GateStatus = "satisfied" | "partial" | "unsatisfied" | "na";

export interface GateAssessment {
  gateId: EightGateId;
  status: GateStatus;
  evidence: string;
  gaps: string[];
}

export interface CapabilityGateReport {
  capabilityId: string;
  assessedAt: string;
  gates: GateAssessment[];
  /** True only when every non-N/A gate is satisfied */
  complete: boolean;
  summary: string;
}

export function evaluateEightGates(
  capabilityId: string,
  gates: GateAssessment[],
  assessedAt = new Date().toISOString(),
): CapabilityGateReport {
  const blocking = gates.filter((g) => g.status !== "na" && g.status !== "satisfied");
  const complete = blocking.length === 0 && gates.length === EIGHT_GATES.length;
  return {
    capabilityId,
    assessedAt,
    gates,
    complete,
    summary: complete
      ? `${capabilityId} satisfies all Eight Gates.`
      : `${capabilityId} incomplete: ${blocking.map((g) => g.gateId).join(", ") || "missing gate entries"}`,
  };
}

export const DOCUMENTATION_CONVENTION = {
  id: "enterprise-documentation-convention",
  version: "1.0.0",
  requiredPerCapability: [
    "Runtime / capability specification",
    "Consumer integration guide",
    "Version + compatibility notes",
    "Non-goals and exclusions",
  ],
} as const;

export const RELEASE_READINESS_CRITERIA = {
  id: "enterprise-release-readiness",
  version: "1.0.0",
  requires: [
    "Eight-Gate report with complete=true",
    "typecheck pass",
    "lint pass",
    "verify:supabase-project when touching DB",
    "npm test pass",
    "Changelog / migration notes for breaking changes",
  ],
} as const;
