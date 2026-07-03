import type { Metadata } from "next";
import { EXFFrameworkPage } from "@/components/frameworks/EXFFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Excellence Framework",
  description:
    "CANON-008 operationalized — standards of excellence for every department and recurring process.",
  robots: { index: false, follow: false },
};

export default function ExcellenceFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EXFFrameworkPage />
    </div>
  );
}
