import type { Metadata } from "next";
import { AuthorityHub } from "@/components/authority/AuthorityHub";
import { LEGAL_ORIGIN_NOTICE, LEGAL_SECTIONS } from "@/lib/authority/legal";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Legal Center",
  description:
    "Central legal hub for Stankings Group — terms, privacy, cookies, trademark, DMCA, and compliance.",
  path: "/legal",
});

export default function LegalCenterPage() {
  return (
    <AuthorityHub
      eyebrow="Legal Center"
      title="Central legal hub"
      description="Institutional legal policies originate at Stankings HQ. Product companies may publish product-specific terms on their domains; those terms must align with HQ standards."
      originNotice={LEGAL_ORIGIN_NOTICE}
      sections={LEGAL_SECTIONS}
      contactEmail={CONTACTS.legal}
      contactLabel="Legal"
    />
  );
}
