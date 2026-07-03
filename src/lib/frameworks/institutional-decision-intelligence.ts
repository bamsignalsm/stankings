/**
 * Institutional Decision Intelligence (IDI)
 * Derived from CANON-020 — Executive Decision No. 22
 */

export const IDI_FRAMEWORK = {
  identifier: "FRAMEWORK-IDI-001",
  title: "Institutional Decision Intelligence",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-002",
    "CANON-007",
    "CANON-009",
    "CANON-017",
    "CANON-018",
    "CANON-019",
    "CANON-020",
    "FRAMEWORK-IDR-001",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-PAR-001",
    "LEX-JUDGMENT",
    "LS-001",
  ],
} as const;

export const IDI_PURPOSE = `Every significant decision shall preserve not only what was decided, but how the institution reasoned — evidence considered, alternatives evaluated, Canons applied, and judgment exercised.

The Institutional Decision Intelligence operationalizes CANON-020 — Exercise Sound Judgment.

Over decades this becomes a searchable repository of institutional reasoning, not merely institutional decisions.`;

export const IDI_JUDGMENT_TEST =
  "Have we gathered sufficient evidence? Have we considered multiple perspectives? Are we acting consistently with our Canons? Would reasonable future custodians understand and respect this decision?";

export const IDI_AI_GUIDANCE_PRINCIPLE =
  "The relevant Canons, policies and standards indicate the following. Here are the trade-offs. A responsible decision requires human judgment.";

export const IDI_JUDGMENT_RECORD_FIELDS = [
  { id: "facts", label: "Facts Available", description: "Verified evidence, data, and observations — distinguished from assumptions." },
  { id: "assumptions", label: "Assumptions Made", description: "What was believed but not fully proven — explicit and revisable." },
  { id: "alternatives", label: "Alternatives Considered", description: "Options evaluated and why each was accepted or rejected." },
  { id: "risks", label: "Risks Identified", description: "Known risks, uncertainties, and mitigations." },
  { id: "canons", label: "Canon References", description: "Volume 0 Canons and frameworks that guided reasoning." },
  { id: "evidence-quality", label: "Evidence Quality", description: "Strength of evidence — strong, moderate, limited, or contested." },
  { id: "stakeholders", label: "Stakeholders Consulted", description: "Informed perspectives sought before decision." },
  { id: "judgment-notes", label: "Judgment Notes", description: "How principles were applied to context — the reasoning itself." },
  { id: "decision", label: "Decision", description: "What was decided — clear and accountable." },
  { id: "review", label: "Review Date", description: "When judgment and outcomes will be reassessed." },
  { id: "lessons", label: "Lessons Learned", description: "Wisdom preserved for future similar challenges." },
] as const;

export type EvidenceQuality = "strong" | "moderate" | "limited" | "contested";

export type JudgmentRecordStatus = "draft" | "approved" | "under_review" | "superseded";

export interface JudgmentRecord {
  identifier: string;
  slug: string;
  title: string;
  status: JudgmentRecordStatus;
  category: string;
  institution: string;
  factsAvailable: string[];
  assumptionsMade: string[];
  alternativesConsidered: { option: string; outcome: "selected" | "rejected" | "deferred"; rationale: string }[];
  risksIdentified: string[];
  canonReferences: string[];
  frameworkReferences: string[];
  evidenceQuality: EvidenceQuality;
  stakeholdersConsulted: string[];
  judgmentNotes: string;
  decision: string;
  reviewDate: string;
  lessonsLearned: string[];
  relatedIdr?: string;
  relatedPar?: string;
  decisionOwner: string;
  createdAt: string;
}
