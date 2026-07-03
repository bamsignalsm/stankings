import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XV } from "@/lib/constitution/articles/article-xv";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_43 } from "@/lib/iki";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

export function ConstitutionArticleFifteenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XV}
      partBanner={{ part: partV.part, title: partV.title }}
      footer={{
        edNumber: 43,
        edText: EXECUTIVE_DECISION_43,
        link: {
          href: "/library/constitution-centre",
          label: "Constitution Centre →",
        },
      }}
    />
  );
}
