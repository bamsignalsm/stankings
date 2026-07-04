import type { Metadata } from "next";
import { AuthorityHub } from "@/components/authority/AuthorityHub";
import { TRUST_ORIGIN_NOTICE, TRUST_SECTIONS } from "@/lib/authority/trust";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Trust Center",
  description:
    "Central trust authority for every Stankings product — privacy, safety, verification, and user rights.",
  path: "/trust",
});

export default function TrustCenterPage() {
  return (
    <AuthorityHub
      eyebrow="Trust Center"
      title="Central trust authority"
      description="Trust policies for every current and future Stankings product originate here. Products implement these standards; they do not publish conflicting institutional policies."
      originNotice={TRUST_ORIGIN_NOTICE}
      sections={TRUST_SECTIONS}
      contactEmail="trust@stankings.com"
      contactLabel="Trust"
    />
  );
}
