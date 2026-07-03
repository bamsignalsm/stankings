export type AmendmentStatus = "draft" | "under_review" | "adopted" | "rejected";

export interface AmendmentProposal {
  amendmentId: string;
  sponsor: string;
  articlesAffected: string[];
  existingText: string;
  proposedText: string;
  constitutionalAnalysis: string;
  trustImpactAssessment: string;
  governanceReview: string;
  legalReview: string;
  boardDecision: string;
  effectiveDate: string | null;
  status: AmendmentStatus;
  versionFrom: string;
  versionTo: string | null;
  principlesAffected: string[];
  alternativesConsidered: string[];
}

export interface ConstitutionVersionRecord {
  version: string;
  effectiveDate: string;
  summary: string;
  approver: string;
  articlesCount: number;
  partsCount: number;
}

export interface ConstitutionRegisterEntry {
  registerId: string;
  category: string;
  title: string;
  href?: string;
  status: "current" | "archived" | "forming";
}
