/**
 * Integrity & Ethics Centre — Article XI / FRAMEWORK-IEC-001 / ED 39
 */

import type {
  ConflictDisclosure,
  EthicsReport,
  GiftRecord,
  IntegrityDeclaration,
  RelatedPartyTransaction,
} from "@/lib/integrity-ethics/types";

export const IEC_IDENTIFIER = "FRAMEWORK-IEC-001";

const ARTICLE_XI_REFS = [
  "Art. XI § 11.01 — Principle of Institutional Integrity",
  "Art. XI § 11.03 — Conflicts of Interest",
  "Art. XI § 11.04 — Related-Party Transactions",
];

export const CONFLICT_DISCLOSURES: ConflictDisclosure[] = [
  {
    disclosureId: "CD-2026-001",
    person: "Stanley Ukeje",
    role: "Founder & Editor-in-Chief",
    natureOfInterest: "Founding custodian and constitutional author — no material outside commercial interests in Group vendors disclosed.",
    decisionsAffected: ["Constitutional adoption", "Library Council appointments"],
    mitigationMeasures: [
      "Reserved Powers Register maintained separately",
      "Independent review for related-party matters per Art. XI § 11.04",
    ],
    reviewOutcome: "cleared",
    boardMinutesRef: "BC-2026-06-27",
    constitutionArticles: ARTICLE_XI_REFS,
    canonReferences: ["CANON-004", "CANON-007", "CANON-020"],
    disclosedAt: "2026-06-27",
    reviewedAt: "2026-06-27",
  },
  {
    disclosureId: "CD-2025-014",
    person: "Designated Procurement Steward",
    role: "Group Procurement (forming)",
    natureOfInterest: "Potential vendor relationship — family member employed at prospective supplier.",
    relatedInstitution: "Hannahkings Gadgets",
    decisionsAffected: ["Technology procurement evaluation"],
    mitigationMeasures: [
      "Recusal from evaluation committee",
      "Independent commercial comparison documented",
      "Enhanced governance review per Art. XI § 11.04",
    ],
    reviewOutcome: "mitigated",
    boardMinutesRef: "BC-2025-11-12",
    constitutionArticles: [...ARTICLE_XI_REFS, "Art. XI § 11.02 — Duty of Loyalty"],
    canonReferences: ["CANON-002", "CANON-007"],
    disclosedAt: "2025-11-01",
    reviewedAt: "2025-11-12",
  },
];

export const GIFTS_REGISTER: GiftRecord[] = [
  {
    giftId: "GR-2026-003",
    recipient: "Stanley Ukeje",
    role: "Founder",
    description: "Ceremonial plaque — industry association event",
    valueEstimate: "Below policy threshold",
    donor: "Nigerian Property Developers Association",
    date: "2026-03-15",
    outcome: "accepted",
    note: "Ceremonial hospitality per Art. XI § 11.05 — disclosed and logged.",
  },
  {
    giftId: "GR-2025-021",
    recipient: "Executive Leadership",
    role: "BayRight",
    description: "Premium hospitality package from prospective partner",
    donor: "Undisclosed fintech (prospective integration)",
    date: "2025-09-08",
    outcome: "declined",
    note: "Declined — could appear to compromise independent integration assessment.",
  },
];

export const RELATED_PARTY_REGISTER: RelatedPartyTransaction[] = [
  {
    transactionId: "RPT-2026-002",
    parties: ["Stankings Group", "Stanhan Real Estate"],
    relationship: "Common constitutional governance — inter-institutional services",
    description: "Shared verification services allocation across property development pipeline",
    reviewCriteria: [
      "Fairness",
      "Transparency",
      "Commercial reasonableness",
      "Proper authorization",
    ],
    authorization: "Board noted — arm's length service agreement",
    outcome: "cleared",
    documentedAt: "2026-04-10",
  },
  {
    transactionId: "RPT-2025-008",
    parties: ["Yike", "External vendor (related party disclosed)"],
    relationship: "Disclosed family connection — vendor applicant",
    description: "Marketplace vendor onboarding application",
    reviewCriteria: [
      "Fairness",
      "Transparency",
      "Commercial reasonableness",
      "Proper authorization",
      "Appropriate documentation",
    ],
    authorization: "Recusal + independent vendor committee approval",
    outcome: "mitigated",
    documentedAt: "2025-10-22",
  },
];

export const INTEGRITY_DECLARATIONS: IntegrityDeclaration[] = [
  {
    declarationId: "AID-2026-SU",
    person: "Stanley Ukeje",
    role: "Founder & Editor-in-Chief",
    year: 2026,
    status: "submitted",
    conflictsDeclared: ["None requiring recusal beyond standard founder disclosures"],
    outsideAppointments: ["Library Council Chair", "The Stankings Institute (forming)"],
    relatedPartyInterests: ["None requiring enhanced review at time of declaration"],
    complianceConfirmed: true,
    materialConcerns: "None",
    submittedAt: "2026-06-27",
  },
  {
    declarationId: "AID-2026-PENDING",
    person: "Constitutional Office Holders",
    role: "Directors & Designated Stewards",
    year: 2026,
    status: "pending",
    conflictsDeclared: [],
    outsideAppointments: [],
    relatedPartyInterests: [],
    complianceConfirmed: false,
    materialConcerns: "Annual cycle commencing — declarations due Q4 2026",
  },
];

export const ETHICS_REPORTS: EthicsReport[] = [
  {
    reportId: "EAR-2026-001",
    category: "ethics_advisory",
    status: "resolved",
    summary:
      "Advisory request — whether AI training on customer verification data requires enhanced human impact and trust review.",
    receivedAt: "2026-05-12",
    resolution: "HIR + TIA completed. Proceed with anonymized training policy. Documented in Knowledge Library.",
    confidential: false,
  },
  {
    reportId: "WR-CHANNEL",
    category: "whistleblower",
    status: "channel_forming",
    summary:
      "Whistleblower Portal — secure reporting channel under development per Art. XI § 11.07. Interim: ethics@stankings.com with confidentiality protocols.",
    confidential: true,
  },
  {
    reportId: "CBR-REGISTER",
    category: "constitutional_breach",
    status: "channel_forming",
    summary:
      "Constitutional Breach Register — no material breaches recorded. Register active for good-faith reports per Art. XI § 11.07.",
    confidential: false,
  },
];

export function getConflictDisclosure(id: string): ConflictDisclosure | undefined {
  return CONFLICT_DISCLOSURES.find((d) => d.disclosureId.toLowerCase() === id.toLowerCase());
}

export function getIntegrityCentreStats() {
  return {
    disclosures: CONFLICT_DISCLOSURES.length,
    gifts: GIFTS_REGISTER.length,
    relatedParties: RELATED_PARTY_REGISTER.length,
    declarationsSubmitted: INTEGRITY_DECLARATIONS.filter((d) => d.status === "submitted").length,
    ethicsReports: ETHICS_REPORTS.filter((r) => r.status !== "channel_forming").length,
  };
}
