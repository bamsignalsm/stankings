import Link from "next/link";
import {
  CANON_015_ACCOUNTABILITY_APPLICATIONS,
  CANON_015_ACCOUNTABILITY_MOTTO,
} from "@/lib/canon/canon-015";
import {
  IIAF_ACCOUNTABILITY_TEST,
  IIAF_CLOSURE_REQUIREMENTS,
  IIAF_FAILURE_CATEGORIES,
  IIAF_FRAMEWORK,
  IIAF_INCIDENT_RECORD_FIELDS,
  IIAF_PURPOSE,
} from "@/lib/frameworks/incident-accountability";
import { INCIDENT_REGISTRY } from "@/lib/incidents/registry";
import { EXECUTIVE_DECISION_17 } from "@/lib/iki";

export function IncidentAccountabilityFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Resilience Canon · {IIAF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IIAF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-015" className="text-gold hover:text-gold-light">
              CANON-015
            </Link>
            . Blameless learning when things go wrong.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_17}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_015_ACCOUNTABILITY_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{IIAF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Accountability Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{IIAF_ACCOUNTABILITY_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Failure categories
          </h2>
          <ul className="space-y-3">
            {IIAF_FAILURE_CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">{cat.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{cat.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Incident Knowledge Object
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Every significant incident shall generate a record containing:
          </p>
          <ol className="space-y-3">
            {IIAF_INCIDENT_RECORD_FIELDS.map((field, i) => (
              <li
                key={field.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">
                  {i + 1}. {field.label}
                </p>
                <p className="mt-1 text-sm text-cream-muted">{field.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Incident closure requirements
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {IIAF_CLOSURE_REQUIREMENTS.map((req) => (
              <li key={req} className="flex gap-2">
                <span className="text-gold">—</span>
                {req}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Accountability in practice
          </h2>
          <ul className="space-y-4">
            {CANON_015_ACCOUNTABILITY_APPLICATIONS.map((app) => (
              <li
                key={app.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-1 font-serif text-lg font-semibold text-cream">
                  {app.institution}
                </h3>
                <p className="mb-2 text-sm text-cream-muted">{app.scenario}</p>
                <p className="text-sm text-gold/90">{app.strongResponse}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            Incident Center ({INCIDENT_REGISTRY.length} records)
          </p>
          <p className="mb-4 text-sm text-cream-muted">
            Records automatically feed the Lessons Learned Repository per CANON-009.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/library/incidents" className="text-gold hover:text-gold-light">
              Open Incident Center →
            </Link>
            <Link href="/library/lessons" className="text-cream-muted hover:text-gold">
              Lessons Learned →
            </Link>
            <Link href="/library/canon-dashboard" className="text-cream-muted hover:text-gold">
              Canon Dashboard →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
