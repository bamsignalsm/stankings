import type { ArticleCommentary } from "@/lib/constitutional-convention/types";

const COMMENTARY: Record<string, Omit<ArticleCommentary, "articleId">> = {
  "article-i": {
    whyItExists: "Establishes what Stankings Group is — perpetual, institutional, independent of any individual generation.",
    historicalBackground: "Rooted in the shift from product companies (Yike, BamSignal) to institutional thinking.",
    examples: ["Enterprise test in § 1.03", "Ecosystem principle in § 1.02"],
    engineeringImplications: ["FRAMEWORK-IIS-001 encodes identity statements", "Institutional identity portal"],
    caseStudies: ["Yike marketplace as first expression of institutional identity"],
    relatedAiSystems: ["Institutional AI must align outputs to constitutional identity"],
    questions: ["How does a new institution prove it belongs in the ecosystem?"],
    futureNotes: ["Commentary volume will expand jurisdictional variations"],
    status: "forming",
  },
  "article-xii": {
    whyItExists: "Constitutionalizes digital trust — identity, privacy, AI governance, and the Stankings Trust Network.",
    historicalBackground: "Born from YIKE Passport, verification systems, and the need for shared identity across institutions.",
    examples: ["Purpose limitation in § 12.04", "Trust Network principles in § 12.03"],
    engineeringImplications: [
      "YIKE Passport implementation",
      "Trust Graph architecture",
      "CIGF per ED 40",
      "AI governance hooks in institutional systems",
    ],
    caseStudies: ["BayRight escrow requiring verified identity", "Cross-institution passport consent flows"],
    relatedAiSystems: ["Institutional AI", "Verification services", "Trust Graph queries"],
    questions: ["When may one institution access another's user data?", "How is AI trained on institutional data?"],
    futureNotes: ["Volume VI AI Constitution will extend § 12.06"],
    status: "forming",
  },
  "article-ix": {
    whyItExists: "Defines the institutional ecosystem — separate institutions united by shared platforms, not subsidiaries.",
    historicalBackground: "Formalizes the architecture that began with Yike, BamSignal, BayRight, and expanding institutions.",
    examples: ["Admission criteria § 9.02", "Shared platforms § 9.04", "Ecosystem stewardship § 9.05"],
    engineeringImplications: ["Platform Registry", "Ecosystem Architecture Portal", "Per-institution deployment boundaries"],
    caseStudies: ["Yike + BayRight shared passport", "Venture Studio admission process"],
    relatedAiSystems: ["Shared Institutional AI layer"],
    questions: ["What qualifies an institution for ecosystem membership?"],
    futureNotes: ["Diagram in Phase 4 illustrates ecosystem architecture"],
    status: "forming",
  },
};

function defaultCommentary(title: string): Omit<ArticleCommentary, "articleId"> {
  return {
    whyItExists: `${title} implements Volume 0 Canons into binding internal governance law.`,
    historicalBackground: "Developed during Volume I drafting, June 2026 Constitutional Congress preparation.",
    examples: [],
    engineeringImplications: ["See related framework in cross-links"],
    caseStudies: [],
    relatedAiSystems: [],
    questions: ["Commentary expanding in Convention Phase 3"],
    futureNotes: [],
    status: "forming",
  };
}

const ARTICLE_TITLES: Record<string, string> = {
  "article-i": "The Identity of the Institution",
  "article-ii": "Purpose, Mission & Constitutional Objectives",
  "article-iii": "Stewardship, Continuity & Generational Responsibility",
  "article-iv": "Constitutional Governance",
  "article-v": "Constitutional Standards for Leadership",
  "article-vi": "Constitutional Decision-Making",
  "article-vii": "Institutional Assets & Their Stewardship",
  "article-viii": "Ownership, Custody & Constitutional Responsibility",
  "article-ix": "The Institutional Ecosystem",
  "article-x": "The Lifecycle of Institutions",
  "article-xi": "Conflicts of Interest, Integrity & Constitutional Ethics",
  "article-xii": "Information, Privacy & Digital Trust",
  "article-xiii": "Knowledge, Learning & Institutional Memory",
  "article-xiv": "Constitutional Review, Institutional Health & Continual Improvement",
  "article-xv": "Constitutional Amendment, Preservation & Continuity",
  "article-xvi": "The Custodian Programme & Leadership Development",
  "article-xvii": "Constitutional Ratification, Oath & Commitment",
};

export const ARTICLE_COMMENTARY: ArticleCommentary[] = Object.entries(ARTICLE_TITLES).map(
  ([articleId, title]) => ({
    articleId,
    ...(COMMENTARY[articleId] ?? defaultCommentary(title)),
  }),
);

export function getArticleCommentary(articleId: string): ArticleCommentary | undefined {
  return ARTICLE_COMMENTARY.find((c) => c.articleId === articleId);
}
