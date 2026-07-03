import Link from "next/link";
import {
  GOVERNANCE_BODIES,
  GOVERNANCE_BODY_TEMPLATE_FIELDS,
  GOVERNANCE_CODE_VERSION,
} from "@/lib/governance-code";
import { GC_FRAMEWORK } from "@/lib/frameworks/governance-code-portal";
import { EXECUTIVE_DECISION_46 } from "@/lib/iki";
import {
  GovernanceBodyCard,
  GovernanceBodyTemplateReference,
} from "@/components/governance-code/GovernanceBodyCard";
import { getBookIStats } from "@/lib/governance-code/bodies/register";

export function BookOneGovernanceBodiesPanel() {
  const stats = getBookIStats();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Volume II · Foundational Draft v{GOVERNANCE_CODE_VERSION} · Book I · {GC_FRAMEWORK.identifier}
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream md:text-4xl">
          Governance Bodies
        </h1>
        <p className="mx-auto max-w-2xl text-cream-muted">
          Institutions responsible for governing Stankings Group — no ambiguity in purpose,
          authority, or accountability.
        </p>
      </div>

      <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
        {EXECUTIVE_DECISION_46}
      </blockquote>

      <GovernanceBodyTemplateReference />

      <section className="my-12 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Bodies", value: stats.bodies },
          { label: "Established", value: stats.established },
          { label: "Forming", value: stats.forming },
          { label: "Planned", value: stats.planned },
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

      <p className="mb-8 text-sm text-cream-muted">
        Each body follows the standard template:{" "}
        {GOVERNANCE_BODY_TEMPLATE_FIELDS.join(" · ")}.
      </p>

      <div className="space-y-12">
        {GOVERNANCE_BODIES.map((body) => (
          <GovernanceBodyCard key={body.id} body={body} />
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
        <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
          Governance Code Portal →
        </Link>
        <Link href="/library/constitution" className="text-gold hover:text-gold-light">
          Volume I — Constitution →
        </Link>
        <Link href="/library/constitutional-convention" className="text-gold hover:text-gold-light">
          Constitutional Convention →
        </Link>
      </div>
    </section>
  );
}

import { GOVERNANCE_STACK } from "@/lib/governance-code/volume-ii";

export function GovernanceCodeStackDiagram() {
  return (
    <pre className="mx-auto max-w-sm overflow-x-auto rounded-lg border border-gold-subtle bg-ink-muted p-6 text-center font-mono text-xs leading-loose text-cream-muted">
      {GOVERNANCE_STACK.join("\n        ↓\n")}
    </pre>
  );
}
