import type { Metadata } from "next";
import { IISFrameworkPage } from "@/components/frameworks/IISFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Identity Statement Framework",
  description:
    "Article I operationalized — every ecosystem institution maintains a constitutional Identity Statement.",
  robots: { index: false, follow: false },
};

export default function InstitutionalIdentityStatementFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IISFrameworkPage />
    </div>
  );
}
