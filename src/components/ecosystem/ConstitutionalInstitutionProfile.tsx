import Link from "next/link";
import type { ConstitutionalEcosystemProfile } from "@/lib/institutional-ecosystem/types";
import {
  getConstitutionalEcosystemProfile,
  CONSTITUTIONAL_ECOSYSTEM_PROFILES,
} from "@/lib/institutional-ecosystem";
import { getEcosystemInstitution } from "@/lib/ecosystem/map";

function TagList({ items, emptyLabel }: { items: string[]; emptyLabel?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-cream-muted">{emptyLabel ?? "None recorded."}</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-cream-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">{title}</h2>
      {children}
    </section>
  );
}

interface ConstitutionalInstitutionProfileProps {
  profile: ConstitutionalEcosystemProfile;
}

export function ConstitutionalInstitutionProfile({ profile }: ConstitutionalInstitutionProfileProps) {
  const strengthened = profile.strengthens
    .map((slug) => getConstitutionalEcosystemProfile(slug))
    .filter((p): p is ConstitutionalEcosystemProfile => p !== undefined);
  const dependencies = profile.dependsOn
    .map((slug) => getConstitutionalEcosystemProfile(slug))
    .filter((p): p is ConstitutionalEcosystemProfile => p !== undefined);
  const ecosystemInst = getEcosystemInstitution(profile.slug);

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/ecosystem-architecture"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Ecosystem Architecture
          </Link>
          <div className="flex flex-wrap items-start gap-4">
            <span className="text-4xl" style={{ color: profile.color }} aria-hidden>
              {profile.icon}
            </span>
            <div className="flex-1">
              <p className="mb-1 text-xs uppercase tracking-wider text-gold">{profile.excellence}</p>
              <h1 className="mb-2 font-serif text-3xl font-semibold text-cream md:text-4xl">
                {profile.name}
              </h1>
              <p className="text-sm text-cream-muted">{profile.strategicRole}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    profile.governanceStatus === "approved"
                      ? "border-forest/40 text-forest"
                      : "border-gold/40 text-gold"
                  }`}
                >
                  Governance: {profile.governanceStatus}
                </span>
                {profile.isLive && (
                  <span className="rounded-full border border-forest/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-forest">
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <ProfileSection title="Constitutional Purpose">
          <p className="text-cream-muted leading-relaxed">{profile.constitutionalPurpose}</p>
        </ProfileSection>

        {ecosystemInst && (
          <ProfileSection title="Mission">
            <p className="text-cream-muted">{ecosystemInst.mission}</p>
          </ProfileSection>
        )}

        <ProfileSection title="Primary Customers">
          <TagList items={profile.primaryCustomers} emptyLabel="To be documented in IIS." />
        </ProfileSection>

        <ProfileSection title="Core Capabilities">
          <TagList items={profile.coreCapabilities} />
        </ProfileSection>

        <ProfileSection title="Shared Platforms Used">
          <TagList items={profile.sharedPlatformsUsed} />
        </ProfileSection>

        <ProfileSection title="Trust Dependencies">
          <TagList items={profile.trustDependencies} emptyLabel="No direct trust platform dependencies." />
        </ProfileSection>

        <ProfileSection title="AI Services Used">
          <TagList items={profile.aiServicesUsed} emptyLabel="No shared AI services recorded." />
        </ProfileSection>

        <ProfileSection title="APIs Consumed">
          <TagList items={profile.apisConsumed} emptyLabel="No shared APIs consumed." />
        </ProfileSection>

        <ProfileSection title="APIs Exposed">
          <TagList items={profile.apisExposed} emptyLabel="No public APIs exposed yet." />
        </ProfileSection>

        <ProfileSection title="Shared Capabilities Provided">
          <TagList items={profile.sharedCapabilitiesProvided} />
        </ProfileSection>

        <ProfileSection title="Knowledge Objects">
          <ul className="space-y-2">
            {profile.knowledgeObjects.map((ko) => (
              <li key={ko.title}>
                {ko.href ? (
                  <Link href={ko.href} className="text-sm text-gold hover:text-gold-light">
                    {ko.title}
                  </Link>
                ) : (
                  <span className="text-sm text-cream-muted">{ko.title}</span>
                )}
              </li>
            ))}
          </ul>
        </ProfileSection>

        <ProfileSection title="Constitution Articles">
          <ul className="space-y-1 text-sm text-cream-muted">
            {profile.constitutionArticles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </ProfileSection>

        <ProfileSection title="Canon References">
          <div className="flex flex-wrap gap-2">
            {profile.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-gold hover:border-gold/40"
              >
                {ref}
              </Link>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Ecosystem Relationships — Strengthens">
          {strengthened.length === 0 ? (
            <p className="text-sm text-cream-muted">No direct strengthening relationships recorded.</p>
          ) : (
            <ul className="space-y-2">
              {strengthened.map((inst) => (
                <li key={inst.slug}>
                  <Link
                    href={`/library/ecosystem-architecture/${inst.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gold-subtle bg-ink-muted p-3 transition hover:border-gold/40"
                  >
                    <span style={{ color: inst.color }} aria-hidden>
                      {inst.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-cream">{inst.name}</p>
                      <p className="text-xs text-gold">{inst.excellence}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ProfileSection>

        <ProfileSection title="Ecosystem Dependencies">
          {dependencies.length === 0 ? (
            <p className="text-sm text-cream-muted">No ecosystem dependencies recorded.</p>
          ) : (
            <ul className="space-y-2">
              {dependencies.map((inst) => (
                <li key={inst.slug}>
                  <Link
                    href={`/library/ecosystem-architecture/${inst.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gold-subtle bg-ink-muted p-3 transition hover:border-gold/40"
                  >
                    <span style={{ color: inst.color }} aria-hidden>
                      {inst.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-cream">{inst.name}</p>
                      <p className="text-xs text-gold">{inst.excellence}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ProfileSection>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link
            href={`/library/institutional-identity/${profile.slug}`}
            className="text-gold hover:text-gold-light"
          >
            Institutional Identity Statement →
          </Link>
          <Link href={`/library/ecosystem/${profile.slug}`} className="text-gold hover:text-gold-light">
            Ecosystem Map Profile →
          </Link>
          <Link href="/library/constitution/article-ix" className="text-gold hover:text-gold-light">
            Article IX →
          </Link>
        </div>
      </div>
    </>
  );
}

export function getAllConstitutionalProfileSlugs() {
  return CONSTITUTIONAL_ECOSYSTEM_PROFILES.map((p) => p.slug);
}
