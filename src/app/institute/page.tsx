import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "The Stankings Institute",
  description:
    "Leadership and custodian development for Stankings Legacy Ltd — preparing generations before succession requires it.",
  path: "/institute",
});

export default function InstitutePage() {
  return (
    <InstitutionalPageShell
      eyebrow="The Stankings Institute"
      title="Leaders as custodians"
      description="The Institute develops the people who will steward Stankings Legacy Ltd across generations — through curriculum, research, and the Custodian Programme."
      width="wide"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">
            Leadership is stewardship. The Institute ensures knowledge, ethics, and constitutional
            standards are taught and practiced — so the institution does not depend on any single
            individual.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Custodian Programme",
              body: "Formation tracks for future office holders and stewards.",
            },
            {
              title: "Leadership curriculum",
              body: "Standards aligned with the Leadership Stewardship Framework and Constitution.",
            },
            {
              title: "Institutional research",
              body: "Knowledge preserved in The Library and applied in governance.",
            },
            {
              title: "Succession discipline",
              body: "Preparation before vacancy — not improvisation after crisis.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <h3 className="font-serif text-lg text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{item.body}</p>
            </div>
          ))}
        </section>

        <p className="text-sm text-cream-muted">
          Company profile:{" "}
          <Link href="/companies/stankings-institute" className="text-gold hover:text-gold-light">
            The Stankings Institute
          </Link>
          . Governance overview:{" "}
          <Link href="/leadership" className="text-gold hover:text-gold-light">
            Leadership
          </Link>
          .
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
