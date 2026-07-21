import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partners",
  description:
    "How institutions, providers, and enterprises engage with Stankings Legacy Ltd.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Partners"
      title="Partnership with institutional discipline"
      description="Stankings Legacy Ltd engages partners who strengthen trust, capability, and long-term service — not short-term distribution alone."
      width="wide"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">How we partner</h2>
          <p className="leading-relaxed text-cream-muted">
            Partnerships are evaluated for institutional strength, principles alignment, and
            ecosystem impact. Financial performance alone never justifies weakening trust or
            governance standards.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Technology & infrastructure",
              body: "Providers and platforms that meet security, reliability, and compliance expectations for operating companies.",
            },
            {
              title: "Enterprise & institutions",
              body: "Organizations seeking marketplace, payments, or relationship infrastructure through Group companies.",
            },
            {
              title: "Community & education",
              body: "Programmes aligned with the Foundation and Institute mandates.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <h3 className="font-serif text-lg text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-2 font-serif text-xl text-cream">Engage</h2>
          <p className="text-sm text-cream-muted">
            Partnership enquiries:{" "}
            <a href={`mailto:${CONTACTS.hello}`} className="text-gold hover:text-gold-light">
              {CONTACTS.hello}
            </a>
            . Product-specific integrations should contact the relevant company support channel
            via{" "}
            <Link href="/support" className="text-gold hover:text-gold-light">
              Support
            </Link>
            .
          </p>
        </section>
      </div>
    </InstitutionalPageShell>
  );
}
