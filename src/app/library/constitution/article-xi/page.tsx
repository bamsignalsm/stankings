import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleElevenPanel } from "@/components/constitution/ConstitutionArticleElevenPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_XI } from "@/lib/constitution/articles/article-xi";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_XI.article} — ${ARTICLE_XI.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_XI.article}: ${ARTICLE_XI.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleElevenPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href="/library/constitution" className="text-sm text-cream-muted hover:text-gold">
            ← Constitution Portal
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-gold">
            Volume I · Version {CONSTITUTION_VERSION} · Part IV
          </p>
        </div>
      </section>
      <div className="py-16">
        <ConstitutionArticleElevenPanel />
      </div>
    </div>
  );
}
