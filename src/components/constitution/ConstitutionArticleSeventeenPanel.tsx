import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XVII } from "@/lib/constitution/articles/article-xvii";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_45 } from "@/lib/iki";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

export function ConstitutionArticleSeventeenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XVII}
      partBanner={{ part: partV.part, title: partV.title }}
      footer={{
        edNumber: 45,
        edText: EXECUTIVE_DECISION_45,
        link: {
          href: "/library/constitutional-ceremony",
          label: "Constitutional Ceremony Portal →",
        },
      }}
    />
  );
}
