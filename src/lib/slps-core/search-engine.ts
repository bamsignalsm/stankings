/**
 * SLPS-CORE Module 6 — Institutional Search
 * One search. Entire Library.
 */

import { searchConstitution } from "@/lib/constitutional-convention/search";
import { searchKnowledgeGraph } from "@/lib/knowledge-graph/registry";
import { searchGraph } from "@/lib/iki/graph";
import { getAllStaticKnowledgeObjects } from "@/lib/library-engine/seed";
import { LIBRARY_SESSIONS } from "@/lib/library-sessions/records";
import { GOVERNANCE_CODE_BOOKS } from "@/lib/governance-code/volume-ii";

export type InstitutionalSearchResultKind =
  | "volume"
  | "book"
  | "chapter"
  | "canon"
  | "constitution"
  | "framework"
  | "standard"
  | "session"
  | "decision"
  | "knowledge_object"
  | "graph_node";

export interface InstitutionalSearchResult {
  kind: InstitutionalSearchResultKind;
  id: string;
  label: string;
  href: string;
  excerpt?: string;
  status?: string;
  source: string;
}

export interface InstitutionalSearchFilters {
  kinds?: InstitutionalSearchResultKind[];
  status?: string;
  volume?: string;
}

export interface InstitutionalSearchResponse {
  query: string;
  total: number;
  results: InstitutionalSearchResult[];
  sources: string[];
}

function matchesQuery(haystack: string, q: string): boolean {
  return haystack.toLowerCase().includes(q.toLowerCase());
}

/** Unified institutional search across all Library assets. */
export function searchInstitutionalLibrary(
  query: string,
  filters?: InstitutionalSearchFilters,
): InstitutionalSearchResponse {
  const q = query.trim();
  if (!q) {
    return { query: q, total: 0, results: [], sources: [] };
  }

  const results: InstitutionalSearchResult[] = [];
  const sources = new Set<string>();

  for (const r of searchConstitution(q)) {
    results.push({
      kind: "constitution",
      id: r.id,
      label: r.label,
      href: r.href,
      excerpt: r.excerpt,
      source: "constitutional-convention",
    });
    sources.add("constitutional-convention");
  }

  for (const ko of getAllStaticKnowledgeObjects()) {
    const haystack = [
      ko.identifier,
      ko.title,
      ko.summary,
      ...ko.tags,
      ...ko.searchKeywords,
    ].join(" ");
    if (!matchesQuery(haystack, q)) continue;

    const kind: InstitutionalSearchResultKind =
      ko.objectType === "canon"
        ? "canon"
        : ko.objectType === "standard"
          ? "standard"
          : ko.objectType === "decision_record"
            ? "decision"
            : ko.objectType === "meeting_record"
              ? "session"
              : ko.objectType === "framework"
                ? "framework"
                : "knowledge_object";

    results.push({
      kind,
      id: ko.identifier,
      label: ko.title,
      href: `/library/sessions/${ko.identifier}`.includes(ko.identifier) && ko.objectType === "meeting_record"
        ? `/library/sessions/${ko.identifier}`
        : ko.objectType === "canon"
          ? `/library/canon/${ko.identifier}`
          : ko.identifier.startsWith("FRAMEWORK-SLPS")
            ? ko.identifier.includes("CORE")
              ? "/library/editorial-standards/publishing-system"
              : "/library/editorial-standards/publishing-standard"
            : `/library/frameworks/${ko.identifier.toLowerCase().replace("framework-", "")}`,
      excerpt: ko.summary,
      status: ko.status,
      source: "library-engine",
    });
    sources.add("library-engine");
  }

  for (const session of LIBRARY_SESSIONS) {
    const haystack = [session.sessionId, session.title, ...session.summary, ...session.decisions].join(
      " ",
    );
    if (!matchesQuery(haystack, q)) continue;
    results.push({
      kind: "session",
      id: session.sessionId,
      label: session.title,
      href: `/library/sessions/${session.sessionId}`,
      excerpt: session.summary[0],
      status: session.status,
      source: "library-sessions",
    });
    sources.add("library-sessions");
  }

  for (const book of GOVERNANCE_CODE_BOOKS) {
    const haystack = [book.id, book.title, book.description ?? ""].join(" ");
    if (!matchesQuery(haystack, q)) continue;
    results.push({
      kind: "book",
      id: book.id,
      label: book.title,
      href: `/library/governance-code/${book.id}`,
      excerpt: book.description,
      status: book.status,
      source: "governance-code",
    });
    sources.add("governance-code");
  }

  for (const entry of searchKnowledgeGraph(q)) {
    results.push({
      kind: "knowledge_object",
      id: entry.identifier,
      label: entry.title,
      href: entry.href,
      excerpt: entry.summary,
      source: "knowledge-graph",
    });
    sources.add("knowledge-graph");
  }

  for (const node of searchGraph(q)) {
    if (!node.href) continue;
    results.push({
      kind: "graph_node",
      id: node.id,
      label: node.label,
      href: node.href,
      source: "iki-graph",
    });
    sources.add("iki-graph");
  }

  const kindFilter = filters?.kinds;
  const filtered = kindFilter?.length
    ? results.filter((r) => kindFilter.includes(r.kind))
    : results;

  const deduped = Array.from(
    new Map(filtered.map((r) => [`${r.kind}:${r.id}`, r])).values(),
  ).slice(0, 50);

  return {
    query: q,
    total: deduped.length,
    results: deduped,
    sources: Array.from(sources),
  };
}
