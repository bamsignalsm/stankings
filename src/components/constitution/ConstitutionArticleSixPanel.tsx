import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_VI } from "@/lib/constitution/articles/article-vi";
import { EXECUTIVE_DECISION_34 } from "@/lib/iki";

export function ConstitutionArticleSixPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_VI}
      footer={{
        edNumber: 34,
        edText: EXECUTIVE_DECISION_34,
        link: {
          href: "/library/decision-workspace",
          label: "Constitutional Decision Workspace →",
        },
      }}
    />
  );
}
