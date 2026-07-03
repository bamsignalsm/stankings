import Link from "next/link";
import {
  CONSTITUTIONAL_COMMITMENTS,
  CONSTITUTIONAL_OATH_AFFIRMATION,
  ARTICLE_XVII,
} from "@/lib/constitution/articles/article-xvii";
import {
  CCY_FRAMEWORK,
  CCY_PURPOSE,
  CONSTITUTIONAL_RECORD_DOMAINS,
  COROH_REGISTER_FIELDS,
} from "@/lib/frameworks/constitutional-ceremony-portal";
import {
  CONSTITUTIONAL_OFFICE_RECORDS,
  getConstitutionalCeremonyStats,
} from "@/lib/constitutional-ceremony";
import { EXECUTIVE_DECISION_45 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

export function ConstitutionalCeremonyPortalHub() {
  const stats = getConstitutionalCeremonyStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partV.part} · {partV.title} · {ARTICLE_XVII.article} · {CCY_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Ceremony
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CCY_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            The Constitution belongs not to one generation alone but to all who faithfully steward
            the institution across time.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_45}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-6">
          {[
            { label: "Office Holders", value: stats.officeHolders },
            { label: "Affirmations", value: stats.affirmationsComplete },
            { label: "Training", value: stats.trainingComplete },
            { label: "Stewardship", value: stats.stewardshipDeclared },
            { label: "Integrity", value: stats.integrityDeclared },
            { label: "Knowledge", value: stats.totalKnowledgeContributions },
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
            Constitutional Affirmation
          </h2>
          <blockquote className="space-y-3 rounded-lg border border-gold/30 bg-ink-muted p-8 font-serif text-lg italic leading-relaxed text-cream">
            {CONSTITUTIONAL_OATH_AFFIRMATION.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
          <p className="mt-4 text-sm text-cream-muted">
            Per Article XVII § 17.03 — alternative forms preserving this substance may be adopted.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Constitutional Office Records
          </h2>
          <div className="space-y-6">
            {CONSTITUTIONAL_OFFICE_RECORDS.map((record) => (
              <article
                key={record.recordId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-gold">{record.recordId}</p>
                    <h3 className="font-serif text-xl text-cream">
                      {record.href ? (
                        <Link href={record.href} className="hover:text-gold-light">
                          {record.name}
                        </Link>
                      ) : (
                        record.name
                      )}
                    </h3>
                    <p className="text-sm text-cream-muted">{record.constitutionalOffice}</p>
                    <p className="text-xs text-cream-muted">
                      Appointed {record.dateOfAppointment} · Constitution v
                      {record.constitutionVersionAccepted}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-gold">{record.yearsOfService} year(s) of service</p>
                    <p className="text-cream-muted">{record.leadershipReview}</p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm sm:grid-cols-4">
                  {[
                    { label: "Affirmation", done: record.oathAffirmationCompleted },
                    { label: "Training", done: record.constitutionTrainingCompleted },
                    { label: "Stewardship", done: record.stewardshipDeclaration },
                    { label: "Integrity", done: record.integrityDeclaration },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-gold">{item.label}</p>
                      <p className={item.done ? "text-forest" : "text-cream-muted"}>
                        {item.done ? "Complete" : "Pending"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-gold">Constitutional Reviews</p>
                    <p className="text-cream-muted">{record.constitutionalReviewsParticipated}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold">Knowledge Contributions</p>
                    <p className="text-cream-muted">{record.knowledgeContributions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold">Version Accepted</p>
                    <p className="text-cream-muted">v{record.constitutionVersionAccepted}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              Constitutional Commitments
            </h2>
            <ul className="space-y-2 border-l-2 border-gold/40 pl-4 text-sm text-cream-muted">
              {CONSTITUTIONAL_COMMITMENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              Register Fields ({COROH_REGISTER_FIELDS.length})
            </h2>
            <ul className="space-y-2 border-l-2 border-gold/40 pl-4 text-sm text-cream-muted">
              {COROH_REGISTER_FIELDS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Constitutional Record Domains
          </h2>
          <div className="flex flex-wrap gap-2">
            {CONSTITUTIONAL_RECORD_DOMAINS.map((d) => (
              <span
                key={d}
                className="rounded border border-gold-subtle bg-ink px-3 py-1 text-xs text-cream-muted"
              >
                {d}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-xvii" className="text-gold hover:text-gold-light">
            Article XVII →
          </Link>
          <Link href="/library/constitution/founders-charge" className="text-gold hover:text-gold-light">
            The Founder&apos;s Charge →
          </Link>
          <Link href="/library/constitution-centre" className="text-gold hover:text-gold-light">
            Constitution Centre →
          </Link>
          <Link href="/library/custodian-programme" className="text-gold hover:text-gold-light">
            Custodian Programme →
          </Link>
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Constitution Portal →
          </Link>
        </div>
      </div>
    </>
  );
}
