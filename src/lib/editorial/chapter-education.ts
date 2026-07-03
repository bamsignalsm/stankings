/**
 * Chapter Education Standard — permanent publishing layer for every chapter
 * Editorial Decision No. 54 — Session LIB-2026-06-27-012
 *
 * Every chapter is both a governance document and a teaching document.
 */

export const CHAPTER_EDUCATION_STANDARD_ID = "FRAMEWORK-CEF-001" as const;

export const CHAPTER_EDUCATION_PRINCIPLE =
  "Every chapter in the Stankings Library shall be both a governance document and a teaching document." as const;

/** Permanent chapter footer blocks — locked unless SLPS changes. */
export const CHAPTER_EDUCATION_FOOTER_BLOCKS = [
  "Reflection Questions",
  "Practical Example",
  "Related Reading",
  "Related Constitution Articles",
  "Related Canons",
  "Related Knowledge Objects",
  "Related Library Sessions",
] as const;

export const CHAPTER_EDUCATION_CORE_LAYERS = [
  "Core content",
  "Visual explanation",
  "Reflection questions",
  "Practical institutional scenario",
  "Cross-references for deeper study",
] as const;

export interface ChapterEducationFooterArchitecture {
  reflectionQuestions: string[];
  practicalExample: {
    title: string;
    scenario: string;
    fieldsToDraft: string[];
  };
  relatedReading: { label: string; href: string; identifier: string }[];
  constitutionArticles: { label: string; href: string; identifier: string }[];
  canons: { label: string; href: string; identifier: string }[];
  knowledgeObjects: { label: string; href: string; identifier: string }[];
  librarySessions: { label: string; href: string; identifier: string }[];
}
