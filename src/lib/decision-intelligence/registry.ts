/**
 * Institutional Decision Intelligence (IDI)
 * Judgment Records per CANON-020 / FRAMEWORK-IDI-001
 */

import type { JudgmentRecord } from "@/lib/frameworks/institutional-decision-intelligence";

export type { JudgmentRecord };

export const JUDGMENT_REGISTRY: JudgmentRecord[] = [
  {
    identifier: "JR-BAMBET-001",
    slug: "bambet-decline-judgment",
    title: "Decline BamBet — gambling platform opportunity",
    status: "approved",
    category: "Strategic / new company",
    institution: "Stankings Group",
    factsAvailable: [
      "Gambling revenue projections significant within existing user base",
      "Trust-oriented ecosystem identity central to Yike, BayRight, BamSignal strategy",
      "PAR completed with multiple Canon conflicts documented",
      "Industry evidence: gambling creates long-term trust tension for family-oriented platforms",
    ],
    assumptionsMade: [
      "Ecosystem trust is more valuable long-term than gambling revenue",
      "Future custodians would inherit compromised identity if approved",
    ],
    alternativesConsidered: [
      { option: "Launch BamBet with safeguards", outcome: "rejected", rationale: "Safeguards do not resolve fundamental principle conflicts with trust identity." },
      { option: "Partner externally without Stankings brand", outcome: "rejected", rationale: "Ecosystem association remains; PAR conflicts persist." },
      { option: "Decline opportunity", outcome: "selected", rationale: "Principles before opportunity — CANON-018; judgment applies Canons to context." },
    ],
    risksIdentified: [
      "Short-term revenue foregone",
      "Competitor captures gambling market",
      "Precedent for declining high-revenue opportunities",
    ],
    canonReferences: ["CANON-020", "CANON-018", "CANON-002", "CANON-003", "CANON-010", "CANON-017"],
    frameworkReferences: ["FRAMEWORK-PAR-001", "FRAMEWORK-PAF-001", "FRAMEWORK-TIA-001"],
    evidenceQuality: "strong",
    stakeholdersConsulted: [
      "Founder",
      "Library Council",
      "Yike leadership",
      "BayRight compliance",
    ],
    judgmentNotes:
      "No policy explicitly forbade gambling — judgment required applying Canons to unprecedented revenue opportunity. Commercial attractiveness insufficient per CANON-018. Future custodians should understand: trust-oriented identity is strategic asset worth protecting.",
    decision: "Decline BamBet proposal. Document reasoning in PAR and Judgment Record for institutional memory.",
    reviewDate: "2031-06-27",
    lessonsLearned: [
      "When policy is silent, Canons + judgment decide",
      "Revenue without principle erodes identity gradually",
      "Document reasoning so future leaders need not ask what founder would do",
    ],
    relatedPar: "par-bambet-declined",
    decisionOwner: "Stanley Ukeje",
    createdAt: "2026-06-27",
  },
  {
    identifier: "JR-YIKE-VER-001",
    slug: "yike-verification-judgment",
    title: "Yike Trust Verification — phased rollout judgment",
    status: "approved",
    category: "Product / major launch",
    institution: "Yike",
    factsAvailable: [
      "Fraud incidents documented (INC-YIKE-001)",
      "URF demonstrates measurable uncertainty reduction",
      "PAR shows full Canon alignment",
      "Pilot markets show 34% fraud reduction",
    ],
    assumptionsMade: [
      "Verification friction acceptable if trust gains are communicated clearly",
      "Platform capabilities (Identity, Trust) scale to national rollout",
    ],
    alternativesConsidered: [
      { option: "Mandatory verification day one nationwide", outcome: "rejected", rationale: "Insufficient operational capacity; risks seller exodus." },
      { option: "Optional verification only", outcome: "rejected", rationale: "Fails to reduce uncertainty meaningfully for buyers." },
      { option: "Phased rollout with privacy review", outcome: "selected", rationale: "Balances speed, evidence, and stakeholder readiness." },
    ],
    risksIdentified: [
      "Seller friction during onboarding",
      "Privacy concerns on document storage",
      "Uneven verification across regions during phase",
    ],
    canonReferences: ["CANON-020", "CANON-017", "CANON-019", "CANON-002", "CANON-011"],
    frameworkReferences: ["FRAMEWORK-URF-001", "FRAMEWORK-TIA-001", "FRAMEWORK-PAF-001"],
    evidenceQuality: "strong",
    stakeholdersConsulted: [
      "Yike product",
      "Trust Platform engineering",
      "Privacy review",
      "Customer support leadership",
    ],
    judgmentNotes:
      "Assessments unanimous on direction; judgment determined pace and phasing. Process supported decision — did not replace weighing operational realities against institutional purpose.",
    decision: "Proceed with phased Trust Verification rollout beginning pilot markets, expanding per readiness criteria.",
    reviewDate: "2026-12-15",
    lessonsLearned: [
      "Good judgment balances principle with context",
      "Phased rollout preserves trust while building operational capability",
    ],
    relatedIdr: "IDR-GATES-001",
    decisionOwner: "Yike Managing Director",
    createdAt: "2026-06-27",
  },
  {
    identifier: "JR-AI-001",
    slug: "ai-human-judgment-policy",
    title: "AI shall support judgment, not replace it",
    status: "approved",
    category: "Governance / technology",
    institution: "Stankings Group",
    factsAvailable: [
      "AI capabilities expanding across product and operations",
      "CANON-020 requires human judgment for principle application",
      "Industry failures when AI auto-decides without accountability",
      "IKI will embed AI across knowledge and decision systems",
    ],
    assumptionsMade: [
      "Future AI can surface canon-aligned analysis reliably",
      "Custodians will remain accountable for final decisions",
    ],
    alternativesConsidered: [
      { option: "AI auto-approves within policy rules", outcome: "rejected", rationale: "Replaces judgment; fails Judgment Test for unprecedented cases." },
      { option: "No AI in decision workflows", outcome: "rejected", rationale: "Foregoes institutional intelligence; automation should support judgment." },
      { option: "AI presents Canons, trade-offs, evidence — human decides", outcome: "selected", rationale: "Institutional maturity per Editor-in-Chief review." },
    ],
    risksIdentified: [
      "Over-reliance on AI summaries",
      "Hallucinated policy citations",
      "Accountability diffusion",
    ],
    canonReferences: ["CANON-020", "CANON-007", "CANON-018", "CANON-017", "CANON-011"],
    frameworkReferences: ["FRAMEWORK-IDI-001", "FRAMEWORK-IDR-001"],
    evidenceQuality: "moderate",
    stakeholdersConsulted: [
      "Library Council",
      "Chief Technology Officer",
      "IKI architecture",
    ],
    judgmentNotes:
      "AI must never say 'the policy says no' without canon context and trade-offs. Judgment Records preserve how humans reasoned — training data for future custodians and future AI alike.",
    decision:
      "Adopt IDI principle: AI surfaces relevant Canons, policies, standards, and trade-offs; responsible human judgment required for all material decisions.",
    reviewDate: "2027-06-27",
    lessonsLearned: [],
    relatedIdr: "IDR-IKI-001",
    decisionOwner: "Library Council",
    createdAt: "2026-06-27",
  },
  {
    identifier: "JR-GATES-001",
    slug: "four-gate-workflow-judgment",
    title: "When to require full four-gate assessment",
    status: "approved",
    category: "Governance / process",
    institution: "Stankings Group",
    factsAvailable: [
      "Executive Decision No. 5 mandates four gates for major proposals",
      "Not every minor change warrants full PAF→TIA→EIA→GRF",
      "Process fatigue risks bypass under deadline pressure",
    ],
    assumptionsMade: [
      "Clear materiality thresholds reduce friction without weakening governance",
      "Judgment determines gate depth when threshold ambiguous",
    ],
    alternativesConsidered: [
      { option: "Full gates for every change", outcome: "rejected", rationale: "Impractical; encourages bypass." },
      { option: "Gates optional", outcome: "rejected", rationale: "Weakens institutional intelligence." },
      { option: "Materiality thresholds + judgment for edge cases", outcome: "selected", rationale: "Policies support judgment, not replace it." },
    ],
    risksIdentified: [
      "Threshold gaming",
      "Inconsistent application across institutions",
    ],
    canonReferences: ["CANON-020", "CANON-007", "CANON-011", "CANON-006"],
    frameworkReferences: ["FRAMEWORK-PAF-001", "FRAMEWORK-TIA-001", "FRAMEWORK-EIA-001", "FRAMEWORK-GRF-001", "FRAMEWORK-IDR-001"],
    evidenceQuality: "moderate",
    stakeholdersConsulted: ["Library Council", "Institution leads"],
    judgmentNotes:
      "When uncertain whether proposal is 'major', apply Judgment Test and default toward more assessment, not less. Document in Judgment Record if abbreviated path taken.",
    decision:
      "Major proposals require full gates; minor changes use proportional assessment; ambiguous cases require Judgment Record before proceeding.",
    reviewDate: "2027-06-27",
    lessonsLearned: [
      "Sound judgment transforms principles into responsible action",
    ],
    relatedIdr: "IDR-GATES-001",
    decisionOwner: "Library Council",
    createdAt: "2026-06-27",
  },
];

export function getJudgmentRecord(slug: string): JudgmentRecord | undefined {
  return JUDGMENT_REGISTRY.find((r) => r.slug === slug || r.identifier === slug);
}

export function searchJudgmentRecords(query: string): JudgmentRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return JUDGMENT_REGISTRY;
  return JUDGMENT_REGISTRY.filter((r) => {
    const haystack = [
      r.identifier,
      r.title,
      r.institution,
      r.decision,
      r.judgmentNotes,
      ...r.factsAvailable,
      ...r.canonReferences,
      ...r.stakeholdersConsulted,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getDecisionIntelligenceStats() {
  return {
    total: JUDGMENT_REGISTRY.length,
    approved: JUDGMENT_REGISTRY.filter((r) => r.status === "approved").length,
    strongEvidence: JUDGMENT_REGISTRY.filter((r) => r.evidenceQuality === "strong").length,
    withIdrLink: JUDGMENT_REGISTRY.filter((r) => r.relatedIdr).length,
  };
}
