/**
 * Constitutional Trust Centre — FRAMEWORK-CTC-001
 * Derived from Constitution Article XII
 * Executive Decision No. 40 — Constitutional Information Governance Framework
 */

import {
  DATA_GOVERNANCE_DOMAINS,
  TRUST_NETWORK_COMPONENTS,
  TRUST_NETWORK_PRINCIPLES,
} from "@/lib/constitution/articles/article-xii";

export const CTC_FRAMEWORK = {
  identifier: "FRAMEWORK-CTC-001",
  title: "Constitutional Trust Centre",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XII",
    "CONSTITUTION-ARTICLE-XI",
    "CONSTITUTION-ARTICLE-VII",
    "CANON-002",
    "CANON-007",
    "CANON-010",
    "CANON-012",
    "CANON-013",
    "CANON-021",
    "FRAMEWORK-PLAT-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-HIR-001",
    "FRAMEWORK-IGF-001",
    "platform-registry",
  ],
} as const;

export const CIGF_IDENTIFIER = "CIGF-001";

export const CTC_PURPOSE = `Digital trust is a constitutional obligation — not an IT function.

The Constitutional Trust Centre governs identity, privacy, consent, AI, cybersecurity and cross-institutional information governance across the Stankings Trust Network.`;

export const IDENTITY_GOVERNANCE_DOMAINS = [
  "Identity Registry",
  "Verification Status",
  "Consent Records",
  "Identity Audit Trail",
] as const;

export const PASSPORT_PROFILE_DOMAINS = [
  "Trust Score",
  "Verification History",
  "Reputation Timeline",
  "Institutional Contributions",
  "Innovation Score",
  "Learning Achievements",
  "Community Service",
  "Fraud History (where lawful and appropriately governed)",
] as const;

export const TRUST_GRAPH_DOMAINS = [
  "Connected Institutions",
  "Shared Verifications",
  "Consent Management",
  "Data Sharing History",
  "API Access Logs",
] as const;

export const AI_GOVERNANCE_DOMAINS = [
  "AI Models",
  "AI Decisions",
  "Human Reviews",
  "AI Risk Assessments",
  "AI Audit History",
] as const;

export const CIGF_STANDARDS = [
  "Identity governance",
  "Information security",
  "Privacy",
  "Consent management",
  "Artificial intelligence",
  "Shared trust infrastructure",
  "Cybersecurity",
  "Data quality",
  "Digital resilience",
  "Cross-institutional information governance",
] as const;

export const CTC_BODY = `${CTC_PURPOSE}

## Stankings Trust Network Components (Art. XII § 12.05)

${TRUST_NETWORK_COMPONENTS.map((c) => `- ${c}`).join("\n")}

## Trust Network Principles

${TRUST_NETWORK_PRINCIPLES.map((p) => `- ${p}`).join("\n")}

## Identity Governance

${IDENTITY_GOVERNANCE_DOMAINS.map((d) => `- ${d}`).join("\n")}

## YIKE Passport Profile Domains

${PASSPORT_PROFILE_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Trust Graph

${TRUST_GRAPH_DOMAINS.map((d) => `- ${d}`).join("\n")}

## AI Governance

${AI_GOVERNANCE_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Data Governance (Art. XII § 12.08)

${DATA_GOVERNANCE_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Constitutional Information Governance Framework (ED 40)

${CIGF_STANDARDS.map((s) => `- ${s}`).join("\n")}

The Framework shall be reviewed periodically to ensure continued constitutional alignment, legal compliance and responsible stewardship.`;
