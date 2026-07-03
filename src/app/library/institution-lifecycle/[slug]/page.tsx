import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionLifecycleDetail } from "@/components/institution-lifecycle/InstitutionLifecycleDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getInstitutionLifecycleRecord, INSTITUTION_LIFECYCLE_RECORDS } from "@/lib/institution-lifecycle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSTITUTION_LIFECYCLE_RECORDS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getInstitutionLifecycleRecord(slug);
  if (!record) return { title: "Institution Not Found" };
  return {
    title: `${record.name} — Lifecycle Record`,
    description: record.constitutionalPurpose,
    robots: { index: false, follow: false },
  };
}

export default async function InstitutionLifecycleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getInstitutionLifecycleRecord(slug);
  if (!record) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionLifecycleDetail record={record} />
    </div>
  );
}
