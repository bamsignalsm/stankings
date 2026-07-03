/**
 * Constitutional Ceremony Portal — Article XVII / FRAMEWORK-CCY-001 / ED 45
 */

import type { ConstitutionalOfficeRecord } from "@/lib/constitutional-ceremony/types";

export const CCY_IDENTIFIER = "FRAMEWORK-CCY-001";
export const COROH_IDENTIFIER = "COROH-001";

export const CONSTITUTIONAL_OFFICE_RECORDS: ConstitutionalOfficeRecord[] = [
  {
    recordId: "COROH-FOUNDING-001",
    name: "Stanley Ukeje",
    constitutionalOffice: "Founder & First Custodian",
    dateOfAppointment: "2026-06-27",
    constitutionVersionAccepted: "1.0",
    oathAffirmationCompleted: true,
    constitutionTrainingCompleted: true,
    stewardshipDeclaration: true,
    integrityDeclaration: true,
    leadershipReview: "Founding custodian — constitutional author",
    constitutionalReviewsParticipated: 1,
    knowledgeContributions: 48,
    yearsOfService: 1,
    href: "/library/stewardship/stanley-ukeje",
  },
  {
    recordId: "COROH-COUNCIL-001",
    name: "Library Council (Collective)",
    constitutionalOffice: "Constitutional Governance Council",
    dateOfAppointment: "2026-06-27",
    constitutionVersionAccepted: "1.0",
    oathAffirmationCompleted: true,
    constitutionTrainingCompleted: true,
    stewardshipDeclaration: true,
    integrityDeclaration: true,
    leadershipReview: "Council formation — Volume I adoption in progress",
    constitutionalReviewsParticipated: 1,
    knowledgeContributions: 22,
    yearsOfService: 1,
    href: "/library/stewardship/library-council",
  },
];

export function getConstitutionalCeremonyStats() {
  const records = CONSTITUTIONAL_OFFICE_RECORDS;
  return {
    officeHolders: records.length,
    affirmationsComplete: records.filter((r) => r.oathAffirmationCompleted).length,
    trainingComplete: records.filter((r) => r.constitutionTrainingCompleted).length,
    stewardshipDeclared: records.filter((r) => r.stewardshipDeclaration).length,
    integrityDeclared: records.filter((r) => r.integrityDeclaration).length,
    totalKnowledgeContributions: records.reduce((s, r) => s + r.knowledgeContributions, 0),
    avgYearsOfService:
      Math.round((records.reduce((s, r) => s + r.yearsOfService, 0) / records.length) * 10) / 10,
  };
}
