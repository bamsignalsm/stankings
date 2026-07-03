import type { Metadata } from "next";
import { IncidentRegistryHub } from "@/components/incidents/IncidentRegistryHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Incident Center",
  description:
    "Institutional incident records with accountability, root cause analysis, and lessons per CANON-015.",
  robots: { index: false, follow: false },
};

export default function IncidentsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IncidentRegistryHub />
    </div>
  );
}
