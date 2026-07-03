import Link from "next/link";
import {
  getStewardshipStats,
  STEWARDSHIP_PROFILES,
} from "@/lib/stewardship";
import {
  ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS,
  STEWARDSHIP_DASHBOARD_FIELDS,
  STEWARDSHIP_PORTAL_FRAMEWORK,
  STEWARDSHIP_PORTAL_PURPOSE,
} from "@/lib/frameworks/stewardship-portal";
import { EXECUTIVE_DECISION_31 } from "@/lib/iki";
import { ARTICLE_III } from "@/lib/constitution/articles/article-iii";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "text-forest border-forest/30 bg-forest/10",
    emeritus: "text-cream-muted border-gold-subtle",
    "custodian-in-formation": "text-gold border-gold/30 bg-gold/10",
  };
  return map[status] ?? "text-cream-muted border-gold-subtle";
}

export function StewardshipPortalHub() {
  const stats = getStewardshipStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_III.article} · {STEWARDSHIP_PORTAL_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Stewardship Portal
          </h1>
          <p className="text-cream-muted">{STEWARDSHIP_PORTAL_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Every generation is a steward, not an owner.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_31}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Stewardship Dashboard Fields</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {STEWARDSHIP_DASHBOARD_FIELDS.map((field) => (
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
            Annual Stewardship Declaration
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {a}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} stewardship profiles</span>
          <span className="text-forest">{stats.declarationsSubmitted} declarations submitted</span>
          <span>{stats.successionDocumented} succession documented</span>
          <span className="text-gold">{stats.inFormation} in formation</span>
        </div>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Stewards</h2>
          <ul className="space-y-4">
            {STEWARDSHIP_PROFILES.map((profile) => (
              <li key={profile.slug}>
                <Link
                  href={`/library/stewardship/${profile.slug}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <div>
                    <p className="font-serif text-lg text-cream">{profile.name}</p>
                    <p className="text-xs text-gold">{profile.title}</p>
                    <p className="mt-1 text-xs text-cream-muted">
                      Declaration {profile.annualDeclaration.year}:{" "}
                      {profile.annualDeclaration.status}
                    </p>
                  </div>
                  <span
                    className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(profile.status)}`}
                  >
                    {profile.status.replace(/-/g, " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-iii" className="text-gold hover:text-gold-light">
            Article III →
          </Link>
          <Link href="/library/volumes/custodian-programme" className="text-cream-muted hover:text-gold">
            Custodian Programme →
          </Link>
          <Link
            href="/library/frameworks/stewardship-portal"
            className="text-cream-muted hover:text-gold"
          >
            Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
