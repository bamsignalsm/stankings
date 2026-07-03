import Link from "next/link";
import { getLibraryEngineStats, listKnowledgeObjects } from "@/lib/library-engine/queries";
import { LIBRARY_ENGINE_PHASES } from "@/lib/standards/ls-001";

export default async function AdminLibraryDashboard() {
  const stats = await getLibraryEngineStats();
  const objects = await listKnowledgeObjects();

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        IKI — Library Engine
      </h1>
      <p className="mb-2 text-cream-muted">
        Institutional Knowledge Infrastructure · Data source:{" "}
        <span className="text-gold">{stats.source}</span>
      </p>
      <p className="mb-8 text-sm text-cream-muted/70">
        Governed by{" "}
        <Link href="/library/standards/ls-001" className="text-gold hover:text-gold-light">
          LS-001
        </Link>
        {" · "}
        <Link href="/library/standards/ls-002" className="text-gold hover:text-gold-light">
          LS-002
        </Link>
        . Apply migration{" "}
        <code className="text-xs">20260627140000_library_engine_ls001.sql</code> to
        enable database persistence.
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Knowledge Objects", value: stats.total },
          { label: "Approved", value: stats.approved },
          { label: "In review", value: stats.inReview },
          { label: "Canons", value: stats.canons },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
          >
            <p className="text-2xl font-semibold text-gold">{card.value}</p>
            <p className="text-sm text-cream-muted">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Phase A — In progress
          </h2>
          <ul className="space-y-2">
            {LIBRARY_ENGINE_PHASES.a.modules.map((m) => (
              <li
                key={m}
                className="flex items-center gap-2 text-sm text-cream-muted"
              >
                <span className="text-gold">○</span> {m}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Recent objects
          </h2>
          <ul className="space-y-2">
            {objects.slice(0, 6).map((ko) => (
              <li key={ko.identifier}>
                <Link
                  href={`/energy/library/objects/${ko.identifier}`}
                  className="text-sm text-cream-muted hover:text-gold"
                >
                  <span className="font-mono text-gold/80">{ko.identifier}</span> —{" "}
                  {ko.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/energy/library/objects"
            className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
          >
            All knowledge objects →
          </Link>
          <Link
            href="/energy/library/lexicon"
            className="mt-4 ml-4 inline-block text-sm text-cream-muted hover:text-gold"
          >
            Lexicon Engine →
          </Link>
          <Link
            href="/energy/library/health"
            className="mt-4 ml-4 inline-block text-sm text-cream-muted hover:text-gold"
          >
            IKI Health →
          </Link>
        </div>
      </div>
    </div>
  );
}
