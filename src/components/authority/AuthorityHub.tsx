import Link from "next/link";
import {
  ContentSections,
  InstitutionalCardGrid,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import type { AuthorityArticle, AuthoritySection } from "@/lib/authority/types";

export function AuthorityHub({
  eyebrow,
  title,
  description,
  originNotice,
  sections,
  contactEmail,
  contactLabel = "Contact",
}: {
  eyebrow: string;
  title: string;
  description: string;
  originNotice?: string;
  sections: AuthoritySection[];
  contactEmail?: string;
  contactLabel?: string;
}) {
  return (
    <InstitutionalPageShell eyebrow={eyebrow} title={title} description={description} width="wide">
      {originNotice ? (
        <div className="mb-10 rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <p className="text-sm leading-relaxed text-cream-muted">{originNotice}</p>
        </div>
      ) : null}

      <InstitutionalCardGrid
        items={sections.map((s) => ({
          href: s.href,
          title: s.title,
          summary: s.summary,
        }))}
      />

      {contactEmail ? (
        <p className="mt-10 text-sm text-cream-muted">
          {contactLabel}:{" "}
          <a href={`mailto:${contactEmail}`} className="text-gold hover:text-gold-light">
            {contactEmail}
          </a>
        </p>
      ) : null}
    </InstitutionalPageShell>
  );
}

export function AuthorityArticlePage({
  eyebrow,
  backHref,
  backLabel,
  article,
}: {
  eyebrow: string;
  backHref: string;
  backLabel: string;
  article: AuthorityArticle;
}) {
  return (
    <InstitutionalPageShell
      eyebrow={eyebrow}
      title={article.title}
      backHref={backHref}
      backLabel={backLabel}
    >
      <ContentSections sections={article.sections} lastUpdated={article.lastUpdated} />
      <p className="mt-10 text-sm text-cream-muted">
        <Link href={backHref} className="text-gold hover:text-gold-light">
          ← {backLabel}
        </Link>
      </p>
    </InstitutionalPageShell>
  );
}
