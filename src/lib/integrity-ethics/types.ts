export type ReviewOutcome = "cleared" | "mitigated" | "recused" | "declined" | "pending" | "under_review";

export interface ConflictDisclosure {
  disclosureId: string;
  person: string;
  role: string;
  natureOfInterest: string;
  relatedInstitution?: string;
  decisionsAffected: string[];
  mitigationMeasures: string[];
  reviewOutcome: ReviewOutcome;
  boardMinutesRef?: string;
  constitutionArticles: string[];
  canonReferences: string[];
  disclosedAt: string;
  reviewedAt?: string;
}

export interface GiftRecord {
  giftId: string;
  recipient: string;
  role: string;
  description: string;
  valueEstimate?: string;
  donor: string;
  date: string;
  outcome: "accepted" | "declined" | "returned" | "disclosed";
  note?: string;
}

export interface RelatedPartyTransaction {
  transactionId: string;
  parties: string[];
  relationship: string;
  description: string;
  value?: string;
  reviewCriteria: string[];
  authorization: string;
  outcome: ReviewOutcome;
  documentedAt: string;
}

export interface IntegrityDeclaration {
  declarationId: string;
  person: string;
  role: string;
  year: number;
  status: "submitted" | "pending" | "overdue";
  conflictsDeclared: string[];
  outsideAppointments: string[];
  relatedPartyInterests: string[];
  complianceConfirmed: boolean;
  materialConcerns?: string;
  submittedAt?: string;
}

export interface EthicsReport {
  reportId: string;
  category: "whistleblower" | "ethics_advisory" | "constitutional_breach";
  status: "received" | "under_review" | "resolved" | "channel_forming";
  summary: string;
  receivedAt?: string;
  resolution?: string;
  confidential: boolean;
}
