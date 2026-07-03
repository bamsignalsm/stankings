"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_023_AI_PRINCIPLES,
  CANON_023_CHALLENGE_CULTURE,
  CANON_023_HUMILITY_MOTTO,
} from "@/lib/canon/canon-023";
import {
  HUMILITY_TEST,
  KCP_CHALLENGE_TYPES,
  KCP_REQUIRED_FIELDS,
  type KnowledgeChallenge,
  type KnowledgeChallengeStatus,
} from "@/lib/frameworks/knowledge-challenge-process";
import {
  getKnowledgeChallengeStats,
  KNOWLEDGE_CHALLENGE_REGISTRY,
  searchKnowledgeChallenges,
} from "@/lib/knowledge-challenges/registry";
import { EXECUTIVE_DECISION_25 } from "@/lib/iki";

function statusStyle(status: KnowledgeChallengeStatus) {
  const map: Record<KnowledgeChallengeStatus, string> = {
    submitted: "text-cream-muted border-gold-subtle",
    under_review: "text-gold border-gold/30 bg-gold/10",
    accepted: "text-forest border-forest/30 bg-forest/10",
    accepted_with_conditions: "text-gold border-gold/30 bg-gold/5",
    declined: "text-cream-muted border-gold-subtle bg-ink",
  };
  return map[status];
}

function typeLabel(type: KnowledgeChallenge["challengeType"]) {
  return KCP_CHALLENGE_TYPES.find((t) => t.id === type)?.label ?? type;
}

function ChallengeCard({ challenge }: { challenge: KnowledgeChallenge }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{challenge.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{challenge.title}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {challenge.institution} · {typeLabel(challenge.challengeType)} ·{" "}
            {challenge.submittedBy} ({challenge.submittedByRole})
          </p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(challenge.status)}`}
        >
          {challenge.status.replace(/_/g, " ")}
        </span>
      </div>

      <p className="mb-4 text-sm text-cream-muted">
        <span className="text-gold">Challenged: </span>
        {challenge.challengedArtifact}
      </p>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        {[
          { label: "Evidence", value: challenge.evidence },
          { label: "Proposed improvement", value: challenge.proposedImprovement },
          { label: "Risks", value: challenge.risks },
          { label: "Expected benefits", value: challenge.expectedBenefits },
        ].map((field) => (
          <div key={field.label} className="rounded-lg border border-gold/20 bg-ink px-4 py-3">
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">{field.label}</p>
            <p className="text-sm text-cream-muted">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        {challenge.canonReferences.map((ref) => (
          <Link key={ref} href={`/library/canon/${ref}`} className="text-gold hover:text-gold-light">
            {ref}
          </Link>
        ))}
      </div>

      {challenge.reviewOutcome && (
        <p className="text-sm italic text-cream-muted">
          <span className="text-gold not-italic">Outcome: </span>
          {challenge.reviewOutcome}
          {challenge.reviewedBy && (
            <> — {challenge.reviewedBy}</>
          )}
        </p>
      )}

      {challenge.knowledgeObjectsUpdated && challenge.knowledgeObjectsUpdated.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {challenge.knowledgeObjectsUpdated.map((ko) => (
            <Link key={ko.identifier} href={ko.href} className="text-cream-muted hover:text-gold">
              {ko.identifier} →
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export function KnowledgeChallengeHub() {
  const [query, setQuery] = useState("");
  const stats = getKnowledgeChallengeStats();
  const challenges = useMemo(() => searchKnowledgeChallenges(query), [query]);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-023 · Civilization Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Knowledge Challenge Process
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Respectfully challenge policy, workflow, standards, and decisions — reviewed
            professionally, not personally. The better idea wins.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Challenges filed", value: stats.total },
            { label: "Accepted", value: stats.accepted },
            { label: "Under review", value: stats.underReview },
            { label: "Institutions", value: stats.institutions },
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
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Humility Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{HUMILITY_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_023_HUMILITY_MOTTO}
          </p>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <blockquote className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">Weak culture</p>
            <p className="font-serif italic text-cream">
              &ldquo;{CANON_023_CHALLENGE_CULTURE.weakCulture}&rdquo;
            </p>
          </blockquote>
          <blockquote className="rounded-lg border border-gold/30 bg-gold-subtle p-6">
            <p className="mb-2 text-xs uppercase tracking-widest text-gold">Canon 023 culture</p>
            <p className="font-serif italic text-cream">
              &ldquo;{CANON_023_CHALLENGE_CULTURE.canonCulture}&rdquo;
            </p>
          </blockquote>
        </section>
        <p className="mb-12 text-center text-sm text-cream-muted">
          {CANON_023_CHALLENGE_CULTURE.outcome}
        </p>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_25}
        </blockquote>

        <section className="mb-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Challenge types</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {KCP_CHALLENGE_TYPES.map((t) => (
                <li key={t.id}>
                  <span className="text-cream">{t.label}</span> — {t.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Required fields</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {KCP_REQUIRED_FIELDS.map((f) => (
                <li key={f.id}>
                  <span className="text-cream">{f.label}</span> — {f.description}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Institutional AI — humility principles
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CANON_023_AI_PRINCIPLES.map((p) => (
              <li
                key={p.principle}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm"
              >
                <span className="text-gold">{p.principle}</span>
                <p className="mt-1 italic text-cream-muted">&ldquo;{p.example}&rdquo;</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-cream-muted">
            Confidence should always be proportional to evidence.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Knowledge Challenges
          </h2>
          <input
            type="search"
            placeholder="Search challenges, institutions, artifacts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="grid gap-8">
            {challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
          {challenges.length === 0 && (
            <p className="py-8 text-center text-cream-muted">No challenges match your search.</p>
          )}
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            Stable principles · Adaptable methods
          </p>
          <p className="text-sm italic text-cream-muted">
            Longevity earns respect. Evidence earns improvement. The Canons remain enduring;
            operational methods evolve through learning and responsible stewardship.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/canon/CANON-023" className="text-gold hover:text-gold-light">
              CANON-023 →
            </Link>
            <Link href="/library/lessons" className="text-cream-muted hover:text-gold">
              Lessons Learned →
            </Link>
            <Link href="/library/improvements" className="text-cream-muted hover:text-gold">
              Improvement Register →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
