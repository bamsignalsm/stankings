import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { HQ_SITE } from "@/lib/shared/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact Stankings Legacy Ltd — general, support, legal, press, and careers.",
  path: "/contact",
});

const CONTACT_CHANNELS = [
  { label: "General", email: CONTACTS.hello, href: "/support/general" },
  { label: "Office", email: CONTACTS.office, href: "/support/hq" },
  { label: "Support", email: CONTACTS.support, href: "/support" },
  { label: "Trust & Privacy", email: CONTACTS.trust, href: "/trust" },
  { label: "Legal", email: CONTACTS.legal, href: "/legal" },
  { label: "Press", email: CONTACTS.press, href: "/press" },
  { label: "Media", email: CONTACTS.media, href: "/media" },
  { label: "Careers", email: CONTACTS.careers, href: "/career" },
  { label: "Developers", email: CONTACTS.developers, href: "/developer" },
  { label: "Foundation", email: CONTACTS.foundation, href: "/foundation" },
  { label: "Security", email: CONTACTS.security, href: "/security" },
  { label: "Accessibility", email: CONTACTS.accessibility, href: "/legal/accessibility" },
];

export default function ContactPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Contact"
      title="Get in touch"
      description="Route your enquiry to the right team. Product issues should go to product support — not the general inbox."
      width="wide"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACT_CHANNELS.map((channel) => (
          <div
            key={channel.label}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
          >
            <p className="text-xs tracking-widest text-gold uppercase">{channel.label}</p>
            <a
              href={`mailto:${channel.email}`}
              className="mt-2 block font-serif text-lg text-cream hover:text-gold"
            >
              {channel.email}
            </a>
            <Link href={channel.href} className="mt-3 inline-block text-sm text-gold">
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
        <h2 className="mb-2 font-serif text-xl text-cream">Headquarters</h2>
        <p className="text-cream-muted">Abia State, Nigeria</p>
        <p className="mt-2 text-sm text-cream-muted">
          {HQ_SITE.name} Ltd · {HQ_SITE.domain}
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
