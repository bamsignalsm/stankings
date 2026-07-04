/**
 * Trust registry — HQ-origin trust topics for all products.
 */

export interface TrustTopicRecord {
  id: string;
  title: string;
  summary: string;
  href: string;
}

export const TRUST_REGISTRY: TrustTopicRecord[] = [
  { id: "trust-principles", title: "Trust Principles", summary: "Foundational commitments that bind every Stankings institution.", href: "/trust/trust-principles" },
  { id: "privacy", title: "Privacy", summary: "How personal data is governed across HQ and product boundaries.", href: "/trust/privacy" },
  { id: "security", title: "Security", summary: "Security expectations and the Security Center.", href: "/security" },
  { id: "responsible-ai", title: "Responsible AI", summary: "Human accountability for AI-assisted decisions.", href: "/trust/responsible-ai" },
  { id: "transparency", title: "Transparency", summary: "What we publish and how we report.", href: "/trust/transparency" },
  { id: "identity-verification", title: "Identity Verification", summary: "Verification standards across the ecosystem.", href: "/trust/identity-verification" },
  { id: "verification-standards", title: "Verification Standards", summary: "Evidence requirements for trust claims.", href: "/trust/verification-standards" },
  { id: "community-standards", title: "Community Standards", summary: "Expected conduct in Stankings-affiliated communities.", href: "/trust/community-standards" },
  { id: "safety", title: "Safety", summary: "User and platform safety obligations.", href: "/trust/safety" },
  { id: "incident-reports", title: "Incident Reports", summary: "How material incidents are recorded and closed.", href: "/trust/incident-reports" },
  { id: "data-requests", title: "Data Requests", summary: "Access, correction, portability, and deletion.", href: "/trust/data-requests" },
  { id: "law-enforcement", title: "Law Enforcement Requests", summary: "Lawful process and user rights.", href: "/trust/law-enforcement" },
  { id: "user-rights", title: "User Rights", summary: "Rights individuals may exercise regarding their data.", href: "/trust/user-rights" },
];

export const TRUST_ORIGIN_NOTICE =
  "Stankings HQ is the central trust authority for every current and future Stankings product. Product companies implement these standards operationally; they do not publish conflicting institutional policies.";

export function getTrustTopic(id: string): TrustTopicRecord | undefined {
  return TRUST_REGISTRY.find((t) => t.id === id);
}

export function listTrustTopics(): TrustTopicRecord[] {
  return TRUST_REGISTRY;
}
