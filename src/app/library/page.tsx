import type { Metadata } from "next";
import { LibraryExperience } from "@/components/library/LibraryExperience";

export const metadata: Metadata = {
  title: "The Stankings Library",
  description:
    "Knowledge preserved. Wisdom cultivated. Stewardship entrusted.",
};

export default function LibraryPage() {
  return (
    <div className="pt-20">
      <LibraryExperience />
    </div>
  );
}
