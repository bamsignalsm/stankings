export type {
  GovernanceBody,
  GovernanceBodyStatus,
  GovernanceBook,
  GovernanceBookChapter,
  GovernanceFoundationalCharter,
  GovernanceBookCharter,
  GovernanceBookPart,
  GovernanceBookReviewEntry,
  GovernanceBookSessionRef,
  GovernanceBookStatus,
  GovernanceBreadcrumbItem,
  GovernanceChapterShell,
  GovernanceChapterStatus,
  GovernanceKnowledgeRef,
} from "@/lib/governance-code/types";

export {
  GOVERNANCE_BOOK_STATUS_LABELS,
  GOVERNANCE_CHAPTER_STATUS_LABELS,
} from "@/lib/governance-code/types";

export {
  BOOK_I_ID,
  GOVERNANCE_BODIES,
  getBookIStats,
  getGovernanceBody,
} from "@/lib/governance-code/bodies/register";

export {
  BOOK_I_CENTRAL_QUESTION,
  BOOK_I_CHAPTERS,
  BOOK_I_SCOPE_EXCLUDES,
  BOOK_I_SCOPE_INCLUDES,
  CONSTITUTIONAL_COUNCIL_PRINCIPLE,
  getBookIChapter,
  getBookIChapterSummaries,
  getBookIChaptersByPart,
} from "@/lib/governance-code/books/book-i/chapters";

export { BOOK_I_CHARTER, BOOK_I_FOUNDATIONAL_CHARTER } from "@/lib/governance-code/books/book-i/charter";
export {
  BOOK_I_CHARTER_META,
  BOOK_I_CHARTER_SECTIONS,
  BOOK_I_CHARTER_ARCHITECTURE_STATUS,
} from "@/lib/governance-code/books/book-i/charter-architecture";
export { BOOK_I_PARTS, getBookIPart } from "@/lib/governance-code/books/book-i/parts";
export { BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS, getFoundationalCharterSection } from "@/lib/governance-code/books/book-i/foundational-charter-sections";
export { BOOK_I_PROGRESS, formatBookIProgressText } from "@/lib/governance-code/books/book-i/progress";
export {
  BOOK_I_CHAPTER_01_ARCHITECTURE_HREF,
  BOOK_I_CHAPTER_01_SECTIONS,
  BOOK_I_CHAPTER_01_PROBLEM_STATEMENT,
} from "@/lib/governance-code/books/book-i/chapters/chapter-01-architecture";

export {
  GOVERNANCE_BODY_TEMPLATE_FIELDS,
  GOVERNANCE_CODE_BOOKS,
  GOVERNANCE_CODE_EFFECTIVE_DATE,
  GOVERNANCE_CODE_PURPOSE,
  GOVERNANCE_CODE_STATUS,
  GOVERNANCE_CODE_TITLE,
  GOVERNANCE_CODE_VERSION,
  GOVERNANCE_STACK,
  getGovernanceBook,
  getGovernanceBookStats,
} from "@/lib/governance-code/volume-ii";
