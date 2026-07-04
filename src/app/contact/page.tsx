import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { INSTITUTIONAL_CONTACT } from "@/lib/institutional/public-site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact Stankings Group — general, support, legal, press, and careers.",
  path: "/contact",
});

const CONTACT_CHANNELS = [
  { label: "General", email: INSTITUTIONAL_CONTACT.general, href: "/support/general" },
  { label: "Support", email: INSTITUTIONAL_CONTACT.support, href: "/support" },
  { label: "Trust & Privacy", email: INSTITUTIONAL_CONTACT.trust, href: "/trust" },
  { label: "Legal", email: INSTITUTIONAL_CONTACT.legal, href: "/legal" },
  { label: "Press & Media", email: INSTITUTIONAL_CONTACT.press, href: "/media" },
  { label: "Careers", email: INSTITUTIONAL_CONTACT.careers, href: "/careers" },
  { label: "Security", email: INSTITUTIONAL_CONTACT.security, href: "/trust/responsible-disclosure" },
  { label: "Accessibility", email: INSTITUTIONAL_CONTACT.accessibility, href: "/legal/accessibility" },
];

export default function ContactPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Contact"
      title="Get in touch"
      description="Route your enquiry to the right team. Product issues should go to product support — not this general inbox."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => (
          <div
            key={channel.label}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
          >
            <p className="text-xs uppercase tracking-widest text-gold">{channel.label}</p>
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
        <p className="text-cream-muted">Lagos, Nigeria</p>
        <p className="mt-2 text-sm text-cream-muted">
          Stankings Group Ltd · stankings.com
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
