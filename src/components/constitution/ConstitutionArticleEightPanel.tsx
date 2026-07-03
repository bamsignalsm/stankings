import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_VIII } from "@/lib/constitution/articles/article-viii";
import { EXECUTIVE_DECISION_36 } from "@/lib/iki";

export function ConstitutionArticleEightPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_VIII}
      footer={{
        edNumber: 36,
        edText: EXECUTIVE_DECISION_36,
        link: {
          href: "/library/ownership-stewardship",
          label: "Ownership & Stewardship Portal →",
        },
      }}
    />
  );
}
