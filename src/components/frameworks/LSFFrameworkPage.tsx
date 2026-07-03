import Link from "next/link";
import {
  LSF_EXAMPLES,
  LSF_FRAMEWORK,
  LSF_GOVERNED_ROLES,
  LSF_PURPOSE,
  LSF_ROLE_REQUIREMENTS,
  LSF_STEWARDSHIP_TEST,
} from "@/lib/frameworks/leadership-stewardship";

function AppointmentCard({
  review,
}: {
  review: (typeof LSF_EXAMPLES)[number];
}) {
  const questions = [
    { label: "Competence", ok: review.competence },
    { label: "Strengthens trust", ok: review.strengthensTrust },
    { label: "Develops people", ok: review.developsPeople },
    { label: "Leaves institution stronger", ok: review.leavesStronger },
  ];

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <h3 className="font-serif text-xl text-cream">{review.roleTitle}</h3>
        <span className="text-xs uppercase tracking-wider text-gold">{review.status}</span>
      </div>
      <p className="mb-4 text-sm text-cream-muted">{review.candidateSummary}</p>
      <ul className="mb-4 space-y-2">
        {questions.map((q, i) => (
          <li key={q.label} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-gold/50">{i + 1}</span>
            <span className={q.ok ? "text-forest" : "text-burgundy"}>
              {q.ok ? "✓" : "✗"}
            </span>
            <span className="text-cream-muted">{q.label}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm italic text-cream-muted">{review.recommendation}</p>
    </article>
  );
}

export function LSFFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {LSF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {LSF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-004" className="text-gold hover:text-gold-light">
              CANON-004
            </Link>
            . No leadership position without a stewardship plan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{LSF_PURPOSE}</p>
        </section>

        <blockquote className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            Executive Decision No. 6
          </p>
          <ol className="space-y-2 text-sm leading-relaxed text-cream">
            <li>1. Does this person demonstrate competence?</li>
            <li>2. Does this person strengthen institutional trust?</li>
            <li>3. Does this person develop other people?</li>
            <li>4. Will the institution likely be stronger after their period of stewardship?</li>
          </ol>
          <p className="mt-4 text-sm text-cream-muted">
            If those questions cannot be answered positively, the appointment deserves further scrutiny.
          </p>
        </blockquote>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Stewardship Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{LSF_STEWARDSHIP_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Governed leadership roles
          </h2>
          <ul className="flex flex-wrap gap-2">
            {LSF_GOVERNED_ROLES.map((r) => (
              <li
                key={r.level}
                className="rounded-full border border-gold-subtle px-3 py-1 text-sm text-cream-muted"
              >
                {r.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required per leadership role
          </h2>
          <ul className="space-y-3">
            {LSF_ROLE_REQUIREMENTS.map((req) => (
              <li
                key={req.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">{req.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{req.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-cream">
            Example appointment reviews
          </h2>
          <div className="space-y-8">
            {LSF_EXAMPLES.map((r) => (
              <AppointmentCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        <p className="mb-8 text-sm italic text-cream-muted">
          Volume IV — The Custodian Programme will build on this canon. The programme
          exists to create stewards, not merely executives.
        </p>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-004" className="text-gold hover:text-gold-light">
            Read CANON-004 →
          </Link>
          <Link href="/library/frameworks/purpose-assessment" className="text-cream-muted hover:text-gold">
            PAF
          </Link>
          <Link href="/library/frameworks/trust-impact-assessment" className="text-cream-muted hover:text-gold">
            TIA
          </Link>
          <Link href="/library/volumes/custodian-programme" className="text-cream-muted hover:text-gold">
            Volume IV (planned)
          </Link>
        </div>
      </div>
    </>
  );
}
