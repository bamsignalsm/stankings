/**
 * Stankings Library Portal — Article XIII / FRAMEWORK-SLP-001 / ED 41
 */

import { getAllStaticKnowledgeObjects } from "@/lib/library-engine/seed";
import type {
  KnowledgeChainEdge,
  KnowledgeChainNode,
  KnowledgeObjectProfile,
} from "@/lib/stankings-library/types";

export const SLP_IDENTIFIER = "FRAMEWORK-SLP-001";

export const FEATURED_KNOWLEDGE_PROFILES: KnowledgeObjectProfile[] = [
  {
    knowledgeId: "CANON-002",
    title: "Trust Is Institutional Capital",
    category: "Canon · Volume 0",
    institution: "Stankings Group",
    authors: ["Stanley Ukeje"],
    contributors: ["Library Council"],
    constitutionArticles: ["Art. XII § 12.01 — Principle of Digital Trust", "Art. VI § 6.02 — Evidence"],
    canonReferences: ["CANON-002"],
    relatedDecisions: [
      { id: "IDR-GATES-001", title: "Four-Gate Workflow", href: "/library/decisions/IDR-GATES-001" },
    ],
    relatedProjects: [{ id: "yike-passport", title: "YIKE Passport", href: "/companies/yike" }],
    versionHistory: [{ version: "1.0", date: "2026-06-27", summary: "Adopted as Volume 0 Canon" }],
    reviewStatus: "current",
    accessClassification: "employee",
    learningModules: [{ id: "TM-001", title: "Trust as Institutional Capital", href: "/library/canon/CANON-002" }],
    caseStudies: [{ id: "LLR-YIKE-001", title: "Verification Bypass Lesson", href: "/library/lessons/LLR-YIKE-001" }],
    aiEmbeddings: true,
    crossReferences: [
      { identifier: "CONSTITUTION-ARTICLE-XII", title: "Article XII", href: "/library/constitution/article-xii" },
      { identifier: "FRAMEWORK-TIA-001", title: "Trust Impact Assessment", href: "/library/frameworks/trust-impact-assessment" },
    ],
    href: "/library/canon/CANON-002",
  },
  {
    knowledgeId: "CONSTITUTION-ARTICLE-XII",
    title: "Information, Privacy & Digital Trust",
    category: "Constitutional Law · Volume I",
    institution: "Stankings Group",
    authors: ["Stanley Ukeje"],
    contributors: ["Library Council"],
    constitutionArticles: ["Art. XII § 12.01–12.09"],
    canonReferences: ["CANON-002", "CANON-007", "CANON-010", "CANON-012", "CANON-013", "CANON-021"],
    relatedDecisions: [{ id: "ED-40", title: "Executive Decision No. 40 — CIGF" }],
    relatedProjects: [
      { id: "constitutional-trust", title: "Constitutional Trust Centre", href: "/library/constitutional-trust" },
    ],
    versionHistory: [{ version: "1.0", date: "2026-06-27", summary: "Adopted — Part IV Trust Layer" }],
    reviewStatus: "current",
    accessClassification: "employee",
    learningModules: [{ id: "TM-008", title: "Digital Trust & Constitutional Obligation", href: "/library/constitution/article-xii" }],
    caseStudies: [],
    aiEmbeddings: true,
    crossReferences: [
      { identifier: "FRAMEWORK-CTC-001", title: "Constitutional Trust Centre", href: "/library/constitutional-trust" },
      { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002" },
    ],
    href: "/library/constitution/article-xii",
  },
  {
    knowledgeId: "LS-001",
    title: "The Knowledge Object Standard",
    category: "Library Standard",
    institution: "Stankings Group",
    authors: ["Library Council"],
    contributors: ["Stanley Ukeje"],
    constitutionArticles: ["Art. XIII § 13.02 — The Stankings Library", "Art. XIII § 13.06 — Knowledge Accessibility"],
    canonReferences: ["CANON-021"],
    relatedDecisions: [{ id: "ED-4", title: "Executive Decision No. 4 — IKI Naming" }],
    relatedProjects: [{ id: "library-engine", title: "Library Engine", href: "/library" }],
    versionHistory: [{ version: "1.0", date: "2026-06-27", summary: "Initial LS-001 adoption" }],
    reviewStatus: "current",
    accessClassification: "employee",
    learningModules: [{ id: "TM-003", title: "Knowledge Object Metadata", href: "/library/standards/ls-001" }],
    caseStudies: [],
    aiEmbeddings: true,
    crossReferences: [
      { identifier: "LS-002", title: "The Stankings Lexicon", href: "/library/standards/ls-002" },
      { identifier: "FRAMEWORK-IKG-001", title: "Institutional Knowledge Graph", href: "/library/knowledge-graph" },
    ],
    href: "/library/standards/ls-001",
  },
];

export function getKnowledgeChain(): { nodes: KnowledgeChainNode[]; edges: KnowledgeChainEdge[] } {
  const nodes: KnowledgeChainNode[] = [
    { id: "canon-002", label: "CANON-002", type: "canon", href: "/library/canon/CANON-002" },
    { id: "trust", label: "Trust", type: "concept" },
    { id: "yike-passport", label: "YIKE Passport", type: "platform", href: "/companies/yike" },
    { id: "bayright-escrow", label: "BayRight Escrow", type: "platform", href: "/companies/bayright" },
    { id: "article-xii", label: "Article XII", type: "article", href: "/library/constitution/article-xii" },
    { id: "es-014", label: "ES-014", type: "standard", href: "/library/volumes/engineering-standards" },
    { id: "d-2031-017", label: "D-2031-017", type: "decision", href: "/library/decision-workspace" },
    { id: "tm-008", label: "TM-008", type: "training", href: "/library/constitution/article-xii" },
  ];

  const edges: KnowledgeChainEdge[] = [
    { from: "canon-002", to: "trust" },
    { from: "trust", to: "yike-passport" },
    { from: "yike-passport", to: "bayright-escrow" },
    { from: "bayright-escrow", to: "article-xii" },
    { from: "article-xii", to: "es-014" },
    { from: "es-014", to: "d-2031-017" },
    { from: "d-2031-017", to: "tm-008" },
  ];

  return { nodes, edges };
}

export function getLibraryPortalStats() {
  const allObjects = getAllStaticKnowledgeObjects();
  return {
    knowledgeObjects: allObjects.length,
    featuredProfiles: FEATURED_KNOWLEDGE_PROFILES.length,
    chainNodes: getKnowledgeChain().nodes.length,
    withEmbeddings: FEATURED_KNOWLEDGE_PROFILES.filter((p) => p.aiEmbeddings).length,
    canons: allObjects.filter((o) => o.objectType === "canon").length,
    frameworks: allObjects.filter((o) => o.objectType === "framework").length,
    articles: allObjects.filter((o) => o.objectType === "article").length,
  };
}
