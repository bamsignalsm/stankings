import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XII } from "@/lib/constitution/articles/article-xii";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_40 } from "@/lib/iki";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function ConstitutionArticleTwelvePanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XII}
      partBanner={{ part: partIV.part, title: partIV.title }}
      footer={{
        edNumber: 40,
        edText: EXECUTIVE_DECISION_40,
        link: {
          href: "/library/constitutional-trust",
          label: "Constitutional Trust Centre →",
        },
      }}
    />
  );
}
