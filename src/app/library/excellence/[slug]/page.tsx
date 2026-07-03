import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExcellenceStandardDetail } from "@/components/excellence/ExcellenceStandardDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getDepartmentExcellence } from "@/lib/excellence/standards";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAllDepartmentExcellence } = await import("@/lib/excellence/standards");
  return getAllDepartmentExcellence().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const standard = getDepartmentExcellence(slug);
  if (!standard) return { title: "Standard Not Found" };
  return {
    title: `${standard.name} — Standard of Excellence`,
    description: standard.standardsOfExcellence[0],
    robots: { index: false, follow: false },
  };
}

export default async function ExcellenceStandardPage({ params }: PageProps) {
  const { slug } = await params;
  const standard = getDepartmentExcellence(slug);
  if (!standard) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <ExcellenceStandardDetail standard={standard} />
    </div>
  );
}
