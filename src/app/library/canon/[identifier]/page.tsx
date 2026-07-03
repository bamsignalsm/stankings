import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonDetail } from "@/components/library/CanonDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getCanonExtendedMetadata, getCanonSections } from "@/lib/canon";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";

interface CanonPageProps {
  params: Promise<{ identifier: string }>;
}

export async function generateMetadata({
  params,
}: CanonPageProps): Promise<Metadata> {
  const { identifier } = await params;
  const canon = await getKnowledgeObjectByIdentifier(
    decodeURIComponent(identifier)
  );
  if (!canon || canon.objectType !== "canon") {
    return { title: "Canon Not Found" };
  }
  return {
    title: `${canon.identifier} — ${canon.title}`,
    description: canon.summary,
    robots: { index: false, follow: false },
  };
}

export default async function CanonObjectPage({ params }: CanonPageProps) {
  const { identifier } = await params;
  const decoded = decodeURIComponent(identifier);
  const canon = await getKnowledgeObjectByIdentifier(decoded);

  if (!canon || canon.objectType !== "canon") {
    notFound();
  }

  const structuredSections = await getCanonSections(decoded);
  const extended = getCanonExtendedMetadata(decoded);

  return (
    <div className="pt-20">
      <MemberBanner />
      <CanonDetail
        canon={canon}
        structuredSections={structuredSections}
        extended={extended}
      />
    </div>
  );
}
