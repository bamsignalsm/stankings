import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleSeventeenPanel } from "@/components/constitution/ConstitutionArticleSeventeenPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_XVII } from "@/lib/constitution/articles/article-xvii";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_XVII.article} — ${ARTICLE_XVII.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_XVII.article}: ${ARTICLE_XVII.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleSeventeenPage() {
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
        <ConstitutionArticleSeventeenPanel />
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <Link
          href="/library/constitution/founders-charge"
          className="text-sm text-gold hover:text-gold-light"
        >
          Continue to The Founder&apos;s Charge →
        </Link>
      </div>
    </div>
  );
}
