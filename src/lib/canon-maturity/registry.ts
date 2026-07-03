/**
 * Canon Maturity Dashboard registry
 * Per CANON-025 / FRAMEWORK-CMD-001 / Executive Decision No. 27
 */

import {
  CANON_DASHBOARD_ROWS,
  getCanonDashboardStats,
} from "@/lib/canon/dashboard";
import type {
  CanonMaturityRecord,
  Volume0MaturityMetrics,
} from "@/lib/frameworks/canon-maturity-dashboard";
import { getAllStaticKnowledgeObjects } from "@/lib/library-engine/seed";
import { INSTITUTIONAL_GRAPH_EDGES } from "@/lib/iki/graph";
import { getAllStaticLexiconTerms } from "@/lib/lexicon-engine/seed";

const ECOSYSTEM_COMPANIES = [
  "yike",
  "stanhan",
  "bayright",
  "bamsignal",
  "stankings-logistics",
  "hannahkings-education",
  "stankings-institute",
  "stankings-foundation",
  "stankings-auto-hub",
];

const POLICY_PLACEHOLDERS: Record<string, { identifier: string; title: string }[]> = {
  "CANON-007": [{ identifier: "POL-TRUTH-001", title: "Truth in Reporting Policy" }],
  "CANON-014": [{ identifier: "POL-CRED-001", title: "External Commitment Policy" }],
  "CANON-015": [{ identifier: "POL-INC-001", title: "Incident Accountability Policy" }],
};

const VOLUME_0_BOOKS = [{ identifier: "volume-0", title: "The First Principles — Volume 0" }];

const FRAMEWORK_ID_MAP: Record<string, string> = {
  "Trust Impact Assessment": "FRAMEWORK-TIA-001",
  "Purpose Assessment": "FRAMEWORK-PAF-001",
  "Ecosystem Impact Assessment": "FRAMEWORK-EIA-001",
  "Generational Review": "FRAMEWORK-GRF-001",
  "Leadership Stewardship Framework": "FRAMEWORK-LSF-001",
  "Institutional Decision Record": "FRAMEWORK-IDR-001",
  "Standards of Excellence": "FRAMEWORK-EXF-001",
  "Lessons Learned Review": "FRAMEWORK-LLR-001",
  "Human Impact Review": "FRAMEWORK-HIR-001",
  "Simplicity Review": "FRAMEWORK-SR-001",
  "Platform Assessment": "FRAMEWORK-PLAT-001",
  "Innovation Governance": "FRAMEWORK-IGF-001",
  "Incident Accountability": "FRAMEWORK-IIAF-001",
  "Institutional Strength Assessment": "FRAMEWORK-ISA-001",
  "Uncertainty Reduction": "FRAMEWORK-URF-001",
  "Principles Alignment Review": "FRAMEWORK-PAR-001",
  "Institutional Improvement Register": "FRAMEWORK-IIR-001",
  "Annual Stewardship Review": "FRAMEWORK-ASR-001",
  "Institutional Decision Intelligence": "FRAMEWORK-IDI-001",
  "Institutional Knowledge Graph": "FRAMEWORK-IKG-001",
  "Legacy Dashboard": "FRAMEWORK-LEGACY-001",
  "Knowledge Challenge Process": "FRAMEWORK-KCP-001",
  "Industry Leadership Dashboard": "FRAMEWORK-ILD-001",
  "Canon Maturity Dashboard": "FRAMEWORK-CMD-001",
};

function buildMaturityRecord(
  row: (typeof CANON_DASHBOARD_ROWS)[number]
): CanonMaturityRecord {
  const relatedFrameworks = row.framework
    ? [
        {
          identifier: FRAMEWORK_ID_MAP[row.framework] ?? row.framework,
          title: row.framework,
          href: row.frameworkHref ?? row.platformHref ?? row.canonHref,
        },
      ]
    : [];

  const kos = [row.canonId];
  if (relatedFrameworks[0]) kos.push(relatedFrameworks[0].identifier);

  return {
    canonId: row.canonId,
    title: row.canonTitle,
    href: row.canonHref,
    category: row.category,
    version: "1.0",
    approvalDate: "2026-06-27",
    lastReviewDate: "2026-06-27",
    nextReviewDate: "2031-06-27",
    reviewStatus: "approved",
    printStatus: row.status === "active" ? "preview" : "forthcoming",
    implementationStatus: row.status,
    platformFeature: row.platformFeature,
    platformHref: row.platformHref,
    relatedFrameworks,
    relatedPolicies: POLICY_PLACEHOLDERS[row.canonId] ?? [],
    relatedCompanies:
      row.category === "Moral Foundation" || row.canonId === "CANON-005"
        ? ECOSYSTEM_COMPANIES
        : ECOSYSTEM_COMPANIES.slice(0, 5),
    relatedBooks: VOLUME_0_BOOKS.map((b) => b.identifier),
    relatedFounderLetters: row.canonId === "CANON-001" ? ["FOUNDERS-DECLARATION"] : [],
    relatedKnowledgeObjects: kos,
  };
}

export const CANON_MATURITY_REGISTRY: CanonMaturityRecord[] =
  CANON_DASHBOARD_ROWS.map(buildMaturityRecord);

export function getCanonMaturityRecord(
  canonId: string
): CanonMaturityRecord | undefined {
  return CANON_MATURITY_REGISTRY.find((r) => r.canonId === canonId);
}

export function searchCanonMaturity(query: string): CanonMaturityRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return CANON_MATURITY_REGISTRY;
  return CANON_MATURITY_REGISTRY.filter((r) => {
    const haystack = [
      r.canonId,
      r.title,
      r.category,
      r.platformFeature,
      ...r.relatedFrameworks.map((f) => f.title),
      ...r.relatedKnowledgeObjects,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getVolume0MaturityMetrics(): Volume0MaturityMetrics {
  const kos = getAllStaticKnowledgeObjects();
  const stats = getCanonDashboardStats();
  const frameworkIds = new Set(
    kos.filter((k) => k.objectType === "framework").map((k) => k.identifier)
  );
  const canonEdges = INSTITUTIONAL_GRAPH_EDGES.filter(
    (e) => e.from.startsWith("CANON-") || e.to.startsWith("CANON-")
  ).length;

  return {
    totalCanons: stats.total,
    supportingFrameworks: frameworkIds.size,
    governanceObjects: kos.filter(
      (k) =>
        k.objectType === "framework" ||
        k.category?.includes("Governance") ||
        k.tags?.includes("governance")
    ).length,
    knowledgeObjects: kos.length,
    crossReferences: canonEdges,
    constitutionReferences: kos.filter((k) => k.volumeSlug === "constitution").length,
    engineeringStandardsLinked: kos.filter(
      (k) =>
        k.relatedSystems?.includes("library-engine") ||
        k.tags?.includes("engineering")
    ).length,
    policiesDerived: CANON_MATURITY_REGISTRY.reduce(
      (sum, r) => sum + r.relatedPolicies.length,
      0
    ),
    trainingModulesCreated: 3,
    aiPromptsLinked: CANON_MATURITY_REGISTRY.length,
    volumeReviewStatus: "Volume 0 Complete — Canon Review Summit scheduled at 25–30",
    printStatus: "Print-ready export forthcoming",
    activeImplementations: stats.active,
  };
}

export function getVolume0LexiconCount(): number {
  return getAllStaticLexiconTerms().filter((t) => t.status === "approved").length;
}
