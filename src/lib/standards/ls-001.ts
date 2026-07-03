/**
 * Library Standard LS-001 — The Knowledge Object Standard
 * Version 1.0 · Approved
 * Foundation of the Institutional Brain.
 */

export const LS_001 = {
  id: "LS-001",
  title: "The Knowledge Object Standard",
  version: "1.0",
  status: "approved" as const,
} as const;

export const RULE_OF_DELIBERATE_MATURITY = `No Knowledge Object becomes Canon, Constitutional, or Operational until it has been questioned, refined, and deliberately approved. Drafts are encouraged. Permanence is earned.`;

export const LS_001_PURPOSE = `Every piece of institutional knowledge shall exist as a single, structured Knowledge Object.

The purpose of this standard is to ensure that institutional knowledge is versioned, searchable, reusable, publishable and suitable for both human readers and artificial intelligence systems.

Every book, chapter, article, canon, policy, engineering standard, architectural decision and governance document shall be composed of Knowledge Objects.

The Library shall therefore become the Single Source of Truth for Stankings Group.`;

export const LS_001_PRINCIPLES = [
  "Have one unique identifier.",
  "Have one authoritative owner.",
  "Exist only once within the Library.",
  "Be referenced rather than duplicated.",
  "Support version history.",
  "Support approval workflows.",
  "Support internal and public visibility.",
  "Support cross references.",
  "Support AI retrieval.",
  "Support print publication.",
] as const;

export const KNOWLEDGE_OBJECT_TYPES = [
  "canon",
  "principle",
  "article",
  "chapter",
  "volume",
  "policy",
  "standard",
  "architecture",
  "decision_record",
  "procedure",
  "guideline",
  "framework",
  "glossary_entry",
  "company_profile",
  "role_definition",
  "training_module",
  "founder_letter",
  "founder_insight",
  "meeting_record",
  "research_note",
  "strategic_initiative",
  "future_proposal",
  "lessons_learned",
] as const;

export type KnowledgeObjectType = (typeof KNOWLEDGE_OBJECT_TYPES)[number];

export const KNOWLEDGE_OBJECT_TYPE_LABELS: Record<KnowledgeObjectType, string> = {
  canon: "Canon",
  principle: "Principle",
  article: "Article",
  chapter: "Chapter",
  volume: "Volume",
  policy: "Policy",
  standard: "Standard",
  architecture: "Architecture",
  decision_record: "Decision Record",
  procedure: "Procedure",
  guideline: "Guideline",
  framework: "Framework",
  glossary_entry: "Glossary Entry",
  company_profile: "Company Profile",
  role_definition: "Role Definition",
  training_module: "Training Module",
  founder_letter: "Founder Letter",
  founder_insight: "Founder Insight",
  meeting_record: "Meeting Record",
  research_note: "Research Note",
  strategic_initiative: "Strategic Initiative",
  future_proposal: "Future Proposal",
  lessons_learned: "Lessons Learned Record",
};

export type KnowledgeObjectStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "archived"
  | "superseded";

export const VISIBILITY_LEVELS = [
  "public",
  "partner",
  "employee",
  "executive",
  "board",
  "trustees",
  "custodians",
  "confidential",
  "restricted",
] as const;

export type VisibilityLevel = (typeof VISIBILITY_LEVELS)[number];

export const VISIBILITY_LABELS: Record<VisibilityLevel, string> = {
  public: "Public",
  partner: "Partner",
  employee: "Employee",
  executive: "Executive",
  board: "Board",
  trustees: "Trustees",
  custodians: "Custodians",
  confidential: "Confidential",
  restricted: "Restricted",
};

export type RelationshipType =
  | "references"
  | "depends_on"
  | "supersedes"
  | "related";

export type ApprovalStatus = "pending" | "approved" | "rejected";

/** Required metadata per LS-001 */
export interface KnowledgeObject {
  id: string;
  identifier: string;
  objectType: KnowledgeObjectType;
  title: string;
  summary: string;
  volume: string | null;
  volumeSlug: string | null;
  category: string | null;
  status: KnowledgeObjectStatus;
  version: string;
  author: string | null;
  approver: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
  reviewDate: string | null;
  visibility: VisibilityLevel;
  tags: string[];
  dependencies: string[];
  references: KnowledgeReference[];
  referencedBy: KnowledgeReference[];
  supersedes: string | null;
  supersededBy: string | null;
  relatedCompanies: string[];
  relatedSystems: string[];
  searchKeywords: string[];
  sectionAnchor: string | null;
  bodyMarkdown: string | null;
  /** Canon importance — 1–5 stars */
  importance?: number;
  historicalNotes?: string | null;
}

export interface KnowledgeReference {
  identifier: string;
  title: string;
  href?: string;
  note?: string;
}

export interface KnowledgeObjectVersion {
  id: string;
  knowledgeObjectId: string;
  versionNumber: string;
  author: string;
  createdAt: string;
  summaryOfChanges: string;
  approvalStatus: ApprovalStatus;
  reasonForChange: string;
  bodyMarkdown: string;
}

export interface KnowledgeRelationship {
  id: string;
  sourceIdentifier: string;
  targetIdentifier: string;
  relationshipType: RelationshipType;
  note: string | null;
}

export const LS_001_REQUIRED_METADATA = [
  "identifier",
  "title",
  "summary",
  "volume",
  "category",
  "status",
  "version",
  "author",
  "approver",
  "owner",
  "created_date",
  "updated_date",
  "review_date",
  "visibility",
  "tags",
  "dependencies",
  "references",
  "supersedes",
  "superseded_by",
  "related_companies",
  "related_systems",
  "search_keywords",
] as const;

export const LS_001_VISIBILITY_SECTION = `Every object shall belong to one of the following visibility classes: Public, Partner, Employee, Executive, Board, Trustees, Custodians, Confidential, Restricted.

The default visibility shall be the lowest level necessary to fulfil the purpose of the document.`;

export const LS_001_VERSION_SECTION = `Institutional knowledge shall never be overwritten. Every revision shall preserve historical versions.

Each version shall contain: Version Number, Author, Date, Summary of Changes, Approval Status, and Reason for Change.

Future generations shall therefore be capable of understanding not only what changed, but why it changed.`;

export const LS_001_CROSS_REF_SECTION = `Knowledge Objects shall never duplicate institutional knowledge. Instead, they shall reference the authoritative object.

The Constitution references Canons. Engineering Standards reference Policies. Policies reference Governance Articles. Training references Standards. Artificial Intelligence references the approved source.

One source. Many consumers.`;

export const LS_001_AI_SECTION = `Artificial intelligence systems operating within the Stankings ecosystem shall retrieve institutional knowledge from approved Knowledge Objects.

Artificial intelligence shall never become the authoritative source of institutional knowledge. The Library remains the authority. Artificial intelligence remains the interpreter.`;

export const LS_001_PUBLICATION_SECTION = `Knowledge Objects shall support multiple publication formats without duplication: Website, Internal Portal, Training Materials, PDF, Hardcover Books, Presentations, Executive Briefs, API, AI Knowledge Base, and future publication formats.

Content shall exist once and publish everywhere.`;

export const LS_001_CLOSING = `Knowledge preserved without structure becomes information.

Knowledge structured with purpose becomes institutional wisdom.

The Stankings Library exists to preserve that wisdom for generations yet unborn.`;

export const LIBRARY_ENGINE_PHASES = {
  a: {
    title: "Library Engine",
    priority: "Highest",
    modules: [
      "Library dashboard",
      "Volumes",
      "Chapters",
      "Knowledge Objects",
      "Metadata",
      "Tags",
      "Relationships",
      "Cross-references",
      "Version history",
      "Approval workflow",
      "Visibility",
      "Full-text and semantic search",
    ],
  },
  b: {
    title: "Publishing Engine",
    modules: [
      "Website rendering",
      "Markdown export",
      "PDF export",
      "DOCX export",
      "Print-ready layouts",
      "Hardcover-ready export",
      "Public vs. private publishing",
    ],
  },
  c: {
    title: "Institutional AI",
    modules: [
      "AI retrieval from approved Knowledge Objects only",
      "Citation of the exact source object",
      "Semantic search",
      "Context-aware answers",
      "No answers from unapproved drafts",
    ],
  },
} as const;
