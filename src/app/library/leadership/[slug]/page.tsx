import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadershipProfilePage } from "@/components/leadership/LeadershipProfilePage";
import { MemberBanner } from "@/components/MemberBanner";
import { getLeadershipProfile } from "@/lib/leadership";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { LEADERSHIP_PROFILES } = await import("@/lib/leadership");
  return LEADERSHIP_PROFILES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  if (!profile) return { title: "Leadership Profile Not Found" };
  return {
    title: `${profile.name} — Leadership Profile`,
    description: `${profile.constitutionalOffice} — leadership governance per Article V.`,
    robots: { index: false, follow: false },
  };
}

export default async function LeadershipProfileDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  if (!profile) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <LeadershipProfilePage profile={profile} />
    </div>
  );
}
