import Link from "next/link";
import {
  INSTITUTIONAL_GRAPH_EDGES,
  INSTITUTIONAL_GRAPH_NODES,
  getGraphNeighborhood,
} from "@/lib/iki/graph";

export default function InstitutionalGraphPage() {
  const trustNeighborhood = getGraphNeighborhood("trust", 3);

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Institutional Graph
      </h1>
      <p className="mb-8 text-cream-muted">
        Connected knowledge — search as intelligence. {INSTITUTIONAL_GRAPH_NODES.length}{" "}
        nodes · {INSTITUTIONAL_GRAPH_EDGES.length} edges.
      </p>

      <section className="mb-10 rounded-lg border border-gold-subtle bg-ink-muted p-6">
        <h2 className="mb-4 font-serif text-xl text-cream">
          Example: Trust neighborhood
        </h2>
        <div className="font-mono text-sm leading-loose text-cream-muted">
          {trustNeighborhood.nodes.map((n, i) => (
            <div key={n.id}>
              {i > 0 && <span className="text-gold/50">↓</span>}
              <Link href={n.href ?? "#"} className="text-gold hover:text-gold-light">
                {n.label}
              </Link>
              <span className="ml-2 text-xs text-cream-muted/60">({n.type})</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-serif text-xl text-cream">All nodes</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {INSTITUTIONAL_GRAPH_NODES.map((n) => (
            <li key={n.id} className="text-sm">
              {n.href ? (
                <Link href={n.href} className="text-gold hover:text-gold-light">
                  {n.label}
                </Link>
              ) : (
                <span className="text-cream">{n.label}</span>
              )}
              <span className="ml-2 text-xs text-cream-muted">{n.type}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/energy/library/health" className="text-sm text-gold hover:text-gold-light">
        ← Health Dashboard
      </Link>
    </div>
  );
}
