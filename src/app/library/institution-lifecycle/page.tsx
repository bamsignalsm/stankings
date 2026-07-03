import type { Metadata } from "next";
import { InstitutionLifecyclePortalHub } from "@/components/institution-lifecycle/InstitutionLifecyclePortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institution Lifecycle Registry",
  description:
    "Register of Constitutional Institutions — complete institutional biography per Article X.",
  robots: { index: false, follow: false },
};

export default function InstitutionLifecyclePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionLifecyclePortalHub />
    </div>
  );
}
