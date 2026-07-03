export type GovernanceBookStatus =
  | "planning"
  | "architecture_review"
  | "architecture_locked"
  | "drafting"
  | "convention_review"
  | "approved"
  | "published";

export type GovernanceChapterStatus =
  | "planned"
  | "architecture_review"
  | "drafting"
  | "convention_review"
  | "approved";

export type GovernanceBodyStatus = "established" | "forming" | "planned";

export interface GovernanceBookChapter {
  id: string;
  chapter: string;
  title: string;
  status: GovernanceChapterStatus;
  href: string;
}

export interface GovernanceChapterShell extends GovernanceBookChapter {
  partId: string;
  partLabel: string;
  partTitle: string;
  purpose: string;
  scope: string;
  scopeExcludes: string[];
  constitutionalRefs: string[];
  canonRefs: string[];
  relatedBookRefs: GovernanceKnowledgeRef[];
  builderNotes: string[];
  sessionHistory: GovernanceBookSessionRef[];
  reviewHistory: GovernanceBookReviewEntry[];
}

export interface GovernanceBookSessionRef {
  sessionId: string;
  title: string;
  href: string;
  date: string;
}

export interface GovernanceBookReviewEntry {
  date: string;
  phase: string;
  note: string;
}

export interface GovernanceKnowledgeRef {
  identifier: string;
  title: string;
  href: string;
}

export interface GovernanceBookPart {
  id: string;
  part: string;
  title: string;
  subtitle: string;
  href: string;
  chapterIds: string[];
}

export interface GovernanceFoundationalCharter {
  bookId: string;
  bookLabel: string;
  bookTitle: string;
  href: string;
  purpose: string;
  scope: string;
  scopeExcludes: string[];
  constitutionalAuthority: string[];
  constitutionalRefs: string[];
  canonRefs: string[];
  relatedBooks: GovernanceKnowledgeRef[];
  version: string;
  status: string;
  editorialNotes: string[];
  sessionHistory: GovernanceBookSessionRef[];
  reviewHistory: GovernanceBookReviewEntry[];
}

/** @deprecated Use GovernanceFoundationalCharter — Editorial Decision No. 53 */
export type GovernanceBookCharter = GovernanceFoundationalCharter;

export interface GovernanceBreadcrumbItem {
  label: string;
  href?: string;
}

export interface GovernanceBook {
  id: string;
  book: string;
  title: string;
  status: GovernanceBookStatus;
  locked: boolean;
  href: string;
  overview: string;
  purpose: string;
  description: string;
  chapters: GovernanceBookChapter[];
  builderNotes: string[];
  sessionHistory: GovernanceBookSessionRef[];
  reviewHistory: GovernanceBookReviewEntry[];
  constitutionalRefs: string[];
  canonRefs: string[];
  knowledgeObjectRefs: GovernanceKnowledgeRef[];
}

export interface GovernanceBody {
  id: string;
  name: string;
  shortName: string;
  constitutionalRefs: string[];
  canonRefs?: string[];
  purpose: string;
  responsibilities: string[];
  authority: string[];
  composition: string[];
  appointment: string[];
  meetings: string[];
  decisionRules: string[];
  reporting: string[];
  annualReview: string[];
  status: GovernanceBodyStatus;
  href?: string;
}

export const GOVERNANCE_BOOK_STATUS_LABELS: Record<GovernanceBookStatus, string> = {
  planning: "Planning",
  architecture_review: "Architecture Review",
  architecture_locked: "Architecture Locked",
  drafting: "Drafting",
  convention_review: "Convention Review",
  approved: "Approved",
  published: "Published",
};

export const GOVERNANCE_CHAPTER_STATUS_LABELS: Record<GovernanceChapterStatus, string> = {
  planned: "Planned",
  architecture_review: "Architecture Review",
  drafting: "Drafting",
  convention_review: "Convention Review",
  approved: "Approved",
};
