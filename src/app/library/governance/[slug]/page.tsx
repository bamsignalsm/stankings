import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GovernanceBodyProfilePage } from "@/components/governance/GovernanceBodyProfilePage";
import { MemberBanner } from "@/components/MemberBanner";
import { getGovernanceBodyProfile } from "@/lib/governance";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { GOVERNANCE_BODY_PROFILES } = await import("@/lib/governance");
  return GOVERNANCE_BODY_PROFILES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getGovernanceBodyProfile(slug);
  if (!profile) return { title: "Governance Body Not Found" };
  return {
    title: `${profile.name} — Constitutional Governance`,
    description: profile.mandate ?? profile.subtitle,
    robots: { index: false, follow: false },
  };
}

export default async function GovernanceBodyPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getGovernanceBodyProfile(slug);
  if (!profile) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <GovernanceBodyProfilePage profile={profile} />
    </div>
  );
}
