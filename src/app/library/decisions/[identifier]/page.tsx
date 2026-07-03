import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DecisionRecordDetail } from "@/components/decisions/DecisionRecordDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getDecisionRecord } from "@/lib/decisions/institutional-decision-record";

interface PageProps {
  params: Promise<{ identifier: string }>;
}

export async function generateStaticParams() {
  const { getAllDecisionRecords } = await import("@/lib/decisions/institutional-decision-record");
  return getAllDecisionRecords().map((r) => ({ identifier: r.identifier }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { identifier } = await params;
  const record = getDecisionRecord(identifier);
  if (!record) return { title: "Decision Record Not Found" };
  return {
    title: `${record.identifier} — ${record.title}`,
    description: record.decisionStatement,
    robots: { index: false, follow: false },
  };
}

export default async function DecisionRecordPage({ params }: PageProps) {
  const { identifier } = await params;
  const record = getDecisionRecord(identifier);
  if (!record) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <DecisionRecordDetail record={record} />
    </div>
  );
}
