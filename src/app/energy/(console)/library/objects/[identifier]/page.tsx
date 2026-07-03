import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";
import { KNOWLEDGE_OBJECT_TYPE_LABELS } from "@/lib/standards/ls-001";

interface PageProps {
  params: Promise<{ identifier: string }>;
}

export default async function AdminKnowledgeObjectPage({ params }: PageProps) {
  const { identifier } = await params;
  const decoded = decodeURIComponent(identifier);
  const ko = await getKnowledgeObjectByIdentifier(decoded);

  if (!ko) notFound();

  return (
    <div>
      <Link
        href="/energy/library/objects"
        className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
      >
        ← All objects
      </Link>

      <p className="mb-2 font-mono text-sm text-gold">{ko.identifier}</p>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">{ko.title}</h1>
      <p className="mb-8 text-sm text-cream-muted">
        {KNOWLEDGE_OBJECT_TYPE_LABELS[ko.objectType]} · v{ko.version} · {ko.status}
      </p>

      <div className="mb-8">
        <KnowledgeMetadataPanel ko={ko} />
      </div>

      {ko.bodyMarkdown && (
        <section className="mb-8">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Body</h2>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-cream-muted">
              {ko.bodyMarkdown}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
}
