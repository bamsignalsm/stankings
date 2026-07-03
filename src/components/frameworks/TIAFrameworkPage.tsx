import Link from "next/link";
import { ImpactStars, TrustTestBadge } from "@/components/frameworks/ImpactRating";
import {
  TIA_EXAMPLE_PROPOSALS,
  TIA_FRAMEWORK,
  TIA_IMPACT_DIMENSIONS,
  TIA_PURPOSE,
  TIA_REQUIRED_FIELDS,
  TIA_TRUST_TEST_QUESTION,
  overallRecommendation,
  type TrustImpactAssessment,
} from "@/lib/frameworks/trust-impact-assessment";

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-cream-muted">{label}</span>
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink">
          <div
            className="h-full rounded-full bg-gold/80"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="w-8 text-right font-mono text-sm text-gold">{score}</span>
      </div>
    </div>
  );
}

function ProposalCard({ assessment }: { assessment: TrustImpactAssessment }) {
  const statusStyles = {
    approved: "text-forest border-forest/30",
    rejected: "text-burgundy border-burgundy/30",
    draft: "text-cream-muted border-cream-muted/30",
    in_review: "text-gold border-gold/30",
  };

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            Proposal
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {assessment.proposalTitle}
          </h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyles[assessment.status]}`}
        >
          {assessment.status}
        </span>
      </div>

      <p className="mb-6 text-sm text-cream-muted">{assessment.proposalSummary}</p>

      <dl className="mb-6 space-y-3">
        <p className="text-xs uppercase tracking-widest text-gold">Scoring Engine</p>
        <ScoreBar label="Financial" score={assessment.scores.financial} />
        <ScoreBar label="Operational" score={assessment.scores.operational} />
        <ScoreBar label="Engineering" score={assessment.scores.engineering} />
        <ScoreBar label="Community" score={assessment.scores.community} />
        <ScoreBar label="Trust" score={assessment.scores.trust} />
        <ScoreBar label="Long-Term" score={assessment.scores.long_term} />
        <div className="border-t border-gold-subtle pt-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-cream">Overall</span>
            <span className="font-mono text-lg text-gold">{assessment.scores.overall}</span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-wider text-forest">
            {overallRecommendation(assessment.scores.overall, assessment.scores.trust)}
          </p>
        </div>
      </dl>

      <dl className="mb-6 space-y-3 border-t border-gold-subtle pt-4">
        <p className="text-xs uppercase tracking-widest text-cream-muted">Star ratings</p>
        {TIA_IMPACT_DIMENSIONS.map((dim) => (
          <div key={dim.id} className="flex flex-wrap items-center justify-between gap-2">
            <dt className="text-sm text-cream-muted">{dim.label}</dt>
            <dd>
              <ImpactStars rating={assessment.impacts[dim.id]} label={dim.label} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 border-t border-gold-subtle pt-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">Trust Test</p>
        <TrustTestBadge answer={assessment.trustTestAnswer} />
        <p className="mt-2 text-sm text-cream-muted">{assessment.trustTestNotes}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">
          Canon References
        </p>
        <ul className="space-y-1">
          {assessment.canonReferences.map((ref) => (
            <li key={ref.identifier}>
              <Link
                href={`/library/canon/${ref.identifier}`}
                className="text-sm text-gold hover:text-gold-light"
              >
                {ref.identifier}
              </Link>
              <span className="ml-2 text-xs text-cream-muted">— {ref.relevance}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-gold-subtle pt-4 text-sm italic text-cream-muted">
        {assessment.recommendation}
      </p>
    </article>
  );
}

export function TIAFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Decision-Making Machinery · {TIA_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {TIA_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-002" className="text-gold hover:text-gold-light">
              CANON-002
            </Link>
            . Every significant proposal measured for trust impact.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <div className="space-y-4 leading-relaxed text-cream-muted">
            {TIA_PURPOSE.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Trust Test</p>
          <blockquote className="font-serif text-xl italic leading-relaxed text-cream">
            &ldquo;{TIA_TRUST_TEST_QUESTION}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-cream-muted">
            From{" "}
            <Link href="/library/canon/CANON-002#the-trust-test" className="text-gold">
              CANON-002 — The Trust Test
            </Link>
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required impact dimensions
          </h2>
          <ul className="space-y-4">
            {TIA_IMPACT_DIMENSIONS.map((dim) => (
              <li
                key={dim.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">{dim.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{dim.description}</p>
                {dim.canonReference && (
                  <p className="mt-2 text-xs text-gold/70">{dim.canonReference}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Required fields
          </h2>
          <ol className="space-y-2 text-sm text-cream-muted">
            {TIA_REQUIRED_FIELDS.map((field, i) => (
              <li key={field} className="flex gap-3">
                <span className="font-mono text-gold/50">{i + 1}</span>
                {field}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Illustrative assessments
          </h2>
          <p className="mb-8 text-sm text-cream-muted">
            Examples only — demonstrating how Canon 002 governs decisions objectively,
            not through personality.
          </p>
          <div className="space-y-8">
            {TIA_EXAMPLE_PROPOSALS.map((a) => (
              <ProposalCard key={a.id} assessment={a} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-002" className="text-gold hover:text-gold-light">
            Read CANON-002 →
          </Link>
          <Link href="/library/canon" className="text-cream-muted hover:text-gold">
            All Canons
          </Link>
          <Link href="/library/lexicon/trust" className="text-cream-muted hover:text-gold">
            Lexicon: Trust
          </Link>
          <Link href="/library" className="text-cream-muted hover:text-gold">
            The Stankings Library
          </Link>
        </div>
      </div>
    </>
  );
}
