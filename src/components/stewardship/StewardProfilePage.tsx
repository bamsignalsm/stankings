import type { ReactNode } from "react";
import Link from "next/link";
import type { StewardshipProfile } from "@/lib/stewardship/types";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      {children}
    </section>
  );
}

function LinkList({ items }: { items: StewardshipProfile["knowledgeContributions"] }) {
  if (items.length === 0) {
    return <p className="text-sm italic text-cream-muted">None recorded yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.title}>
          {item.href ? (
            <Link href={item.href} className="text-gold hover:text-gold-light">
              {item.title}
            </Link>
          ) : (
            <span className="text-cream-muted">{item.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

interface StewardProfilePageProps {
  profile: StewardshipProfile;
}

export function StewardProfilePage({ profile }: StewardProfilePageProps) {
  const successionClass =
    profile.successionStatus.status === "documented"
      ? "text-forest border-forest/30"
      : profile.successionStatus.status === "in_progress"
        ? "text-gold border-gold/30"
        : "text-burgundy border-burgundy/30";

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/stewardship"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Stewardship Portal
          </Link>
          <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
            Stewardship Dashboard · {profile.role}
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">{profile.name}</h1>
          <p className="text-cream-muted">{profile.title}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Section label="Current Responsibilities">
          <ul className="space-y-2 text-cream-muted">
            {profile.currentResponsibilities.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Institutions Overseen">
          <ul className="flex flex-wrap gap-2">
            {profile.institutionsOverseen.map((inst) => (
              <li
                key={inst}
                className="rounded-full border border-gold-subtle px-3 py-1 text-sm text-cream-muted"
              >
                {inst}
              </li>
            ))}
          </ul>
          {profile.institutionsOverseen.length === 0 && (
            <p className="text-sm italic text-cream-muted">Formation phase — oversight not yet assigned.</p>
          )}
        </Section>

        <Section label="Succession Status">
          <div className={`mb-3 inline-block rounded border px-3 py-1 text-xs uppercase tracking-wider ${successionClass}`}>
            {profile.successionStatus.label}
          </div>
          <p className="text-cream-muted">{profile.successionStatus.detail}</p>
        </Section>

        <Section label="Knowledge Contributions">
          <LinkList items={profile.knowledgeContributions} />
        </Section>

        <Section label="Decisions Authored">
          <LinkList items={profile.decisionsAuthored} />
        </Section>

        <Section label="Lessons Learned Published">
          <LinkList items={profile.lessonsLearnedPublished} />
        </Section>

        <Section label="Canon References">
          <div className="flex flex-wrap gap-3">
            {profile.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="font-mono text-sm text-gold hover:text-gold-light"
              >
                {ref}
              </Link>
            ))}
          </div>
        </Section>

        <Section label="Constitution Articles">
          <ul className="space-y-1">
            {profile.constitutionArticles.map((art) => (
              <li key={art}>
                <Link
                  href={
                    art.startsWith("Art. III")
                      ? "/library/constitution/article-iii"
                      : art.startsWith("Art. II")
                        ? "/library/constitution/article-ii"
                        : "/library/constitution/article-i"
                  }
                  className="text-sm text-gold hover:text-gold-light"
                >
                  {art}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Stewardship Reviews">
          {profile.stewardshipReviews.length > 0 ? (
            <ul className="space-y-2 text-sm text-cream-muted">
              {profile.stewardshipReviews.map((r) => (
                <li key={r.period}>
                  {r.href ? (
                    <Link href={r.href} className="text-gold hover:text-gold-light">
                      {r.period}
                    </Link>
                  ) : (
                    r.period
                  )}
                  {" — "}
                  {r.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-cream-muted">First review pending.</p>
          )}
        </Section>

        <Section label="Training Completed">
          <ul className="space-y-1 text-sm text-cream-muted">
            {profile.trainingCompleted.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>

        {profile.custodianProgrammeProgress !== undefined && (
          <Section label="Custodian Programme Progress">
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-ink">
              <div
                className="h-full rounded-full bg-gold/80"
                style={{ width: `${profile.custodianProgrammeProgress}%` }}
              />
            </div>
            <p className="font-mono text-sm text-cream-muted">{profile.custodianProgrammeProgress}% complete</p>
          </Section>
        )}

        <Section label="Annual Stewardship Declaration">
          <div className="rounded-lg border border-gold/25 bg-ink-muted p-6">
            <p className="mb-4 font-mono text-sm text-gold">
              {profile.annualDeclaration.year} · {profile.annualDeclaration.status}
              {profile.annualDeclaration.submittedAt && (
                <span className="text-cream-muted"> · Submitted {profile.annualDeclaration.submittedAt}</span>
              )}
            </p>
            {profile.annualDeclaration.affirmations.length > 0 ? (
              <ul className="space-y-2 text-sm text-cream-muted">
                {profile.annualDeclaration.affirmations.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="text-forest">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-cream-muted">Declaration pending.</p>
            )}
            {profile.annualDeclaration.improvementsIdentified && (
              <div className="mt-4 border-t border-gold-subtle pt-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-gold">Areas requiring improvement</p>
                <ul className="space-y-1 text-sm text-cream-muted">
                  {profile.annualDeclaration.improvementsIdentified.map((i) => (
                    <li key={i}>— {i}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/constitution/article-iii" className="text-gold hover:text-gold-light">
            Article III →
          </Link>
          <Link href="/library/canon/CANON-004" className="text-cream-muted hover:text-gold">
            CANON-004 →
          </Link>
          <Link href="/library/frameworks/leadership-stewardship" className="text-cream-muted hover:text-gold">
            LSF Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
