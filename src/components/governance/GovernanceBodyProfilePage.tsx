import type { ReactNode } from "react";
import Link from "next/link";
import type { GovernanceBodyProfile } from "@/lib/governance/types";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      {children}
    </section>
  );
}

function LinkList({ items }: { items: { title: string; href?: string }[] }) {
  if (!items.length) return <p className="text-sm italic text-cream-muted">None recorded yet.</p>;
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-cream-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-gold/60">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const TYPE_LABELS: Record<GovernanceBodyProfile["type"], string> = {
  board: "Board of Directors",
  ceo: "Group Chief Executive Officer",
  "executive-leadership": "Executive Leadership",
  committee: "Governance Committee",
  owner: "Constitutional Owner(s)",
};

interface GovernanceBodyProfilePageProps {
  profile: GovernanceBodyProfile;
}

export function GovernanceBodyProfilePage({ profile }: GovernanceBodyProfilePageProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/governance"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Constitutional Governance Portal
          </Link>
          <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
            {TYPE_LABELS[profile.type]} · {profile.status}
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">{profile.name}</h1>
          <p className="text-cream-muted">{profile.subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {profile.mandate && (
          <Section label="Mandate">
            <p className="text-lg leading-relaxed text-cream">{profile.mandate}</p>
          </Section>
        )}

        {profile.constitutionalResponsibilities && (
          <Section label="Constitutional Responsibilities">
            <BulletList items={profile.constitutionalResponsibilities} />
          </Section>
        )}

        {profile.reservedPowers && (
          <Section label="Reserved Powers">
            <p className="mb-4 text-sm text-cream-muted">
              Per Executive Decision No. 32 — cannot be delegated without explicit Board approval.
            </p>
            <BulletList items={profile.reservedPowers} />
          </Section>
        )}

        {profile.activeCommittees && (
          <Section label="Active Committees">
            <LinkList items={profile.activeCommittees} />
          </Section>
        )}

        {profile.delegatedAuthority && (
          <Section label="Delegated Authority">
            <BulletList items={profile.delegatedAuthority} />
          </Section>
        )}

        {profile.strategicObjectives && (
          <Section label="Strategic Objectives">
            <BulletList items={profile.strategicObjectives} />
          </Section>
        )}

        {profile.constitutionalDuties && (
          <Section label="Constitutional Duties">
            <BulletList items={profile.constitutionalDuties} />
          </Section>
        )}

        {profile.functionalResponsibilities && (
          <Section label="Functional Responsibilities">
            <BulletList items={profile.functionalResponsibilities} />
          </Section>
        )}

        {profile.authorityMatrix && (
          <Section label="Authority Matrix">
            <dl className="space-y-3">
              {profile.authorityMatrix.map((row) => (
                <div
                  key={row.domain}
                  className="rounded border border-gold-subtle bg-ink-muted px-4 py-3"
                >
                  <dt className="text-sm font-medium text-cream">{row.domain}</dt>
                  <dd className="mt-1 text-sm text-cream-muted">{row.authority}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {profile.kpis && (
          <Section label="KPIs">
            <BulletList items={profile.kpis} />
          </Section>
        )}

        {profile.decisions && (
          <Section label="Decisions">
            <LinkList items={profile.decisions} />
          </Section>
        )}

        {profile.decisionRegistry && (
          <Section label="Decision Registry">
            <LinkList items={profile.decisionRegistry} />
          </Section>
        )}

        {profile.stewardshipReviews && (
          <Section label="Stewardship Reviews">
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
          </Section>
        )}

        {profile.annualStewardshipDeclaration && (
          <Section label="Annual Stewardship Declaration">
            <p className="text-cream-muted">
              {profile.annualStewardshipDeclaration.year} ·{" "}
              {profile.annualStewardshipDeclaration.status}
              {profile.annualStewardshipDeclaration.href && (
                <>
                  {" · "}
                  <Link
                    href={profile.annualStewardshipDeclaration.href}
                    className="text-gold hover:text-gold-light"
                  >
                    View declaration →
                  </Link>
                </>
              )}
            </p>
          </Section>
        )}

        {profile.knowledgeContributions && (
          <Section label="Knowledge Contributions">
            <LinkList items={profile.knowledgeContributions} />
          </Section>
        )}

        {profile.successionStatus && (
          <Section label="Succession Status">
            <p className="text-cream-muted">{profile.successionStatus}</p>
          </Section>
        )}

        {profile.membership && (
          <Section label="Membership">
            <BulletList items={profile.membership} />
          </Section>
        )}

        {profile.meetingRecords && (
          <Section label="Meeting Records">
            <LinkList items={profile.meetingRecords} />
          </Section>
        )}

        {profile.recommendations && (
          <Section label="Recommendations">
            <BulletList items={profile.recommendations} />
          </Section>
        )}

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
                <Link href="/library/constitution/article-iv" className="text-gold hover:text-gold-light">
                  {art}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/constitution/article-iv" className="text-gold hover:text-gold-light">
            Article IV →
          </Link>
          <Link href="/library/decisions" className="text-cream-muted hover:text-gold">
            Decision Records →
          </Link>
          <Link href="/library/stewardship" className="text-cream-muted hover:text-gold">
            Stewardship Portal →
          </Link>
        </div>
      </div>
    </>
  );
}
