import Link from "next/link";
import { ARTICLE_XV } from "@/lib/constitution/articles/article-xv";
import {
  AMENDMENT_PRESERVATION_FIELDS,
  AMENDMENT_PROPOSAL_REQUIREMENTS,
  AMENDMENT_REVIEW_PROCESS,
  INTERPRETATION_PRINCIPLES,
  PRESERVED_CONSTITUTIONAL_DOCUMENTS,
} from "@/lib/constitution/articles/article-xv";
import { CONSTITUTION_SCHEDULES } from "@/lib/constitution/schedules";
import {
  CONSTITUTION_AMENDMENT_HISTORY,
  CONSTITUTION_CANON_IMPLEMENTATION_MAP,
  CONSTITUTION_EFFECTIVE_DATE,
  CONSTITUTION_HISTORY,
  CONSTITUTION_PARTS,
  CONSTITUTION_VERSION,
} from "@/lib/constitution/volume-i";
import {
  AMENDMENT_PROPOSALS,
  CONSTITUTION_REGISTER,
  CONSTITUTION_VERSIONS,
  getConstitutionCentreStats,
  REVIEW_CALENDAR,
} from "@/lib/constitution-centre";
import {
  AMENDMENT_WORKSPACE_FIELDS,
  CCR_FRAMEWORK,
  CCR_PURPOSE,
  CONSTITUTION_REGISTER_DOMAINS,
} from "@/lib/frameworks/constitution-centre";
import { EXECUTIVE_DECISION_43 } from "@/lib/iki";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

const STATUS_STYLES = {
  adopted: "text-forest border-forest/30",
  under_review: "text-gold border-gold/30",
  draft: "text-cream-muted border-gold-subtle",
  rejected: "text-burgundy border-burgundy/30",
} as const;

export function ConstitutionCentreHub() {
  const stats = getConstitutionCentreStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partV.part} · {partV.title} · {ARTICLE_XV.article} · {CCR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitution Centre
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CCR_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Stable principles. Responsible evolution. Nothing erased — everything traceable.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_43}
        </blockquote>

        <section className="mb-12 rounded-lg border border-gold/40 bg-gold-subtle p-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-gold">Current Version</p>
              <p className="font-serif text-4xl text-cream">v{stats.currentVersion}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gold">Effective Date</p>
              <p className="font-serif text-2xl text-cream">{stats.effectiveDate}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gold">Articles · Parts</p>
              <p className="font-serif text-2xl text-cream">
                {CONSTITUTION_VERSIONS[0]?.articlesCount} · {CONSTITUTION_VERSIONS[0]?.partsCount}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-6">
          {[
            { label: "Versions", value: stats.versions },
            { label: "Amendments", value: stats.amendmentsAdopted },
            { label: "Pending", value: stats.amendmentsPending },
            { label: "Register", value: stats.registerEntries },
            { label: "Schedules", value: stats.schedules },
            { label: "History", value: stats.historyEvents },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl text-gold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section id="register" className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Constitution Register</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CONSTITUTION_REGISTER.map((entry) => (
              <div
                key={entry.registerId}
                className="flex items-center justify-between rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div>
                  <p className="font-mono text-xs text-gold">{entry.category}</p>
                  {entry.href ? (
                    <Link href={entry.href} className="font-medium text-cream hover:text-gold-light">
                      {entry.title}
                    </Link>
                  ) : (
                    <p className="font-medium text-cream">{entry.title}</p>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wider text-cream-muted">{entry.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="amendments" className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Amendment Workspace</h2>
          <div className="space-y-6">
            {AMENDMENT_PROPOSALS.map((amd) => (
              <article
                key={amd.amendmentId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-gold">{amd.amendmentId}</p>
                    <h3 className="font-serif text-xl text-cream">
                      {amd.articlesAffected.join(", ")}
                    </h3>
                    <p className="text-sm text-cream-muted">Sponsor: {amd.sponsor}</p>
                  </div>
                  <span
                    className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_STYLES[amd.status]}`}
                  >
                    {amd.status.replace("_", " ")}
                  </span>
                </div>
                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Existing</p>
                    <p className="text-cream-muted">{amd.existingText}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Proposed</p>
                    <p className="text-cream-muted">{amd.proposedText}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Constitutional Analysis</p>
                    <p className="text-cream-muted">{amd.constitutionalAnalysis}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Trust Impact</p>
                    <p className="text-cream-muted">{amd.trustImpactAssessment}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Board Decision</p>
                    <p className="text-cream-muted">{amd.boardDecision}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Version</p>
                    <p className="text-cream-muted">
                      {amd.versionFrom} → {amd.versionTo ?? "pending"}
                      {amd.effectiveDate && ` · ${amd.effectiveDate}`}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Version History</h2>
            <ul className="space-y-3">
              {CONSTITUTION_VERSIONS.map((v) => (
                <li key={v.version} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-gold">v{v.version}</p>
                  <p className="text-cream">{v.summary}</p>
                  <p className="text-cream-muted">
                    {v.effectiveDate} · {v.approver}
                  </p>
                </li>
              ))}
              {CONSTITUTION_AMENDMENT_HISTORY.map((a) => (
                <li key={a.version} className="rounded-lg border border-gold-subtle/50 bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-xs text-cream-muted">Amendment record · v{a.version}</p>
                  <p className="text-cream-muted">{a.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Review Calendar</h2>
            <ul className="space-y-3">
              {REVIEW_CALENDAR.map((r) => (
                <li key={r.event} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-medium text-cream">{r.event}</p>
                  <p className="text-cream-muted">
                    {r.frequency} · {r.authority} · {r.article}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Constitutional Schedules</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CONSTITUTION_SCHEDULES.map((s) => (
              <Link
                key={s.id}
                href={s.href ?? "/library/constitution/schedules"}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 hover:border-gold/40"
              >
                <p className="font-mono text-xs text-gold">Schedule {s.letter}</p>
                <p className="font-medium text-cream">{s.title}</p>
                <p className="text-xs text-cream-muted">{s.status}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="ratification" className="mb-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Ratification History</h2>
          <p className="mb-4 text-sm text-cream-muted">
            Volume I v{CONSTITUTION_VERSION} adopted {CONSTITUTION_EFFECTIVE_DATE}. Articles I–XVII
            ratified. Article XVIII planned to formalize Schedules before Constitutional Congress and
            formal seal.
          </p>
          <ul className="max-h-48 space-y-2 overflow-y-auto text-sm text-cream-muted">
            {CONSTITUTION_HISTORY.slice(-5).map((h) => (
              <li key={h.event}>
                <span className="text-gold">{h.date}</span> — {h.event}: {h.note}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Proposal Requirements (§ 15.02)", items: AMENDMENT_PROPOSAL_REQUIREMENTS },
            { title: "Review Process (§ 15.03)", items: AMENDMENT_REVIEW_PROCESS },
            { title: "Preservation Fields (§ 15.04)", items: AMENDMENT_PRESERVATION_FIELDS },
            { title: "Workspace Fields", items: AMENDMENT_WORKSPACE_FIELDS },
            { title: "Register Domains (ED 43)", items: CONSTITUTION_REGISTER_DOMAINS },
            { title: "Interpretation (§ 15.06)", items: INTERPRETATION_PRINCIPLES },
            { title: "Preserved Documents (§ 15.08)", items: PRESERVED_CONSTITUTIONAL_DOCUMENTS },
          ].map((block) => (
            <div key={block.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-gold">{block.title}</h3>
              <ul className="space-y-1 text-xs text-cream-muted">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Canon Cross-References</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {CONSTITUTION_CANON_IMPLEMENTATION_MAP.slice(0, 8).map((m) => (
              <div
                key={m.canon}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-xs"
              >
                <Link href={`/library/canon/${m.canon}`} className="text-gold hover:text-gold-light">
                  {m.canon}
                </Link>
                <span className="text-cream-muted"> — {m.role}</span>
              </div>
            ))}
          </div>
          <Link href="/library/constitution#canons" className="mt-4 inline-block text-sm text-gold hover:text-gold-light">
            Full canon map →
          </Link>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-xv" className="text-gold hover:text-gold-light">
            Article XV →
          </Link>
          <Link href="/library/constitution/article-xvi" className="text-gold hover:text-gold-light">
            Article XVI →
          </Link>
          <Link href="/library/constitution/article-xvii" className="text-gold hover:text-gold-light">
            Article XVII →
          </Link>
          <Link href="/library/custodian-programme" className="text-gold hover:text-gold-light">
            Custodian Programme →
          </Link>
          <Link href="/library/constitutional-ceremony" className="text-gold hover:text-gold-light">
            Constitutional Ceremony →
          </Link>
          <Link href="/library/constitution/founders-charge" className="text-gold hover:text-gold-light">
            Founder&apos;s Charge →
          </Link>
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Constitution Portal →
          </Link>
          <Link href="/library/constitutional-health" className="text-gold hover:text-gold-light">
            Constitutional Health Dashboard →
          </Link>
          <Link href="/library/constitution/schedules" className="text-gold hover:text-gold-light">
            Schedules A–H →
          </Link>
          <Link
            href="/library/frameworks/constitution-centre"
            className="text-gold hover:text-gold-light"
          >
            {CCR_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
