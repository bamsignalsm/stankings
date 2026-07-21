import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { COMPANIES, LIVE_PLATFORMS, PILLARS, SITE } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Stankings Legacy Ltd — an enduring African institution building trusted businesses, technologies, education, and social impact.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <InstitutionalPageShell
      eyebrow="About Stankings Legacy Ltd"
      title="An enduring institution"
      description={SITE.brandPromise}
      width="wide"
    >
      <div className="space-y-12">
        <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl text-cream/90 italic">
          &ldquo;{SITE.motto}&rdquo;
        </blockquote>
        <p className="text-cream-muted">— {SITE.founder}, Founder</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 text-xs font-semibold tracking-widest text-gold uppercase">
              Mission
            </h2>
            <p className="text-cream-muted">{SITE.mission}</p>
          </div>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 text-xs font-semibold tracking-widest text-gold uppercase">
              Vision
            </h2>
            <p className="text-cream-muted">{SITE.vision}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-2xl text-cream">Philosophy</h2>
          <ul className="space-y-2">
            {SITE.philosophy.map((item) => (
              <li key={item} className="flex gap-2 text-cream-muted">
                <span className="text-gold">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-2xl text-cream">Institutional pillars</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <h3 className="font-serif text-lg text-cream">{pillar.title}</h3>
                <p className="mt-1 text-xs tracking-widest text-gold uppercase">{pillar.subtitle}</p>
                <p className="mt-2 text-sm text-cream-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-2xl text-cream">Live platforms</h2>
          <p className="mb-4 text-sm text-cream-muted">
            Each platform operates independently — separate runtime, database, and authentication.
          </p>
          <div className="flex flex-wrap gap-3">
            {LIVE_PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-gold-subtle px-4 py-2 text-sm text-cream transition hover:border-gold/40"
              >
                {p.name} ↗
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-2xl text-cream">Centers of Excellence</h2>
          <p className="mb-4 text-sm text-cream-muted">
            {COMPANIES.length} companies across commerce, education, and society.
          </p>
          <Link href="/companies" className="text-gold hover:text-gold-light">
            View all companies →
          </Link>
        </div>
      </div>
    </InstitutionalPageShell>
  );
}
