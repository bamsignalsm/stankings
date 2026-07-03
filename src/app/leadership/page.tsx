import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { getPublicLeadership } from "@/lib/institutional/public-site";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Constitutional stewardship and leadership of Stankings Group.",
};

export default function LeadershipPage() {
  const profiles = getPublicLeadership();

  return (
    <InstitutionalPageShell
      eyebrow="Leadership"
      title="Stewardship, not personality"
      description="Leadership at Stankings Group is constitutional stewardship. Authority is responsibility — every leader is entrusted to preserve and strengthen the institution for future generations."
    >
      <div className="space-y-6">
        {profiles.map((profile) => (
          <article
            key={profile.slug}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
          >
            <p className="text-xs uppercase tracking-widest text-gold">
              {profile.constitutionalOffice}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-cream">
              {profile.name}
            </h2>
            <p className="mt-3 text-sm capitalize text-cream-muted">
              Status: {profile.status}
            </p>
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

      <div className="mt-12 rounded-lg border border-gold/30 bg-gold-subtle p-6">
        <h2 className="mb-2 font-serif text-xl text-cream">Full governance records</h2>
        <p className="text-sm text-cream-muted">
          Competency matrices, stewardship declarations, and constitutional evaluations are
          available to verified members in{" "}
          <Link href="/library/leadership" className="text-gold">
            The Library
          </Link>
          .{" "}
          <Link href={USER_LOGIN_PATH} className="text-gold">
            Sign in
          </Link>{" "}
          for member access.
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
