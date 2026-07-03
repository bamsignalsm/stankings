import type { Metadata } from "next";
import Link from "next/link";
import { ConstitutionArticleFourPanel } from "@/components/constitution/ConstitutionArticleFourPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { ARTICLE_IV } from "@/lib/constitution/articles/article-iv";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: `${ARTICLE_IV.article} — ${ARTICLE_IV.title}`,
  description: `Stankings Group Constitution Vol. I v${CONSTITUTION_VERSION}, ${ARTICLE_IV.article}: ${ARTICLE_IV.title}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionArticleFourPage() {
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
        <ConstitutionArticleFourPanel />
      </div>
    </div>
  );
}
