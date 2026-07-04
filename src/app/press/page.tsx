import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { BRAND, SITE_URL } from "@/lib/brand";
import { LIVE_PLATFORMS, SITE } from "@/lib/institutional/public-site";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description: "Press kit, boilerplate, media contacts, and brand resources for Stankings Group.",
  path: "/press",
});

export default function PressPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Press"
      title="Media resources"
      description="Official information for journalists and institutional partners. High-resolution assets available on request."
      width="wide"
    >
      <div className="space-y-10">
        <div className="rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <h2 className="mb-2 font-serif text-xl text-cream">Media contact</h2>
          <a
            href={`mailto:${CONTACTS.press}`}
            className="font-serif text-2xl text-gold hover:text-gold-light"
          >
            {CONTACTS.press}
          </a>
        </div>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Company boilerplate</h2>
          <p className="rounded-lg border border-gold-subtle bg-ink-muted p-6 leading-relaxed text-cream-muted">
            {SITE.name} is an African institutional group building trusted businesses,
            transformative technologies, educational institutions, and lasting social impact. Live
            platforms include {LIVE_PLATFORMS.map((p) => p.name).join(", ")}. Founded by{" "}
            {SITE.founder}. Headquarters: Lagos, Nigeria. Website: {SITE_URL}.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl text-cream">Press kit</h2>
          <ul className="space-y-2 text-cream-muted">
            <li>Logo and icon set: /images/logo.webp, /images/icon-512.webp</li>
            <li>
              Open Graph image: {BRAND.ogImage.src} ({BRAND.ogImage.width}×{BRAND.ogImage.height})
            </li>
            <li>
              Full brand pack: request via{" "}
              <a href={`mailto:${CONTACTS.press}`} className="text-gold">
                {CONTACTS.press}
              </a>
            </li>
          </ul>
        </section>

        <section className="flex flex-wrap gap-4 text-sm">
          <Link href="/media" className="text-gold hover:text-gold-light">
            Media gallery →
          </Link>
          <Link href="/about" className="text-gold hover:text-gold-light">
            About →
          </Link>
          <Link href="/leadership" className="text-gold hover:text-gold-light">
            Leadership →
          </Link>
          <Link href="/status" className="text-gold hover:text-gold-light">
            System Status →
          </Link>
        </section>
      </div>
    </InstitutionalPageShell>
  );
}
