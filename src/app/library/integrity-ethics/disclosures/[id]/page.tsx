import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConflictDisclosureDetail } from "@/components/integrity-ethics/ConflictDisclosureDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { CONFLICT_DISCLOSURES, getConflictDisclosure } from "@/lib/integrity-ethics";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CONFLICT_DISCLOSURES.map((d) => ({ id: d.disclosureId.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const disclosure = getConflictDisclosure(id);
  if (!disclosure) return { title: "Disclosure Not Found" };
  return {
    title: `${disclosure.disclosureId} — ${disclosure.person}`,
    description: disclosure.natureOfInterest,
    robots: { index: false, follow: false },
  };
}

export default async function ConflictDisclosurePage({ params }: PageProps) {
  const { id } = await params;
  const disclosure = getConflictDisclosure(id);
  if (!disclosure) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <ConflictDisclosureDetail disclosure={disclosure} />
    </div>
  );
}
