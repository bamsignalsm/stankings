import { CONSTITUTION_TABLE_OF_CONTENTS } from "@/lib/constitution/volume-i";
import { ARTICLE_COMMENTARY } from "@/lib/constitutional-convention/commentary";
import { CONSTITUTIONAL_INDEX } from "@/lib/constitutional-convention/index-terms";
import { ARTICLE_CROSS_LINKS } from "@/lib/constitutional-convention/cross-links";
import type { ConstitutionalSearchResult } from "@/lib/constitutional-convention/types";

export function searchConstitution(query: string): ConstitutionalSearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: ConstitutionalSearchResult[] = [];

  for (const entry of CONSTITUTION_TABLE_OF_CONTENTS) {
    if (
      entry.id.startsWith("article-") &&
      (entry.title.toLowerCase().includes(q) ||
        entry.article.toLowerCase().includes(q) ||
        entry.id.includes(q))
    ) {
      results.push({
        kind: "article",
        id: entry.id,
        label: `${entry.article} — ${entry.title}`,
        href: entry.href ?? `/library/constitution/${entry.id}`,
        excerpt: `Part of Volume I — ${entry.canonRefs?.join(", ") ?? "constitutional law"}`,
      });
    }
  }

  for (const term of CONSTITUTIONAL_INDEX) {
    if (
      term.term.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q) ||
      term.articleIds.some((id) => id.includes(q))
    ) {
      results.push({
        kind: "term",
        id: term.slug,
        label: term.term,
        href: term.href ?? `/library/constitutional-convention#index`,
        excerpt: term.definition,
      });
    }
  }

  for (const commentary of ARTICLE_COMMENTARY) {
    if (
      commentary.whyItExists.toLowerCase().includes(q) ||
      commentary.historicalBackground.toLowerCase().includes(q)
    ) {
      results.push({
        kind: "commentary",
        id: commentary.articleId,
        label: `Commentary — ${commentary.articleId}`,
        href: `/library/constitutional-convention#commentary-${commentary.articleId}`,
        excerpt: commentary.whyItExists,
      });
    }
  }

  for (const [articleId, links] of Object.entries(ARTICLE_CROSS_LINKS)) {
    for (const ko of links.knowledgeObjects) {
      if (ko.label.toLowerCase().includes(q) || ko.id.toLowerCase().includes(q)) {
        results.push({
          kind: "framework",
          id: ko.id,
          label: ko.label,
          href: ko.href,
          excerpt: `Related to ${articleId}`,
        });
      }
    }
    for (const co of links.companies) {
      if (co.label.toLowerCase().includes(q)) {
        results.push({
          kind: "company",
          id: co.id,
          label: co.label,
          href: co.href,
          excerpt: `Affected by ${articleId}`,
        });
      }
    }
  }

  const canonMatch = q.match(/canon[- ]?(\d+)/);
  if (canonMatch) {
    const canonId = `CANON-${canonMatch[1].padStart(3, "0")}`;
    results.push({
      kind: "canon",
      id: canonId,
      label: canonId,
      href: `/library/canon/${canonId}`,
      excerpt: "Volume 0 — The Canons",
    });
  }

  if (q.includes("ai") || q.includes("artificial")) {
    for (const id of ["article-xii", "article-xiii"]) {
      if (!results.some((r) => r.id === id)) {
        const entry = CONSTITUTION_TABLE_OF_CONTENTS.find((e) => e.id === id);
        if (entry) {
          results.push({
            kind: "article",
            id,
            label: `${entry.article} — ${entry.title}`,
            href: entry.href!,
            excerpt: "AI governance and institutional intelligence",
          });
        }
      }
    }
  }

  if (q.includes("trust")) {
    for (const id of ["article-vii", "article-xi", "article-xii"]) {
      if (!results.some((r) => r.id === id)) {
        const entry = CONSTITUTION_TABLE_OF_CONTENTS.find((e) => e.id === id);
        if (entry?.href) {
          results.push({
            kind: "article",
            id,
            label: `${entry.article} — ${entry.title}`,
            href: entry.href,
            excerpt: "Constitutional treatment of trust",
          });
        }
      }
    }
  }

  if (q.includes("steward")) {
    for (const id of ["article-iii", "article-xvi", "article-xvii"]) {
      if (!results.some((r) => r.id === id)) {
        const entry = CONSTITUTION_TABLE_OF_CONTENTS.find((e) => e.id === id);
        if (entry?.href) {
          results.push({
            kind: "article",
            id,
            label: `${entry.article} — ${entry.title}`,
            href: entry.href,
            excerpt: "Stewardship across the Constitution",
          });
        }
      }
    }
  }

  const seen = new Set<string>();
  return results.filter((r) => {
    const key = `${r.kind}:${r.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
