import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_II } from "@/lib/constitution/articles/article-ii";
import { EXECUTIVE_DECISION_30 } from "@/lib/iki";

export function ConstitutionArticleTwoPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_II}
      footer={{
        edNumber: 30,
        edText: EXECUTIVE_DECISION_30,
        link: {
          href: "/library/constitutional-alignment",
          label: "Constitutional Alignment Engine →",
        },
      }}
    />
  );
}
