import type { KnowledgeObject } from "@/lib/standards/ls-001";
import { getKnowledgeObjectHref } from "@/lib/library-engine/queries";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  KNOWLEDGE_OBJECT_TYPE_LABELS,
  VISIBILITY_LABELS,
} from "@/lib/standards/ls-001";

interface KnowledgeObjectCardProps {
  ko: KnowledgeObject;
  showBody?: boolean;
}

export function KnowledgeObjectCard({ ko, showBody = false }: KnowledgeObjectCardProps) {
  const href = getKnowledgeObjectHref(ko);

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-gold">{ko.identifier}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{ko.title}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {KNOWLEDGE_OBJECT_TYPE_LABELS[ko.objectType]} · v{ko.version} ·{" "}
            {ko.status.replace("_", " ")} · {VISIBILITY_LABELS[ko.visibility]}
          </p>
        </div>
        <Link href={href} className="shrink-0 text-sm text-gold hover:text-gold-light">
          Open →
        </Link>
      </div>
      <p className="text-sm text-cream-muted">{ko.summary}</p>
      {showBody && ko.bodyMarkdown && (
        <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap rounded border border-gold-subtle/50 bg-ink-light p-4 text-xs text-cream-muted">
          {ko.bodyMarkdown.slice(0, 800)}
          {ko.bodyMarkdown.length > 800 ? "…" : ""}
        </pre>
      )}
    </article>
  );
}

interface KnowledgeMetadataPanelProps {
  ko: KnowledgeObject;
  compact?: boolean;
}

export function KnowledgeMetadataPanel({
  ko,
  compact = false,
}: KnowledgeMetadataPanelProps) {
  const rows: { key: string; value: ReactNode }[] = [
    { key: "identifier", value: ko.identifier },
    { key: "title", value: ko.title },
    { key: "object_type", value: KNOWLEDGE_OBJECT_TYPE_LABELS[ko.objectType] },
    { key: "summary", value: ko.summary },
    { key: "volume", value: ko.volume ?? "—" },
    { key: "category", value: ko.category ?? "—" },
    { key: "status", value: ko.status },
    { key: "version", value: ko.version },
    { key: "author", value: ko.author ?? "—" },
    { key: "approver", value: ko.approver ?? "—" },
    { key: "owner", value: ko.owner },
    { key: "created_date", value: ko.createdAt },
    { key: "updated_date", value: ko.updatedAt },
    { key: "review_date", value: ko.reviewDate ?? "—" },
    { key: "visibility", value: VISIBILITY_LABELS[ko.visibility] },
    { key: "tags", value: ko.tags.length ? ko.tags.join(", ") : "—" },
    {
      key: "dependencies",
      value: ko.dependencies.length ? ko.dependencies.join(", ") : "None",
    },
    {
      key: "references",
      value:
        ko.references.length > 0
          ? ko.references.map((r) => r.identifier).join(", ")
          : "None",
    },
    {
      key: "referenced_by",
      value:
        ko.referencedBy.length > 0
          ? ko.referencedBy.map((r) => r.title).join(", ")
          : "None",
    },
    { key: "supersedes", value: ko.supersedes ?? "None" },
    { key: "superseded_by", value: ko.supersededBy ?? "None" },
    {
      key: "related_companies",
      value: ko.relatedCompanies.length ? ko.relatedCompanies.join(", ") : "—",
    },
    {
      key: "related_systems",
      value: ko.relatedSystems.length ? ko.relatedSystems.join(", ") : "—",
    },
    { key: "search_keywords", value: ko.searchKeywords.length ? ko.searchKeywords.join(", ") : "—" },
  ];

  if (compact) {
    return (
      <div className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-xs">
        <p className="mb-2 font-mono text-gold">{ko.identifier}</p>
        <p className="text-cream-muted">
          v{ko.version} · {ko.status} · {ko.owner}
        </p>
        <Link
          href={getKnowledgeObjectHref(ko)}
          className="mt-2 inline-block text-gold hover:text-gold-light"
        >
          View object →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-light p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
        LS-001 Metadata
      </p>
      <div className="font-mono text-xs leading-relaxed text-cream-muted">
        {rows.map(({ key, value }) => (
          <div
            key={key}
            className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2 border-b border-gold-subtle/50 py-2 last:border-0"
          >
            <span className="text-gold/80">{key}:</span>
            <span className="whitespace-pre-wrap">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
