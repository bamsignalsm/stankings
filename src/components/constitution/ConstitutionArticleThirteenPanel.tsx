import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XIII } from "@/lib/constitution/articles/article-xiii";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_41 } from "@/lib/iki";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function ConstitutionArticleThirteenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XIII}
      partBanner={{ part: partIV.part, title: partIV.title }}
      footer={{
        edNumber: 41,
        edText: EXECUTIVE_DECISION_41,
        link: {
          href: "/library/stankings-library",
          label: "Stankings Library Portal →",
        },
      }}
    />
  );
}
