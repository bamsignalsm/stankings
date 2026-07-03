import type { Metadata } from "next";
import { IncidentAccountabilityFrameworkPage } from "@/components/frameworks/IncidentAccountabilityFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Incident & Accountability Framework",
  description:
    "CANON-015 operationalized — blameless incident review, root cause analysis, and institutional learning.",
  robots: { index: false, follow: false },
};

export default function IncidentAccountabilityPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IncidentAccountabilityFrameworkPage />
    </div>
  );
}
