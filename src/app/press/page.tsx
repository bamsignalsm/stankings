import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { BRAND, SITE_URL } from "@/lib/brand";
import { INSTITUTIONAL_CONTACT, SITE } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Brand assets, boilerplate, and press resources for Stankings Group.",
};

export default function PressKitPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Press Kit"
      title="Brand & press resources"
      description="Assets and copy for accredited media. Request high-resolution files via press@stankings.com."
    >
      <div className="space-y-8">
        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Quick facts</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4 border-b border-gold-subtle pb-3">
              <dt className="w-32 shrink-0 text-gold">Name</dt>
              <dd className="text-cream-muted">{SITE.name}</dd>
            </div>
            <div className="flex gap-4 border-b border-gold-subtle pb-3">
              <dt className="w-32 shrink-0 text-gold">Website</dt>
              <dd className="text-cream-muted">{SITE_URL}</dd>
            </div>
            <div className="flex gap-4 border-b border-gold-subtle pb-3">
              <dt className="w-32 shrink-0 text-gold">Founder</dt>
              <dd className="text-cream-muted">{SITE.founder}</dd>
            </div>
            <div className="flex gap-4 border-b border-gold-subtle pb-3">
              <dt className="w-32 shrink-0 text-gold">HQ</dt>
              <dd className="text-cream-muted">Lagos, Nigeria</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Boilerplate</h2>
          <p className="rounded-lg border border-gold-subtle bg-ink-muted p-6 text-cream-muted">
            {SITE.motto} {SITE.name} builds trusted institutions across marketplace, relationships,
            finance, education, and philanthropy — proudly African, built for generations.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Logo & imagery</h2>
          <ul className="space-y-2 text-cream-muted">
            <li>OG image: {BRAND.ogImage.src}</li>
            <li>Icon set: /images/icon-32.webp, icon-512.webp</li>
          </ul>
          <p className="mt-4 text-sm text-cream-muted">
            High-resolution brand pack:{" "}
            <a href={`mailto:${INSTITUTIONAL_CONTACT.press}`} className="text-gold">
              {INSTITUTIONAL_CONTACT.press}
            </a>
          </p>
        </section>

        <Link href="/media" className="text-gold hover:text-gold-light">
          ← Media center
        </Link>
      </div>
    </InstitutionalPageShell>
  );
}
