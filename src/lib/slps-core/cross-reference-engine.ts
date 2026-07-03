/**
 * SLPS-CORE Module 3 — Cross-Reference Engine
 * Resolves institutional references to authoritative links.
 */

import { ARTICLE_CROSS_LINKS } from "@/lib/constitutional-convention/cross-links";
import { getAllStaticKnowledgeObjects } from "@/lib/library-engine/seed";
import { LIBRARY_SESSIONS } from "@/lib/library-sessions/records";
import type { CrossLinkRef } from "@/lib/constitutional-convention/types";

export type CrossReferenceKind =
  | "constitution_article"
  | "canon"
  | "framework"
  | "standard"
  | "session"
  | "decision"
  | "knowledge_object"
  | "governance"
  | "company"
  | "unknown";

export interface ResolvedCrossReference {
  token: string;
  kind: CrossReferenceKind;
  identifier: string;
  label: string;
  href: string;
  autoResolved: boolean;
}

const ROMAN_ARTICLE_MAP: Record<string, string> = {
  I: "article-i",
  II: "article-ii",
  III: "article-iii",
  IV: "article-iv",
  V: "article-v",
  VI: "article-vi",
  VII: "article-vii",
  VIII: "article-viii",
  IX: "article-ix",
  X: "article-x",
  XI: "article-xi",
  XII: "article-xii",
  XIII: "article-xiii",
  XIV: "article-xiv",
  XV: "article-xv",
  XVI: "article-xvi",
  XVII: "article-xvii",
};

const REFERENCE_PATTERNS: { pattern: RegExp; kind: CrossReferenceKind }[] = [
  { pattern: /\bCANON-\d{3}\b/gi, kind: "canon" },
  { pattern: /\bCONSTITUTION-ARTICLE-[IVXLC]+\b/gi, kind: "constitution_article" },
  { pattern: /\bSLPS-CORE\b/gi, kind: "framework" },
  { pattern: /\bFRAMEWORK-SLPS-CORE-\d{3}\b/gi, kind: "framework" },
  { pattern: /\bFRAMEWORK-[A-Z]+-\d{3}\b/gi, kind: "framework" },
  { pattern: /\bLS-\d{3}\b/gi, kind: "standard" },
  { pattern: /\bLIB-\d{4}-\d{2}-\d{2}-\d{3}\b/gi, kind: "session" },
  { pattern: /\bEXECUTIVE-DECISION-\d+\b/gi, kind: "decision" },
  { pattern: /\bEDITOR-DECISION-\d+\b/gi, kind: "decision" },
  { pattern: /\bArticle\s+([IVXLC]+)\b/gi, kind: "constitution_article" },
];

function articleHref(articleId: string): string {
  return `/library/constitution/${articleId}`;
}

function canonHref(id: string): string {
  return `/library/canon/${id}`;
}

function resolveIdentifier(token: string, kind: CrossReferenceKind): ResolvedCrossReference | null {
  const normalized = token.trim();
  const upper = normalized.toUpperCase();

  if (kind === "constitution_article") {
    const romanMatch = normalized.match(/Article\s+([IVXLC]+)/i);
    const articleId = romanMatch
      ? ROMAN_ARTICLE_MAP[romanMatch[1].toUpperCase()]
      : normalized.toLowerCase().replace("constitution-article-", "article-");

    if (!articleId || !articleId.startsWith("article-")) return null;

    const links = ARTICLE_CROSS_LINKS[articleId];
    const label = links
      ? `Article ${articleId.replace("article-", "").toUpperCase()}`
      : normalized;

    return {
      token: normalized,
      kind,
      identifier: articleId,
      label,
      href: articleHref(articleId),
      autoResolved: true,
    };
  }

  if (kind === "canon") {
    const id = upper.replace(/\s/g, "");
    return {
      token: normalized,
      kind,
      identifier: id,
      label: id,
      href: canonHref(id),
      autoResolved: true,
    };
  }

  if (kind === "session") {
    const session = LIBRARY_SESSIONS.find((s) => s.sessionId === upper);
    return {
      token: normalized,
      kind,
      identifier: upper,
      label: session?.title ?? upper,
      href: `/library/sessions/${upper}`,
      autoResolved: Boolean(session),
    };
  }

  if (kind === "framework" && upper === "SLPS-CORE") {
    return {
      token: normalized,
      kind,
      identifier: "FRAMEWORK-SLPS-CORE-001",
      label: "Stankings Library Publishing System",
      href: "/library/editorial-standards/publishing-system",
      autoResolved: true,
    };
  }

  const ko = getAllStaticKnowledgeObjects().find(
    (o) => o.identifier.toUpperCase() === upper,
  );

  if (ko) {
    const href =
      ko.objectType === "canon"
        ? canonHref(ko.identifier)
        : ko.identifier === "FRAMEWORK-SLPS-001" || ko.identifier === "FRAMEWORK-LPS-001"
          ? "/library/editorial-standards/publishing-standard"
          : ko.identifier === "FRAMEWORK-SLPS-CORE-001"
            ? "/library/editorial-standards/publishing-system"
            : ko.identifier === "BOOK-I-FOUNDATIONAL-CHARTER" || ko.identifier === "BOOK-I-CHARTER"
              ? "/library/governance-code/book-i/foundational-charter"
              : ko.identifier === "FRAMEWORK-FC-001"
                ? "/library/editorial-standards/foundational-charter"
                : ko.identifier === "PUB-ENGINE-001"
              ? "/library/editorial-standards/publishing-standard/generator"
              : ko.volumeSlug === "governance-code"
                ? `/library/governance-code`
                : `/library/frameworks/${ko.identifier.toLowerCase().replace("framework-", "")}`;

    return {
      token: normalized,
      kind: ko.objectType === "standard" ? "standard" : "knowledge_object",
      identifier: ko.identifier,
      label: ko.title,
      href,
      autoResolved: true,
    };
  }

  return null;
}

/** Resolve a single reference token (e.g. "Article IV", "CANON-002"). */
export function resolveCrossReference(token: string): ResolvedCrossReference | null {
  for (const { pattern, kind } of REFERENCE_PATTERNS) {
    pattern.lastIndex = 0;
    const match = pattern.exec(token);
    if (match) {
      return resolveIdentifier(match[0], kind);
    }
  }
  return null;
}

/** Scan prose and return all auto-resolvable cross-references. */
export function resolveCrossReferencesInText(text: string): ResolvedCrossReference[] {
  const seen = new Set<string>();
  const results: ResolvedCrossReference[] = [];

  for (const { pattern, kind } of REFERENCE_PATTERNS) {
    const matches = text.matchAll(new RegExp(pattern.source, pattern.flags));
    for (const match of matches) {
      const token = match[0];
      if (seen.has(token.toUpperCase())) continue;
      const resolved = resolveIdentifier(token, kind);
      if (resolved) {
        seen.add(token.toUpperCase());
        results.push(resolved);
      }
    }
  }

  return results;
}

/** Expand an Article's curated cross-link registry. */
export function getArticleCrossReferences(articleId: string): CrossLinkRef[] {
  const links = ARTICLE_CROSS_LINKS[articleId];
  if (!links) return [];

  return [
    ...links.canons,
    ...links.articles,
    ...links.schedules,
    ...links.governanceCodes,
    ...links.policies,
    ...links.engineeringStandards,
    ...links.companies,
    ...links.knowledgeObjects,
  ];
}
