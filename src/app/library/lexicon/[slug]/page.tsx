import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LexiconTermDetail } from "@/components/lexicon/LexiconTermDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getLexiconTermBySlug, listLexiconTerms } from "@/lib/lexicon-engine/queries";

interface LexiconTermPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LexiconTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = await getLexiconTermBySlug(slug);
  if (!term) return { title: "Term Not Found" };
  return {
    title: `${term.term} — The Stankings Lexicon`,
    description: term.definition,
    robots: { index: false, follow: false },
  };
}

export default async function LexiconTermPage({ params }: LexiconTermPageProps) {
  const { slug } = await params;
  const term = await getLexiconTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const allTerms = await listLexiconTerms();
  const relatedTerms = term.relatedTermSlugs
    .map((s) => allTerms.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <div className="pt-20">
      <MemberBanner />
      <LexiconTermDetail term={term} relatedTerms={relatedTerms} />
    </div>
  );
}
