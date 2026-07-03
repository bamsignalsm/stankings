import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { INSTITUTIONAL_CONTACT, LIVE_PLATFORMS, SITE } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "Media",
  description: "Media inquiries and institutional communications from Stankings Group.",
};

export default function MediaPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Media"
      title="Media & communications"
      description="Official information for journalists, analysts, and institutional partners."
    >
      <div className="space-y-8">
        <div className="rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <h2 className="mb-2 font-serif text-xl text-cream">Press contact</h2>
          <a
            href={`mailto:${INSTITUTIONAL_CONTACT.press}`}
            className="font-serif text-2xl text-gold hover:text-gold-light"
          >
            {INSTITUTIONAL_CONTACT.press}
          </a>
        </div>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Boilerplate</h2>
          <p className="leading-relaxed text-cream-muted">
            {SITE.name} is one of Africa&apos;s emerging institutional groups — building trusted
            businesses, transformative technologies, and lasting social impact. Live platforms
            include {LIVE_PLATFORMS.map((p) => p.name).join(", ")}. Founded by {SITE.founder}.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/press" className="text-gold hover:text-gold-light">
                Press Kit →
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gold hover:text-gold-light">
                About Stankings Group →
              </Link>
            </li>
            <li>
              <Link href="/leadership" className="text-gold hover:text-gold-light">
                Leadership →
              </Link>
            </li>
            <li>
              <Link href="/status" className="text-gold hover:text-gold-light">
                System Status →
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </InstitutionalPageShell>
  );
}
