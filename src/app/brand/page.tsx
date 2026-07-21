import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHero, DocumentCard, LegalNotice } from "@/components/ui";
import {
  BRAND_ASSETS,
  BRAND_COLORS,
  BRAND_FONTS,
  BRAND_USAGE_RULES,
} from "@/lib/shared/branding/registry";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Brand Center",
  description:
    "Central brand asset repository for Stankings Legacy Ltd — logos, colors, fonts, and usage rules.",
  path: "/brand",
});

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
            identification. Press and partners: request packs via {CONTACTS.press}.
          </LegalNotice>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Logos & icons</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {BRAND_ASSETS.filter((a) =>
                ["logo", "icon", "og"].includes(a.id),
              ).map((asset) => (
                <figure
                  key={asset.id}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <div className="mb-4 flex min-h-28 items-center justify-center rounded-sm bg-ink px-4 py-5">
                    <Image
                      src={asset.src}
                      alt={asset.title}
                      width={asset.id === "logo" ? 280 : asset.id === "icon" ? 96 : 240}
                      height={asset.id === "logo" ? 72 : asset.id === "icon" ? 96 : 126}
                      className={
                        asset.id === "logo"
                          ? "h-14 w-auto max-w-full object-contain sm:h-16"
                          : asset.id === "icon"
                            ? "h-20 w-20 object-contain"
                            : "h-auto w-full max-w-[220px] object-contain"
                      }
                    />
                  </div>
                  <figcaption className="font-serif text-lg text-cream">{asset.title}</figcaption>
                  <p className="text-xs text-cream-muted">{asset.note}</p>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Brand colors</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {BRAND_COLORS.map((c) => (
                <div
                  key={c.id}
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
              {BRAND_FONTS.map((f) => (
                <div
                  key={f.id}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
                >
                  <p
                    className={`text-2xl text-cream ${f.id === "serif" ? "font-serif" : ""}`}
                  >
                    {f.name}
                  </p>
                  <p className="mt-2 text-sm text-cream-muted">{f.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Usage rules</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {BRAND_USAGE_RULES.map((rule) => (
                <li key={rule}>◆ {rule}</li>
              ))}
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
