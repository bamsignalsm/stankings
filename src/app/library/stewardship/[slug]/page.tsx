import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StewardProfilePage } from "@/components/stewardship/StewardProfilePage";
import { MemberBanner } from "@/components/MemberBanner";
import { getStewardshipProfile } from "@/lib/stewardship";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { STEWARDSHIP_PROFILES } = await import("@/lib/stewardship");
  return STEWARDSHIP_PROFILES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getStewardshipProfile(slug);
  if (!profile) return { title: "Steward Not Found" };
  return {
    title: `${profile.name} — Stewardship Profile`,
    description: `${profile.title} — stewardship dashboard per Article III.`,
    robots: { index: false, follow: false },
  };
}

export default async function StewardProfileDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getStewardshipProfile(slug);
  if (!profile) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <StewardProfilePage profile={profile} />
    </div>
  );
}
