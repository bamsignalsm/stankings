/**
 * Leadership Stewardship Framework (LSF)
 * Derived from CANON-004 — every leadership role requires a stewardship plan.
 */

export const LSF_FRAMEWORK = {
  identifier: "FRAMEWORK-LSF-001",
  title: "Leadership Stewardship Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: ["CANON-001", "CANON-002", "CANON-003", "CANON-004", "LEX-CUSTODIAN", "LEX-STEWARDSHIP"],
} as const;

export const LSF_PURPOSE = `Every leadership role within the Stankings ecosystem shall have a documented stewardship plan.

No leadership position should exist without clarity on mission, responsibilities, successor development, knowledge transfer, and institutional health contribution.

The Custodian Programme will not create executives. It will create stewards.`;

export const LSF_STEWARDSHIP_TEST =
  "Will this decision leave the institution stronger? Will those who follow inherit better systems, stronger people and greater trust?";

export const EXECUTIVE_DECISION_6 = `Every major leadership appointment within the Stankings ecosystem shall answer four questions:

1. Does this person demonstrate competence?
2. Does this person strengthen institutional trust?
3. Does this person develop other people?
4. Will the institution likely be stronger after their period of stewardship?

If those questions cannot be answered positively, the appointment deserves further scrutiny.`;

export const LSF_ROLE_REQUIREMENTS = [
  { id: "mission", label: "Mission of the role", description: "Why this leadership position exists within the institution." },
  { id: "stewardship", label: "Stewardship responsibilities", description: "Custodial duties per CANON-004." },
  { id: "successor", label: "Successor development plan", description: "Who is being prepared to follow; timeline and milestones." },
  { id: "knowledge", label: "Knowledge transfer checklist", description: "Documentation, systems, and relationships to transfer." },
  { id: "annual", label: "Annual stewardship review", description: "Structured review of institutional health contribution." },
  { id: "metrics", label: "Institutional health metrics", description: "Measurable indicators beyond personal performance." },
  { id: "trust", label: "Trust Impact contribution", description: "How this role strengthens institutional trust (CANON-002)." },
  { id: "canons", label: "Canon references", description: "Alignment with CANON-001 through CANON-004." },
] as const;

export interface StewardshipAppointmentReview {
  id: string;
  roleTitle: string;
  candidateSummary: string;
  status: "approved" | "scrutiny" | "rejected";
  competence: boolean;
  strengthensTrust: boolean;
  developsPeople: boolean;
  leavesStronger: boolean;
  canonReferences: string[];
  recommendation: string;
}

export const LSF_EXAMPLE_APPROVED: StewardshipAppointmentReview = {
  id: "lsf-cto-example",
  roleTitle: "Chief Technology Officer",
  candidateSummary:
    "Demonstrated system documentation, successor mentoring, and security stewardship across core platform.",
  status: "approved",
  competence: true,
  strengthensTrust: true,
  developsPeople: true,
  leavesStronger: true,
  canonReferences: ["CANON-004", "CANON-002", "CANON-001"],
  recommendation:
    "APPROVED — Passes Executive Decision No. 6. Stewardship plan documented with successor development and knowledge transfer checklist.",
};

export const LSF_EXAMPLE_SCRUTINY: StewardshipAppointmentReview = {
  id: "lsf-director-example",
  roleTitle: "Division Director (External Hire)",
  candidateSummary:
    "Strong commercial track record; limited evidence of developing successors or documenting institutional knowledge.",
  status: "scrutiny",
  competence: true,
  strengthensTrust: true,
  developsPeople: false,
  leavesStronger: false,
  canonReferences: ["CANON-004"],
  recommendation:
    "FURTHER SCRUTINY — Questions 3 and 4 require satisfactory answers before appointment. Stewardship plan mandatory within 90 days if appointed.",
};

export const LSF_EXAMPLES = [LSF_EXAMPLE_APPROVED, LSF_EXAMPLE_SCRUTINY];

export type LeadershipRoleLevel =
  | "ceo"
  | "director"
  | "trustee"
  | "manager"
  | "team_lead"
  | "custodian";

export const LSF_GOVERNED_ROLES: { level: LeadershipRoleLevel; label: string }[] = [
  { level: "ceo", label: "CEO" },
  { level: "director", label: "Director" },
  { level: "trustee", label: "Trustee" },
  { level: "manager", label: "Manager" },
  { level: "team_lead", label: "Team Lead" },
  { level: "custodian", label: "Future Custodian" },
];
