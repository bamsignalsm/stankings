import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHero, DocumentCard, LegalNotice } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Brand Center",
  description:
    "Central brand asset repository for Stankings Group — logos, colors, fonts, and usage rules.",
  path: "/brand",
});

const COLORS = [
  { name: "Obsidian Black", hex: "#070707" },
  { name: "Legacy Gold", hex: "#D4A64A" },
  { name: "Warm Ivory", hex: "#F4EFE6" },
  { name: "Deep Bronze", hex: "#6B4423" },
  { name: "Forest Green", hex: "#1B4D3E" },
  { name: "Burgundy", hex: "#6B1F2A" },
  { name: "Royal Blue", hex: "#1E3A8A" },
];

export default function BrandPage() {
  return (
    <div className="pt-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Brand Center",
          url: "https://stankings.com/brand",
        }}
      />
      <SectionHero
        eyebrow="Brand Center"
        title="Institutional brand assets"
        description="Approved logos, colors, and typography for accredited use. Do not alter proportions, clear space, or Legacy Gold."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brand" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <LegalNotice>
            Brand assets originate at HQ. Product companies may use marks for accurate product
            identification. Press and partners: request packs via press@stankings.com.
          </LegalNotice>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Logos & icons</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: "Primary logo", src: BRAND.logo.src },
                { title: "Icon", src: BRAND.icon.src },
                { title: "Open Graph", src: BRAND.ogImage.src },
              ].map((asset) => (
                <figure
                  key={asset.title}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <div className="mb-4 flex h-28 items-center justify-center rounded-sm bg-ink">
                    <Image
                      src={asset.src}
                      alt={asset.title}
                      width={200}
                      height={80}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>
                  <figcaption className="font-serif text-lg text-cream">{asset.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Brand colors</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COLORS.map((c) => (
                <div
                  key={c.hex}
                  className="overflow-hidden rounded-lg border border-gold-subtle"
                >
                  <div className="h-16" style={{ backgroundColor: c.hex }} />
                  <div className="bg-ink-muted p-3">
                    <p className="text-sm text-cream">{c.name}</p>
                    <p className="font-mono text-xs text-cream-muted">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Fonts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <p className="font-serif text-2xl text-cream">Cormorant Garamond</p>
                <p className="mt-2 text-sm text-cream-muted">Headings and institutional titles</p>
              </div>
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <p className="text-2xl text-cream">DM Sans</p>
                <p className="mt-2 text-sm text-cream-muted">Body and interface text</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Usage rules</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              <li>◆ Maintain clear space around the logo equal to the height of the mark’s gold element.</li>
              <li>◆ Do not recolor Legacy Gold or stretch the wordmark.</li>
              <li>◆ Do not imply endorsement without written permission.</li>
              <li>◆ Prefer WebP assets for web; request print packages from Press.</li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DocumentCard
              type="Marketing"
              title="Press assets"
              summary="Boilerplate and media contacts."
              href="/press"
            />
            <DocumentCard
              type="Downloads"
              title="Download Center"
              summary="Press kit and brand package requests."
              href="/downloads"
            />
          </div>

          <p className="text-sm text-cream-muted">
            Also see{" "}
            <Link href="/media" className="text-gold">
              Media
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
