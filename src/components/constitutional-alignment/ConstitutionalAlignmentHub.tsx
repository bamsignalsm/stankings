"use client";

import Link from "next/link";
import {
  BOARD_PROPOSAL_REGISTRY,
  getConstitutionalAlignmentStats,
} from "@/lib/constitutional-alignment/registry";
import {
  CAE_ALIGNMENT_QUESTION,
  CAE_COMPLIANCE_GATES,
  CAE_FRAMEWORK,
  CAE_PURPOSE,
  CONSTITUTIONAL_CHAIN_OF_AUTHORITY,
  evaluateProposalReadiness,
  type BoardProposal,
  type ComplianceStatus,
} from "@/lib/frameworks/constitutional-alignment-engine";
import { EXECUTIVE_DECISION_30 } from "@/lib/iki";

function statusIcon(status: ComplianceStatus) {
  if (status === "pass") return "✓";
  if (status === "review") return "◐";
  return "✗";
}

function statusClass(status: ComplianceStatus) {
  const map = {
    pass: "text-forest border-forest/30 bg-forest/10",
    review: "text-gold border-gold/30 bg-gold/10",
    fail: "text-burgundy border-burgundy/30 bg-burgundy/10",
  };
  return map[status];
}

function proposalStatusClass(status: BoardProposal["status"]) {
  const map = {
    approved: "text-forest border-forest/30",
    flagged_for_review: "text-gold border-gold/30",
    under_review: "text-gold border-gold/30",
    declined: "text-burgundy border-burgundy/30",
  };
  return map[status];
}

function CompliancePanel({ proposal }: { proposal: BoardProposal }) {
  const readiness = evaluateProposalReadiness(proposal.compliance);
  const gateMap = new Map(CAE_COMPLIANCE_GATES.map((g) => [g.id, g]));

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{proposal.identifier}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{proposal.title}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {proposal.institution} · {proposal.category}
          </p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${proposalStatusClass(proposal.status)}`}
        >
          {proposal.status.replace(/_/g, " ")}
        </span>
      </div>

      <p className="mb-6 text-sm text-cream-muted">{proposal.summary}</p>

      <div className="mb-6 rounded-lg border border-gold/25 bg-ink p-4">
        <p className="mb-3 text-xs uppercase tracking-widest text-gold">Constitutional Compliance</p>
        <ul className="space-y-2">
          {proposal.compliance.complianceChecks.map((check) => {
            const gate = gateMap.get(check.gateId);
            return (
              <li
                key={check.gateId}
                className={`flex flex-wrap items-start gap-3 rounded border px-3 py-2 text-sm ${statusClass(check.status)}`}
              >
                <span className="font-mono font-semibold">{statusIcon(check.status)}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{gate?.label ?? check.gateId}</p>
                  {check.notes && <p className="mt-0.5 text-xs opacity-90">{check.notes}</p>}
                </div>
                {gate && "href" in gate && gate.href && (
                  <Link href={gate.href} className="text-xs hover:underline">
                    Article →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        {!readiness.ready && (
          <p className="mt-4 text-sm font-medium text-burgundy">
            Flagged for review — {readiness.failed} failed, {readiness.review} require review
          </p>
        )}
      </div>

      <div className="mb-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Articles cited</p>
          <ul className="space-y-1 text-cream-muted">
            {proposal.compliance.constitutionalArticles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Objectives advanced</p>
          <ul className="space-y-1 text-cream-muted">
            {proposal.compliance.objectivesAdvanced.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>

      {proposal.compliance.constitutionalRisks.length > 0 && (
        <div className="mb-4 rounded-lg border border-burgundy/30 bg-burgundy/5 p-4">
          <p className="mb-2 text-xs uppercase tracking-widest text-burgundy">Constitutional risks</p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {proposal.compliance.constitutionalRisks.map((r) => (
              <li key={r}>— {r}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-3">
        {proposal.compliance.canonReferences.map((ref) => (
          <Link key={ref} href={`/library/canon/${ref}`} className="font-mono text-xs text-gold hover:text-gold-light">
            {ref}
          </Link>
        ))}
      </div>

      {proposal.recommendation && (
        <p className="text-sm italic text-cream-muted">{proposal.recommendation}</p>
      )}
    </article>
  );
}

export function ConstitutionalAlignmentHub() {
  const stats = getConstitutionalAlignmentStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution Article II · {CAE_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Alignment Engine
          </h1>
          <p className="mb-6 text-cream-muted">{CAE_PURPOSE}</p>
          <blockquote className="rounded-lg border border-gold/30 bg-gold-subtle px-6 py-4 font-serif text-lg italic text-cream">
            &ldquo;{CAE_ALIGNMENT_QUESTION}&rdquo;
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_30}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Constitutional Chain of Authority
          </h2>
          <ol className="mx-auto max-w-xs space-y-1 text-center text-sm text-cream-muted">
            {CONSTITUTIONAL_CHAIN_OF_AUTHORITY.map((layer, i) => (
              <li key={layer}>
                {i > 0 && <span className="block text-gold/40">↓</span>}
                <span className={i <= 1 ? "font-medium text-cream" : undefined}>{layer}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Compliance Gates</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CAE_COMPLIANCE_GATES.map((gate) => (
              <li
                key={gate.id}
                className="flex items-center justify-between rounded border border-gold-subtle bg-ink-muted px-4 py-3 text-sm"
              >
                <span className="text-cream-muted">{gate.label}</span>
                {gate.frameworkHref && (
                  <Link href={gate.frameworkHref} className="text-xs text-gold hover:text-gold-light">
                    Framework →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} proposals registered</span>
          <span className="text-forest">{stats.approved} approved</span>
          <span className="text-gold">{stats.flagged} flagged</span>
          <span className="text-burgundy">{stats.declined} declined</span>
        </div>

        <section className="space-y-8">
          <h2 className="font-serif text-2xl font-semibold text-cream">Board Proposals</h2>
          {BOARD_PROPOSAL_REGISTRY.map((proposal) => (
            <CompliancePanel key={proposal.identifier} proposal={proposal} />
          ))}
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-ii" className="text-gold hover:text-gold-light">
            Article II →
          </Link>
          <Link
            href="/library/frameworks/constitutional-alignment-engine"
            className="text-cream-muted hover:text-gold"
          >
            CAE Framework →
          </Link>
          <Link href="/library/decision-intelligence" className="text-cream-muted hover:text-gold">
            Decision Intelligence →
          </Link>
        </div>
      </div>
    </>
  );
}
