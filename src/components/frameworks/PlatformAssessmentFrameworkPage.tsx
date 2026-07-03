import Link from "next/link";
import {
  CANON_012_PLATFORM_APPLICATIONS,
  CANON_012_PLATFORM_MOTTO,
} from "@/lib/canon/canon-012";
import {
  PLAT_ASSESSMENT_QUESTIONS,
  PLAT_FRAMEWORK,
  PLAT_PLATFORM_TEST,
  PLAT_PURPOSE,
  PLATFORM_ASSESSMENT_EXAMPLES,
  type PlatformAssessment,
} from "@/lib/frameworks/platform-assessment";
import { EXECUTIVE_DECISION_14 } from "@/lib/iki";
import { PLATFORM_REGISTRY } from "@/lib/platforms/registry";

function verdictStyle(verdict: PlatformAssessment["verdict"]) {
  const map = {
    reuse: "text-forest border-forest/30",
    extend_platform: "text-gold border-gold/30",
    new_platform: "text-royal border-royal/30",
    rejected_silo: "text-burgundy border-burgundy/30",
  };
  return map[verdict];
}

function AssessmentCard({ assessment }: { assessment: PlatformAssessment }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {assessment.requestingInstitution}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {assessment.proposalTitle}
          </h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${verdictStyle(assessment.verdict)}`}
        >
          {assessment.verdict.replace("_", " ")}
        </span>
      </div>

      <p className="mb-4 text-sm text-cream-muted">{assessment.proposalSummary}</p>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Equivalent exists</dt>
          <dd className="text-cream">{assessment.equivalentExists ? "Yes" : "No"}</dd>
        </div>
        {assessment.existingPlatform && (
          <div>
            <dt className="text-xs uppercase tracking-widest text-cream-muted">Existing platform</dt>
            <dd className="text-cream">{assessment.existingPlatform}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Proposed owner</dt>
          <dd className="text-cream">{assessment.proposedOwner}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Can become shared</dt>
          <dd className="text-cream">{assessment.canBecomeShared ? "Yes" : "No"}</dd>
        </div>
      </dl>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">Institutions benefiting</p>
        <p className="text-sm text-cream-muted">{assessment.institutionsBenefiting.join(" · ")}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">Proposed APIs</p>
        <p className="text-sm text-cream-muted">{assessment.proposedApis.join(" · ")}</p>
      </div>

      <p className="text-sm text-cream-muted">{assessment.notes}</p>
    </article>
  );
}

export function PlatformAssessmentFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Architectural Canon · {PLAT_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {PLAT_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-012" className="text-gold hover:text-gold-light">
              CANON-012
            </Link>
            . The gate before every significant technical capability.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_14}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_012_PLATFORM_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{PLAT_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Platform Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{PLAT_PLATFORM_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Platform Assessment questions
          </h2>
          <ol className="space-y-3">
            {PLAT_ASSESSMENT_QUESTIONS.map((q, i) => (
              <li
                key={q.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">
                  {i + 1}. {q.label}
                </p>
                <p className="mt-1 text-sm text-cream-muted">{q.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Platforms in practice
          </h2>
          <ul className="space-y-4">
            {CANON_012_PLATFORM_APPLICATIONS.map((app) => (
              <li
                key={app.platform}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-1 font-serif text-lg font-semibold text-cream">
                  {app.platform}
                </h3>
                <p className="mb-2 text-sm text-cream-muted">{app.description}</p>
                <p className="text-xs text-cream-muted/80">
                  Consumers: {app.consumers.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-cream">
              Example assessments
            </h2>
            <Link
              href="/library/platforms"
              className="text-sm text-gold hover:text-gold-light"
            >
              Platform Registry →
            </Link>
          </div>
          <div className="space-y-6">
            {PLATFORM_ASSESSMENT_EXAMPLES.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            Registered platforms ({PLATFORM_REGISTRY.length})
          </p>
          <p className="mb-4 text-sm text-cream-muted">
            Consult the registry before every Platform Assessment — build once, reuse responsibly.
          </p>
          <Link
            href="/library/platforms"
            className="text-sm text-gold hover:text-gold-light"
          >
            Open Platform Registry →
          </Link>
        </section>
      </div>
    </>
  );
}
