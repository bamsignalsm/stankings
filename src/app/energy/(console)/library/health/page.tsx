import Link from "next/link";
import { getIKIHealthStats } from "@/lib/iki/health";
import { IKI, IKI_MODULES } from "@/lib/iki";

export default async function IKIHealthDashboard() {
  const stats = await getIKIHealthStats();

  const cards = [
    { label: "Knowledge Objects", value: stats.knowledgeObjects },
    { label: "Approved", value: stats.approved },
    { label: "Draft", value: stats.draft },
    { label: "Pending Review", value: stats.pendingReview },
    { label: "Cross References", value: stats.crossReferences },
    { label: "Broken Links", value: stats.brokenLinks },
    { label: "Outdated Objects", value: stats.outdatedObjects },
    { label: "Review Due", value: stats.reviewDue },
    { label: "AI Coverage", value: `${stats.aiCoverage}%` },
    { label: "Print Ready", value: `${stats.printReady}%` },
    { label: "Graph Nodes", value: stats.graphNodes },
    { label: "Graph Edges", value: stats.graphEdges },
  ];

  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-[0.35em] text-gold">{IKI.name}</p>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Library Health Dashboard
      </h1>
      <p className="mb-8 text-sm text-cream-muted">
        {IKI.fullName} — manage knowledge like infrastructure.
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
          >
            <p className="text-2xl font-semibold text-gold">{card.value}</p>
            <p className="text-sm text-cream-muted">{card.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-serif text-xl text-cream">IKI Modules</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {IKI_MODULES.map((m) => (
            <li
              key={m.id}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
            >
              <p className="font-medium text-cream">{m.label}</p>
              <p className="text-sm text-cream-muted">{m.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/energy/library/graph" className="text-gold hover:text-gold-light">
          Institutional Graph →
        </Link>
        <Link href="/energy/library" className="text-cream-muted hover:text-gold">
          IKI Engine →
        </Link>
      </div>
    </div>
  );
}
