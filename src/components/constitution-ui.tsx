import type { ConstitutionArticle } from "@/lib/constitution";

export function ArticleBlock({ article }: { article: ConstitutionArticle }) {
  const anchor = article.article.replace(/\s/g, "-").toLowerCase();

  return (
    <article id={anchor} className="scroll-mt-28">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold/70">
        {article.article}
      </p>
      <h3 className="mb-5 font-serif text-2xl font-semibold text-cream">
        {article.title}
      </h3>
      <div className="space-y-4 leading-relaxed text-cream-muted">
        {article.paragraphs.map((para) => (
          <p key={para.slice(0, 48)}>{para}</p>
        ))}
      </div>
      {article.list && (
        <ul className="my-6 space-y-2 border-l-2 border-gold/30 pl-6">
          {article.list.map((item) => (
            <li key={item} className="text-cream-muted">
              {item}
            </li>
          ))}
        </ul>
      )}
      {article.closingParagraphs && (
        <div className="space-y-4 leading-relaxed text-cream-muted">
          {article.closingParagraphs.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export function ChapterNav({
  chapterId,
  label,
  articles,
}: {
  chapterId: string;
  label: string;
  articles: ConstitutionArticle[];
}) {
  return (
    <li>
      <a href={`#${chapterId}`} className="font-medium text-gold">
        {label}
      </a>
      <ul className="mt-2 space-y-1.5 border-l border-gold-subtle pl-3">
        {articles.map((a) => (
          <li key={a.article}>
            <a
              href={`#${a.article.replace(/\s/g, "-").toLowerCase()}`}
              className="text-xs text-cream-muted hover:text-gold"
            >
              {a.article}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function ChapterSection({
  id,
  chapterLabel,
  title,
  intro,
  articles,
}: {
  id: string;
  chapterLabel: string;
  title: string;
  intro: string;
  articles: ConstitutionArticle[];
}) {
  return (
    <section
      id={id}
      className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {chapterLabel}
      </p>
      <h2 className="mb-3 font-serif text-3xl font-semibold text-cream">
        {title}
      </h2>
      <p className="mb-10 text-sm leading-relaxed text-cream-muted">{intro}</p>
      <div className="space-y-14">
        {articles.map((article) => (
          <ArticleBlock key={article.article} article={article} />
        ))}
      </div>
    </section>
  );
}
