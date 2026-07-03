import type { Metadata } from "next";
import { LSFFrameworkPage } from "@/components/frameworks/LSFFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Leadership Stewardship Framework",
  description: "CANON-004 operationalized — every leadership role requires a stewardship plan.",
  robots: { index: false, follow: false },
};

export default function LeadershipStewardshipPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LSFFrameworkPage />
    </div>
  );
}
