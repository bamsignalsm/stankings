import type { Metadata } from "next";
import { IDRFrameworkPage } from "@/components/frameworks/IDRFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Decision Record",
  description:
    "CANON-007 operationalized — capture why decisions were made, not only what was decided.",
  robots: { index: false, follow: false },
};

export default function InstitutionalDecisionRecordFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IDRFrameworkPage />
    </div>
  );
}
