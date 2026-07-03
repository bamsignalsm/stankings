import Link from "next/link";
import { ARTICLE_XVI } from "@/lib/constitution/articles/article-xvi";
import {
  LEADERSHIP_EVALUATION_CRITERIA,
  LEADERSHIP_STUDY_DOMAINS,
  MENTORSHIP_OUTCOMES,
} from "@/lib/constitution/articles/article-xvi";
import {
  CPP_FRAMEWORK,
  CPP_PURPOSE,
  CUSTODIAN_RECORD_DOMAINS,
  LCF_STANDARDS,
} from "@/lib/frameworks/custodian-programme-portal";
import {
  CURRICULUM_TRACKS,
  CUSTODIAN_CASE_STUDIES,
  CUSTODIAN_RECORDS,
  getCustodianProgrammeStats,
} from "@/lib/custodian-programme";
import { EXECUTIVE_DECISION_44 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partV = CONSTITUTION_PARTS.find((p) => p.id === "part-v")!;

const STAGE_LABELS: Record<string, string> = {
  foundation: "Foundation",
  leadership: "Leadership",
  technology: "Technology",
  enterprise: "Enterprise",
  society: "Society",
  readiness: "Readiness Review",
  graduated: "Graduated",
};

export function CustodianProgrammePortalHub() {
  const stats = getCustodianProgrammeStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partV.part} · {partV.title} · {ARTICLE_XVI.article} · {CPP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The Custodian Programme
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CPP_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Every generation bears responsibility for preparing the generation that follows.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_44}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-6">
          {[
            { label: "Participants", value: stats.participants },
            { label: "In Formation", value: stats.inFormation },
            { label: "Readiness", value: stats.readinessReview },
            { label: "Alumni", value: stats.alumni },
            { label: "Curriculum Modules", value: stats.curriculumModules },
            { label: "Avg Progress", value: `${stats.avgProgress}%` },
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
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Custodian Records</h2>
          <div className="space-y-6">
            {CUSTODIAN_RECORDS.map((record) => (
              <article
                key={record.custodianId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-gold">{record.custodianId}</p>
                    <h3 className="font-serif text-xl text-cream">
                      {record.href ? (
                        <Link href={record.href} className="hover:text-gold-light">
                          {record.name}
                        </Link>
                      ) : (
                        record.name
                      )}
                    </h3>
                    <p className="text-sm text-cream-muted">
                      {record.cohort} · Mentor: {record.mentor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-gold">
                      {STAGE_LABELS[record.currentStage] ?? record.currentStage}
                    </p>
                    <p className="font-serif text-2xl text-cream">{record.learningProgress}%</p>
                    <p className="text-xs text-cream-muted">{record.graduationStatus.replace("_", " ")}</p>
                  </div>
                </div>
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-ink">
                  <div
                    className="h-full rounded-full bg-gold/80"
                    style={{ width: `${record.learningProgress}%` }}
                  />
                </div>
                <div className="grid gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-gold">Constitution</p>
                    <p className="text-cream-muted">
                      {record.constitutionModulesCompleted}/{record.constitutionModulesTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gold">Canons</p>
                    <p className="text-cream-muted">
                      {record.canonModulesCompleted}/{record.canonModulesTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gold">Case Studies</p>
                    <p className="text-cream-muted">{record.caseStudiesCompleted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold">Knowledge Contributions</p>
                    <p className="text-cream-muted">{record.knowledgeContributions}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Curriculum Framework
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Modular blueprint for The Stankings Institute — detailed curriculum maintained separately.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_TRACKS.map((track) => (
              <div key={track.track} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <h3 className="mb-3 font-mono text-sm uppercase tracking-wider text-gold">
                  {track.track}
                </h3>
                <ul className="space-y-2 text-sm text-cream-muted">
                  {track.modules.map((m) => (
                    <li key={m.id} className="flex justify-between gap-2">
                      <span>{m.title}</span>
                      <span className="text-xs uppercase text-cream-muted/70">{m.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Case Studies</h2>
          <div className="space-y-4">
            {CUSTODIAN_CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-gold">{cs.id}</span>
                  <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                    {cs.track} · {cs.moduleId}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg text-cream">
                  <Link href={cs.href} className="hover:text-gold-light">
                    {cs.title}
                  </Link>
                </h3>
                <p className="mb-3 text-sm text-cream-muted">{cs.summary}</p>
                <Link href={cs.href} className="text-sm text-gold hover:text-gold-light">
                  Read case study →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Study Domains (§ 16.05)", items: LEADERSHIP_STUDY_DOMAINS },
            { title: "Mentorship Outcomes (§ 16.06)", items: MENTORSHIP_OUTCOMES },
            { title: "Evaluation Criteria (§ 16.07)", items: LEADERSHIP_EVALUATION_CRITERIA },
            { title: "Custodian Record Domains", items: CUSTODIAN_RECORD_DOMAINS },
            { title: "LCF Standards (ED 44)", items: LCF_STANDARDS },
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
          <Link href="/library/constitution/article-xvi" className="text-gold hover:text-gold-light">
            Article XVI →
          </Link>
          <Link href="/library/constitutional-ceremony" className="text-gold hover:text-gold-light">
            Constitutional Ceremony →
          </Link>
          <Link href="/library/stewardship" className="text-gold hover:text-gold-light">
            Stewardship Portal →
          </Link>
          <Link href="/library/leadership" className="text-gold hover:text-gold-light">
            Leadership Governance →
          </Link>
          <Link href="/library/ecosystem/stankings-institute" className="text-gold hover:text-gold-light">
            The Stankings Institute →
          </Link>
          <Link
            href="/library/frameworks/custodian-programme-portal"
            className="text-gold hover:text-gold-light"
          >
            {CPP_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
