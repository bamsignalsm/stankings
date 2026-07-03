import Link from "next/link";
import { getLexiconStats, listLexiconTerms } from "@/lib/lexicon-engine/queries";
import { getLexiconTermHref } from "@/lib/lexicon-engine/hrefs";
import { EDITOR_IN_CHIEF_DECISION_3, LS_002 } from "@/lib/standards/ls-002";

export default async function AdminLexiconPage() {
  const [terms, stats] = await Promise.all([listLexiconTerms(), getLexiconStats()]);

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Lexicon Engine
      </h1>
      <p className="mb-2 text-cream-muted">
        {LS_002.id} · Version {stats.version} · {stats.approved} approved terms
      </p>
      <p className="mb-8 text-sm text-cream-muted/70">
        Public module:{" "}
        <Link href="/library/lexicon" className="text-gold hover:text-gold-light">
          /library/lexicon
        </Link>
        {" · "}AI endpoint:{" "}
        <code className="text-xs">/api/lexicon/retrieve?term=trust</code>
      </p>

      <blockquote className="mb-10 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
        {EDITOR_IN_CHIEF_DECISION_3.split("\n\n")[0]}
      </blockquote>

      <div className="mb-10 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total terms", value: stats.total },
          { label: "Approved", value: stats.approved },
          { label: "In review", value: stats.inReview },
          { label: "Proposed", value: stats.proposed },
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

      <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
        Approval workflow
      </h2>
      <p className="mb-8 text-sm text-cream-muted">
        Proposed → Reviewed → Approved → Added to Lexicon → Used elsewhere. Term
        amendments create new version records — definitions are never silently overwritten.
      </p>

      <div className="overflow-x-auto rounded-lg border border-gold-subtle">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-wider text-cream-muted">
            <tr>
              <th className="px-4 py-3">Identifier</th>
              <th className="px-4 py-3">Term</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {terms.map((term) => (
              <tr key={term.slug} className="border-b border-gold-subtle/50">
                <td className="px-4 py-3 font-mono text-gold/80">{term.identifier}</td>
                <td className="px-4 py-3 text-cream">{term.term}</td>
                <td className="px-4 py-3 capitalize text-cream-muted">
                  {term.status.replace("_", " ")}
                </td>
                <td className="px-4 py-3 text-cream-muted">v{term.version}</td>
                <td className="px-4 py-3">
                  <Link
                    href={getLexiconTermHref(term.slug)}
                    className="text-gold hover:text-gold-light"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/energy/library"
        className="mt-8 inline-block text-sm text-gold hover:text-gold-light"
      >
        ← Library Engine
      </Link>
    </div>
  );
}
