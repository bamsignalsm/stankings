export interface ConstitutionalOfficeRecord {
  recordId: string;
  name: string;
  constitutionalOffice: string;
  dateOfAppointment: string;
  constitutionVersionAccepted: string;
  oathAffirmationCompleted: boolean;
  constitutionTrainingCompleted: boolean;
  stewardshipDeclaration: boolean;
  integrityDeclaration: boolean;
  leadershipReview: string;
  constitutionalReviewsParticipated: number;
  knowledgeContributions: number;
  yearsOfService: number;
  href?: string;
}
