import { ConstitutionalArticleView } from "@/components/constitution/ConstitutionalArticleView";
import { ARTICLE_I } from "@/lib/constitution/articles/article-i";
import { EXECUTIVE_DECISION_29 } from "@/lib/iki";

interface ConstitutionArticleOnePanelProps {
  showEd29?: boolean;
}

export function ConstitutionArticleOnePanel({ showEd29 = true }: ConstitutionArticleOnePanelProps) {
  return (
    <ConstitutionalArticleView
      article={ARTICLE_I}
      footer={
        showEd29
          ? {
              edNumber: 29,
              edText: EXECUTIVE_DECISION_29,
              link: {
                href: "/library/institutional-identity",
                label: "Institutional Identity Registry →",
              },
            }
          : undefined
      }
    />
  );
}

/** @deprecated Use ConstitutionArticleOnePanel */
export const ConstitutionArticlePanel = ConstitutionArticleOnePanel;
