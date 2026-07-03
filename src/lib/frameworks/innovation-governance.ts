/**
 * Innovation Governance Framework (IGF)
 * Derived from CANON-013 — Executive Decision No. 15
 */

export const IGF_FRAMEWORK = {
  identifier: "FRAMEWORK-IGF-001",
  title: "Innovation Governance Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-002",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-009",
    "CANON-011",
    "CANON-012",
    "CANON-013",
    "LEX-INNOVATION",
    "LS-001",
  ],
} as const;

export const IGF_PURPOSE = `Every significant innovation within Stankings Group shall be governed — not constrained — through disciplined review before resources are committed.

The Innovation Governance Framework operationalizes CANON-013 — Innovate with Purpose.

Innovation becomes a practice with gates, evidence, and learning — not a slogan on a wall.`;

export const IGF_INNOVATION_TEST =
  "What meaningful problem does this solve? Who benefits? Does it strengthen trust? Can it be maintained responsibly? Does it align with our Canons?";

export const IGF_INTEGRATED_GATEWAYS = [
  {
    id: "paf",
    label: "Purpose Assessment",
    framework: "FRAMEWORK-PAF-001",
    href: "/library/frameworks/purpose-assessment",
    role: "Why should this innovation exist?",
  },
  {
    id: "tia",
    label: "Trust Impact Assessment",
    framework: "FRAMEWORK-TIA-001",
    href: "/library/frameworks/trust-impact-assessment",
    role: "Will this strengthen or weaken institutional trust?",
  },
  {
    id: "eia",
    label: "Ecosystem Impact Assessment",
    framework: "FRAMEWORK-EIA-001",
    href: "/library/frameworks/ecosystem-impact-assessment",
    role: "Does this strengthen the ecosystem without duplication?",
  },
  {
    id: "grf",
    label: "Generational Review",
    framework: "FRAMEWORK-GRF-001",
    href: "/library/frameworks/generational-review",
    role: "Will this strengthen the institution for those who come after us?",
  },
  {
    id: "sr",
    label: "Simplicity Review",
    framework: "FRAMEWORK-SR-001",
    href: "/library/frameworks/simplicity-review",
    role: "Does this innovation reduce unnecessary complexity?",
  },
  {
    id: "plat",
    label: "Platform Assessment",
    framework: "FRAMEWORK-PLAT-001",
    href: "/library/frameworks/platform-assessment",
    role: "Can existing platforms be reused or extended?",
  },
] as const;

export const IGF_REVIEW_FIELDS = [
  {
    id: "problem",
    label: "Problem Statement",
    description: "What meaningful problem does this innovation solve? Be specific.",
  },
  {
    id: "customer-value",
    label: "Customer Value",
    description: "Who benefits and how? Quantify where possible.",
  },
  {
    id: "strategic-alignment",
    label: "Strategic Alignment",
    description: "How does this align with institutional mission and strategy?",
  },
  {
    id: "canon-alignment",
    label: "Canon Alignment",
    description: "Which Canons guide this innovation? Document alignment explicitly.",
  },
  {
    id: "trust-impact",
    label: "Trust Impact",
    description: "Complete TIA — will trust strengthen or weaken?",
  },
  {
    id: "platform-reuse",
    label: "Platform Reuse Assessment",
    description: "Consult Platform Registry — reuse before building.",
  },
  {
    id: "technical-feasibility",
    label: "Technical Feasibility",
    description: "Can this be built and operated with current or planned capabilities?",
  },
  {
    id: "security-privacy",
    label: "Security & Privacy Review",
    description: "Data handling, consent, and security implications documented.",
  },
  {
    id: "maintainability",
    label: "Long-Term Maintainability",
    description: "Can this be sustained responsibly over years, not just launched?",
  },
  {
    id: "pilot-plan",
    label: "Pilot Plan",
    description: "Controlled experiment design — scope, duration, participants, oversight.",
  },
  {
    id: "success-metrics",
    label: "Success Metrics",
    description: "Objective measures that determine whether to scale or retire.",
  },
  {
    id: "exit-strategy",
    label: "Exit Strategy",
    description: "How unsuccessful experiments are discontinued without harm.",
  },
  {
    id: "lessons-learned",
    label: "Lessons Learned Capture",
    description: "How experience becomes institutional knowledge via LLR.",
  },
] as const;

export type InnovationGovernanceVerdict =
  | "pilot_approved"
  | "refine_required"
  | "declined"
  | "scale_approved";

export interface InnovationGovernanceReview {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  requestingInstitution: string;
  technology: string;
  problemStatement: string;
  customerValue: string;
  canonReferences: string[];
  trustImpact: "strengthens" | "neutral" | "weakens" | "requires_mitigation";
  platformReuse: string;
  pilotPlan: string;
  successMetrics: string[];
  exitStrategy: string;
  verdict: InnovationGovernanceVerdict;
  notes: string;
}

export const IGF_EXAMPLE_AI: InnovationGovernanceReview = {
  id: "igf-ai-verification",
  proposalTitle: "AI-assisted document verification for marketplace listings",
  proposalSummary:
    "Machine learning to pre-screen property and vehicle documents before human review.",
  requestingInstitution: "Yike",
  technology: "Artificial Intelligence",
  problemStatement:
    "Manual document review creates delays and inconsistent fraud detection at scale.",
  customerValue:
    "Faster listing approval, stronger fraud protection, transparent verification status.",
  canonReferences: ["CANON-013", "CANON-002", "CANON-011", "CANON-012"],
  trustImpact: "strengthens",
  platformReuse: "Trust Platform + AI Platform — extend, do not rebuild.",
  pilotPlan:
    "90-day pilot on 500 listings with human-in-the-loop override and consent disclosure.",
  successMetrics: [
    "Fraud detection rate vs baseline",
    "False positive rate under 2%",
    "Average approval time reduction",
    "Customer trust survey score",
  ],
  exitStrategy:
    "Revert to manual review; remove AI flags from UI; LLR within 30 days.",
  verdict: "pilot_approved",
  notes: "Passes Innovation Test. Controlled experiment before institutional infrastructure.",
};

export const IGF_EXAMPLE_DECLINE: InnovationGovernanceReview = {
  id: "igf-blockchain-titles",
  proposalTitle: "Blockchain property title registry",
  proposalSummary:
    "Distributed ledger for property ownership records across Stanhan developments.",
  requestingInstitution: "Stanhan",
  technology: "Blockchain",
  problemStatement:
    "Proposed as industry trend — unclear customer problem beyond 'modernization'.",
  customerValue:
    "Theoretical immutability — existing verification and BayRight escrow already solve trust.",
  canonReferences: ["CANON-013", "CANON-003", "CANON-011"],
  trustImpact: "requires_mitigation",
  platformReuse: "Trust Platform and BayRight escrow sufficient — would add complexity.",
  pilotPlan: "Not recommended — refine problem statement first.",
  successMetrics: ["N/A — declined at governance review"],
  exitStrategy: "N/A — proposal declined before pilot.",
  verdict: "declined",
  notes:
    "Polite decline. Does not pass Innovation Test — novelty without meaningful problem. Revisit if customer need emerges.",
};

export const IGF_EXAMPLE_SCALE: InnovationGovernanceReview = {
  id: "igf-iki-librarian",
  proposalTitle: "Institutional AI Librarian on IKI",
  proposalSummary:
    "Retrieval-augmented AI answering canon and framework questions for custodians.",
  requestingInstitution: "Stankings Library / IKI",
  technology: "Artificial Intelligence",
  problemStatement:
    "Custodians and engineers need authoritative answers from institutional knowledge.",
  customerValue:
    "Faster onboarding, consistent canon interpretation, reduced misinformation.",
  canonReferences: ["CANON-013", "CANON-009", "CANON-007", "CANON-012"],
  trustImpact: "strengthens",
  platformReuse: "Knowledge Platform + planned AI Platform — canonical retrieval only.",
  pilotPlan:
    "Completed 6-month pilot with Library Council oversight — metrics exceeded thresholds.",
  successMetrics: [
    "Answer accuracy vs human librarian baseline",
    "Citation correctness 98%+",
    "Custodian satisfaction score",
    "Zero unauthorized knowledge exposure incidents",
  ],
  exitStrategy: "Pilot complete — scaling approved with permission boundaries.",
  verdict: "scale_approved",
  notes:
    "Demonstrated benefit. Scale deliberately via AI Platform with institution-specific permissions.",
};

export const IGF_EXAMPLE_REVIEWS: InnovationGovernanceReview[] = [
  IGF_EXAMPLE_AI,
  IGF_EXAMPLE_DECLINE,
  IGF_EXAMPLE_SCALE,
];
