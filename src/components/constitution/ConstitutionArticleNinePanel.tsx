import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_IX } from "@/lib/constitution/articles/article-ix";
import { EXECUTIVE_DECISION_37 } from "@/lib/iki";

export function ConstitutionArticleNinePanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_IX}
      footer={{
        edNumber: 37,
        edText: EXECUTIVE_DECISION_37,
        link: {
          href: "/library/ecosystem-architecture",
          label: "Ecosystem Architecture Portal →",
        },
      }}
    />
  );
}
