/**
 * Constitutional Trust Centre — Article XII / FRAMEWORK-CTC-001 / ED 40
 */

import { ECOSYSTEM_INSTITUTIONS } from "@/lib/ecosystem/map";
import { PLATFORM_REGISTRY } from "@/lib/platforms/registry";
import type {
  AiGovernanceRecord,
  ApiAccessLogEntry,
  ConsentRecord,
  IdentityRegistryEntry,
  PassportProfileSummary,
  TrustGraphEdge,
} from "@/lib/constitutional-trust/types";

export const CTC_IDENTIFIER = "FRAMEWORK-CTC-001";

export const TRUST_NETWORK_INSTITUTIONS = [
  { id: "yike", label: "Yike", role: "Marketplace" },
  { id: "bayright", label: "BayRight", role: "Payments" },
  { id: "bamsignal", label: "BamSignal", role: "Relationships" },
  { id: "stanhan", label: "Stanhan", role: "Property" },
  { id: "stankings-auto-hub", label: "Auto Hub", role: "Automotive" },
  { id: "stankings-logistics", label: "Logistics", role: "Logistics" },
  { id: "stankings-foundation", label: "Foundation", role: "Social Impact" },
  { id: "stankings-institute", label: "The Institute", role: "Leadership" },
];

const ARTICLE_XII_REFS = [
  "Art. XII § 12.01 — Principle of Digital Trust",
  "Art. XII § 12.04 — Identity and Verification",
  "Art. XII § 12.05 — The Stankings Trust Network",
];

export const IDENTITY_REGISTRY: IdentityRegistryEntry[] = [
  {
    identityId: "ID-ECOSYSTEM-001",
    subjectType: "system",
    verificationStatus: "verified",
    passportLinked: true,
    lastVerified: "2026-06-27",
    institutionsConnected: ECOSYSTEM_INSTITUTIONS.filter((i) => i.isLive).map((i) => i.name),
    constitutionArticles: ARTICLE_XII_REFS,
  },
  {
    identityId: "ID-VENDOR-PILOT",
    subjectType: "vendor",
    verificationStatus: "pending",
    passportLinked: true,
    institutionsConnected: ["Yike"],
    constitutionArticles: ["Art. XII § 12.04 — Identity and Verification"],
  },
];

export const CONSENT_RECORDS: ConsentRecord[] = [
  {
    consentId: "CONSENT-2026-001",
    subject: "Member (anonymized)",
    purpose: "Marketplace listing verification via Yike Passport",
    institution: "Yike",
    grantedAt: "2026-05-01",
    status: "active",
  },
  {
    consentId: "CONSENT-2026-002",
    subject: "Member (anonymized)",
    purpose: "Cross-institution trust score sharing",
    institution: "Stankings Trust Network",
    grantedAt: "2026-04-15",
    expiresAt: "2027-04-15",
    status: "active",
  },
  {
    consentId: "CONSENT-2025-044",
    subject: "Member (anonymized)",
    purpose: "AI-assisted listing quality review",
    institution: "Yike",
    grantedAt: "2025-11-20",
    status: "withdrawn",
  },
];

export const PASSPORT_PROFILE_SAMPLE: PassportProfileSummary = {
  passportId: "PASSPORT-DEMO-001",
  trustScore: 4.2,
  verificationLevel: "Enhanced — Safe Haven pathway",
  institutionsContributing: 3,
  innovationScore: 2,
  learningAchievements: 5,
  communityService: true,
  fraudFlags: 0,
};

export const AI_GOVERNANCE_RECORDS: AiGovernanceRecord[] = [
  {
    modelId: "AI-CONSTITUTION-001",
    name: "Constitutional Explanation Assistant",
    purpose: "Library AI explanation layer — cites Canons and Articles only",
    humanOversight: "Library Council review; no autonomous constitutional interpretation",
    riskLevel: "medium",
    lastReview: "2026-06-27",
    constitutionArticles: ["Art. XII § 12.06 — Artificial Intelligence"],
    status: "approved",
  },
  {
    modelId: "AI-LISTING-001",
    name: "Yike Listing Quality Assistant",
    purpose: "Vendor listing quality suggestions — human approval required",
    humanOversight: "Vendor confirms all published listing changes",
    riskLevel: "medium",
    lastReview: "2026-06-15",
    constitutionArticles: ["Art. XII § 12.06 — Artificial Intelligence", "Art. XII § 12.03 — Purpose Limitation"],
    status: "pilot",
  },
  {
    modelId: "AI-FRAUD-001",
    name: "Trust Fraud Signals",
    purpose: "Anomaly detection for verification and transaction risk",
    humanOversight: "Trust team reviews flagged cases before action",
    riskLevel: "high",
    lastReview: "2026-06-01",
    constitutionArticles: ["Art. XII § 12.05 — Trust Network", "Art. XII § 12.07 — Cybersecurity"],
    status: "approved",
  },
];

export const API_ACCESS_LOG: ApiAccessLogEntry[] = [
  {
    logId: "API-2026-1842",
    api: "Passport Identity API",
    consumer: "Yike",
    purpose: "Vendor onboarding verification",
    timestamp: "2026-06-26T14:32:00Z",
    authorized: true,
  },
  {
    logId: "API-2026-1841",
    api: "Verification API",
    consumer: "BayRight",
    purpose: "Escrow party identity check",
    timestamp: "2026-06-26T11:08:00Z",
    authorized: true,
  },
  {
    logId: "API-2026-1839",
    api: "Trust Graph API",
    consumer: "BamSignal",
    purpose: "Reputation portability query",
    timestamp: "2026-06-25T09:15:00Z",
    authorized: true,
  },
];

export function getTrustNetworkGraph(): {
  nodes: { id: string; label: string; type: "hub" | "layer" | "institution" | "platform" }[];
  edges: TrustGraphEdge[];
} {
  const nodes = [
    { id: "identity-layer", label: "Identity Layer", type: "layer" as const },
    { id: "yike-passport", label: "YIKE Passport", type: "hub" as const },
    { id: "trust-graph", label: "Trust Graph", type: "platform" as const },
    { id: "shared-ai", label: "Shared AI", type: "platform" as const },
    { id: "consent", label: "Consent Management", type: "platform" as const },
    ...TRUST_NETWORK_INSTITUTIONS.map((inst) => ({
      id: inst.id,
      label: inst.label,
      type: "institution" as const,
    })),
  ];

  const edges: TrustGraphEdge[] = [
    { from: "identity-layer", to: "yike-passport", relationship: "identity" },
    { from: "yike-passport", to: "trust-graph", relationship: "verification" },
    { from: "yike-passport", to: "consent", relationship: "consent" },
    { from: "trust-graph", to: "shared-ai", relationship: "api" },
    ...TRUST_NETWORK_INSTITUTIONS.map((inst) => ({
      from: "yike-passport",
      to: inst.id,
      relationship: "identity" as const,
      label: inst.role,
    })),
  ];

  return { nodes, edges };
}

export function getTrustCentreStats() {
  const identityPlatform = PLATFORM_REGISTRY.find((p) => p.slug === "identity");
  const trustPlatform = PLATFORM_REGISTRY.find((p) => p.slug === "trust");
  return {
    identityApis: identityPlatform?.apis.length ?? 0,
    trustApis: trustPlatform?.apis.length ?? 0,
    institutions: TRUST_NETWORK_INSTITUTIONS.length,
    consentActive: CONSENT_RECORDS.filter((c) => c.status === "active").length,
    aiModels: AI_GOVERNANCE_RECORDS.length,
    apiLogs: API_ACCESS_LOG.length,
  };
}

export { PLATFORM_REGISTRY };
