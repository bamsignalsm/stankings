import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero, DocumentCard, EmptyStateUi, LegalNotice } from "@/components/ui";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { DOWNLOAD_REGISTRY, listAvailableDownloads } from "@/lib/shared/downloads/registry";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Download Center",
  description:
    "Reusable downloads for Stankings Legacy Ltd — company profile, press kit, brand assets, and mobile distribution notes.",
  path: "/downloads",
});

export default function DownloadsPage() {
  const available = listAvailableDownloads();
  const mobile = DOWNLOAD_REGISTRY.filter((d) => d.kind === "mobile");

  return (
    <div className="pt-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Download Center",
          url: "https://stankings.com/downloads",
        }}
      />
      <SectionHero
        eyebrow="Download Center"
        title="Institutional downloads"
        description="HQ-origin resources for partners, press, and product teams. Mobile binaries are published by product companies — not hosted on HQ."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Downloads" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-10 px-6">
          <LegalNotice>
            PDF packages and high-resolution brand ZIPs are provided to accredited recipients on
            request. We do not publish placeholder or empty PDF files.
          </LegalNotice>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((item) => (
              <DocumentCard
                key={item.id}
                type={item.kind.replace("_", " ")}
                title={item.title}
                summary={item.summary}
                href={item.href}
              />
            ))}
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Mobile distribution</h2>
            <EmptyStateUi
              title="Android / iOS / APK"
              body={
                mobile[0]?.note ??
                "Mobile packages are published by product companies through official stores. HQ does not host APK or IPA files."
              }
            />
            <p className="mt-4 text-sm text-cream-muted">
              Product support:{" "}
              <Link href="/support" className="text-gold">
                Support Center
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-xl text-cream">Request packages</h2>
            <p className="text-sm text-cream-muted">
              Press and brand packs:{" "}
              <a href={`mailto:${CONTACTS.press}`} className="text-gold">
                {CONTACTS.press}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
