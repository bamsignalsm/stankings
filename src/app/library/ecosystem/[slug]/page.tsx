import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionEcosystemDetail } from "@/components/ecosystem/InstitutionEcosystemDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getEcosystemInstitution } from "@/lib/ecosystem/map";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { ECOSYSTEM_INSTITUTIONS } = await import("@/lib/ecosystem/map");
  return ECOSYSTEM_INSTITUTIONS.map((inst) => ({ slug: inst.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const inst = getEcosystemInstitution(slug);
  if (!inst) return { title: "Institution Not Found" };
  return {
    title: `${inst.name} — Ecosystem Map`,
    description: `${inst.excellence}: ${inst.mission}`,
    robots: { index: false, follow: false },
  };
}

export default async function InstitutionEcosystemPage({ params }: PageProps) {
  const { slug } = await params;
  const institution = getEcosystemInstitution(slug);
  if (!institution) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionEcosystemDetail institution={institution} />
    </div>
  );
}
