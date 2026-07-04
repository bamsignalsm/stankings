/**
 * Search — consumes shared search index.
 */

export {
  SEARCH_INDEX,
  searchShared as searchDocuments,
  buildSearchIndex,
  type SharedSearchDocument as SearchDocument,
  type SharedSearchCategory as SearchCategory,
} from "@/lib/shared/search";
