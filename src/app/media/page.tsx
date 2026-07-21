import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { BRAND } from "@/lib/brand";
import { INSTITUTIONAL_CONTACT } from "@/lib/institutional/public-site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Media",
  description: "Corporate gallery — logos, brand assets, and approved imagery for Stankings Legacy Ltd.",
  path: "/media",
});

const ASSETS = [
  { title: "Primary logo", src: BRAND.logo.src, note: "Horizontal wordmark" },
  { title: "App icon", src: BRAND.icon.src, note: "Square mark" },
  { title: "Open Graph", src: BRAND.ogImage.src, note: "Social preview (JPEG)" },
];

export default function MediaPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Media"
      title="Brand & corporate gallery"
      description="Approved assets for accredited media and partners. Do not alter colours, proportions, or clear space."
      width="wide"
    >
      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-serif text-2xl text-cream">Logos & marks</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {ASSETS.map((asset) => (
              <figure
                key={asset.title}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="relative mb-4 flex min-h-32 items-center justify-center rounded-sm bg-ink px-4 py-5">
                  <Image
                    src={asset.src}
                    alt={asset.title}
                    width={asset.title === "Primary logo" ? 280 : asset.title === "App icon" ? 96 : 240}
                    height={asset.title === "Primary logo" ? 72 : asset.title === "App icon" ? 96 : 126}
                    className={
                      asset.title === "Primary logo"
                        ? "h-16 w-auto max-w-full object-contain sm:h-[4.5rem]"
                        : asset.title === "App icon"
                          ? "h-20 w-20 object-contain"
                          : "h-auto w-full max-w-[220px] object-contain"
                    }
                  />
                </div>
                <figcaption>
                  <p className="font-serif text-lg text-cream">{asset.title}</p>
                  <p className="text-xs text-cream-muted">{asset.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-cream">Screenshots & photography</h2>
          <p className="text-cream-muted">
            Product screenshots are published by each operating company on its own domain. Corporate
            photography packs are provided to accredited media on request.
          </p>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-2 font-serif text-xl text-cream">Brand downloads</h2>
          <p className="text-sm text-cream-muted">
            Request high-resolution packages from{" "}
            <a href={`mailto:${INSTITUTIONAL_CONTACT.press}`} className="text-gold">
              {INSTITUTIONAL_CONTACT.press}
            </a>
            . See also{" "}
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
