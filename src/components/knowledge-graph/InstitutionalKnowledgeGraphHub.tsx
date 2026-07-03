"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_021_KNOWLEDGE_BY_INSTITUTION,
  CANON_021_KNOWLEDGE_MOTTO,
  CANON_021_LIBRARY_PURPOSE,
} from "@/lib/canon/canon-021";
import {
  IKG_CONNECTION_DIMENSIONS,
  IKG_KNOWLEDGE_TEST,
} from "@/lib/frameworks/institutional-knowledge-graph";
import {
  getGraphNeighborhood,
  INSTITUTIONAL_GRAPH_EDGES,
  INSTITUTIONAL_GRAPH_NODES,
  searchGraph,
} from "@/lib/iki/graph";
import {
  getKnowledgeGraphStats,
  KNOWLEDGE_GRAPH_REGISTRY,
  searchKnowledgeGraph,
  type KnowledgeGraphEntry,
} from "@/lib/knowledge-graph/registry";
import { EXECUTIVE_DECISION_23 } from "@/lib/iki";

const DIMENSION_KEYS: (keyof KnowledgeGraphEntry["connections"])[] = [
  "canons",
  "companies",
  "frameworks",
  "decisions",
  "lessons",
  "roles",
  "technologies",
  "apis",
  "books",
  "founderLetters",
];

const DIMENSION_LABELS: Record<keyof KnowledgeGraphEntry["connections"], string> = {
  canons: "Related Canons",
  companies: "Related Companies",
  frameworks: "Related Frameworks",
  decisions: "Related Decisions",
  lessons: "Lessons Learned",
  roles: "People (roles)",
  technologies: "Technologies",
  apis: "APIs",
  books: "Books",
  founderLetters: "Founder Letters",
};

function KnowledgeObjectCard({ entry }: { entry: KnowledgeGraphEntry }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4">
        <p className="mb-1 font-mono text-xs text-gold">{entry.identifier}</p>
        <h3 className="font-serif text-xl font-semibold text-cream">
          <Link href={entry.href} className="hover:text-gold-light">
            {entry.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-cream-muted">{entry.objectType}</p>
        <p className="mt-2 text-sm text-cream-muted">{entry.summary}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DIMENSION_KEYS.map((key) => {
          const links = entry.connections[key];
          if (links.length === 0) return null;
          return (
            <div key={key}>
              <p className="mb-2 text-xs uppercase tracking-widest text-gold">
                {DIMENSION_LABELS[key]}
              </p>
              <ul className="space-y-1 text-sm">
                {links.map((link) => (
                  <li key={link.identifier}>
                    <Link href={link.href} className="text-cream-muted hover:text-gold">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function InstitutionalKnowledgeGraphHub() {
  const [query, setQuery] = useState("");
  const [graphQuery, setGraphQuery] = useState("");
  const stats = getKnowledgeGraphStats();
  const entries = useMemo(() => searchKnowledgeGraph(query), [query]);
  const graphMatches = useMemo(() => searchGraph(graphQuery), [graphQuery]);
  const ikiNeighborhood = getGraphNeighborhood("CANON-021", 2);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-021 · Legacy Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institutional Knowledge Graph
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            The living brain of the institution — connected knowledge, not merely search.
            Knowledge preserved compounds across generations.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Exemplar objects", value: stats.objects },
            { label: "Documented connections", value: stats.connections },
            { label: "IKI graph nodes", value: INSTITUTIONAL_GRAPH_NODES.length },
            { label: "IKI graph edges", value: INSTITUTIONAL_GRAPH_EDGES.length },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-gold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Knowledge Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{IKG_KNOWLEDGE_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_021_KNOWLEDGE_MOTTO}
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_23}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">Why the Library exists</h2>
          <p className="mb-6 text-sm text-cream-muted">
            Knowledge is an asset — not a document. Every artifact below exists to preserve
            institutional capability.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CANON_021_LIBRARY_PURPOSE.map((item) => (
              <li
                key={item.artifact}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm"
              >
                <p className="font-medium text-cream">{item.artifact}</p>
                <p className="mt-1 text-cream-muted">{item.purpose}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Connection dimensions</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {IKG_CONNECTION_DIMENSIONS.map((dim) => (
              <li
                key={dim.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm"
              >
                <p className="font-medium text-cream">{dim.label}</p>
                <p className="mt-1 text-cream-muted">{dim.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Knowledge by institution
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CANON_021_KNOWLEDGE_BY_INSTITUTION.map((inst) => (
              <li
                key={inst.slug}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <Link
                  href={`/library/ecosystem/${inst.slug}`}
                  className="mb-2 block font-serif text-lg font-semibold text-cream hover:text-gold"
                >
                  {inst.institution}
                </Link>
                <p className="text-sm text-cream-muted">{inst.knowledgeDomains}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 border-t border-gold-subtle pt-12">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Connected knowledge objects
          </h2>
          <input
            type="search"
            placeholder="Search knowledge objects and connections…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="grid gap-8">
            {entries.map((e) => (
              <KnowledgeObjectCard key={e.identifier} entry={e} />
            ))}
          </div>
          {entries.length === 0 && (
            <p className="py-8 text-center text-cream-muted">No objects match your search.</p>
          )}
        </section>

        <section className="mb-12 border-t border-gold-subtle pt-12">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">IKI graph explorer</h2>
          <p className="mb-6 text-sm text-cream-muted">
            Institutional Knowledge Infrastructure — {INSTITUTIONAL_GRAPH_NODES.length} nodes,{" "}
            {INSTITUTIONAL_GRAPH_EDGES.length} edges. Search nodes or explore CANON-021 neighborhood.
          </p>
          <input
            type="search"
            placeholder="Search graph nodes…"
            value={graphQuery}
            onChange={(e) => setGraphQuery(e.target.value)}
            className="mb-6 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          {graphQuery ? (
            <ul className="mb-8 grid gap-2 sm:grid-cols-2">
              {graphMatches.map((n) => (
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
          ) : (
            <div className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                CANON-021 neighborhood
              </p>
              <div className="font-mono text-sm leading-loose text-cream-muted">
                {ikiNeighborhood.nodes.map((n, i) => (
                  <div key={n.id}>
                    {i > 0 && <span className="text-gold/50">↔ </span>}
                    {n.href ? (
                      <Link href={n.href} className="text-gold hover:text-gold-light">
                        {n.label}
                      </Link>
                    ) : (
                      <span className="text-cream">{n.label}</span>
                    )}
                    <span className="ml-2 text-xs text-cream-muted/60">({n.type})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The greatest inheritance</p>
          <p className="text-sm italic text-cream-muted">
            Protect the institution&apos;s knowledge with the same seriousness that you protect its
            capital. Over centuries, that knowledge may become the most valuable inheritance
            Stankings Group ever passes from one generation to the next.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
              Stankings Library Portal →
            </Link>
            <Link href="/library/constitution/article-xiii" className="text-cream-muted hover:text-gold">
              Article XIII →
            </Link>
            <Link href="/library/canon/CANON-021" className="text-cream-muted hover:text-gold">
              CANON-021 →
            </Link>
            <Link href="/library/standards/ls-001" className="text-cream-muted hover:text-gold">
              LS-001 →
            </Link>
            <Link href="/library" className="text-cream-muted hover:text-gold">
              The Library →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
