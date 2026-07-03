import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConstitutionalInstitutionProfile } from "@/components/ecosystem/ConstitutionalInstitutionProfile";
import { MemberBanner } from "@/components/MemberBanner";
import { getConstitutionalEcosystemProfile } from "@/lib/institutional-ecosystem";
import { ECOSYSTEM_INSTITUTIONS } from "@/lib/ecosystem/map";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ECOSYSTEM_INSTITUTIONS.map((inst) => ({ slug: inst.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getConstitutionalEcosystemProfile(slug);
  if (!profile) return { title: "Institution Not Found" };
  return {
    title: `${profile.name} — Ecosystem Architecture`,
    description: `${profile.excellence}: ${profile.constitutionalPurpose}`,
    robots: { index: false, follow: false },
  };
}

export default async function ConstitutionalInstitutionPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getConstitutionalEcosystemProfile(slug);
  if (!profile) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalInstitutionProfile profile={profile} />
    </div>
  );
}
