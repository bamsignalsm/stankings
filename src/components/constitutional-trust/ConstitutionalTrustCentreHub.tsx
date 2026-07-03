import Link from "next/link";
import { TrustNetworkGraph } from "@/components/constitutional-trust/TrustNetworkGraph";
import { ARTICLE_XII } from "@/lib/constitution/articles/article-xii";
import { DATA_GOVERNANCE_DOMAINS } from "@/lib/constitution/articles/article-xii";
import {
  AI_GOVERNANCE_DOMAINS,
  CIGF_STANDARDS,
  CTC_FRAMEWORK,
  CTC_PURPOSE,
  IDENTITY_GOVERNANCE_DOMAINS,
  PASSPORT_PROFILE_DOMAINS,
  TRUST_GRAPH_DOMAINS,
} from "@/lib/frameworks/constitutional-trust-centre";
import {
  AI_GOVERNANCE_RECORDS,
  API_ACCESS_LOG,
  CONSENT_RECORDS,
  getTrustCentreStats,
  getTrustNetworkGraph,
  PASSPORT_PROFILE_SAMPLE,
} from "@/lib/constitutional-trust";
import { EXECUTIVE_DECISION_40 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function ConstitutionalTrustCentreHub() {
  const stats = getTrustCentreStats();
  const graph = getTrustNetworkGraph();
  const passport = PASSPORT_PROFILE_SAMPLE;

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partIV.part} · {partIV.title} · {ARTICLE_XII.article} · {CTC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Trust Centre
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CTC_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            One identity. One trust network. Constitutional obligation — not IT policy.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_40}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-6">
          {[
            { label: "Institutions", value: stats.institutions },
            { label: "Identity APIs", value: stats.identityApis },
            { label: "Trust APIs", value: stats.trustApis },
            { label: "Active Consents", value: stats.consentActive },
            { label: "AI Models", value: stats.aiModels },
            { label: "API Logs", value: stats.apiLogs },
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
            Stankings Trust Network
          </h2>
          <TrustNetworkGraph nodes={graph.nodes} edges={graph.edges} />
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-wider text-gold">YIKE Passport — Sample Profile</p>
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-serif text-cream">{passport.trustScore}/5</p>
              <p className="text-xs text-cream-muted">Trust Score</p>
            </div>
            <div>
              <p className="text-sm text-cream">{passport.verificationLevel}</p>
              <p className="text-xs text-cream-muted">Verification</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-cream">{passport.institutionsContributing}</p>
              <p className="text-xs text-cream-muted">Institutions</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-cream">{passport.innovationScore ?? 0}</p>
              <p className="text-xs text-cream-muted">Innovation Score</p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-cream-muted">{passport.passportId}</p>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Consent Records</h2>
            <ul className="space-y-3">
              {CONSENT_RECORDS.map((c) => (
                <li key={c.consentId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-xs text-gold">{c.consentId}</p>
                  <p className="text-cream">{c.purpose}</p>
                  <p className="text-cream-muted">
                    {c.institution} · {c.status} · {c.grantedAt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">AI Governance</h2>
            <ul className="space-y-3">
              {AI_GOVERNANCE_RECORDS.map((ai) => (
                <li key={ai.modelId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm">
                  <p className="font-mono text-xs text-gold">{ai.modelId}</p>
                  <p className="font-medium text-cream">{ai.name}</p>
                  <p className="text-cream-muted">{ai.purpose}</p>
                  <p className="mt-1 text-xs text-gold">
                    {ai.riskLevel} risk · {ai.status} · oversight: {ai.humanOversight}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">API Access Log</h2>
          <ul className="space-y-2">
            {API_ACCESS_LOG.map((log) => (
              <li
                key={log.logId}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-gold-subtle bg-ink-muted px-4 py-3 text-sm"
              >
                <span className="font-mono text-xs text-gold">{log.logId}</span>
                <span className="text-cream">{log.api}</span>
                <span className="text-cream-muted">{log.consumer}</span>
                <span className="text-xs text-cream-muted">{log.timestamp.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Identity Governance", items: IDENTITY_GOVERNANCE_DOMAINS },
            { title: "Passport Profile", items: PASSPORT_PROFILE_DOMAINS },
            { title: "Trust Graph", items: TRUST_GRAPH_DOMAINS },
            { title: "AI Governance", items: AI_GOVERNANCE_DOMAINS },
            { title: "Data Governance (§ 12.08)", items: DATA_GOVERNANCE_DOMAINS },
            { title: "CIGF Standards (ED 40)", items: CIGF_STANDARDS },
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
          <Link href="/library/constitution/article-xii" className="text-gold hover:text-gold-light">
            Article XII →
          </Link>
          <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
            Stankings Library Portal →
          </Link>
          <Link href="/library/integrity-ethics" className="text-gold hover:text-gold-light">
            Integrity & Ethics →
          </Link>
          <Link href="/library/platforms" className="text-gold hover:text-gold-light">
            Platform Registry →
          </Link>
          <Link
            href="/library/frameworks/constitutional-trust-centre"
            className="text-gold hover:text-gold-light"
          >
            {CTC_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
