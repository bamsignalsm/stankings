/**
 * Platform Assessment (PLAT)
 * Architectural gate derived from CANON-012 — Executive Decision No. 14
 */

export const PLAT_FRAMEWORK = {
  identifier: "FRAMEWORK-PLAT-001",
  title: "Platform Assessment",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-002",
    "CANON-005",
    "CANON-009",
    "CANON-011",
    "CANON-012",
    "LEX-PLATFORM",
    "LS-001",
  ],
} as const;

export const PLAT_PURPOSE = `Every new technical capability proposed within Stankings Group shall be evaluated for platform reuse before implementation.

The Platform Assessment operationalizes CANON-012 — Build Platforms, Not Silos.

Engineers must know what already exists, who owns it, and who consumes it — before building another silo.`;

export const PLAT_PLATFORM_TEST =
  "Can another institution already provide this? Can this become a shared platform? Will reuse strengthen the ecosystem?";

export const PLAT_ASSESSMENT_QUESTIONS = [
  {
    id: "exists",
    label: "Does an equivalent capability already exist?",
    description: "Consult the Platform Registry and ecosystem map before greenfield development.",
  },
  {
    id: "shared",
    label: "Can this become a shared platform?",
    description: "If multiple institutions will need it, build for reuse from day one.",
  },
  {
    id: "beneficiaries",
    label: "Which institutions will benefit?",
    description: "Name current and future consumers explicitly.",
  },
  {
    id: "owner",
    label: "Who owns and governs this platform?",
    description: "Clear ownership — Group Platform or designated institution.",
  },
  {
    id: "apis",
    label: "What APIs or services should it expose?",
    description: "Interoperable contracts for ecosystem adoption.",
  },
  {
    id: "adoption",
    label: "How will future institutions adopt it?",
    description: "Onboarding path, documentation, and governance model.",
  },
] as const;

export type PlatformAssessmentVerdict = "reuse" | "extend_platform" | "new_platform" | "rejected_silo";

export interface PlatformAssessment {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  requestingInstitution: string;
  equivalentExists: boolean;
  existingPlatform?: string;
  canBecomeShared: boolean;
  institutionsBenefiting: string[];
  proposedOwner: string;
  proposedApis: string[];
  adoptionPath: string;
  verdict: PlatformAssessmentVerdict;
  canonReferences: string[];
  notes: string;
}

export const PLAT_EXAMPLE_REUSE: PlatformAssessment = {
  id: "plat-yike-auth",
  proposalTitle: "Yike member login and verification",
  proposalSummary: "Authentication for Yike marketplace buyers and sellers.",
  requestingInstitution: "Yike",
  equivalentExists: true,
  existingPlatform: "Identity Platform",
  canBecomeShared: false,
  institutionsBenefiting: ["Yike"],
  proposedOwner: "Group Platform (existing)",
  proposedApis: ["Identity API", "Stankings Passport API"],
  adoptionPath: "Consume existing Identity Platform — extend only Yike-specific marketplace roles.",
  verdict: "reuse",
  canonReferences: ["CANON-012", "CANON-002"],
  notes: "No bespoke auth stack. One passport across ecosystem journeys.",
};

export const PLAT_EXAMPLE_NEW: PlatformAssessment = {
  id: "plat-bayright-escrow",
  proposalTitle: "BayRight escrow and settlement platform",
  proposalSummary: "Financial escrow for high-trust marketplace and property transactions.",
  requestingInstitution: "BayRight",
  equivalentExists: false,
  canBecomeShared: true,
  institutionsBenefiting: ["Yike", "Stanhan", "Stankings Auto Hub", "Future marketplaces"],
  proposedOwner: "BayRight",
  proposedApis: ["Escrow API", "Payment API", "Settlement API"],
  adoptionPath:
    "BayRight owns platform; institutions onboard via Payment API with Trust Platform verification gates.",
  verdict: "new_platform",
  canonReferences: ["CANON-012", "CANON-005", "CANON-002"],
  notes: "BayRight is the payments platform — not just another company. Every institution consumes.",
};

export const PLAT_EXAMPLE_REJECT: PlatformAssessment = {
  id: "plat-auto-notifications",
  proposalTitle: "Auto Hub standalone SMS notification service",
  proposalSummary: "Custom SMS gateway built only for Auto Hub inspection alerts.",
  requestingInstitution: "Stankings Auto Hub",
  equivalentExists: true,
  existingPlatform: "Notification Platform (planned)",
  canBecomeShared: true,
  institutionsBenefiting: ["All Companies"],
  proposedOwner: "Group Platform",
  proposedApis: ["Notification API"],
  adoptionPath: "Wait for Group Notification Platform; contribute requirements — do not build silo.",
  verdict: "rejected_silo",
  canonReferences: ["CANON-012", "CANON-011"],
  notes: "Rejected isolated build. Contribute to shared Notification Platform roadmap instead.",
};

export const PLATFORM_ASSESSMENT_EXAMPLES: PlatformAssessment[] = [
  PLAT_EXAMPLE_REUSE,
  PLAT_EXAMPLE_NEW,
  PLAT_EXAMPLE_REJECT,
];
