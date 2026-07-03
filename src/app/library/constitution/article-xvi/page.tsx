import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleSixteenPanel } from "@/components/constitution/ConstitutionArticleSixteenPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_XVI } from "@/lib/constitution/articles/article-xvi";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_XVI.article} — ${ARTICLE_XVI.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_XVI.article}: ${ARTICLE_XVI.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleSixteenPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href="/library/constitution" className="text-sm text-cream-muted hover:text-gold">
            ← Constitution Portal
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-gold">
            Volume I · Version {CONSTITUTION_VERSION} · Part V
          </p>
        </div>
      </section>
      <div className="py-16">
        <ConstitutionArticleSixteenPanel />
      </div>
    </div>
  );
}
