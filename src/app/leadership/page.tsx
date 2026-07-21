import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { getPublicLeadership } from "@/lib/institutional/public-site";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Leadership",
  description:
    "Executive leadership, governance structure, and corporate values of Stankings Legacy Ltd.",
  path: "/leadership",
});

export default function LeadershipPage() {
  const profiles = getPublicLeadership();

  return (
    <InstitutionalPageShell
      eyebrow="Leadership"
      title="Stewardship, not personality"
      description="Leadership at Stankings Legacy Ltd is constitutional stewardship. Authority is responsibility — every leader is entrusted to preserve and strengthen the institution for future generations."
      width="wide"
    >
      <div className="space-y-12">
        <section>
          <h2 className="mb-4 font-serif text-2xl text-cream">Founder</h2>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <p className="text-xs tracking-widest text-gold uppercase">Founder & Editor-in-Chief</p>
            <h3 className="mt-1 font-serif text-2xl text-cream">{SITE.founder}</h3>
            <p className="mt-3 text-sm text-cream-muted">
              Constitutional architecture, institutional vision, and custodian formation. Leadership
              profiles and stewardship records are maintained under Article V standards.
            </p>
            <Link
              href="/leadership/stanley-ukeje"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
            >
              View profile →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl text-cream">Executive office</h2>
          <p className="mb-4 text-cream-muted">
            Executive leadership implements strategy within delegated authority and the Reserved
            Powers Register. Offices form under constitutional appointment discipline.
          </p>
          <div className="space-y-4">
            {profiles.map((profile) => (
              <article
                key={profile.slug}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <p className="text-xs tracking-widest text-gold uppercase">
                  {profile.constitutionalOffice}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-cream">{profile.name}</h3>
                <p className="mt-2 text-sm text-cream-muted capitalize">Status: {profile.status}</p>
                <ul className="mt-4 space-y-1">
                  {profile.stewardshipResponsibilities.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-cream-muted">
                      <span className="text-gold">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/leadership/${profile.slug}`}
                  className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
                >
                  View profile →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 font-serif text-xl text-cream">Company governance</h2>
            <p className="text-sm text-cream-muted">
              Operating companies remain independent. Group governance sets constitutional
              standards; day-to-day product operations stay with each company.
            </p>
            <Link href="/companies" className="mt-3 inline-block text-sm text-gold">
              Companies →
            </Link>
          </div>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 font-serif text-xl text-cream">Board structure</h2>
            <p className="text-sm text-cream-muted">
              Board formation follows constitutional standards. Reserved powers cannot be delegated
              without explicit approval.
            </p>
            <Link href="/constitution" className="mt-3 inline-block text-sm text-gold">
              Constitution →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl text-cream">Corporate values</h2>
          <ul className="space-y-2">
            {SITE.philosophy.map((item) => (
              <li key={item} className="flex gap-2 text-cream-muted">
                <span className="text-gold">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <h2 className="mb-2 font-serif text-xl text-cream">Full governance records</h2>
          <p className="text-sm text-cream-muted">
            Competency matrices and stewardship declarations are available to verified members.{" "}
            <Link href={USER_LOGIN_PATH} className="text-gold">
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </InstitutionalPageShell>
  );
}
