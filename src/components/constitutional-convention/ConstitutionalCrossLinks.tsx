import Link from "next/link";
import { getArticleCrossLinks } from "@/lib/constitutional-convention";

interface ConstitutionalCrossLinksProps {
  articleId: string;
}

function LinkGroup({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; href: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:border-gold/40 hover:text-gold"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ConstitutionalCrossLinks({ articleId }: ConstitutionalCrossLinksProps) {
  const links = getArticleCrossLinks(articleId);
  if (!links) return null;

  const hasContent =
    links.canons.length > 0 ||
    links.schedules.length > 0 ||
    links.governanceCodes.length > 0 ||
    links.policies.length > 0 ||
    links.engineeringStandards.length > 0 ||
    links.companies.length > 0 ||
    links.knowledgeObjects.length > 0 ||
    links.articles.length > 0;

  if (!hasContent) return null;

  return (
    <section className="mt-12 rounded-lg border border-gold/20 bg-ink p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
          Constitutional Cross Links
        </p>
        <Link
          href="/library/constitutional-convention#cross-linking"
          className="text-xs text-cream-muted hover:text-gold"
        >
          Convention →
        </Link>
      </div>
      <div className="space-y-4">
        <LinkGroup title="Related Canons" items={links.canons} />
        <LinkGroup title="Related Articles" items={links.articles} />
        <LinkGroup title="Related Schedules" items={links.schedules} />
        <LinkGroup title="Related Governance Codes" items={links.governanceCodes} />
        <LinkGroup title="Related Policies" items={links.policies} />
        <LinkGroup title="Related Engineering Standards" items={links.engineeringStandards} />
        <LinkGroup title="Related Companies" items={links.companies} />
        <LinkGroup title="Related Knowledge Objects" items={links.knowledgeObjects} />
      </div>
    </section>
  );
}
