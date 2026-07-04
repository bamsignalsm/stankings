import type { Metadata } from "next";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { SupportExperience } from "@/components/authority/SupportExperience";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Support Center",
  description:
    "One support platform for every Stankings company — product selector, knowledge base, FAQs, and email directory.",
  path: "/support",
});

export default function SupportCenterPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Support Center"
      title="One support platform"
      description="Select the correct queue for General, HQ, BamSignal, Yike, BayRight, Foundation, or Institute. Institutional policies originate at HQ; product teams operate product systems."
      width="wide"
    >
      <SupportExperience />
    </InstitutionalPageShell>
  );
}
