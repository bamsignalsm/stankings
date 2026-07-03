/**
 * Knowledge Engineering — institutional knowledge objects, canons, and metadata.
 * The Library is the single source of truth; stankings.com is its digital twin.
 */

export const SINGLE_SOURCE_OF_TRUTH_PRINCIPLE = `Every institutional principle, policy, standard, architectural decision, governance rule, and strategic doctrine shall have one authoritative source within The Stankings Library. All websites, software, training materials, AI systems, printed books, and internal documents shall derive from that source rather than maintaining independent copies.`;

export const METADATA_RULE = `Every single thing we write from today forward shall carry institutional metadata — machine-readable, searchable, versioned, and publishable.`;

export const KNOWLEDGE_ENGINEERING_MANIFESTO = `We are no longer writing books. We are building the brain of Stankings Group. The books become exports. The website becomes a window. The AI becomes the librarian. The Constitution becomes structured data.`;

/** Official development methodology — Canon → Library → Implementation → Products */
export const DEVELOPMENT_METHODOLOGY = [
  { label: "Stankings Canon", description: "Authoritative knowledge objects" },
  { label: "Stankings Library", description: "Volumes, chapters, articles" },
  {
    label: "Constitution · Governance · Operating System",
    description: "Derived institutional law and practice",
  },
  {
    label: "stankings.com (Private Library)",
    description: "Institutional Knowledge Platform",
  },
  { label: "Cursor Implementation", description: "Code derives from canon" },
  { label: "Core Platform & Products", description: "Software nine layers down" },
  { label: "Hardcover Publications", description: "Exported editions" },
] as const;

/** Future stankings.com information architecture */
export const FUTURE_PLATFORM_SECTIONS = {
  public: ["About", "Companies", "Foundation", "Careers", "News", "Contact"],
  privateLibrary: [
    "Volume 0",
    "Constitution",
    "Charter",
    "Governance",
    "Operating System",
    "Engineering",
    "Core Platform",
    "Founder Letters",
  ],
  portals: [
    "Custodian Portal",
    "Board Portal",
    "Executive Portal",
    "AI Assistant",
    "Library Search",
  ],
} as const;

/** Institutional CMS — roadmap capabilities */
export const INSTITUTIONAL_CMS_FEATURES = [
  "Volumes",
  "Chapters",
  "Articles",
  "Canons",
  "Cross References",
  "Amendment History",
  "Contributors",
  "Approvals",
  "Digital Signatures",
  "Publishing",
  "Search",
  "AI Semantic Search",
  "Version Compare",
  "Print Export",
  "PDF Export",
  "Hardcover Export",
  "Website Publish",
  "Internal Only / Public / Confidential",
] as const;

export type KnowledgeStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "archived"
  | "superseded";

export type VisibilityLevel = "public-summary" | "internal" | "confidential";

export interface KnowledgeReference {
  id: string;
  label: string;
  href?: string;
  note?: string;
}

export interface KnowledgeObjectMeta {
  id: string;
  title: string;
  volume: string;
  volumeSlug: string;
  chapter: string;
  sectionAnchor?: string;
  status: KnowledgeStatus;
  owner: string;
  reviewCycle: string;
  dependencies: string[];
  references: KnowledgeReference[];
  referencedBy: KnowledgeReference[];
  visibility: VisibilityLevel[];
  edition: string;
  editionLabel: string;
  lastUpdated: string;
  summary?: string;
}

export { RULE_OF_DELIBERATE_MATURITY } from "@/lib/standards/ls-001";

// Legacy — prefer library-engine/queries.ts
export { getStaticKnowledgeObject as getCanonById } from "@/lib/library-engine/seed";

/** Edition lineage — git-like versioning for volumes */
export interface EditionLineage {
  volumeSlug: string;
  volumeLabel: string;
  editions: { version: string; label: string; status: "current" | "planned" | "superseded" }[];
}

export const EDITION_LINEAGE: EditionLineage[] = [
  {
    volumeSlug: "first-principles",
    volumeLabel: "Volume 0 — The First Principles",
    editions: [
      { version: "1.0", label: "2026 Edition 1.0", status: "current" },
      { version: "1.1", label: "Edition 1.1", status: "planned" },
      { version: "2.0", label: "Edition 2.0", status: "planned" },
    ],
  },
];
