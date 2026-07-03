/**
 * Lexicon Engine — types for LS-002 The Stankings Lexicon
 */

export type LexiconTermStatus =
  | "approved"
  | "draft"
  | "in_review"
  | "proposed"
  | "archived";

export interface LexiconTermVersion {
  version: string;
  date: string;
  summaryOfChanges: string;
  definition: string;
  approvalStatus: "approved" | "pending" | "rejected";
  author: string;
}

export interface LexiconReference {
  identifier: string;
  title: string;
  objectType: string;
  href: string;
}

export interface LexiconTerm {
  identifier: string;
  term: string;
  slug: string;
  /** First letter for A–Z index */
  letter: string;
  definition: string;
  /** Additional paragraphs after the primary definition */
  paragraphs: string[];
  status: LexiconTermStatus;
  version: string;
  author: string;
  approver: string;
  owner: string;
  approvedAt: string;
  reviewDate: string;
  /** Writing assistance only — not authoritative substitutes */
  synonyms: string[];
  relatedTermSlugs: string[];
  referencedBy: LexiconReference[];
  versions: LexiconTermVersion[];
  distinctions?: { term: string; when: string }[];
  searchKeywords: string[];
}

export interface LexiconAlphabetBucket {
  letter: string;
  terms: Pick<LexiconTerm, "term" | "slug" | "identifier" | "status">[];
}

export interface LexiconSearchResult {
  term: LexiconTerm;
  score: number;
  matchedOn: ("term" | "definition" | "synonym" | "keyword")[];
}
