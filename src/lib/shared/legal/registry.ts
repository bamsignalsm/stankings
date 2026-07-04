/**
 * Legal registry — products reference these HQ-origin policies.
 */

export interface LegalPolicyRecord {
  id: string;
  title: string;
  summary: string;
  href: string;
  category: "privacy" | "terms" | "cookies" | "security" | "compliance" | "accessibility" | "other";
}

export const LEGAL_REGISTRY: LegalPolicyRecord[] = [
  { id: "terms", title: "Terms of Use", summary: "Terms governing use of stankings.com.", href: "/legal/terms", category: "terms" },
  { id: "privacy", title: "Privacy Policy", summary: "Institutional privacy policy.", href: "/legal/privacy", category: "privacy" },
  { id: "cookies", title: "Cookie Policy", summary: "Cookies and similar technologies.", href: "/legal/cookies", category: "cookies" },
  { id: "acceptable-use", title: "Acceptable Use", summary: "Prohibited uses of institutional properties.", href: "/legal/acceptable-use", category: "other" },
  { id: "trademark", title: "Trademark", summary: "Stankings names and marks.", href: "/legal/trademark", category: "other" },
  { id: "copyright", title: "Copyright", summary: "Ownership of institutional content.", href: "/legal/copyright", category: "other" },
  { id: "licensing", title: "Licensing", summary: "Licensing of institutional materials.", href: "/legal/licensing", category: "other" },
  { id: "dmca", title: "DMCA", summary: "Copyright infringement notices.", href: "/legal/dmca", category: "other" },
  { id: "compliance", title: "Compliance", summary: "Compliance Center overview.", href: "/compliance", category: "compliance" },
  { id: "accessibility", title: "Accessibility", summary: "Accessibility statement.", href: "/legal/accessibility", category: "accessibility" },
  { id: "security", title: "Security", summary: "Security Center.", href: "/security", category: "security" },
  { id: "community-guidelines", title: "Community Guidelines", summary: "Expected conduct.", href: "/legal/community-guidelines", category: "other" },
  { id: "data-retention", title: "Data Retention", summary: "Retention schedules.", href: "/legal/data-retention", category: "privacy" },
  { id: "refunds", title: "Refund Policy", summary: "Institutional refund posture.", href: "/legal/refunds", category: "other" },
];

export function getLegalPolicy(id: string): LegalPolicyRecord | undefined {
  return LEGAL_REGISTRY.find((p) => p.id === id);
}

export function getLegalPoliciesByCategory(
  category: LegalPolicyRecord["category"],
): LegalPolicyRecord[] {
  return LEGAL_REGISTRY.filter((p) => p.category === category);
}

export function listLegalPolicies(): LegalPolicyRecord[] {
  return LEGAL_REGISTRY;
}
