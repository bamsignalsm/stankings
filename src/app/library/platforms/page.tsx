import type { Metadata } from "next";
import { PlatformRegistryHub } from "@/components/platforms/PlatformRegistryHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Platform Registry",
  description:
    "Shared institutional platforms — owners, consumers, APIs, and status per CANON-012.",
  robots: { index: false, follow: false },
};

export default function PlatformRegistryPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <PlatformRegistryHub />
    </div>
  );
}
