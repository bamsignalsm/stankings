import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_V } from "@/lib/constitution/articles/article-v";
import { EXECUTIVE_DECISION_33 } from "@/lib/iki";

export function ConstitutionArticleFivePanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_V}
      footer={{
        edNumber: 33,
        edText: EXECUTIVE_DECISION_33,
        link: {
          href: "/library/leadership",
          label: "Leadership Governance Portal →",
        },
      }}
    />
  );
}
