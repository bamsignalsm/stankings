/**
 * Industry Leadership Dashboard registry
 * Per CANON-024 / FRAMEWORK-ILD-001 / Executive Decision No. 26
 */

import type { IndustryLeadershipProfile } from "@/lib/frameworks/industry-leadership-dashboard";

export const INDUSTRY_LEADERSHIP_REGISTRY: IndustryLeadershipProfile[] = [
  {
    id: "ILD-YIKE-2026",
    institution: "Yike",
    institutionSlug: "yike",
    industry: "Property marketplace",
    reportingYear: 2026,
    standardSetterGoal:
      "Change what Nigerians expect from property transactions — verified identities, properties, pricing, and escrow.",
    standardsToRaise: [
      { standardId: "property-verification", label: "Property Verification", status: "in_progress", progressNote: "Trust Verification live in 3 pilot markets; 34,000+ verified listings", trend: "up" },
      { standardId: "listing-quality", label: "Listing Quality", status: "in_progress", progressNote: "Mandatory photo standards + document checksum enforced", trend: "up" },
      { standardId: "escrow-adoption", label: "Escrow Adoption", status: "in_progress", progressNote: "BayRight escrow integrated; 41% of pilot transactions use escrow", trend: "up" },
      { standardId: "identity-verification", label: "Identity Verification", status: "established", progressNote: "Stankings Passport required for verified sellers", trend: "stable" },
      { standardId: "trust-scores", label: "Trust Scores", status: "in_progress", progressNote: "Seller trust scores on 89% of active listings", trend: "up" },
    ],
    industryInfluenceHighlights: [
      "2 competitor marketplaces adopted photo verification requirements following Yike pilot",
      "Industry association invited Yike to property trust standards working group",
    ],
    stewardshipReflection:
      "Not the largest marketplace — the one that changed what buyers expect before they transact.",
    stewardshipReportRef: "ASR-YIKE-2026",
  },
  {
    id: "ILD-AUTO-2026",
    institution: "Stankings Auto Hub",
    institutionSlug: "stankings-auto-hub",
    industry: "Automotive retail & fleet",
    reportingYear: 2026,
    standardSetterGoal:
      "Make 100-point inspections and vehicle history transparency the expected standard.",
    standardsToRaise: [
      { standardId: "vehicle-inspection", label: "Vehicle Inspection", status: "in_progress", progressNote: "100-point inspection protocol defined; 340 vehicles inspected", trend: "up" },
      { standardId: "maintenance-records", label: "Maintenance Records", status: "in_progress", progressNote: "Digital maintenance log pilot with 3 fleet partners", trend: "up" },
      { standardId: "fleet-standards", label: "Fleet Standards", status: "not_started", progressNote: "Fleet certification framework in design", trend: "stable" },
      { standardId: "import-transparency", label: "Import Transparency", status: "in_progress", progressNote: "Import documentation checklist published as open standard draft", trend: "up" },
    ],
    industryInfluenceHighlights: [
      "Lagos dealer association reviewing 100-point inspection as voluntary benchmark",
    ],
    stewardshipReflection:
      "Buyers should expect inspection videos and history reports — not handshake deals.",
    stewardshipReportRef: undefined,
  },
  {
    id: "ILD-BAYRIGHT-2026",
    institution: "BayRight",
    institutionSlug: "bayright",
    industry: "Financial services & payments",
    reportingYear: 2026,
    standardSetterGoal:
      "Raise expectations for escrow, settlement transparency, and customer protection.",
    standardsToRaise: [
      { standardId: "escrow", label: "Escrow", status: "established", progressNote: "₦2.1B settled via escrow; zero unresolved disputes (6 months)", trend: "stable" },
      { standardId: "payment-trust", label: "Payment Trust", status: "in_progress", progressNote: "Real-time settlement status page live post-INC-BAYRIGHT-001", trend: "up" },
      { standardId: "financial-transparency", label: "Financial Transparency", status: "in_progress", progressNote: "Customer-facing settlement timeline on every transaction", trend: "up" },
      { standardId: "fraud-prevention", label: "Fraud Prevention", status: "in_progress", progressNote: "Multi-factor verification for high-value transfers", trend: "up" },
    ],
    industryInfluenceHighlights: [
      "Yike marketplace escrow integration sets cross-industry trust precedent",
      "Settlement SLA monitoring shared as case study with fintech association",
    ],
    stewardshipReflection:
      "Not another fintech chasing volume — the one that made escrow feel normal for everyday commerce.",
    stewardshipReportRef: "ASR-BAYRIGHT-2026",
  },
  {
    id: "ILD-STANHAN-2026",
    institution: "Stanhan",
    institutionSlug: "stanhan",
    industry: "Real estate development",
    reportingYear: 2026,
    standardSetterGoal:
      "Raise expectations for construction quality, documentation, and project governance.",
    standardsToRaise: [
      { standardId: "due-diligence", label: "Due Diligence", status: "in_progress", progressNote: "Title verification checklist integrated with Yike standards", trend: "up" },
      { standardId: "project-governance", label: "Project Governance", status: "in_progress", progressNote: "Milestone documentation portal for buyers", trend: "up" },
      { standardId: "construction-quality", label: "Construction Quality", status: "in_progress", progressNote: "Third-party structural inspection on all new developments", trend: "up" },
      { standardId: "property-management", label: "Property Management Standards", status: "not_started", progressNote: "Post-handover maintenance standards in development", trend: "stable" },
    ],
    industryInfluenceHighlights: [
      "Buyer milestone portal referenced by 2 peer developers",
    ],
    stewardshipReflection:
      "Developers should document progress the way Stanhan does — transparency as competitive advantage.",
    stewardshipReportRef: undefined,
  },
  {
    id: "ILD-BAMSIGNAL-2026",
    institution: "BamSignal",
    institutionSlug: "bamsignal",
    industry: "Social connection & matching",
    reportingYear: 2026,
    standardSetterGoal:
      "Raise expectations for identity verification, safety, and respectful communication.",
    standardsToRaise: [
      { standardId: "identity-verification", label: "Identity Verification", status: "in_progress", progressNote: "Stankings Passport integration in beta", trend: "up" },
      { standardId: "safety", label: "Safety", status: "in_progress", progressNote: "Verified-only messaging channels; report-and-review workflow", trend: "up" },
      { standardId: "respectful-communication", label: "Respectful Communication", status: "in_progress", progressNote: "Community standards enforced with transparent appeals", trend: "up" },
      { standardId: "responsible-matching", label: "Responsible Matching", status: "not_started", progressNote: "Compatibility verification framework in design", trend: "stable" },
    ],
    industryInfluenceHighlights: [
      "Safety workflow documented as Library Knowledge Object for peer review",
    ],
    stewardshipReflection:
      "Relationships built on verification and respect — not anonymity and volume.",
    stewardshipReportRef: undefined,
  },
];

export function getIndustryLeadershipProfile(id: string): IndustryLeadershipProfile | undefined {
  return INDUSTRY_LEADERSHIP_REGISTRY.find(
    (p) => p.id === id || p.institutionSlug === id
  );
}

export function searchIndustryLeadership(query: string): IndustryLeadershipProfile[] {
  const q = query.toLowerCase().trim();
  if (!q) return INDUSTRY_LEADERSHIP_REGISTRY;
  return INDUSTRY_LEADERSHIP_REGISTRY.filter((p) => {
    const haystack = [
      p.id,
      p.institution,
      p.industry,
      p.standardSetterGoal,
      ...p.standardsToRaise.map((s) => `${s.label} ${s.progressNote}`),
      ...p.industryInfluenceHighlights,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getIndustryLeadershipStats() {
  const profiles = INDUSTRY_LEADERSHIP_REGISTRY.length;
  const standards = INDUSTRY_LEADERSHIP_REGISTRY.reduce(
    (sum, p) => sum + p.standardsToRaise.length,
    0
  );
  const established = INDUSTRY_LEADERSHIP_REGISTRY.reduce(
    (sum, p) =>
      sum + p.standardsToRaise.filter((s) => s.status === "established" || s.status === "industry_reference").length,
    0
  );
  const inProgress = INDUSTRY_LEADERSHIP_REGISTRY.reduce(
    (sum, p) => sum + p.standardsToRaise.filter((s) => s.status === "in_progress").length,
    0
  );
  return { profiles, standards, established, inProgress };
}
