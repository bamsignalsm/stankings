import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_X } from "@/lib/constitution/articles/article-x";
import { EXECUTIVE_DECISION_38 } from "@/lib/iki";

export function ConstitutionArticleTenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_X}
      footer={{
        edNumber: 38,
        edText: EXECUTIVE_DECISION_38,
        link: {
          href: "/library/institution-lifecycle",
          label: "Institution Lifecycle Registry →",
        },
      }}
    />
  );
}
