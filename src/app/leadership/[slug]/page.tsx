import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { getLeadershipProfile } from "@/lib/leadership/profiles";
import { getPublicLeadership } from "@/lib/institutional/public-site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublicLeadership().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  if (!profile) return { title: "Leadership" };
  return {
    title: profile.name,
    description: `${profile.constitutionalOffice} — Stankings Group`,
  };
}

export default async function LeadershipProfilePublicPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  const isPublic = getPublicLeadership().some((p) => p.slug === slug);
  if (!profile || !isPublic) notFound();

  return (
    <InstitutionalPageShell
      eyebrow="Leadership"
      title={profile.name}
      description={profile.constitutionalOffice}
      backHref="/leadership"
      backLabel="Leadership"
    >
      <div className="space-y-8">
        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Stewardship responsibilities</h2>
          <ul className="space-y-2">
            {profile.stewardshipResponsibilities.map((item) => (
              <li key={item} className="flex gap-2 text-cream-muted">
                <span className="text-gold">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {profile.delegatedAuthority.length > 0 ? (
          <section>
            <h2 className="mb-3 font-serif text-xl text-cream">Delegated authority</h2>
            <ul className="space-y-2">
              {profile.delegatedAuthority.map((item) => (
                <li key={item} className="text-sm text-cream-muted">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-2 font-serif text-lg text-cream">Successor development</h2>
          <p className="text-sm text-cream-muted">{profile.successorDevelopment.detail}</p>
        </section>

        <p className="text-sm text-cream-muted">
          Full constitutional records:{" "}
          <Link href="/members" className="text-gold">
            Member access
          </Link>
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
