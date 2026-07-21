import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Investors",
  description:
    "Institutional approach to capital, stewardship reporting, and long-term value at Stankings Legacy Ltd.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Investors"
      title="Capital in service of institutions"
      description="Stankings Legacy Ltd treats capital as a means to build enduring institutions — not as an end that overrides trust, governance, or generational responsibility."
      width="wide"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">Investment philosophy</h2>
          <p className="leading-relaxed text-cream-muted">
            Material investments, partnerships, and growth initiatives are subject to institutional
            assessments — including purpose, trust impact, ecosystem impact, and generational
            review — before financial modelling alone determines direction.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Stewardship reporting",
              body: "Annual stewardship reporting measures institutional health beyond financial performance, including trust, knowledge, and continuity.",
            },
            {
              title: "Governance",
              body: "The Group Constitution and Canons bind leadership. Reserved powers and decision registers preserve accountability.",
            },
            {
              title: "Operating companies",
              body: "Yike, BamSignal, BayRight and other companies operate independently. HQ does not co-mingle product runtimes or customer funds.",
            },
            {
              title: "Transparency",
              body: "Public trust, legal, and status resources are published on stankings.com. Detailed financial disclosures follow applicable law and governance calendars.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <h3 className="font-serif text-lg text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{item.body}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">Contact</h2>
          <p className="text-cream-muted">
            Institutional and capital enquiries:{" "}
            <a href={`mailto:${CONTACTS.hello}`} className="text-gold hover:text-gold-light">
              {CONTACTS.hello}
            </a>
            . Media:{" "}
            <Link href="/press" className="text-gold hover:text-gold-light">
              Press
            </Link>
            .
          </p>
        </section>
      </div>
    </InstitutionalPageShell>
  );
}
