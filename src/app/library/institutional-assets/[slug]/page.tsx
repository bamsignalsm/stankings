import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalAssetProfilePage } from "@/components/institutional-assets/InstitutionalAssetProfilePage";
import { MemberBanner } from "@/components/MemberBanner";
import { getInstitutionalAsset } from "@/lib/institutional-assets";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { INSTITUTIONAL_ASSETS } = await import("@/lib/institutional-assets");
  return INSTITUTIONAL_ASSETS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const asset = getInstitutionalAsset(slug);
  if (!asset) return { title: "Asset Not Found" };
  return {
    title: `${asset.assetId} — ${asset.name}`,
    description: asset.description,
    robots: { index: false, follow: false },
  };
}

export default async function InstitutionalAssetDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getInstitutionalAsset(slug);
  if (!asset) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionalAssetProfilePage asset={asset} />
    </div>
  );
}
