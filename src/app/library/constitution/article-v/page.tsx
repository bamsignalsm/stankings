import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleFivePanel } from "@/components/constitution/ConstitutionArticleFivePanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_V } from "@/lib/constitution/articles/article-v";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_V.article} — ${ARTICLE_V.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_V.article}: ${ARTICLE_V.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleFivePage() {
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
        <ConstitutionArticleFivePanel />
      </div>
    </div>
  );
}
