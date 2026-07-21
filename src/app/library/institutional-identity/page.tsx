import type { Metadata } from "next";
import { InstitutionalIdentityHub } from "@/components/institutional-identity/InstitutionalIdentityHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Identity Statements",
  description:
    "Constitutional identity for every institution in the Stankings Legacy Ltd ecosystem — FRAMEWORK-IIS-001.",
  robots: { index: false, follow: false },
};

export default function InstitutionalIdentityIndexPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionalIdentityHub />
    </div>
  );
}
