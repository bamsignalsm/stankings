export interface ConstitutionalSection {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly listItems?: readonly string[];
  readonly listStyle?: "grid" | "bordered";
  readonly blockquote?: readonly string[];
}

export interface ConstitutionalArticle {
  readonly id: string;
  readonly article: string;
  readonly title: string;
  readonly canonRefs: readonly string[];
  readonly sections: readonly ConstitutionalSection[];
}

export function articleBodyMarkdown(article: ConstitutionalArticle): string {
  return article.sections
    .map((s) => {
      const list = s.listItems?.map((item) => `- ${item}`).join("\n") ?? "";
      const quote =
        s.blockquote?.map((line) => `> ${line}`).join("\n") ?? "";
      const body = s.paragraphs.join("\n\n");
      const quoteBlock = quote ? `\n\n${quote}` : "";
      return `### ${s.number} — ${s.title}\n\n${body}${quoteBlock}${list ? `\n\n${list}` : ""}`;
    })
    .join("\n\n");
}
