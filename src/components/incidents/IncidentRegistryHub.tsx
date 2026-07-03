"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CANON_015_ACCOUNTABILITY_APPLICATIONS } from "@/lib/canon/canon-015";
import {
  INCIDENT_REGISTRY,
  INCIDENT_REVIEW_STATUS_LABELS,
  INCIDENT_SEVERITY_LABELS,
  type IncidentReviewStatus,
  type IncidentSeverity,
  searchIncidents,
} from "@/lib/incidents/registry";

function severityStyle(severity: IncidentSeverity) {
  const map: Record<IncidentSeverity, string> = {
    critical: "text-burgundy border-burgundy/30 bg-burgundy/10",
    high: "text-burgundy/90 border-burgundy/20 bg-burgundy/5",
    medium: "text-gold border-gold/30 bg-gold/10",
    low: "text-cream-muted border-gold-subtle bg-ink",
  };
  return map[severity];
}

function reviewStyle(status: IncidentReviewStatus) {
  const map: Record<IncidentReviewStatus, string> = {
    open: "text-gold border-gold/30",
    under_review: "text-gold border-gold/30",
    closed: "text-forest border-forest/30",
    executive_signed_off: "text-forest border-forest/30 bg-forest/10",
  };
  return map[status];
}

function IncidentCard({ incident }: { incident: (typeof INCIDENT_REGISTRY)[number] }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{incident.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{incident.summary}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {incident.institution} · {new Date(incident.occurredAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${severityStyle(incident.severity)}`}
          >
            {INCIDENT_SEVERITY_LABELS[incident.severity]}
          </span>
          <span
            className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${reviewStyle(incident.reviewStatus)}`}
          >
            {INCIDENT_REVIEW_STATUS_LABELS[incident.reviewStatus]}
          </span>
        </div>
      </div>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Systems</dt>
          <dd className="text-cream">{incident.systemsAffected.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Customers affected</dt>
          <dd className="text-cream-muted">{incident.customersAffected}</dd>
        </div>
      </dl>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Root cause</p>
        <p className="text-sm text-cream-muted">{incident.rootCause}</p>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Corrective actions</p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {incident.correctiveActions.map((a) => (
              <li key={a}>· {a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">Preventive actions</p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {incident.preventiveActions.map((a) => (
              <li key={a}>· {a}</li>
            ))}
          </ul>
        </div>
      </div>

      {incident.lessonsLearnedRecordId && (
        <p className="mb-4 text-sm">
          <span className="text-cream-muted">Lessons Learned: </span>
          <Link
            href={`/library/lessons/${incident.lessonsLearnedRecordId}`}
            className="text-gold hover:text-gold-light"
          >
            {incident.lessonsLearnedRecordId}
          </Link>
        </p>
      )}

      {incident.executiveSignOff && (
        <p className="mb-4 text-xs text-cream-muted">
          Executive sign-off: {incident.executiveSignOff}
        </p>
      )}

      <div className="flex flex-wrap gap-3 text-sm">
        {incident.relatedCanons.map((ref) => (
          <Link key={ref} href={`/library/canon/${ref}`} className="text-gold hover:text-gold-light">
            {ref}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function IncidentRegistryHub() {
  const [query, setQuery] = useState("");

  const incidents = useMemo(() => searchIncidents(query), [query]);

  const closedCount = INCIDENT_REGISTRY.filter(
    (i) => i.reviewStatus === "closed" || i.reviewStatus === "executive_signed_off"
  ).length;

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-015 · Resilience Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Incident Center
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Significant incidents documented with accountability, root cause analysis,
            and lessons that feed the institutional brain.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <input
            type="search"
            placeholder="Search incidents, institutions, systems…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="text-right text-sm text-cream-muted">
            <p>{closedCount} reviewed & closed</p>
            <p className="mt-1">{INCIDENT_REGISTRY.length} incidents recorded</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Accountability Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;Have we understood what happened? Accepted appropriate responsibility?
            Corrected the causes? Preserved the lessons?&rdquo;
          </blockquote>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/canon/CANON-015" className="text-gold hover:text-gold-light">
              CANON-015 →
            </Link>
            <Link
              href="/library/frameworks/incident-accountability"
              className="text-gold hover:text-gold-light"
            >
              IIAF →
            </Link>
            <Link href="/library/lessons" className="text-cream-muted hover:text-gold">
              Lessons Learned →
            </Link>
          </div>
        </section>

        <section className="mb-12">
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
                <p className="mb-1 text-xs text-burgundy/80 line-through decoration-burgundy/30">
                  Weak: {app.weakResponse}
                </p>
                <p className="text-sm text-gold/90">Strong: {app.strongResponse}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 hidden overflow-x-auto rounded-lg border border-gold-subtle lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-widest text-cream-muted">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Summary</th>
                <th className="px-4 py-3 font-medium">Institution</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">LLR</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-gold-subtle/50">
                  <td className="px-4 py-4 font-mono text-xs text-gold">{i.id}</td>
                  <td className="max-w-xs px-4 py-4 text-cream">{i.summary}</td>
                  <td className="px-4 py-4 text-cream-muted">{i.institution}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase ${severityStyle(i.severity)}`}
                    >
                      {INCIDENT_SEVERITY_LABELS[i.severity]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-cream-muted">
                    {INCIDENT_REVIEW_STATUS_LABELS[i.reviewStatus]}
                  </td>
                  <td className="px-4 py-4">
                    {i.lessonsLearnedRecordId ? (
                      <Link
                        href={`/library/lessons/${i.lessonsLearnedRecordId}`}
                        className="text-gold hover:text-gold-light"
                      >
                        {i.lessonsLearnedRecordId}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-6">
          {incidents.map((i) => (
            <IncidentCard key={i.id} incident={i} />
          ))}
        </div>

        {incidents.length === 0 && (
          <p className="py-12 text-center text-cream-muted">No incidents match your search.</p>
        )}

        <section className="mt-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Institutional resilience</p>
          <p className="text-sm italic text-cream-muted">
            Experience → Knowledge → Better Decisions → Stronger Institution.
          </p>
        </section>
      </div>
    </>
  );
}
