import type { Metadata } from "next";
import { ChapterEducationStandardHub } from "@/components/editorial/ChapterEducationStandardHub";

export const metadata: Metadata = {
  title: "Chapter Education Standard (CEF-001)",
  description:
    "Every chapter is both a governance document and a teaching document — reflection questions, practical scenarios, and cross-references.",
};

export default function ChapterEducationStandardPage() {
  return (
    <main className="min-h-screen bg-ink pt-20">
      <ChapterEducationStandardHub />
    </main>
  );
}
