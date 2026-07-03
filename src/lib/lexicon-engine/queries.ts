import { createClient } from "@/lib/supabase/server";
import type {
  LexiconAlphabetBucket,
  LexiconSearchResult,
  LexiconTerm,
} from "@/lib/lexicon-engine/types";
import {
  getAllStaticLexiconTerms,
  getStaticLexiconTerm,
} from "@/lib/lexicon-engine/seed";
import { getLexiconTermHref } from "@/lib/lexicon-engine/hrefs";

export { getLexiconTermHref };

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface LexiconTermRow {
  identifier: string;
  term: string;
  slug: string;
  letter: string;
  definition: string;
  paragraphs: string[];
  status: string;
  version: string;
  author: string;
  approver: string;
  owner: string;
  approved_at: string;
  review_date: string;
  synonyms: string[];
  related_term_slugs: string[];
  search_keywords: string[];
  distinctions: { term: string; when: string }[] | null;
}

function rowToLexiconTerm(row: LexiconTermRow): LexiconTerm {
  const staticTerm = getStaticLexiconTerm(row.slug);
  return {
    identifier: row.identifier,
    term: row.term,
    slug: row.slug,
    letter: row.letter,
    definition: row.definition,
    paragraphs: row.paragraphs ?? [],
    status: row.status as LexiconTerm["status"],
    version: row.version,
    author: row.author,
    approver: row.approver,
    owner: row.owner,
    approvedAt: row.approved_at,
    reviewDate: row.review_date,
    synonyms: row.synonyms ?? [],
    relatedTermSlugs: row.related_term_slugs ?? [],
    referencedBy: staticTerm?.referencedBy ?? [],
    versions: staticTerm?.versions ?? [],
    distinctions: row.distinctions ?? undefined,
    searchKeywords: row.search_keywords ?? [],
  };
}

export async function listLexiconTerms(): Promise<LexiconTerm[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stankings_lexicon_terms")
    .select("*")
    .order("term", { ascending: true });

  if (error || !data?.length) {
    return getAllStaticLexiconTerms();
  }

  return (data as LexiconTermRow[]).map(rowToLexiconTerm);
}

export async function getLexiconTermBySlug(slug: string): Promise<LexiconTerm | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stankings_lexicon_terms")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return getStaticLexiconTerm(slug);
  }

  return rowToLexiconTerm(data as LexiconTermRow);
}

export async function getLexiconAlphabetIndex(): Promise<LexiconAlphabetBucket[]> {
  const terms = await listLexiconTerms();
  const approved = terms.filter((t) => t.status === "approved");

  return ALPHABET.map((letter) => ({
    letter,
    terms: approved
      .filter((t) => t.letter.toUpperCase() === letter)
      .map((t) => ({
        term: t.term,
        slug: t.slug,
        identifier: t.identifier,
        status: t.status,
      })),
  }));
}

function scoreTerm(term: LexiconTerm, q: string): LexiconSearchResult | null {
  const query = q.trim().toLowerCase();
  if (!query) return null;

  let score = 0;
  const matchedOn: LexiconSearchResult["matchedOn"] = [];

  if (term.term.toLowerCase() === query) {
    score += 100;
    matchedOn.push("term");
  } else if (term.term.toLowerCase().includes(query)) {
    score += 60;
    matchedOn.push("term");
  }

  if (term.slug.replace(/-/g, " ").includes(query)) {
    score += 40;
    matchedOn.push("term");
  }

  const fullText = [term.definition, ...term.paragraphs].join(" ").toLowerCase();
  if (fullText.includes(query)) {
    score += 25;
    matchedOn.push("definition");
  }

  for (const syn of term.synonyms) {
    if (syn.toLowerCase().includes(query)) {
      score += 20;
      matchedOn.push("synonym");
    }
  }

  for (const kw of term.searchKeywords) {
    if (kw.toLowerCase().includes(query)) {
      score += 15;
      matchedOn.push("keyword");
    }
  }

  // Semantic expansion — related concepts
  const semanticMap: Record<string, string[]> = {
    serve: ["institution", "stewardship", "custodian"],
    integrity: ["trust", "excellence"],
    ssot: ["single-source-of-truth", "knowledge-object"],
    vocabulary: ["lexicon"],
    dictionary: ["lexicon"],
    brain: ["knowledge-object", "single-source-of-truth"],
  };

  for (const [key, slugs] of Object.entries(semanticMap)) {
    if (query.includes(key) && slugs.includes(term.slug)) {
      score += 10;
      matchedOn.push("keyword");
    }
  }

  if (score === 0) return null;
  return { term, score, matchedOn: [...new Set(matchedOn)] };
}

export async function searchLexiconTerms(query: string): Promise<LexiconSearchResult[]> {
  const terms = await listLexiconTerms();
  return terms
    .map((t) => scoreTerm(t, query))
    .filter((r): r is LexiconSearchResult => r !== null)
    .sort((a, b) => b.score - a.score);
}

export async function getLexiconStats() {
  const terms = await listLexiconTerms();
  return {
    total: terms.length,
    approved: terms.filter((t) => t.status === "approved").length,
    proposed: terms.filter((t) => t.status === "proposed").length,
    inReview: terms.filter((t) => t.status === "in_review").length,
    standard: "LS-002",
    version: "1.0",
  };
}

/** Flat retrieval payload for AI systems */
export async function retrieveLexiconForAI(options?: {
  term?: string;
  query?: string;
  limit?: number;
}) {
  const limit = options?.limit ?? 10;

  if (options?.term) {
    const slug = options.term.toLowerCase().replace(/\s+/g, "-");
    const found = await getLexiconTermBySlug(slug);
    if (!found) return { standard: "LS-002", results: [] };
    return {
      standard: "LS-002",
      version: "1.0",
      instruction:
        "Use these definitions as authoritative. Do not invent alternative meanings.",
      results: [formatTermForAI(found)],
    };
  }

  const q = options?.query ?? "";
  const results = await searchLexiconTerms(q);
  return {
    standard: "LS-002",
    version: "1.0",
    query: q,
    instruction:
      "Use these definitions as authoritative. Do not invent alternative meanings.",
    results: results.slice(0, limit).map((r) => formatTermForAI(r.term)),
  };
}

function formatTermForAI(term: LexiconTerm) {
  return {
    identifier: term.identifier,
    term: term.term,
    status: term.status,
    version: term.version,
    definition: term.definition,
    paragraphs: term.paragraphs,
    synonyms_writing_assistance_only: term.synonyms,
    related_terms: term.relatedTermSlugs,
    distinctions: term.distinctions ?? [],
    href: getLexiconTermHref(term.slug),
  };
}
