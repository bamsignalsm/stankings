import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_XI } from "@/lib/constitution/articles/article-xi";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";
import { EXECUTIVE_DECISION_39 } from "@/lib/iki";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function ConstitutionArticleElevenPanel() {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_XI}
      partBanner={{ part: partIV.part, title: partIV.title }}
      footer={{
        edNumber: 39,
        edText: EXECUTIVE_DECISION_39,
        link: {
          href: "/library/integrity-ethics",
          label: "Integrity & Ethics Centre →",
        },
      }}
    />
  );
}
