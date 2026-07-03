import type { Metadata } from "next";
import { PublicationGeneratorHub } from "@/components/publication-engine/PublicationGeneratorHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Publication Generator — SLPS-001",
  description: "Generate a new publication scaffold from the Stankings Library Publishing Standard.",
  robots: { index: false, follow: false },
};

export default function PublicationGeneratorPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <PublicationGeneratorHub />
    </div>
  );
}
