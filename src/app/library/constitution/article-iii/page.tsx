import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleThreePanel } from "@/components/constitution/ConstitutionArticleThreePanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_III } from "@/lib/constitution/articles/article-iii";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_III.article} — ${ARTICLE_III.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_III.article}: ${ARTICLE_III.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleThreePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href="/library/constitution" className="text-sm text-cream-muted hover:text-gold">
            ← Constitution Portal
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-gold">
            Volume I · Version {CONSTITUTION_VERSION}
          </p>
        </div>
      </section>
      <div className="py-16">
        <ConstitutionArticleThreePanel />
      </div>
    </div>
  );
}
