import Link from "next/link";
import { HealthDimensionCard } from "@/components/constitutional-health/HealthDimensionCard";
import { ARTICLE_XIV } from "@/lib/constitution/articles/article-xiv";
import {
  CONSTITUTIONAL_MATURITY_DOMAINS,
  INSTITUTIONAL_HEALTH_DIMENSIONS,
  REVIEW_RECOMMENDATION_CATEGORIES,
} from "@/lib/constitution/articles/article-xiv";
import {
  CHD_FRAMEWORK,
  CHD_PURPOSE,
  STEWARDSHIP_REPORT_SECTIONS,
} from "@/lib/frameworks/constitutional-health-dashboard";
import {
  CURRENT_HEALTH_REVIEW,
  getHealthDashboardStats,
  HEALTH_DIMENSION_SCORES,
  HEALTH_RECOMMENDATIONS,
  MATURITY_ASSESSMENTS,
  renderStars,
} from "@/lib/constitutional-health";
import { EXECUTIVE_DECISION_42 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

const MATURITY_COLORS = {
  forming: "text-cream-muted",
  developing: "text-gold",
  established: "text-cream",
  exemplary: "text-forest",
} as const;

export function ConstitutionalHealthDashboardHub() {
  const stats = getHealthDashboardStats();
  const review = CURRENT_HEALTH_REVIEW;

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partIV.part} · {partIV.title} · {ARTICLE_XIV.article} · {CHD_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Health Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CHD_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Healthy institutions improve before circumstances compel them to.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_42}
        </blockquote>

        <section className="mb-12 rounded-lg border border-gold/40 bg-gold-subtle p-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gold">Constitutional Health Score</p>
          <p className="mb-2 font-serif text-5xl tracking-widest text-cream">
            {renderStars(stats.overallScore)}
          </p>
          <p className="text-2xl font-serif text-gold">{stats.overallScore} / 5</p>
          <p className="mt-4 font-mono text-xs text-cream-muted">
            {review.reviewId} · {review.period}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream-muted">{review.summary}</p>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-5">
          {[
            { label: "Dimensions", value: stats.dimensions },
            { label: "Improving", value: stats.improving },
            { label: "Declining", value: stats.declining },
            { label: "Maturity Domains", value: stats.maturityDomains },
            { label: "Recommendations", value: stats.recommendations },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl text-gold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Institutional Health Dimensions
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Click any dimension for evidence, trends, recommendations, and improvement plans.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {HEALTH_DIMENSION_SCORES.map((dim) => (
              <HealthDimensionCard key={dim.id} dimension={dim} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Constitutional Maturity Framework
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {MATURITY_ASSESSMENTS.map((m) => (
              <div
                key={m.domain}
                className="flex items-center justify-between rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div>
                  <p className="font-medium text-cream">{m.domain}</p>
                  <p className="text-xs text-cream-muted">{m.note}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs uppercase tracking-wider ${MATURITY_COLORS[m.maturity]}`}>
                    {m.maturity}
                  </p>
                  <p className="font-serif text-lg text-gold">{m.score}/5</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Review Recommendations
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {HEALTH_RECOMMENDATIONS.map((block) => (
              <div key={block.category} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
                  {block.category}
                </h3>
                <ul className="space-y-2 text-sm text-cream-muted">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Health Dimensions (§ 14.03)", items: INSTITUTIONAL_HEALTH_DIMENSIONS },
            { title: "Maturity Framework (§ 14.04)", items: CONSTITUTIONAL_MATURITY_DOMAINS },
            { title: "Recommendation Categories (§ 14.05)", items: REVIEW_RECOMMENDATION_CATEGORIES },
            { title: "Stewardship Report (ED 42)", items: STEWARDSHIP_REPORT_SECTIONS },
          ].map((block) => (
            <div key={block.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-gold">{block.title}</h3>
              <ul className="space-y-1 text-xs text-cream-muted">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-xiv" className="text-gold hover:text-gold-light">
            Article XIV →
          </Link>
          <Link href="/library/constitution-centre" className="text-gold hover:text-gold-light">
            Constitution Centre →
          </Link>
          <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light">
            Canon Maturity Dashboard →
          </Link>
          <Link href="/library/legacy" className="text-gold hover:text-gold-light">
            Legacy Dashboard →
          </Link>
          <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
            Stankings Library Portal →
          </Link>
          <Link
            href="/library/frameworks/constitutional-health-dashboard"
            className="text-gold hover:text-gold-light"
          >
            {CHD_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
