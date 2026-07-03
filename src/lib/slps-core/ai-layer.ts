/**
 * SLPS-CORE Module 7 — Institutional AI Layer (Future-ready)
 * Integration interfaces — no AI service wired yet.
 */

export type InstitutionalAIScope =
  | "canons"
  | "constitution"
  | "governance_code"
  | "engineering_standards"
  | "session_records"
  | "decisions"
  | "knowledge_objects"
  | "companies";

export interface InstitutionalAIQuery {
  query: string;
  scope?: InstitutionalAIScope[];
  includeDrafts?: boolean;
  maxCitations?: number;
}

export interface InstitutionalAICitation {
  identifier: string;
  title: string;
  href: string;
  excerpt: string;
  objectType: string;
}

export interface InstitutionalAIResult {
  query: string;
  answer: string | null;
  citations: InstitutionalAICitation[];
  confidence: "high" | "medium" | "low" | "not_implemented";
  processedAt: string;
}

export interface InstitutionalAIService {
  readonly id: string;
  readonly version: string;
  query(input: InstitutionalAIQuery): Promise<InstitutionalAIResult>;
}

/** Documented integration points for future AI services. */
export const INSTITUTIONAL_AI_INTEGRATION_POINTS = [
  {
    id: "approved-knowledge-only",
    description: "AI may retrieve from approved Knowledge Objects only — no draft content.",
    enforcedBy: "CANON-021 · Article XIII · LS-001",
  },
  {
    id: "citation-required",
    description: "Every AI answer must cite exact source objects with identifier and href.",
    enforcedBy: "SLPS-001 · Cross-Reference Engine",
  },
  {
    id: "search-facade",
    description: "Institutional Search (Module 6) is the retrieval layer — AI queries searchInstitutionalLibrary first.",
    enforcedBy: "SLPS-CORE search-engine",
  },
  {
    id: "metadata-context",
    description: "Publication metadata from Metadata Engine provides version and status context for answers.",
    enforcedBy: "SLPS-CORE metadata-engine",
  },
  {
    id: "graph-traversal",
    description: "IKI graph edges enable relationship queries — e.g. governance decisions affecting a company.",
    enforcedBy: "IKI graph · cross-reference-engine",
  },
] as const;

export const INSTITUTIONAL_AI_EXAMPLE_QUERIES = [
  "Show me every governance decision affecting Yike.",
  "What changed between Constitution 1.0 and 1.1?",
  "Which Canons apply to Article XIII?",
  "What session records relate to Volume II Book I?",
] as const;

/** Placeholder service — returns citations from search, no generative answer yet. */
export const INSTITUTIONAL_AI_STUB: InstitutionalAIService = {
  id: "SLPS-CORE-AI-STUB",
  version: "0.1",
  async query(input: InstitutionalAIQuery): Promise<InstitutionalAIResult> {
    const { searchInstitutionalLibrary } = await import("@/lib/slps-core/search-engine");
    const search = searchInstitutionalLibrary(input.query);
    const max = input.maxCitations ?? 5;

    return {
      query: input.query,
      answer: null,
      citations: search.results.slice(0, max).map((r) => ({
        identifier: r.id,
        title: r.label,
        href: r.href,
        excerpt: r.excerpt ?? "",
        objectType: r.kind,
      })),
      confidence: "not_implemented",
      processedAt: new Date().toISOString(),
    };
  },
};
