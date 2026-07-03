import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnovationPassportDetail } from "@/components/innovation-portal/InnovationPassportDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getInnovationPassport, INNOVATION_PASSPORTS } from "@/lib/innovation-portal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return INNOVATION_PASSPORTS.map((p) => ({ id: p.ideaId.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const passport = getInnovationPassport(id);
  if (!passport) return { title: "Innovation Passport Not Found" };
  return {
    title: `${passport.ideaId} — ${passport.title}`,
    description: passport.problemAddressed,
    robots: { index: false, follow: false },
  };
}

export default async function InnovationPassportPage({ params }: PageProps) {
  const { id } = await params;
  const passport = getInnovationPassport(id);
  if (!passport) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <InnovationPassportDetail passport={passport} />
    </div>
  );
}
