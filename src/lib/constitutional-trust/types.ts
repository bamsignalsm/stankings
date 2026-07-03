export interface IdentityRegistryEntry {
  identityId: string;
  subjectType: "member" | "vendor" | "institution" | "system";
  verificationStatus: "verified" | "pending" | "unverified" | "revoked";
  passportLinked: boolean;
  lastVerified?: string;
  institutionsConnected: string[];
  constitutionArticles: string[];
}

export interface ConsentRecord {
  consentId: string;
  subject: string;
  purpose: string;
  institution: string;
  grantedAt: string;
  expiresAt?: string;
  status: "active" | "withdrawn" | "expired";
}

export interface TrustGraphEdge {
  from: string;
  to: string;
  relationship: "identity" | "verification" | "consent" | "api";
  label?: string;
}

export interface AiGovernanceRecord {
  modelId: string;
  name: string;
  purpose: string;
  humanOversight: string;
  riskLevel: "low" | "medium" | "high";
  lastReview: string;
  constitutionArticles: string[];
  status: "approved" | "pilot" | "review";
}

export interface ApiAccessLogEntry {
  logId: string;
  api: string;
  consumer: string;
  purpose: string;
  timestamp: string;
  authorized: boolean;
}

export interface PassportProfileSummary {
  passportId: string;
  trustScore: number;
  verificationLevel: string;
  institutionsContributing: number;
  innovationScore?: number;
  learningAchievements: number;
  communityService: boolean;
  fraudFlags: number;
}
