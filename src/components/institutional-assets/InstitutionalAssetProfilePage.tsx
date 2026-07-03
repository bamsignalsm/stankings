import type { ReactNode } from "react";
import Link from "next/link";
import type { InstitutionalAsset } from "@/lib/institutional-assets/types";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      {children}
    </section>
  );
}

interface InstitutionalAssetProfilePageProps {
  asset: InstitutionalAsset;
}

export function InstitutionalAssetProfilePage({ asset }: InstitutionalAssetProfilePageProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/institutional-assets"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Institutional Asset Registry
          </Link>
          <p className="mb-1 font-mono text-xs text-gold">{asset.assetId}</p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">{asset.name}</h1>
          <p className="text-cream-muted">
            {asset.categoryLabel} · {asset.owningInstitution} · {asset.status}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Section label="Description">
          <p className="text-cream-muted">{asset.description}</p>
        </Section>

        <Section label="Stewardship">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Steward</dt>
              <dd className="text-cream-muted">{asset.steward}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Owning Institution</dt>
              <dd className="text-cream-muted">{asset.owningInstitution}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Constitutional Article</dt>
              <dd>
                <Link href="/library/constitution/article-vii" className="text-gold hover:text-gold-light">
                  {asset.constitutionArticle}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Annual Review Date</dt>
              <dd className="text-cream-muted">{asset.annualReviewDate}</dd>
            </div>
          </dl>
        </Section>

        <Section label="Classification">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Criticality Rating</dt>
              <dd className="capitalize text-cream-muted">{asset.criticality}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Security Classification</dt>
              <dd className="capitalize text-cream-muted">{asset.securityClassification}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Backup Status</dt>
              <dd className="capitalize text-cream-muted">{asset.backupStatus.replace("_", " ")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gold">Recovery Objective</dt>
              <dd className="text-cream-muted">{asset.recoveryObjective}</dd>
            </div>
          </dl>
        </Section>

        <Section label="Risk Assessment">
          <p className="text-cream-muted">{asset.riskAssessment}</p>
        </Section>

        <Section label="Dependencies">
          <ul className="space-y-1 text-sm text-cream-muted">
            {asset.dependencies.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>

        <Section label="Dashboard Tags">
          <div className="flex flex-wrap gap-2">
            {asset.dashboardTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold-subtle px-3 py-1 text-xs capitalize text-cream-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>

        <Section label="Canon References">
          <div className="flex flex-wrap gap-3">
            {asset.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="font-mono text-sm text-gold hover:text-gold-light"
              >
                {ref}
              </Link>
            ))}
          </div>
        </Section>

        <Section label="Knowledge Objects Linked">
          <ul className="space-y-2">
            {asset.knowledgeObjects.map((ko) => (
              <li key={ko.title}>
                {ko.href ? (
                  <Link href={ko.href} className="text-gold hover:text-gold-light">
                    {ko.title}
                  </Link>
                ) : (
                  ko.title
                )}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/constitution/article-vii" className="text-gold hover:text-gold-light">
            Article VII →
          </Link>
          <Link href="/library/institutional-assets" className="text-cream-muted hover:text-gold">
            All assets →
          </Link>
        </div>
      </div>
    </>
  );
}
