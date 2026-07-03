import Link from "next/link";
import { KnowledgeObjectCard } from "@/components/library-engine/KnowledgeObjectCard";
import { listKnowledgeObjects } from "@/lib/library-engine/queries";
import { KNOWLEDGE_OBJECT_TYPE_LABELS } from "@/lib/standards/ls-001";

export default async function AdminKnowledgeObjectsPage() {
  const objects = await listKnowledgeObjects();

  return (
    <div>
      <Link
        href="/energy/library"
        className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
      >
        ← Library Engine
      </Link>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Knowledge Objects
      </h1>
      <p className="mb-8 text-cream-muted">
        {objects.length} objects registered. Each conforms to LS-001 metadata.
      </p>

      <div className="mb-8 flex flex-wrap gap-2 text-xs text-cream-muted">
        {Object.entries(
          objects.reduce<Record<string, number>>((acc, ko) => {
            const label = KNOWLEDGE_OBJECT_TYPE_LABELS[ko.objectType];
            acc[label] = (acc[label] ?? 0) + 1;
            return acc;
          }, {})
        ).map(([type, count]) => (
          <span
            key={type}
            className="rounded-full border border-gold-subtle px-3 py-1"
          >
            {type}: {count}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {objects.map((ko) => (
          <KnowledgeObjectCard key={ko.identifier} ko={ko} />
        ))}
      </div>
    </div>
  );
}
