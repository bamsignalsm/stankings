import type { Metadata } from "next";
import { EcosystemArchitectureHub } from "@/components/ecosystem/EcosystemArchitectureHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Ecosystem Architecture Portal",
  description:
    "Constitutional institutional ecosystem — profiles, shared platforms, and interactive architecture graph per Article IX.",
  robots: { index: false, follow: false },
};

export default function EcosystemArchitecturePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EcosystemArchitectureHub />
    </div>
  );
}
