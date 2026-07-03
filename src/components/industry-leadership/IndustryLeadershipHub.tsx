"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_024_DUAL_MISSION,
  CANON_024_STANDARD_MOTTO,
  CANON_024_STANDARDS_BY_INSTITUTION,
  CANON_024_TRUST_AMBITION,
} from "@/lib/canon/canon-024";
import {
  STANDARD_TEST,
  type IndustryLeadershipProfile,
  type IndustryStandardProgress,
} from "@/lib/frameworks/industry-leadership-dashboard";
import {
  getIndustryLeadershipStats,
  INDUSTRY_LEADERSHIP_REGISTRY,
  searchIndustryLeadership,
} from "@/lib/industry-leadership/registry";
import { EXECUTIVE_DECISION_26 } from "@/lib/iki";

function statusStyle(status: IndustryStandardProgress["status"]) {
  const map: Record<IndustryStandardProgress["status"], string> = {
    not_started: "text-cream-muted border-gold-subtle",
    in_progress: "text-gold border-gold/30 bg-gold/10",
    established: "text-forest border-forest/30 bg-forest/10",
    industry_reference: "text-gold border-gold/40 bg-gold/15",
  };
  return map[status];
}

function trendSymbol(trend?: "up" | "stable" | "down") {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
}

function ProfileCard({ profile }: { profile: IndustryLeadershipProfile }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{profile.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            <Link
              href={`/library/ecosystem/${profile.institutionSlug}`}
              className="hover:text-gold-light"
            >
              {profile.institution}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-cream-muted">
            {profile.industry} · {profile.reportingYear}
          </p>
        </div>
        {profile.stewardshipReportRef && (
          <Link
            href="/library/legacy"
            className="rounded border border-gold/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold hover:text-gold-light"
          >
            {profile.stewardshipReportRef}
          </Link>
        )}
      </div>

      <p className="mb-6 text-sm italic text-cream-muted">{profile.standardSetterGoal}</p>

      <p className="mb-3 text-xs uppercase tracking-widest text-gold">
        Industry standards we intend to raise
      </p>
      <ul className="mb-6 space-y-3">
        {profile.standardsToRaise.map((s) => (
          <li
            key={s.standardId}
            className="flex flex-wrap items-start justify-between gap-3 border-b border-gold-subtle/50 pb-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm text-cream">{s.label}</p>
              <p className="mt-1 text-xs text-cream-muted">
                {trendSymbol(s.trend)} {s.progressNote}
              </p>
            </div>
            <span
              className={`shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(s.status)}`}
            >
              {s.status.replace(/_/g, " ")}
            </span>
          </li>
        ))}
      </ul>

      {profile.industryInfluenceHighlights.length > 0 && (
        <ul className="mb-4 space-y-1 text-sm text-cream-muted">
          {profile.industryInfluenceHighlights.map((h) => (
            <li key={h}>· {h}</li>
          ))}
        </ul>
      )}

      <p className="text-sm italic text-cream-muted">{profile.stewardshipReflection}</p>
    </article>
  );
}

export function IndustryLeadershipHub() {
  const [query, setQuery] = useState("");
  const stats = getIndustryLeadershipStats();
  const profiles = useMemo(() => searchIndustryLeadership(query), [query]);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-024 · Volume 0 Pillar
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Industry Leadership Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Standards to raise, progress to measure — every institution improves the industry
            it enters.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Institution profiles", value: stats.profiles },
            { label: "Standards tracked", value: stats.standards },
            { label: "Established", value: stats.established },
            { label: "In progress", value: stats.inProgress },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-gold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-center font-serif italic text-cream">
          &ldquo;{CANON_024_TRUST_AMBITION}&rdquo;
        </blockquote>

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5 text-center">
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">Mission One</p>
            <p className="font-serif text-cream">{CANON_024_DUAL_MISSION.missionOne}</p>
          </div>
          <div className="rounded-lg border border-gold/30 bg-gold-subtle p-5 text-center">
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">Mission Two</p>
            <p className="font-serif text-cream">{CANON_024_DUAL_MISSION.missionTwo}</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Standard Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{STANDARD_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_024_STANDARD_MOTTO}
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_26}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Standard setters across the ecosystem
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CANON_024_STANDARDS_BY_INSTITUTION.map((inst) => (
              <li
                key={inst.slug}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <Link
                  href={`/library/ecosystem/${inst.slug}`}
                  className="mb-1 block font-serif text-lg font-semibold text-cream hover:text-gold"
                >
                  {inst.institution}
                </Link>
                <p className="mb-3 text-xs text-cream-muted">{inst.industry}</p>
                <p className="mb-3 text-sm italic text-cream-muted">{inst.standardSetterGoal}</p>
                <ul className="flex flex-wrap gap-2">
                  {inst.standardsToRaise.map((s) => (
                    <li
                      key={s}
                      className="rounded border border-gold-subtle px-2 py-0.5 text-[10px] text-cream-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Annual industry leadership progress
          </h2>
          <input
            type="search"
            placeholder="Search institutions, standards, industries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="grid gap-8">
            {profiles.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
          {profiles.length === 0 && (
            <p className="py-8 text-center text-cream-muted">No profiles match your search.</p>
          )}
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            Things work better because we are here
          </p>
          <p className="text-sm italic text-cream-muted">
            Not the biggest marketplace, fintech, or logistics company — organizations that
            reshape what customers and competitors expect. Progress reported in Annual
            Stewardship Reports alongside institutional performance and societal contribution.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/canon/CANON-024" className="text-gold hover:text-gold-light">
              CANON-024 →
            </Link>
            <Link href="/library/legacy" className="text-cream-muted hover:text-gold">
              Legacy Dashboard →
            </Link>
            <Link href="/library/excellence" className="text-cream-muted hover:text-gold">
              Excellence Standards →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
