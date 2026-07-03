import type { Metadata } from "next";
import { EcosystemMapHub } from "@/components/ecosystem/EcosystemMapHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Ecosystem Map",
  description:
    "Explorable map of Stankings Group institutions — missions, capabilities, and relationships per CANON-005.",
  robots: { index: false, follow: false },
};

export default function EcosystemMapPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EcosystemMapHub />
    </div>
  );
}
