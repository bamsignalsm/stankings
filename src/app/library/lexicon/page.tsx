import type { Metadata } from "next";
import { LexiconModule } from "@/components/lexicon/LexiconModule";
import { MemberBanner } from "@/components/MemberBanner";
import {
  getLexiconAlphabetIndex,
  getLexiconStats,
  listLexiconTerms,
} from "@/lib/lexicon-engine/queries";

export const metadata: Metadata = {
  title: "The Stankings Lexicon — LS-002",
  description:
    "Official institutional vocabulary. Twenty-four approved definitions. The dictionary of the institution.",
  robots: { index: false, follow: false },
};

export default async function LexiconPage() {
  const [terms, alphabet, stats] = await Promise.all([
    listLexiconTerms(),
    getLexiconAlphabetIndex(),
    getLexiconStats(),
  ]);

  return (
    <div className="pt-20">
      <MemberBanner />
      <LexiconModule terms={terms} alphabet={alphabet} stats={stats} />
    </div>
  );
}
