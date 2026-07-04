import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Stankings Foundation",
  description:
    "Community and social impact institution of Stankings Group — service as purpose, not marketing.",
  path: "/foundation",
});

export default function FoundationPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Stankings Foundation"
      title="Impact as institutional purpose"
      description="The Foundation exists because serving people is part of why Stankings Group exists — measured in lasting community outcomes, not campaigns."
      width="wide"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">Mandate</h2>
          <p className="leading-relaxed text-cream-muted">
            Stankings Foundation directs institutional resources toward community development,
            youth empowerment, and programmes that strengthen the societies from which the Group
            draws its strength. Impact is governed with the same seriousness as commercial
            operations.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Community development", body: "Programmes that improve local capability and resilience." },
            { title: "Youth & education", body: "Pathways aligned with Hannahkings Education and the Institute." },
            { title: "Stewardship", body: "Impact reviewed in annual stewardship processes — not vanity metrics." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <h3 className="font-serif text-lg text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{item.body}</p>
            </div>
          ))}
        </section>

        <p className="text-sm text-cream-muted">
          Company profile:{" "}
          <Link href="/companies/stankings-foundation" className="text-gold hover:text-gold-light">
            Stankings Foundation
          </Link>
          . Enquiries:{" "}
          <a href="mailto:hello@stankings.com" className="text-gold hover:text-gold-light">
            hello@stankings.com
          </a>
          .
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
