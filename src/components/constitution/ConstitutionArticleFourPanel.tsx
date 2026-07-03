import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_IV } from "@/lib/constitution/articles/article-iv";
import { EXECUTIVE_DECISION_32 } from "@/lib/iki";

export function ConstitutionArticleFourPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_IV}
      footer={{
        edNumber: 32,
        edText: EXECUTIVE_DECISION_32,
        link: {
          href: "/library/governance",
          label: "Constitutional Governance Portal →",
        },
      }}
    />
  );
}
