"use client";

import Link from "next/link";
import { useState } from "react";
import { ConstitutionArticleOnePanel } from "@/components/constitution/ConstitutionArticlePanel";
import { ConstitutionArticleTwoPanel } from "@/components/constitution/ConstitutionArticleTwoPanel";
import { ConstitutionArticleThreePanel } from "@/components/constitution/ConstitutionArticleThreePanel";
import { ConstitutionArticleFourPanel } from "@/components/constitution/ConstitutionArticleFourPanel";
import { ConstitutionArticleFivePanel } from "@/components/constitution/ConstitutionArticleFivePanel";
import { ConstitutionArticleSixPanel } from "@/components/constitution/ConstitutionArticleSixPanel";
import { ConstitutionArticleSevenPanel } from "@/components/constitution/ConstitutionArticleSevenPanel";
import { ConstitutionArticleEightPanel } from "@/components/constitution/ConstitutionArticleEightPanel";
import { ConstitutionArticleNinePanel } from "@/components/constitution/ConstitutionArticleNinePanel";
import { ConstitutionArticleTenPanel } from "@/components/constitution/ConstitutionArticleTenPanel";
import { ConstitutionArticleElevenPanel } from "@/components/constitution/ConstitutionArticleElevenPanel";
import { ConstitutionArticleTwelvePanel } from "@/components/constitution/ConstitutionArticleTwelvePanel";
import { ConstitutionArticleThirteenPanel } from "@/components/constitution/ConstitutionArticleThirteenPanel";
import { ConstitutionArticleFourteenPanel } from "@/components/constitution/ConstitutionArticleFourteenPanel";
import { ConstitutionArticleFifteenPanel } from "@/components/constitution/ConstitutionArticleFifteenPanel";
import { ConstitutionArticleSixteenPanel } from "@/components/constitution/ConstitutionArticleSixteenPanel";
import { ConstitutionArticleSeventeenPanel } from "@/components/constitution/ConstitutionArticleSeventeenPanel";
import { FoundersChargeView } from "@/components/constitution/FoundersChargeView";
import { ConstitutionalConventionHub } from "@/components/constitutional-convention/ConstitutionalConventionHub";
import { VolumeIFreezeBanner } from "@/components/constitution/VolumeIFreezeBanner";
import {
  CONSTITUTION_AMENDMENT_HISTORY,
  CONSTITUTION_CANON_IMPLEMENTATION_MAP,
  CONSTITUTION_DEFINITIONS,
  CONSTITUTION_EFFECTIVE_DATE,
  CONSTITUTION_HISTORY,
  CONSTITUTION_MOTTO,
  CONSTITUTION_PARTS,
  CONSTITUTION_PREAMBLE,
  CONSTITUTION_TABLE_OF_CONTENTS,
  CONSTITUTION_VERSION,
  LIBRARY_VOLUME_HIERARCHY,
  type ConstitutionTocEntry,
} from "@/lib/constitution/volume-i";
import { VOLUME_ZERO_VERSION } from "@/lib/volume-zero/version";
import { EXECUTIVE_DECISION_28, EXECUTIVE_DECISION_29, EXECUTIVE_DECISION_30, EXECUTIVE_DECISION_31, EXECUTIVE_DECISION_32 } from "@/lib/iki";

type PortalView =
  | "preamble"
  | "article-i"
  | "article-ii"
  | "article-iii"
  | "article-iv"
  | "article-v"
  | "article-vi"
  | "article-vii"
  | "article-viii"
  | "article-ix"
  | "article-x"
  | "article-xi"
  | "article-xii"
  | "article-xiii"
  | "article-xiv"
  | "article-xv"
  | "article-xvi"
  | "article-xvii"
  | "founders-charge"
  | "convention"
  | "contents"
  | "definitions"
  | "history"
  | "amendments"
  | "canons"
  | "print"
  | "citation"
  | "ai";

const PORTAL_NAV: { id: PortalView; label: string }[] = [
  { id: "preamble", label: "Preamble" },
  { id: "article-i", label: "Article I" },
  { id: "article-ii", label: "Article II" },
  { id: "article-iii", label: "Article III" },
  { id: "article-iv", label: "Article IV" },
  { id: "article-v", label: "Article V" },
  { id: "article-vi", label: "Article VI" },
  { id: "article-vii", label: "Article VII" },
  { id: "article-viii", label: "Article VIII" },
  { id: "article-ix", label: "Article IX" },
  { id: "article-x", label: "Article X" },
  { id: "article-xi", label: "Article XI" },
  { id: "article-xii", label: "Article XII" },
  { id: "article-xiii", label: "Article XIII" },
  { id: "article-xiv", label: "Article XIV" },
  { id: "article-xv", label: "Article XV" },
  { id: "article-xvi", label: "Article XVI" },
  { id: "article-xvii", label: "Article XVII" },
  { id: "founders-charge", label: "Founder's Charge" },
  { id: "convention", label: "Convention" },
  { id: "contents", label: "Table of Contents" },
  { id: "definitions", label: "Definitions" },
  { id: "history", label: "Constitutional History" },
  { id: "amendments", label: "Amendment History" },
  { id: "canons", label: "Canon Cross-References" },
  { id: "print", label: "Print View" },
  { id: "citation", label: "Citation View" },
  { id: "ai", label: "AI Explanation" },
];

function statusBadge(status: ConstitutionTocEntry["status"]) {
  const map: Record<ConstitutionTocEntry["status"], string> = {
    published: "text-forest border-forest/30 bg-forest/10",
    forthcoming: "text-gold border-gold/30 bg-gold/10",
    draft: "text-cream-muted border-gold-subtle",
    planned: "text-cream-muted/70 border-gold-subtle/50",
  };
  return map[status];
}

export function ConstitutionPortalHub() {
  const [view, setView] = useState<PortalView>("preamble");

  return (
    <>
      {/* Formal landing — Supreme Court library atmosphere */}
      <section className="relative border-b border-gold/20 bg-gradient-to-b from-ink-light via-ink to-ink py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,166,74,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-gold">
            The Stankings Group
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold tracking-wide text-cream md:text-6xl">
            Constitution
          </h1>
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cream-muted">
            Volume I · Version {CONSTITUTION_VERSION}
          </p>
          <p className="mb-8 text-xs text-cream-muted">
            Effective {CONSTITUTION_EFFECTIVE_DATE}
          </p>
          <blockquote className="mx-auto max-w-xl border-y border-gold/25 py-8 font-serif text-xl italic leading-relaxed text-cream md:text-2xl">
            &ldquo;{CONSTITUTION_MOTTO}&rdquo;
          </blockquote>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold/80">
            Constitutional Motto
          </p>
          <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p className="mt-8 text-sm text-cream-muted">
            Implements{" "}
            <Link href="/library/first-principles" className="text-gold hover:text-gold-light">
              Volume 0 · Canons v{VOLUME_ZERO_VERSION}
            </Link>
            {" — "}philosophy becomes law.
          </p>
        </div>
      </section>

      <VolumeIFreezeBanner />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <nav className="mb-12 flex flex-wrap justify-center gap-2 border-b border-gold-subtle pb-6">
          {PORTAL_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`rounded border px-3 py-1.5 text-xs uppercase tracking-wider transition ${
                view === item.id
                  ? "border-gold/40 bg-gold-subtle text-gold"
                  : "border-gold-subtle text-cream-muted hover:border-gold/30 hover:text-cream"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {view === "preamble" && (
          <section id="preamble" className="mx-auto max-w-3xl">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.35em] text-gold">
              Preamble · Institutionally Binding
            </p>
            <div className="rounded-lg border border-gold/25 bg-ink-muted p-8 md:p-12">
              <div className="space-y-5 font-serif text-lg leading-relaxed text-cream">
                {CONSTITUTION_PREAMBLE.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </div>
            <p className="mt-6 text-center text-sm italic text-cream-muted">
              Not merely legally binding where applicable — institutionally binding upon every
              custodian.
            </p>
          </section>
        )}

        {view === "article-i" && (
          <div className="py-4">
            <ConstitutionArticleOnePanel showEd29={false} />
            <blockquote className="mx-auto mt-12 max-w-3xl rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
              {EXECUTIVE_DECISION_29}
            </blockquote>
            <p className="mt-6 text-center text-sm">
              <Link href="/library/institutional-identity" className="text-gold hover:text-gold-light">
                Institutional Identity Registry →
              </Link>
            </p>
          </div>
        )}

        {view === "article-ii" && (
          <div className="py-4">
            <ConstitutionArticleTwoPanel />
          </div>
        )}

        {view === "article-iii" && (
          <div className="py-4">
            <ConstitutionArticleThreePanel />
          </div>
        )}

        {view === "article-iv" && (
          <div className="py-4">
            <ConstitutionArticleFourPanel />
          </div>
        )}

        {view === "article-v" && (
          <div className="py-4">
            <ConstitutionArticleFivePanel />
          </div>
        )}

        {view === "article-vi" && (
          <div className="py-4">
            <ConstitutionArticleSixPanel />
          </div>
        )}

        {view === "article-vii" && (
          <div className="py-4">
            <ConstitutionArticleSevenPanel />
          </div>
        )}

        {view === "article-viii" && (
          <div className="py-4">
            <ConstitutionArticleEightPanel />
          </div>
        )}

        {view === "article-ix" && (
          <div className="py-4">
            <ConstitutionArticleNinePanel />
          </div>
        )}

        {view === "article-x" && (
          <div className="py-4">
            <ConstitutionArticleTenPanel />
          </div>
        )}

        {view === "article-xi" && (
          <div className="py-4">
            <ConstitutionArticleElevenPanel />
          </div>
        )}

        {view === "article-xii" && (
          <div className="py-4">
            <ConstitutionArticleTwelvePanel />
          </div>
        )}

        {view === "article-xiii" && (
          <div className="py-4">
            <ConstitutionArticleThirteenPanel />
          </div>
        )}

        {view === "article-xiv" && (
          <div className="py-4">
            <ConstitutionArticleFourteenPanel />
          </div>
        )}

        {view === "article-xv" && (
          <div className="py-4">
            <ConstitutionArticleFifteenPanel />
          </div>
        )}

        {view === "article-xvi" && (
          <div className="py-4">
            <ConstitutionArticleSixteenPanel />
          </div>
        )}

        {view === "article-xvii" && (
          <div className="py-4">
            <ConstitutionArticleSeventeenPanel />
          </div>
        )}

        {view === "founders-charge" && (
          <div className="py-4">
            <FoundersChargeView />
          </div>
        )}

        {view === "convention" && (
          <div className="py-4">
            <ConstitutionalConventionHub />
          </div>
        )}

        {view === "contents" && (
          <section className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-cream">
              Table of Contents
            </h2>
            <div className="space-y-12">
              {CONSTITUTION_PARTS.map((part) => {
                const entries = CONSTITUTION_TABLE_OF_CONTENTS.filter(
                  (e) => e.partId === part.id,
                );
                if (entries.length === 0) return null;
                return (
                  <div key={part.id}>
                    <div className="mb-6 border-b border-gold/20 pb-3 text-center">
                      <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                        {part.part}
                      </p>
                      <h3 className="font-serif text-xl text-cream">{part.title}</h3>
                    </div>
                    <ol className="space-y-4">
                      {entries.map((entry) => (
                        <li
                          key={entry.id}
                          className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5"
                        >
                          <div>
                            {entry.href ? (
                              <Link href={entry.href} className="group block">
                                <p className="font-mono text-sm text-gold group-hover:text-gold-light">
                                  {entry.article}
                                </p>
                                <p className="font-serif text-lg text-cream group-hover:text-gold-light">
                                  {entry.title}
                                </p>
                              </Link>
                            ) : (
                              <>
                                <p className="font-mono text-sm text-gold">{entry.article}</p>
                                <p className="font-serif text-lg text-cream">{entry.title}</p>
                              </>
                            )}
                            {entry.canonRefs && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {entry.canonRefs.map((ref) => (
                                  <Link
                                    key={ref}
                                    href={`/library/canon/${ref}`}
                                    className="text-xs text-cream-muted hover:text-gold"
                                  >
                                    {ref}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                          <span
                            className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(entry.status)}`}
                          >
                            {entry.status}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
              <div>
                <div className="mb-6 border-b border-gold/20 pb-3 text-center">
                  <p className="font-serif text-xl text-cream">Preamble</p>
                </div>
                <ol className="space-y-4">
                  {CONSTITUTION_TABLE_OF_CONTENTS.filter((e) => e.id === "preamble").map(
                    (entry) => (
                      <li
                        key={entry.id}
                        className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5"
                      >
                        <div>
                          <p className="font-mono text-sm text-gold">{entry.article}</p>
                          <p className="font-serif text-lg text-cream">{entry.title}</p>
                        </div>
                        <span
                          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(entry.status)}`}
                        >
                          {entry.status}
                        </span>
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-cream-muted">
              Article XVIII planned to formalize Schedules and conclude Volume I.{" "}
              <Link href="/library/constitutional-ceremony" className="text-gold hover:text-gold-light">
                Constitutional Ceremony →
              </Link>
              {" · "}
              <Link href="/library/constitution/founders-charge" className="text-gold hover:text-gold-light">
                Founder&apos;s Charge →
              </Link>
              {" · "}
              <Link href="/library/constitution-centre" className="text-gold hover:text-gold-light">
                Constitution Centre →
              </Link>
            </p>
          </section>
        )}

        {view === "definitions" && (
          <section className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-cream">
              Constitutional Definitions
            </h2>
            <dl className="space-y-6">
              {CONSTITUTION_DEFINITIONS.map((d) => (
                <div
                  key={d.term}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <dt className="mb-2 font-serif text-lg font-semibold text-gold">{d.term}</dt>
                  <dd className="text-cream-muted">{d.definition}</dd>
                  <Link href={d.lexiconRef} className="mt-2 inline-block text-xs text-gold/80 hover:text-gold">
                    Authoritative definition →
                  </Link>
                </div>
              ))}
            </dl>
          </section>
        )}

        {view === "history" && (
          <section className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-center font-serif text-2xl font-semibold text-cream">
              Constitutional History
            </h2>
            <ol className="relative border-l border-gold/30 pl-8">
              {CONSTITUTION_HISTORY.map((h) => (
                <li key={h.event} className="mb-8">
                  <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-gold bg-ink" />
                  <p className="font-mono text-xs text-gold">{h.date}</p>
                  <p className="font-serif text-lg text-cream">{h.event}</p>
                  <p className="mt-1 text-sm text-cream-muted">{h.note}</p>
                </li>
              ))}
            </ol>
            <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <p className="mb-3 text-xs uppercase tracking-widest text-gold">Library hierarchy</p>
              <ul className="space-y-2 text-sm text-cream-muted">
                {LIBRARY_VOLUME_HIERARCHY.map((v) => (
                  <li key={v.volume}>
                    <span className="text-cream">{v.volume}</span> — {v.title}{" "}
                    <span className="text-gold/70">({v.nature})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {view === "amendments" && (
          <section className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-cream">
              Amendment History
            </h2>
            <div className="space-y-4">
              {CONSTITUTION_AMENDMENT_HISTORY.map((a) => (
                <article
                  key={a.version}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <p className="mb-1 font-mono text-sm text-gold">
                    Version {a.version} · {a.date}
                  </p>
                  <p className="text-cream-muted">{a.summary}</p>
                  <p className="mt-2 text-xs text-cream-muted">Approved by {a.approver}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm italic text-cream-muted">
              Future amendments require Library Council review per CANON-007 and formal version
              history.
            </p>
          </section>
        )}

        {view === "canons" && (
          <section className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-cream">
              Cross-References to Canons
            </h2>
            <p className="mb-8 text-center text-sm text-cream-muted">
              The Constitution does not invent ideas — it implements the Canons.
            </p>
            <ul className="space-y-3">
              {CONSTITUTION_CANON_IMPLEMENTATION_MAP.map((item) => (
                <li
                  key={item.canon}
                  className="flex flex-wrap gap-3 rounded-lg border border-gold-subtle bg-ink-muted px-5 py-4 text-sm"
                >
                  <Link
                    href={`/library/canon/${item.canon}`}
                    className="shrink-0 font-mono text-gold hover:text-gold-light"
                  >
                    {item.canon}
                  </Link>
                  <span className="text-cream-muted">{item.role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light">
                Volume 0 Maturity Dashboard →
              </Link>
            </p>
          </section>
        )}

        {view === "print" && (
          <section className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">Print View</h2>
            <p className="mb-6 text-cream-muted">
              Formal print-ready export of Volume I — forthcoming. Preamble and adopted Articles
              will be available for Council-certified publication.
            </p>
            <p className="text-sm italic text-cream-muted/70">Status: forthcoming</p>
          </section>
        )}

        {view === "citation" && (
          <section className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-cream">
              Citation View
            </h2>
            <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6 font-mono text-sm text-cream-muted">
              <p>Stankings Group Constitution, Vol. I, v{CONSTITUTION_VERSION}, Preamble (2026).</p>
              <p className="mt-4">
                Stankings Group Constitution, Vol. I, v{CONSTITUTION_VERSION}, Art. I, § 1.02
                (2026).
              </p>
              <p className="mt-4">
                Stankings Group Constitution, Vol. I, v{CONSTITUTION_VERSION}, Art. II, § 2.01
                (2026).
              </p>
              <p className="mt-4">
                Stankings Group Constitution, Vol. I, v{CONSTITUTION_VERSION}, Art. III, § 3.01
                (2026).
              </p>
              <p className="mt-4">
                Stankings Group Constitution, Vol. I, v{CONSTITUTION_VERSION}, Art. III (2026).
              </p>
              <p className="mt-4 text-xs text-cream-muted/70">
                Cite consistently with LS-001 Knowledge Object identifiers when Articles are
                published.
              </p>
            </div>
          </section>
        )}

        {view === "ai" && (
          <section className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
              AI Explanation Mode
            </h2>
            <p className="text-cream-muted">
              Institutional AI may explain constitutional provisions in plain language for custodians
              in training — grounded in Volume 0 Canons and this Constitution.
            </p>
            <p className="mt-6 text-sm italic text-cream-muted/70">
              Scaffold active — Articles I–XVII across five Parts. Article XVIII planned to
              formalize Schedules and conclude Volume I.
            </p>
          </section>
        )}

        <blockquote className="mx-auto mt-16 max-w-3xl rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_28}
        </blockquote>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/first-principles" className="text-gold hover:text-gold-light">
            Volume 0 →
          </Link>
          <Link href="/library/constitution/draft-one" className="text-cream-muted hover:text-gold">
            Draft One Archive →
          </Link>
          <Link href="/library/ownership-stewardship" className="text-cream-muted hover:text-gold">
            Ownership & Stewardship →
          </Link>
          <Link href="/library/institutional-assets" className="text-cream-muted hover:text-gold">
            Institutional Assets →
          </Link>
          <Link href="/library/decision-workspace" className="text-cream-muted hover:text-gold">
            Decision Workspace →
          </Link>
          <Link href="/library/leadership" className="text-cream-muted hover:text-gold">
            Leadership Governance →
          </Link>
          <Link href="/library/governance" className="text-cream-muted hover:text-gold">
            Constitutional Governance →
          </Link>
          <Link href="/library/stewardship" className="text-cream-muted hover:text-gold">
            Stewardship Portal →
          </Link>
          <Link href="/library/constitutional-alignment" className="text-cream-muted hover:text-gold">
            Constitutional Alignment →
          </Link>
          <Link href="/library/institutional-identity" className="text-cream-muted hover:text-gold">
            Institutional Identity →
          </Link>
          <Link href="/library/integrity-ethics" className="text-cream-muted hover:text-gold">
            Integrity & Ethics →
          </Link>
          <Link href="/library/constitutional-trust" className="text-cream-muted hover:text-gold">
            Constitutional Trust Centre →
          </Link>
          <Link href="/library/stankings-library" className="text-cream-muted hover:text-gold">
            Stankings Library Portal →
          </Link>
          <Link href="/library/constitutional-health" className="text-cream-muted hover:text-gold">
            Constitutional Health Dashboard →
          </Link>
          <Link href="/library/constitution-centre" className="text-cream-muted hover:text-gold">
            Constitution Centre →
          </Link>
          <Link href="/library/custodian-programme" className="text-cream-muted hover:text-gold">
            Custodian Programme →
          </Link>
          <Link href="/library/constitutional-ceremony" className="text-cream-muted hover:text-gold">
            Constitutional Ceremony →
          </Link>
          <Link href="/library/constitutional-convention" className="text-cream-muted hover:text-gold">
            Constitutional Convention →
          </Link>
          <Link href="/library/governance-code" className="text-cream-muted hover:text-gold">
            Volume II — Governance Code →
          </Link>
          <Link href="/library/constitution/founders-charge" className="text-cream-muted hover:text-gold">
            Founder&apos;s Charge →
          </Link>
          <Link href="/library" className="text-cream-muted hover:text-gold">
            The Library →
          </Link>
        </div>
      </div>
    </>
  );
}
