import type { ReactNode } from "react";
import Link from "next/link";
import type { LeadershipProfile } from "@/lib/leadership/types";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      {children}
    </section>
  );
}

function LinkList({ items }: { items: LeadershipProfile["knowledgeContributions"] }) {
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

function constitutionHref(art: string): string {
  if (art.startsWith("Art. V")) return "/library/constitution/article-v";
  if (art.startsWith("Art. IV")) return "/library/constitution/article-iv";
  if (art.startsWith("Art. III")) return "/library/constitution/article-iii";
  if (art.startsWith("Art. II")) return "/library/constitution/article-ii";
  return "/library/constitution/article-i";
}

interface LeadershipProfilePageProps {
  profile: LeadershipProfile;
}

export function LeadershipProfilePage({ profile }: LeadershipProfilePageProps) {
  const successionClass =
    profile.successorDevelopment.status === "documented"
      ? "text-forest border-forest/30"
      : profile.successorDevelopment.status === "in_progress"
        ? "text-gold border-gold/30"
        : "text-burgundy border-burgundy/30";

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/leadership"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Leadership Governance
          </Link>
          <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
            {profile.constitutionalOffice}
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">{profile.name}</h1>
          <p className="text-cream-muted capitalize">{profile.officeType.replace(/-/g, " ")} · {profile.status}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Section label="Stewardship Responsibilities">
          <ul className="space-y-2 text-cream-muted">
            {profile.stewardshipResponsibilities.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Delegated Authority">
          <ul className="space-y-2 text-cream-muted">
            {profile.delegatedAuthority.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {a}
              </li>
            ))}
          </ul>
        </Section>

        {profile.annualStewardshipDeclaration && (
          <Section label="Annual Stewardship Declaration">
            <p className="text-cream-muted">
              {profile.annualStewardshipDeclaration.year}: {profile.annualStewardshipDeclaration.status}
              {profile.annualStewardshipDeclaration.href && (
                <>
                  {" · "}
                  <Link
                    href={profile.annualStewardshipDeclaration.href}
                    className="text-gold hover:text-gold-light"
                  >
                    View stewardship profile →
                  </Link>
                </>
              )}
            </p>
          </Section>
        )}

        <Section label="Leadership Evaluation History">
          {profile.leadershipEvaluations.length > 0 ? (
            <ul className="space-y-3 text-sm text-cream-muted">
              {profile.leadershipEvaluations.map((ev) => (
                <li key={ev.period} className="rounded border border-gold-subtle bg-ink-muted p-4">
                  <p className="font-mono text-gold">
                    {ev.period} · {ev.status}
                  </p>
                  {ev.summary && <p className="mt-2">{ev.summary}</p>}
                  {ev.href && (
                    <Link href={ev.href} className="mt-2 inline-block text-gold hover:text-gold-light">
                      View review →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-cream-muted">First review pending.</p>
          )}
        </Section>

        <Section label="Knowledge Contributions">
          <LinkList items={profile.knowledgeContributions} />
        </Section>

        <Section label="Decisions Authored">
          <LinkList items={profile.decisionsAuthored} />
        </Section>

        <Section label="Successor Development Status">
          <div className={`mb-3 inline-block rounded border px-3 py-1 text-xs uppercase tracking-wider ${successionClass}`}>
            {profile.successorDevelopment.label}
          </div>
          <p className="text-cream-muted">{profile.successorDevelopment.detail}</p>
        </Section>

        <Section label="Competency Assessments">
          <div className="overflow-x-auto rounded-lg border border-gold-subtle">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gold-subtle bg-ink-muted">
                  <th className="px-3 py-2 font-mono text-xs uppercase text-gold">Standard</th>
                  <th className="px-3 py-2 font-mono text-xs uppercase text-gold">Status</th>
                  <th className="px-3 py-2 font-mono text-xs uppercase text-gold">Period</th>
                </tr>
              </thead>
              <tbody>
                {profile.competencyAssessments.map((row) => (
                  <tr key={row.standard} className="border-b border-gold-subtle/50 last:border-0">
                    <td className="px-3 py-2 text-cream">{row.standard}</td>
                    <td className="px-3 py-2">
                      <span className="text-xs uppercase tracking-wider text-gold">{row.status}</span>
                    </td>
                    <td className="px-3 py-2 text-cream-muted">{row.period ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                <Link href={constitutionHref(art)} className="text-sm text-gold hover:text-gold-light">
                  {art}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Required Training">
          <ul className="space-y-1 text-sm text-cream-muted">
            {profile.requiredTraining.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/constitution/article-v" className="text-gold hover:text-gold-light">
            Article V →
          </Link>
          <Link href="/library/leadership" className="text-cream-muted hover:text-gold">
            All leadership offices →
          </Link>
        </div>
      </div>
    </>
  );
}
