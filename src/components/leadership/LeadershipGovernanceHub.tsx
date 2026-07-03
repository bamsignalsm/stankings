import Link from "next/link";
import {
  ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA,
  LEADERSHIP_COMPETENCY_MATRIX,
  LEADERSHIP_PROFILE_FIELDS,
  LGOV_FRAMEWORK,
  LGOV_PURPOSE,
} from "@/lib/frameworks/leadership-governance-portal";
import { CONSTITUTIONAL_LEADERSHIP_STANDARDS } from "@/lib/constitution/articles/article-v";
import { LEADERSHIP_PROFILES, getLeadershipStats } from "@/lib/leadership";
import { EXECUTIVE_DECISION_33 } from "@/lib/iki";
import { ARTICLE_V } from "@/lib/constitution/articles/article-v";

const OFFICE_ORDER = ["board", "ceo", "executive", "committee", "subsidiary-ceo", "custodian"] as const;

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "text-forest border-forest/30 bg-forest/10",
    forming: "text-gold border-gold/30 bg-gold/10",
    emeritus: "text-cream-muted border-gold-subtle",
  };
  return map[status] ?? "text-cream-muted border-gold-subtle";
}

export function LeadershipGovernanceHub() {
  const stats = getLeadershipStats();
  const sorted = [...LEADERSHIP_PROFILES].sort(
    (a, b) => OFFICE_ORDER.indexOf(a.officeType) - OFFICE_ORDER.indexOf(b.officeType),
  );

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_V.article} · {LGOV_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Leadership Governance
          </h1>
          <p className="text-cream-muted">{LGOV_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Is this leader worthy of the office they hold?
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_33}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Leadership Profile Fields</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {LEADERSHIP_PROFILE_FIELDS.map((field) => (
              <li
                key={field}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-sm text-cream-muted"
              >
                {field}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Constitutional Leadership Standards
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {CONSTITUTIONAL_LEADERSHIP_STANDARDS.map((standard) => (
              <li key={standard} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {standard}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Leadership Competency Matrix</h2>
          <p className="mb-4 text-sm text-cream-muted">
            How each constitutional standard is assessed over time through appointment review, Annual
            Constitutional Leadership Review, and succession readiness.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gold-subtle">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gold-subtle bg-ink-muted">
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-gold">Standard</th>
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-gold">
                    Assessment Focus
                  </th>
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-gold">Status</th>
                </tr>
              </thead>
              <tbody>
                {LEADERSHIP_COMPETENCY_MATRIX.map((row) => (
                  <tr key={row.standard} className="border-b border-gold-subtle/50 last:border-0">
                    <td className="px-4 py-3 text-cream">{row.standard}</td>
                    <td className="px-4 py-3 text-cream-muted">{row.assessmentFocus}</td>
                    <td className="px-4 py-3">
                      <span className="rounded border border-gold/30 px-2 py-0.5 text-xs uppercase tracking-wider text-gold">
                        {row.defaultStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Annual Constitutional Leadership Review
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA.map((criterion) => (
              <li key={criterion} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {criterion}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} leadership profiles</span>
          <span className="text-forest">{stats.active} active offices</span>
          <span>{stats.reviewsSubmitted} reviews in progress</span>
          <span>{stats.successionDocumented} succession tracked</span>
        </div>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Leadership Offices</h2>
          <ul className="space-y-4">
            {sorted.map((profile) => (
              <li key={profile.slug}>
                <Link
                  href={`/library/leadership/${profile.slug}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold">
                      {profile.constitutionalOffice}
                    </p>
                    <p className="font-serif text-lg text-cream">{profile.name}</p>
                    <p className="text-sm text-cream-muted">
                      Evaluation {profile.leadershipEvaluations[0]?.period ?? "—"}:{" "}
                      {profile.leadershipEvaluations[0]?.status ?? "pending"}
                    </p>
                  </div>
                  <span
                    className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(profile.status)}`}
                  >
                    {profile.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-v" className="text-gold hover:text-gold-light">
            Article V →
          </Link>
          <Link href="/library/governance" className="text-cream-muted hover:text-gold">
            Constitutional Governance →
          </Link>
          <Link href="/library/stewardship" className="text-cream-muted hover:text-gold">
            Stewardship Portal →
          </Link>
          <Link
            href="/library/frameworks/leadership-governance-portal"
            className="text-cream-muted hover:text-gold"
          >
            LGOV Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
