/**
 * Ecosystem Impact Assessment (EIA)
 * Decision gate derived from CANON-005 — Executive Decision No. 7
 */

export const EIA_FRAMEWORK = {
  identifier: "FRAMEWORK-EIA-001",
  title: "Ecosystem Impact Assessment Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-004",
    "CANON-005",
    "LEX-ECOSYSTEM",
    "LEX-CAPABILITY",
  ],
} as const;

export const EIA_PURPOSE = `Every proposal for a new company, new division, or major product shall include an Ecosystem Impact Assessment before financial modelling and implementation.

The EIA operationalizes CANON-005 — The Ecosystem Is Greater Than Any Single Institution.

No institution shall unnecessarily duplicate the role of another. Collaboration shall be preferred over duplication.`;

export const EIA_ECOSYSTEM_TEST =
  "Does this strengthen the ecosystem? Does it duplicate an existing capability? Can another institution provide this more effectively?";

export const EXECUTIVE_DECISION_7 = `Every proposal for a new company, new division, or major product shall include an Ecosystem Impact Assessment alongside the Purpose Assessment and Trust Impact Assessment.

The assessment shall answer:

1. Which existing institutions does this strengthen?
2. Does it duplicate an existing capability?
3. Should it be a new institution or a new division of an existing one?
4. What shared platform services will it use?
5. What long-term capability does it add to the ecosystem?

Only after passing the Purpose Assessment, Trust Impact Assessment, and Ecosystem Impact Assessment should a proposal proceed to financial modelling and implementation.`;

export const EIA_SECTIONS = [
  {
    id: "strengthens",
    label: "Institutions Strengthened",
    description: "Which existing institutions benefit from this proposal?",
  },
  {
    id: "duplication",
    label: "Duplication Analysis",
    description: "Does this duplicate an existing capability? If so, why is duplication justified?",
  },
  {
    id: "structure",
    label: "Institutional Structure",
    description: "New institution vs new division of an existing one — with rationale.",
  },
  {
    id: "platforms",
    label: "Shared Platform Services",
    description: "Identity, trust, payments, verification, notifications, audit, AI, knowledge, procurement.",
  },
  {
    id: "capability",
    label: "Long-Term Capability",
    description: "What unique capability does this add to the ecosystem beyond commercial return?",
  },
  {
    id: "boundaries",
    label: "Lane & Boundaries",
    description: "What this institution will not do — explicit non-competition with siblings.",
  },
  {
    id: "canons",
    label: "Canon Alignment",
    description: "References to CANON-001 through CANON-005.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    description: "Proceed, collaborate instead, examine further, or reject.",
  },
] as const;

export interface EcosystemImpactAssessment {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  status: "draft" | "in_review" | "approved" | "rejected" | "collaborate";
  institutionsStrengthened: string[];
  duplicatesCapability: boolean;
  duplicationNotes: string;
  recommendedStructure: "new_institution" | "new_division" | "collaboration" | "reject";
  structureRationale: string;
  sharedPlatformServices: string[];
  longTermCapability: string;
  boundaries: string[];
  canonReferences: string[];
  ecosystemTestAnswer: "strengthens" | "duplicates" | "uncertain";
  recommendation: string;
}

export const EIA_EXAMPLE_APPROVED: EcosystemImpactAssessment = {
  id: "eia-auto-hub-inspection",
  proposalTitle: "Stankings Auto Hub — 100+ Point Vehicle Inspection",
  proposalSummary:
    "Flagship automotive inspection service for vehicles listed on Yike — deep automotive expertise without Yike becoming a dealership.",
  status: "approved",
  institutionsStrengthened: ["yike", "bayright", "stankings-logistics"],
  duplicatesCapability: false,
  duplicationNotes:
    "Yike provides marketplace orchestration; Auto Hub provides automotive operations. Clear lane separation.",
  recommendedStructure: "new_division",
  structureRationale: "Extends existing Auto Hub automotive excellence — not a new institution.",
  sharedPlatformServices: [
    "Identity & Stankings Passport",
    "Trust & Verification",
    "Payments Infrastructure",
    "Notifications",
  ],
  longTermCapability: "Automotive verification trust that strengthens every vehicle transaction on Yike.",
  boundaries: [
    "Will not operate a general marketplace",
    "Will not provide financial products independently of BayRight",
    "Will not compete with Logistics for general haulage",
  ],
  canonReferences: ["CANON-005", "CANON-003", "CANON-002"],
  ecosystemTestAnswer: "strengthens",
  recommendation:
    "APPROVED — Strengthens Yike without duplication. Uses shared platforms. Clear automotive lane.",
};

export const EIA_EXAMPLE_SCRUTINY: EcosystemImpactAssessment = {
  id: "eia-yike-inspection",
  proposalTitle: "Yike In-House Vehicle Inspection Team",
  proposalSummary:
    "Yike builds internal vehicle inspection capability to reduce vendor dependency.",
  status: "collaborate",
  institutionsStrengthened: ["yike"],
  duplicatesCapability: true,
  duplicationNotes:
    "Duplicates Stankings Auto Hub automotive excellence. Yike's lane is marketplace orchestration.",
  recommendedStructure: "collaboration",
  structureRationale:
    "Partner with Auto Hub as flagship vendor rather than building parallel automotive operations.",
  sharedPlatformServices: ["Trust & Verification"],
  longTermCapability: "Would add automotive operations inside a marketplace institution — lane violation.",
  boundaries: [],
  canonReferences: ["CANON-005"],
  ecosystemTestAnswer: "duplicates",
  recommendation:
    "COLLABORATE — Redirect to Auto Hub partnership. Yike strengthens ecosystem by orchestrating, not operating.",
};

export const EIA_EXAMPLES = [EIA_EXAMPLE_APPROVED, EIA_EXAMPLE_SCRUTINY] as const;
