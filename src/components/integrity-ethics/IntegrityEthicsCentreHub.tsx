import Link from "next/link";
import { ARTICLE_XI } from "@/lib/constitution/articles/article-xi";
import { ETHICAL_DECISION_FACTORS } from "@/lib/constitution/articles/article-xi";
import {
  IEC_FRAMEWORK,
  IEC_PURPOSE,
  IEC_REGISTERS,
} from "@/lib/frameworks/integrity-ethics-centre";
import {
  CONFLICT_DISCLOSURES,
  ETHICS_REPORTS,
  getIntegrityCentreStats,
  GIFTS_REGISTER,
  INTEGRITY_DECLARATIONS,
  RELATED_PARTY_REGISTER,
} from "@/lib/integrity-ethics";
import { EXECUTIVE_DECISION_39 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

function outcomeClass(outcome: string): string {
  if (outcome === "cleared" || outcome === "submitted") return "border-forest/40 text-forest";
  if (outcome === "mitigated" || outcome === "recused") return "border-gold/40 text-gold";
  if (outcome === "declined") return "border-burgundy/40 text-burgundy";
  return "border-gold-subtle text-cream-muted";
}

export function IntegrityEthicsCentreHub() {
  const stats = getIntegrityCentreStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partIV.part} · {partIV.title} · {ARTICLE_XI.article} · {IEC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Integrity & Ethics Centre
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{IEC_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Declare. Review independently. Put the institution first.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_39}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-5">
          {[
            { label: "Disclosures", value: stats.disclosures },
            { label: "Gifts Logged", value: stats.gifts },
            { label: "Related Parties", value: stats.relatedParties },
            { label: "Declarations", value: stats.declarationsSubmitted },
            { label: "Ethics Reports", value: stats.ethicsReports },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-3xl text-gold">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Integrity Register</h2>
          <div className="space-y-4">
            {CONFLICT_DISCLOSURES.map((d) => (
              <Link
                key={d.disclosureId}
                href={`/library/integrity-ethics/disclosures/${d.disclosureId.toLowerCase()}`}
                className="group block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-gold">{d.disclosureId}</p>
                    <h3 className="font-serif text-lg text-cream group-hover:text-gold-light">
                      {d.person}
                    </h3>
                    <p className="text-sm text-cream-muted">{d.role}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${outcomeClass(d.reviewOutcome)}`}
                  >
                    {d.reviewOutcome}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-cream-muted">{d.natureOfInterest}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Gifts Register</h2>
            <ul className="space-y-3">
              {GIFTS_REGISTER.map((g) => (
                <li key={g.giftId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-xs text-gold">{g.giftId}</p>
                  <p className="text-cream">{g.description}</p>
                  <p className="text-cream-muted">
                    {g.recipient} · {g.date} ·{" "}
                    <span className={outcomeClass(g.outcome)}>{g.outcome}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Related Party Register</h2>
            <ul className="space-y-3">
              {RELATED_PARTY_REGISTER.map((t) => (
                <li key={t.transactionId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-xs text-gold">{t.transactionId}</p>
                  <p className="text-cream">{t.description}</p>
                  <p className="text-cream-muted">
                    {t.parties.join(" ↔ ")} · {t.outcome}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Annual Integrity Declarations
          </h2>
          <ul className="space-y-3">
            {INTEGRITY_DECLARATIONS.map((d) => (
              <li
                key={d.declarationId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-gold">{d.declarationId}</p>
                    <p className="font-medium text-cream">
                      {d.person} — {d.year}
                    </p>
                    <p className="text-sm text-cream-muted">{d.role}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${outcomeClass(d.status)}`}
                  >
                    {d.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Reporting & Advisory Channels
          </h2>
          <ul className="space-y-3">
            {ETHICS_REPORTS.map((r) => (
              <li key={r.reportId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                <p className="font-mono text-xs text-gold">
                  {r.reportId} · {r.category.replace(/_/g, " ")}
                </p>
                <p className="text-cream-muted">{r.summary}</p>
                {r.resolution && <p className="mt-2 text-cream">{r.resolution}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Centre Registers</h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {IEC_REGISTERS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Ethical Decision Factors (§ 11.08)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {ETHICAL_DECISION_FACTORS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-xi" className="text-gold hover:text-gold-light">
            Article XI →
          </Link>
          <Link href="/library/constitutional-trust" className="text-gold hover:text-gold-light">
            Constitutional Trust Centre →
          </Link>
          <Link
            href="/library/frameworks/integrity-ethics-centre"
            className="text-gold hover:text-gold-light"
          >
            {IEC_FRAMEWORK.identifier} →
          </Link>
          <Link href="/library/governance" className="text-gold hover:text-gold-light">
            Governance Portal →
          </Link>
          <Link href="/library/leadership" className="text-gold hover:text-gold-light">
            Leadership Governance →
          </Link>
        </div>
      </div>
    </>
  );
}
