/**
 * Legacy Dashboard — Annual Stewardship Reports
 * Per CANON-022 / FRAMEWORK-LEGACY-001 / Executive Decision No. 24
 */

import type { AnnualStewardshipReport } from "@/lib/frameworks/legacy-dashboard";

export const STEWARDSHIP_REPORT_REGISTRY: AnnualStewardshipReport[] = [
  {
    id: "ASR-YIKE-2026",
    institution: "Yike",
    institutionSlug: "yike",
    reportingYear: 2026,
    status: "published",
    publishedAt: "2026-06-27",
    institutionalPerformance: [
      { metricId: "financial-sustainability", label: "Financial Sustainability", value: "Pilot markets revenue-positive", trend: "up" },
      { metricId: "customer-trust", label: "Customer Trust", value: "Buyer confidence +18 pts post-verification", trend: "up" },
      { metricId: "operational-excellence", label: "Operational Excellence", value: "Listing SLA 99.2%", trend: "stable" },
      { metricId: "innovation", label: "Innovation", value: "Trust Verification rollout (IIR-YIKE-001)", trend: "up" },
      { metricId: "growth", label: "Growth", value: "3 pilot markets; phased national plan", trend: "up" },
    ],
    societalContribution: [
      { metricId: "jobs-created", label: "Jobs Created", value: "47 direct; 120+ agent network", trend: "up" },
      { metricId: "small-businesses", label: "Small Businesses Enabled", value: "2,400+ verified sellers onboarded", trend: "up" },
      { metricId: "families-served", label: "Families Served", value: "18,000+ households transacted safely", trend: "up" },
      { metricId: "verified-transactions", label: "Verified Transactions", value: "34,000+ verified listings", trend: "up" },
      { metricId: "fraud-prevented", label: "Fraud Prevented", value: "Est. ₦240M buyer harm avoided (pilot)", trend: "up", notes: "Based on fraud report reduction vs baseline" },
      { metricId: "knowledge-published", label: "Knowledge Objects Published", value: "LLR-YIKE-001, IIR-YIKE-001", trend: "up" },
    ],
    legacyHighlights: [
      "Property transactions more trustworthy — not merely listed",
      "Verification infrastructure reusable across ecosystem",
    ],
    stewardshipReflection:
      "Yike's legacy is trust in property commerce across Nigeria. Commercial growth and fraud reduction reinforce one another.",
  },
  {
    id: "ASR-BAYRIGHT-2026",
    institution: "BayRight",
    institutionSlug: "bayright",
    reportingYear: 2026,
    status: "published",
    publishedAt: "2026-06-27",
    institutionalPerformance: [
      { metricId: "financial-sustainability", label: "Financial Sustainability", value: "Escrow volume growing; reserves established", trend: "up" },
      { metricId: "customer-trust", label: "Customer Trust", value: "Settlement transparency post-INC-BAYRIGHT-001", trend: "up" },
      { metricId: "operational-excellence", label: "Operational Excellence", value: "MTTD 12 min (from 8 hrs)", trend: "up" },
      { metricId: "innovation", label: "Innovation", value: "Settlement SLA monitoring live", trend: "up" },
      { metricId: "growth", label: "Growth", value: "Yike escrow integration; marketplace expansion", trend: "up" },
    ],
    societalContribution: [
      { metricId: "small-businesses", label: "Small Businesses Enabled", value: "1,200+ merchants with escrow protection", trend: "up" },
      { metricId: "verified-transactions", label: "Verified Transactions", value: "₦2.1B escrow settled securely", trend: "up" },
      { metricId: "fraud-prevented", label: "Fraud Prevented", value: "Zero unresolved escrow disputes (6 months)", trend: "stable" },
      { metricId: "knowledge-published", label: "Knowledge Objects Published", value: "LLR-BAYRIGHT-001, IIR-BAYRIGHT-001", trend: "up" },
    ],
    legacyHighlights: [
      "Secure payments accessible to people and businesses who lacked trusted escrow",
      "Financial infrastructure strengthening marketplace commerce",
    ],
    stewardshipReflection:
      "BayRight remembered for trust in money — not as another fintech chasing volume without settlement discipline.",
  },
  {
    id: "ASR-FOUNDATION-2026",
    institution: "Stankings Foundation",
    institutionSlug: "stankings-foundation",
    reportingYear: 2026,
    status: "under_review",
    institutionalPerformance: [
      { metricId: "financial-sustainability", label: "Financial Sustainability", value: "Endowment model in design", trend: "stable" },
      { metricId: "operational-excellence", label: "Operational Excellence", value: "3 programmes operational", trend: "up" },
      { metricId: "innovation", label: "Innovation", value: "Skills-for-opportunity pilot launched", trend: "up" },
      { metricId: "growth", label: "Growth", value: "Partnership with Hannahkings Education", trend: "up" },
    ],
    societalContribution: [
      { metricId: "people-trained", label: "People Trained", value: "320 youth in skills programme", trend: "up" },
      { metricId: "scholarships", label: "Scholarships Supported", value: "48 scholarships awarded", trend: "up" },
      { metricId: "community-projects", label: "Community Projects Completed", value: "5 community health & education initiatives", trend: "up" },
      { metricId: "foundation-impact", label: "Foundation Impact", value: "2,100 vulnerable individuals reached", trend: "up" },
    ],
    legacyHighlights: [
      "Opportunity created where opportunity was scarce",
      "Sustainable support models, not dependency",
    ],
    stewardshipReflection:
      "Foundation legacy measured in capability created — communities stronger after intervention, not merely assisted.",
  },
  {
    id: "ASR-GROUP-2026",
    institution: "Stankings Group",
    institutionSlug: "stankings-group",
    reportingYear: 2026,
    status: "published",
    publishedAt: "2026-06-27",
    institutionalPerformance: [
      { metricId: "financial-sustainability", label: "Financial Sustainability", value: "Ecosystem investment phase; capital disciplined", trend: "stable" },
      { metricId: "customer-trust", label: "Customer Trust", value: "Cross-institution trust platform maturing", trend: "up" },
      { metricId: "operational-excellence", label: "Operational Excellence", value: "22 Canons operational; IKI live", trend: "up" },
      { metricId: "innovation", label: "Innovation", value: "Volume 0 complete through Civilization Canon 022", trend: "up" },
      { metricId: "growth", label: "Growth", value: "9 institutions; platform architecture unified", trend: "up" },
    ],
    societalContribution: [
      { metricId: "jobs-created", label: "Jobs Created", value: "180+ direct ecosystem employment", trend: "up" },
      { metricId: "people-trained", label: "People Trained", value: "500+ through education & foundation", trend: "up" },
      { metricId: "knowledge-published", label: "Knowledge Objects Published", value: "22 Canons, 20+ frameworks, Library live", trend: "up" },
      { metricId: "community-projects", label: "Community Projects Completed", value: "Foundation + Institute programmes", trend: "up" },
    ],
    legacyHighlights: [
      "Nation-building institution — leave Nigeria a little better",
      "Operating philosophy codified for generations who never knew the founder",
      "Knowledge preserved as constitutional asset",
    ],
    stewardshipReflection:
      "First Annual Stewardship Report — baseline for measuring whether Stankings leaves society stronger. Not marketing; stewardship.",
    knowledgeObjectRef: "CANON-022",
  },
];

export function getStewardshipReport(id: string): AnnualStewardshipReport | undefined {
  return STEWARDSHIP_REPORT_REGISTRY.find((r) => r.id === id);
}

export function getReportsByInstitution(slug: string): AnnualStewardshipReport[] {
  return STEWARDSHIP_REPORT_REGISTRY.filter((r) => r.institutionSlug === slug);
}

export function searchStewardshipReports(query: string): AnnualStewardshipReport[] {
  const q = query.toLowerCase().trim();
  if (!q) return STEWARDSHIP_REPORT_REGISTRY;
  return STEWARDSHIP_REPORT_REGISTRY.filter((r) => {
    const haystack = [
      r.id,
      r.institution,
      r.stewardshipReflection,
      ...r.legacyHighlights,
      ...r.institutionalPerformance.map((m) => m.value),
      ...r.societalContribution.map((m) => m.value),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getLegacyDashboardStats() {
  const published = STEWARDSHIP_REPORT_REGISTRY.filter((r) => r.status === "published").length;
  const institutions = new Set(STEWARDSHIP_REPORT_REGISTRY.map((r) => r.institutionSlug)).size;
  const totalSocietalMetrics = STEWARDSHIP_REPORT_REGISTRY.reduce(
    (sum, r) => sum + r.societalContribution.length,
    0
  );
  return {
    reports: STEWARDSHIP_REPORT_REGISTRY.length,
    published,
    institutions,
    societalMetricsReported: totalSocietalMetrics,
  };
}
