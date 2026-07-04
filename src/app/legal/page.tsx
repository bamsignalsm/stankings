import type { Metadata } from "next";
import Link from "next/link";
import {
  InstitutionalCardGrid,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { LEGAL_DOCUMENTS } from "@/lib/institutional/public-site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Legal Center",
  description: "Privacy policies, terms, and product-specific legal resources.",
  path: "/legal",
});

const INSTITUTIONAL = LEGAL_DOCUMENTS.filter((d) => d.product === "stankings");
const PRODUCT = LEGAL_DOCUMENTS.filter((d) => d.product !== "stankings");

export default function LegalCenterPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Legal Center"
      title="Legal resources"
      description="Institutional policies for stankings.com and references to product-specific legal pages on each live platform."
    >
      <h2 className="mb-4 font-serif text-2xl text-cream">Stankings Group</h2>
      <InstitutionalCardGrid
        items={INSTITUTIONAL.map((d) => ({
          href: `/legal/${d.slug}`,
          title: d.title,
          summary: d.summary,
        }))}
      />

      <h2 className="mb-4 mt-12 font-serif text-2xl text-cream">Product policies</h2>
      <p className="mb-6 text-sm text-cream-muted">
        Each product hosts its own legal pages. Stankings Group references them here for
        convenience — authoritative copies remain on product domains.
      </p>
      <InstitutionalCardGrid
        items={PRODUCT.map((d) => ({
          href: d.externalUrl ?? `/legal/${d.slug}`,
          title: d.title,
          summary: d.summary,
          external: Boolean(d.externalUrl),
        }))}
      />

      <p className="mt-12 text-sm text-cream-muted">
        Questions:{" "}
        <Link href="mailto:legal@stankings.com" className="text-gold hover:text-gold-light">
          legal@stankings.com
        </Link>
      </p>
    </InstitutionalPageShell>
  );
}
