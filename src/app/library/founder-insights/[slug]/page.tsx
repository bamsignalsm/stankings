import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FounderInsightPanel } from "@/components/founder-insights/FounderInsightPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { FOUNDER_INSIGHTS, getFounderInsight } from "@/lib/founder-insights";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getFounderInsight(slug);
  if (!insight) return { title: "Founder Insight" };
  return {
    title: `${insight.title} — Founder Insight`,
    description: insight.summary,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return FOUNDER_INSIGHTS.map((i) => ({ slug: i.slug }));
}

export default async function FounderInsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getFounderInsight(slug);
  if (!insight) notFound();

  return (
    <div className="pt-20 print:pt-0">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-8 print:hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link href="/library/founder-insights" className="text-sm text-cream-muted hover:text-gold">
            ← Founder Insights
          </Link>
        </div>
      </section>
      <FounderInsightPanel insight={insight} />
    </div>
  );
}
