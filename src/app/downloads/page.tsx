import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero, DocumentCard, EmptyStateUi, LegalNotice } from "@/components/ui";
import { INSTITUTIONAL_CONTACT } from "@/lib/institutional/public-site";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Download Center",
  description:
    "Reusable downloads for Stankings Group — company profile, press kit, brand assets, and mobile distribution notes.",
  path: "/downloads",
});

const DOWNLOADS = [
  {
    type: "Company",
    title: "Company profile",
    summary: "Institutional overview via About and Companies pages.",
    href: "/about",
  },
  {
    type: "Press",
    title: "Press kit",
    summary: "Boilerplate, contacts, and brand references.",
    href: "/press",
  },
  {
    type: "Brand",
    title: "Brand assets",
    summary: "Logos, colors, and usage rules.",
    href: "/brand",
  },
  {
    type: "Policy",
    title: "Legal policies",
    summary: "Terms, privacy, cookies, and compliance documents.",
    href: "/legal",
  },
  {
    type: "Trust",
    title: "Trust resources",
    summary: "Trust Center policies for all products.",
    href: "/trust",
  },
  {
    type: "Security",
    title: "Security resources",
    summary: "Disclosure policy and security.txt.",
    href: "/security",
  },
];

export default function DownloadsPage() {
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
            {DOWNLOADS.map((item) => (
              <DocumentCard key={item.href} {...item} />
            ))}
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Mobile distribution</h2>
            <EmptyStateUi
              title="Android / iOS / APK"
              body="Mobile packages are published by BamSignal and other product companies through official stores. HQ does not host APK or IPA files."
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
              <a href={`mailto:${INSTITUTIONAL_CONTACT.press}`} className="text-gold">
                {INSTITUTIONAL_CONTACT.press}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
