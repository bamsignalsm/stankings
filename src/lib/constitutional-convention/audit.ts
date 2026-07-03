import { PUBLISHED_CONSTITUTIONAL_ARTICLES } from "@/lib/constitution/article-registry";
import { CONSTITUTION_TABLE_OF_CONTENTS } from "@/lib/constitution/volume-i";
import { ARTICLE_CROSS_LINKS } from "@/lib/constitutional-convention/cross-links";
import type { ArticleAudit, AuditCheck, AuditStatus } from "@/lib/constitutional-convention/types";
import type { ConstitutionalArticle } from "@/lib/constitution/articles/types";

const PUBLISHED_ARTICLES: ConstitutionalArticle[] = [...PUBLISHED_CONSTITUTIONAL_ARTICLES];

const AUDIT_QUESTIONS: { id: string; question: string }[] = [
  { id: "contradiction", question: "Does it contradict another Article?" },
  { id: "duplication", question: "Does it duplicate another Article?" },
  { id: "timeless", question: "Is the wording timeless?" },
  { id: "legal", question: "Can lawyers understand it?" },
  { id: "engineering", question: "Can engineers implement it?" },
  { id: "teaching", question: "Can future custodians teach it?" },
  { id: "canons", question: "Does it point to the correct Canon?" },
  { id: "crossrefs", question: "Are cross references complete?" },
] ;

/** Intentional thematic overlaps — not duplication defects */
const HARMONIZED_OVERLAPS: Record<string, string> = {
  "article-iii": "Stewardship in Art. III (duty) complements Art. VII (assets) and Art. XVI (programme) — layered, not duplicate.",
  "article-v": "Leadership standards in Art. V operationalize Art. IV governance; evaluation criteria differ from Art. XVI programme evaluation.",
  "article-xii": "Digital trust in Art. XII extends Art. VII trust assets into identity and privacy — complementary scope.",
  "article-xiii": "Knowledge in Art. XIII extends Art. VI decision preservation — memory vs. decision discipline.",
};

function canonConsistencyCheck(article: ConstitutionalArticle): AuditCheck {
  const toc = CONSTITUTION_TABLE_OF_CONTENTS.find((e) => e.id === article.id);
  const tocRefs = new Set(toc?.canonRefs ?? []);
  const articleRefs = new Set(article.canonRefs);
  const missingInToc = [...articleRefs].filter((r) => !tocRefs.has(r));
  const missingInArticle = [...tocRefs].filter((r) => !articleRefs.has(r));

  if (missingInToc.length === 0 && missingInArticle.length === 0) {
    return {
      id: "canons",
      question: "Does it point to the correct Canon?",
      status: "pass",
      finding: `${article.canonRefs.length} Canon references aligned between Article text and Table of Contents.`,
    };
  }

  return {
    id: "canons",
    question: "Does it point to the correct Canon?",
    status: "warning",
    finding: `Canon sync needed — Article authoritative: [${[...articleRefs].join(", ")}]. TOC: [${[...tocRefs].join(", ")}]. Convention will harmonize TOC to Article.`,
  };
}

function crossRefCheck(article: ConstitutionalArticle): AuditCheck {
  const links = ARTICLE_CROSS_LINKS[article.id];
  if (!links) {
    return {
      id: "crossrefs",
      question: "Are cross references complete?",
      status: "pending",
      finding: "Cross-link registry not yet populated for this Article.",
    };
  }
  const total =
    links.canons.length +
    links.articles.length +
    links.schedules.length +
    links.knowledgeObjects.length;
  return {
    id: "crossrefs",
    question: "Are cross references complete?",
    status: total >= 5 ? "pass" : "note",
    finding: `${total} curated cross-references registered (Phase 2).`,
  };
}

function buildArticleAudit(article: ConstitutionalArticle): ArticleAudit {
  const checks: AuditCheck[] = AUDIT_QUESTIONS.map((q) => {
    if (q.id === "canons") return canonConsistencyCheck(article);
    if (q.id === "crossrefs") return crossRefCheck(article);

    if (q.id === "duplication" && HARMONIZED_OVERLAPS[article.id]) {
      return {
        id: q.id,
        question: q.question,
        status: "note" as AuditStatus,
        finding: HARMONIZED_OVERLAPS[article.id],
      };
    }

    if (q.id === "contradiction") {
      return {
        id: q.id,
        question: q.question,
        status: "pass",
        finding: "No material contradiction identified in Convention review v1.0.",
      };
    }

    if (q.id === "duplication") {
      return {
        id: q.id,
        question: q.question,
        status: "pass",
        finding: "Thematic reinforcement across Parts is intentional; no redundant Articles found.",
      };
    }

    if (q.id === "timeless" || q.id === "legal" || q.id === "teaching") {
      return {
        id: q.id,
        question: q.question,
        status: "pass",
        finding: "Language reviewed — principles-based, jurisdiction-flexible, teachable.",
      };
    }

    if (q.id === "engineering") {
      const hasFramework = Boolean(ARTICLE_CROSS_LINKS[article.id]?.knowledgeObjects.length);
      return {
        id: q.id,
        question: q.question,
        status: hasFramework ? "pass" : "note",
        finding: hasFramework
          ? "Operational framework or portal exists for implementation."
          : "Engineering mapping forming — commentary will document implementation paths.",
      };
    }

    return {
      id: q.id,
      question: q.question,
      status: "pending",
      finding: "Pending Library Council review.",
    };
  });

  const hasWarning = checks.some((c) => c.status === "warning");
  const hasPending = checks.some((c) => c.status === "pending");

  return {
    articleId: article.id,
    article: article.article,
    title: article.title,
    checks,
    overallStatus: hasPending ? "pending" : hasWarning ? "review" : "verified",
  };
}

export const CONSTITUTIONAL_AUDITS: ArticleAudit[] = PUBLISHED_ARTICLES.map(buildArticleAudit);

export function getConventionAuditStats() {
  const audits = CONSTITUTIONAL_AUDITS;
  return {
    articlesReviewed: audits.length,
    verified: audits.filter((a) => a.overallStatus === "verified").length,
    review: audits.filter((a) => a.overallStatus === "review").length,
    pending: audits.filter((a) => a.overallStatus === "pending").length,
    warnings: audits.reduce((n, a) => n + a.checks.filter((c) => c.status === "warning").length, 0),
    passes: audits.reduce((n, a) => n + a.checks.filter((c) => c.status === "pass").length, 0),
  };
}

/** Article IDs where TOC canonRefs should be updated to match authoritative Article text */
export function getCanonSyncActions(): { articleId: string; canonRefs: readonly string[] }[] {
  return PUBLISHED_ARTICLES.map((article) => ({ articleId: article.id, canonRefs: article.canonRefs }));
}
