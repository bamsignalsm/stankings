import Link from "next/link";
import { getAdjacentArticles } from "@/lib/constitution/article-registry";
import { getDiagramForArticle } from "@/lib/constitutional-convention";
import { getArticleCommentary } from "@/lib/constitutional-convention/commentary";

interface ConstitutionalArticleNavProps {
  articleId: string;
}

export function ConstitutionalArticleNav({ articleId }: ConstitutionalArticleNavProps) {
  const { prev, next } = getAdjacentArticles(articleId);
  const diagram = getDiagramForArticle(articleId);
  const commentary = getArticleCommentary(articleId);

  return (
    <nav className="mt-12 space-y-6 border-t border-gold-subtle pt-8">
      {(diagram || commentary) && (
        <div className="flex flex-wrap gap-4 text-sm">
          {diagram && (
            <Link
              href={`/library/constitutional-convention#diagrams`}
              className="text-cream-muted hover:text-gold"
            >
              Architecture diagram →
            </Link>
          )}
          {commentary && (
            <Link
              href={`/library/constitutional-convention#commentary-${articleId}`}
              className="text-cream-muted hover:text-gold"
            >
              Commentary →
            </Link>
          )}
          <Link
            href={`/library/constitutional-convention#audit`}
            className="text-cream-muted hover:text-gold"
          >
            Convention audit →
          </Link>
        </div>
      )}
      <div className="flex flex-wrap justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/library/constitution/${prev.id}`} className="group max-w-[45%]">
            <p className="text-xs text-cream-muted">Previous</p>
            <p className="text-gold group-hover:text-gold-light">
              {prev.article} — {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/library/constitution/${next.id}`}
            className="group max-w-[45%] text-right"
          >
            <p className="text-xs text-cream-muted">Next</p>
            <p className="text-gold group-hover:text-gold-light">
              {next.article} — {next.title}
            </p>
          </Link>
        ) : (
          <Link href="/library/constitution/founders-charge" className="group text-right">
            <p className="text-xs text-cream-muted">Closing</p>
            <p className="text-gold group-hover:text-gold-light">The Founder&apos;s Charge →</p>
          </Link>
        )}
      </div>
    </nav>
  );
}
