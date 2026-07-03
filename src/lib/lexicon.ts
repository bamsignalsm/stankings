/**
 * The Stankings Lexicon — re-exports from LS-002 Lexicon Engine.
 * Authoritative term data lives in @/lib/lexicon-engine/seed
 */

export {
  EDITOR_IN_CHIEF_DECISION_3,
  LEXICON_TERM_WORKFLOW,
  LS_002,
  LS_002_CLOSING,
  LS_002_PURPOSE,
} from "@/lib/standards/ls-002";

export type { LexiconTerm, LexiconTermStatus } from "@/lib/lexicon-engine/types";

export {
  getAllStaticLexiconTerms,
  getStaticLexiconTerm,
} from "@/lib/lexicon-engine/seed";

export const LEXICON_PREAMBLE = `The Stankings Lexicon is the official institutional vocabulary of Stankings Group.

Every document in the Library, every policy, every engineering standard, every training manual, every AI system, and every public communication shall draw its core terms from definitions established here — once, clearly, and for all generations.

Words shape thinking. Thinking shapes decisions. Decisions shape institutions.`;
