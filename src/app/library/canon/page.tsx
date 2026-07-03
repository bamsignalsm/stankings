import type { Metadata } from "next";
import { CanonRegistry } from "@/components/CanonRegistry";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Stankings Canon",
  description: "Authoritative knowledge objects — the Canon Engine.",
  robots: { index: false, follow: false },
};

export default async function CanonPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <CanonRegistry />
    </div>
  );
}
