import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionIdentityPage } from "@/components/institutional-identity/InstitutionIdentityPage";
import { MemberBanner } from "@/components/MemberBanner";
import { getInstitutionalIdentity } from "@/lib/institutional-identity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { INSTITUTIONAL_IDENTITY_STATEMENTS } = await import("@/lib/institutional-identity");
  return INSTITUTIONAL_IDENTITY_STATEMENTS.map((inst) => ({ slug: inst.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const identity = getInstitutionalIdentity(slug);
  if (!identity) return { title: "Institution Not Found" };
  return {
    title: `${identity.institutionName} — Institutional Identity`,
    description: identity.purpose,
    robots: { index: false, follow: false },
  };
}

export default async function InstitutionIdentityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const identity = getInstitutionalIdentity(slug);
  if (!identity) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionIdentityPage identity={identity} />
    </div>
  );
}
