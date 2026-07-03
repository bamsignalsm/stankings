import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLearnedDetail } from "@/components/lessons/LessonLearnedDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getLessonsLearnedRecord } from "@/lib/lessons/lessons-learned-repository";

interface PageProps {
  params: Promise<{ identifier: string }>;
}

export async function generateStaticParams() {
  const { getAllLessonsLearnedRecords } = await import(
    "@/lib/lessons/lessons-learned-repository"
  );
  return getAllLessonsLearnedRecords().map((r) => ({ identifier: r.identifier }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { identifier } = await params;
  const record = getLessonsLearnedRecord(identifier);
  if (!record) return { title: "Lessons Learned Not Found" };
  return {
    title: `${record.identifier} — ${record.title}`,
    description: record.projectSummary,
    robots: { index: false, follow: false },
  };
}

export default async function LessonLearnedPage({ params }: PageProps) {
  const { identifier } = await params;
  const record = getLessonsLearnedRecord(identifier);
  if (!record) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <LessonLearnedDetail record={record} />
    </div>
  );
}
