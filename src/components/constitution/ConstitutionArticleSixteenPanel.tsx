import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XVI } from "@/lib/constitution/articles/article-xvi";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_44 } from "@/lib/iki";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

export function ConstitutionArticleSixteenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XVI}
      partBanner={{ part: partV.part, title: partV.title }}
      footer={{
        edNumber: 44,
        edText: EXECUTIVE_DECISION_44,
        link: {
          href: "/library/custodian-programme",
          label: "Custodian Programme Portal →",
        },
      }}
    />
  );
}
