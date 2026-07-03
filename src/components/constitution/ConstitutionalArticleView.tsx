import Link from "next/link";
import type { ConstitutionalArticle, ConstitutionalSection } from "@/lib/constitution/articles/types";
import { ConstitutionalCrossLinks } from "@/components/constitutional-convention/ConstitutionalCrossLinks";
import { ConstitutionalArticleNav } from "@/components/constitution/ConstitutionalArticleNav";

function SectionBlock({ section }: { section: ConstitutionalSection }) {
  const [lead, ...rest] = section.paragraphs;
  const insertListAfterLead = section.listItems && section.paragraphs.length > 1;
  const useGrid = section.listStyle === "grid" || section.number === "Section 1.04";

  return (
    <article id={section.id} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
        <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-gold">
          {section.number}
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
      </div>
      <h3 className="mb-6 text-center font-serif text-2xl font-semibold text-cream">
        {section.title}
      </h3>
      <div className="space-y-4 font-serif text-lg leading-relaxed text-cream">
        {lead && <p>{lead}</p>}
        {insertListAfterLead && section.listItems && (
          <ul
            className={
              useGrid
                ? "grid gap-2 sm:grid-cols-2"
                : "space-y-2 border-l-2 border-gold/40 pl-6"
            }
          >
            {section.listItems.map((item) => (
              <li
                key={item}
                className={
                  useGrid
                    ? "rounded border border-gold-subtle bg-ink px-4 py-2 text-sm text-cream-muted"
                    : "text-cream-muted"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        {rest.map((para) => (
          <p key={para}>{para}</p>
        ))}
        {section.blockquote && (
          <blockquote className="my-6 space-y-3 border-l-2 border-gold/50 pl-6 font-serif italic text-cream-muted">
            {section.blockquote.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        )}
        {section.listItems && !insertListAfterLead && (
          <ul className="space-y-2 border-l-2 border-gold/40 pl-6">
            {section.listItems.map((item) => (
              <li key={item} className="text-cream-muted">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export interface ConstitutionalArticleFooter {
  edNumber: number;
  edText: string;
  link?: { href: string; label: string };
}

interface ConstitutionalArticleViewProps {
  article: ConstitutionalArticle;
  footer?: ConstitutionalArticleFooter;
  compactHeader?: boolean;
  partBanner?: { part: string; title: string };
}

export function ConstitutionalArticleView({
  article,
  footer,
  compactHeader = false,
  partBanner,
}: ConstitutionalArticleViewProps) {
  const endLabel = `End of ${article.article}`;

  return (
    <section id={article.id} className="mx-auto max-w-3xl">
      {!compactHeader && (
        <p className="mb-8 text-center text-xs text-cream-muted">
          Volume I frozen for Convention review ·{" "}
          <Link href="/library/constitutional-convention" className="text-gold hover:text-gold-light">
            Convention →
          </Link>
        </p>
      )}
      {!compactHeader && (
        <div className="mb-12 text-center">
          {partBanner && (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold/80">
              {partBanner.part} · {partBanner.title}
            </p>
          )}
          <div className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="mb-2 font-mono text-sm uppercase tracking-[0.4em] text-gold">
            {article.article}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
            {article.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      )}

      <div className="space-y-16 rounded-lg border border-gold/25 bg-ink-muted p-8 md:p-12">
        {article.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.35em] text-gold/80">
        {endLabel}
      </p>

      <ConstitutionalCrossLinks articleId={article.id} />

      <ConstitutionalArticleNav articleId={article.id} />

      {footer && (
        <div className="mt-12 space-y-6">
          <div className="rounded-lg border border-gold/30 bg-gold-subtle p-6">
            <p className="mb-3 text-xs uppercase tracking-widest text-gold">
              Executive Decision No. {footer.edNumber}
            </p>
            <p className="text-sm leading-relaxed text-cream">{footer.edText}</p>
          </div>
          {footer.link && (
            <p className="text-center text-sm text-cream-muted">
              <Link href={footer.link.href} className="text-gold hover:text-gold-light">
                {footer.link.label}
              </Link>
            </p>
          )}
        </div>
      )}
    </section>
  );
}
