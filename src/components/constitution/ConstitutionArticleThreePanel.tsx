import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_III } from "@/lib/constitution/articles/article-iii";
import { EXECUTIVE_DECISION_31 } from "@/lib/iki";

export function ConstitutionArticleThreePanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_III}
      footer={{
        edNumber: 31,
        edText: EXECUTIVE_DECISION_31,
        link: {
          href: "/library/stewardship",
          label: "Stewardship Portal →",
        },
      }}
    />
  );
}
