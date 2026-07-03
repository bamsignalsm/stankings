import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XIV } from "@/lib/constitution/articles/article-xiv";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_42 } from "@/lib/iki";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function ConstitutionArticleFourteenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XIV}
      partBanner={{ part: partIV.part, title: partIV.title }}
      footer={{
        edNumber: 42,
        edText: EXECUTIVE_DECISION_42,
        link: {
          href: "/library/constitutional-health",
          label: "Constitutional Health Dashboard →",
        },
      }}
    />
  );
}
