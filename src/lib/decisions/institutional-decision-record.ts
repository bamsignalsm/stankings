/**
 * Institutional Decision Record (IDR)
 * Operational system derived from CANON-007 — Executive Decision No. 9
 */

export const IDR_FRAMEWORK = {
  identifier: "FRAMEWORK-IDR-001",
  title: "Institutional Decision Record",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-004",
    "CANON-005",
    "CANON-006",
    "CANON-007",
    "LEX-TRUTH",
    "LEX-TRUST",
    "LS-001",
  ],
} as const;

export const IDR_PURPOSE = `Every significant decision shall be captured as an Institutional Decision Record — preserving not only what was decided, but why.

The IDR operationalizes CANON-007 — Truth Before Convenience.

Institutional memory of reasoning enables future custodians to learn across generations instead of repeating mistakes.`;

export const IDR_TRUTH_TEST =
  "Are we responding to reality or merely to what we wish were true? Have we examined evidence carefully?";

export const EXECUTIVE_DECISION_9 = `Every major architectural, governance, engineering or strategic decision shall produce an Institutional Decision Record.

Years later, future custodians should be able to understand:

• What was decided.
• Why it was decided.
• Which Canons guided it.
• What assumptions were made.
• Whether the decision achieved its intended outcome.

That is how institutions learn across generations instead of repeating the same mistakes.`;

export const IDR_MANDATORY_TRIGGERS = [
  "Architecture and technology platform",
  "Governance and constitutional matters",
  "Engineering standards and security",
  "Strategic direction and acquisitions",
  "Major product and institutional commitments",
] as const;

export const IDR_REQUIRED_FIELDS = [
  { id: "statement", label: "Decision statement", description: "What was decided — stated clearly and without ambiguity." },
  { id: "evidence", label: "Evidence considered", description: "Facts, data, audits, and research examined before the decision." },
  { id: "alternatives", label: "Alternatives evaluated", description: "Options considered and why they were accepted or rejected." },
  { id: "risks", label: "Risks identified", description: "Known risks, uncertainties, and mitigations." },
  { id: "canons", label: "Canon references", description: "Which Canons and frameworks guided this decision." },
  { id: "owner", label: "Decision owner", description: "Accountable individual for the decision and its outcomes." },
  { id: "approvals", label: "Approval history", description: "Who approved, when, and on what basis." },
  { id: "outcomes", label: "Expected outcomes", description: "What success looks like — measurable where possible." },
  { id: "review", label: "Review date", description: "When the decision shall be re-evaluated against reality." },
  { id: "lessons", label: "Lessons learned", description: "Post-decision reflection — updated as outcomes emerge." },
] as const;

export type IDRStatus = "draft" | "approved" | "under_review" | "superseded";
export type IDROutcomeStatus = "pending" | "achieved" | "partial" | "not_achieved";

export interface IDRApprovalEntry {
  date: string;
  approver: string;
  role: string;
  action: "proposed" | "approved" | "amended" | "noted";
  notes?: string;
}

export interface InstitutionalDecisionRecord {
  identifier: string;
  title: string;
  status: IDRStatus;
  category: (typeof IDR_MANDATORY_TRIGGERS)[number];
  decisionStatement: string;
  evidenceConsidered: string[];
  alternativesEvaluated: { option: string; outcome: "selected" | "rejected" | "deferred"; rationale: string }[];
  risksIdentified: string[];
  canonReferences: string[];
  frameworkReferences: string[];
  decisionOwner: string;
  approvalHistory: IDRApprovalEntry[];
  expectedOutcomes: string[];
  assumptions: string[];
  reviewDate: string;
  lessonsLearned: string[];
  outcomeStatus: IDROutcomeStatus;
  outcomeNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export const IDR_EXAMPLE_IKI: InstitutionalDecisionRecord = {
  identifier: "IDR-IKI-001",
  title: "IKI — Institutional Knowledge Infrastructure Naming",
  status: "approved",
  category: "Architecture and technology platform",
  decisionStatement:
    "Internally, the platform shall be named IKI (Institutional Knowledge Infrastructure). The Stankings Library is one module within IKI, not the whole system.",
  evidenceConsidered: [
    "Library alone understates decision engines, graph, lexicon, and governance modules",
    "Single Source of Truth principle requires one authoritative knowledge layer",
    "Future custodians need clear internal vs external naming",
  ],
  alternativesEvaluated: [
    { option: "Library as platform name", outcome: "rejected", rationale: "Library is a module; IKI is the infrastructure." },
    { option: "No internal name — use Library only", outcome: "rejected", rationale: "Creates confusion as IKI modules expand." },
    { option: "IKI as internal platform name", outcome: "selected", rationale: "Accurate, scalable, distinguishes internal architecture from public Library." },
  ],
  risksIdentified: [
    "Team confusion during transition — mitigated by documentation and rules",
    "Over-engineering branding before delivery — mitigated by phased rollout",
  ],
  canonReferences: ["CANON-007", "CANON-006", "CANON-001"],
  frameworkReferences: ["LS-001"],
  decisionOwner: "Stanley Ukeje",
  approvalHistory: [
    { date: "2026-06-27", approver: "Stanley Ukeje", role: "Founder", action: "proposed", notes: "Executive Decision No. 4" },
    { date: "2026-06-27", approver: "Library Council", role: "Governance", action: "approved" },
  ],
  expectedOutcomes: [
    "Consistent internal references to IKI across engineering and governance",
    "Library module clearly scoped within broader infrastructure",
    "Decision records and knowledge objects traceable to IKI",
  ],
  assumptions: [
    "Internal naming does not require public rebrand",
    "IKI modules will grow beyond current Library scope",
  ],
  reviewDate: "2027-06-27",
  lessonsLearned: [
    "Philosophy must become operational — naming enabled clearer system architecture.",
  ],
  outcomeStatus: "achieved",
  outcomeNotes: "IKI referenced across graph, health dashboard, and institutional rules.",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const IDR_EXAMPLE_GATES: InstitutionalDecisionRecord = {
  identifier: "IDR-GATES-001",
  title: "Four-Gate Proposal Workflow (PAF → TIA → EIA → GRF)",
  status: "approved",
  category: "Governance and constitutional matters",
  decisionStatement:
    "Every major proposal shall pass four assessment gates — Purpose, Trust Impact, Ecosystem Impact, and Generational Review — before financial modelling and implementation.",
  evidenceConsidered: [
    "Volume 0 Canons 002–006 each imply distinct decision dimensions",
    "Institutions fail when only financial analysis gates proposals",
    "Future custodians need traceable rationale for why proposals were approved",
  ],
  alternativesEvaluated: [
    { option: "Financial review only", outcome: "rejected", rationale: "Ignores trust, purpose, ecosystem, and generational impact." },
    { option: "PAF and TIA only", outcome: "rejected", rationale: "Insufficient — ecosystem and generational dimensions added in Canons 005–006." },
    { option: "PAF → TIA → EIA → GRF", outcome: "selected", rationale: "Complete institutional decision stack per Volume 0." },
  ],
  risksIdentified: [
    "Process friction — mitigated by clear frameworks and examples",
    "Gate bypass under deadline pressure — mitigated by Executive Decisions and IDR accountability",
  ],
  canonReferences: ["CANON-007", "CANON-006", "CANON-005", "CANON-003", "CANON-002"],
  frameworkReferences: ["FRAMEWORK-PAF-001", "FRAMEWORK-TIA-001", "FRAMEWORK-EIA-001", "FRAMEWORK-GRF-001"],
  decisionOwner: "Library Council",
  approvalHistory: [
    { date: "2026-06-27", approver: "Stanley Ukeje", role: "Founder", action: "proposed" },
    { date: "2026-06-27", approver: "Library Council", role: "Governance", action: "approved", notes: "Executive Decision No. 5" },
  ],
  expectedOutcomes: [
    "Proposals documented with evidence across four dimensions",
    "Reduced institutional decisions driven by convenience alone",
    "Traceable canon alignment in every major initiative",
  ],
  assumptions: [
    "Frameworks remain accessible to all proposal authors",
    "Council reviews enforce gates rather than rubber-stamping",
  ],
  reviewDate: "2027-06-27",
  lessonsLearned: [],
  outcomeStatus: "partial",
  outcomeNotes: "Frameworks operational; IDR system now captures decision rationale per Canon 007.",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const IDR_EXAMPLE_SECURITY: InstitutionalDecisionRecord = {
  identifier: "IDR-SEC-001",
  title: "Security Vulnerability Disclosure — Reward Early Reporting",
  status: "approved",
  category: "Engineering standards and security",
  decisionStatement:
    "Engineers who responsibly disclose security vulnerabilities shall be recognized and protected — never penalized for truth-telling.",
  evidenceConsidered: [
    "CANON-007 — problems identified early rather than hidden",
    "Industry precedent: institutions that punish disclosure lose internal reporting",
    "CANON-002 — trust damaged when flaws are concealed",
  ],
  alternativesEvaluated: [
    { option: "Silent fixing without acknowledgment", outcome: "rejected", rationale: "Discourages future reporting; hides institutional learning." },
    { option: "Blame culture for discoverers", outcome: "rejected", rationale: "Destroys truth-telling culture per Canon 007." },
    { option: "Reward and protect reporters", outcome: "selected", rationale: "Truth before convenience — strengthens long-term security." },
  ],
  risksIdentified: [
    "False positives — mitigated by responsible disclosure process",
    "External disclosure before fix — mitigated by clear escalation path",
  ],
  canonReferences: ["CANON-007", "CANON-002", "CANON-004"],
  frameworkReferences: [],
  decisionOwner: "Chief Technology Officer",
  approvalHistory: [
    { date: "2026-06-27", approver: "Library Council", role: "Governance", action: "approved" },
  ],
  expectedOutcomes: [
    "Increased early vulnerability reports",
    "Reduced time-to-remediation for security flaws",
    "Engineering culture aligned with Truth Test",
  ],
  assumptions: [
    "Disclosure process is documented and accessible",
    "Leadership consistently reinforces non-retaliation",
  ],
  reviewDate: "2027-06-27",
  lessonsLearned: [],
  outcomeStatus: "pending",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const INSTITUTIONAL_DECISION_RECORDS: InstitutionalDecisionRecord[] = [
  IDR_EXAMPLE_IKI,
  IDR_EXAMPLE_GATES,
  IDR_EXAMPLE_SECURITY,
];

export function getDecisionRecord(identifier: string): InstitutionalDecisionRecord | undefined {
  return INSTITUTIONAL_DECISION_RECORDS.find((r) => r.identifier === identifier);
}

export function getAllDecisionRecords(): InstitutionalDecisionRecord[] {
  return INSTITUTIONAL_DECISION_RECORDS;
}
