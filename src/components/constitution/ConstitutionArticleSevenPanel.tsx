import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_VII } from "@/lib/constitution/articles/article-vii";
import { EXECUTIVE_DECISION_35 } from "@/lib/iki";

export function ConstitutionArticleSevenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_VII}
      footer={{
        edNumber: 35,
        edText: EXECUTIVE_DECISION_35,
        link: {
          href: "/library/institutional-assets",
          label: "Institutional Asset Registry →",
        },
      }}
    />
  );
}
