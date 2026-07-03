import Link from "next/link";
import type { GovernanceBody } from "@/lib/governance-code/types";
import { GOVERNANCE_BODY_TEMPLATE_FIELDS } from "@/lib/governance-code/volume-ii";

const STATUS_LABELS: Record<GovernanceBody["status"], string> = {
  established: "Established",
  forming: "Forming",
  planned: "Planned",
};

function BodySection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">{title}</p>
      <ul className="space-y-1 border-l-2 border-gold/30 pl-4 text-sm text-cream-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function GovernanceBodyCard({ body }: { body: GovernanceBody }) {
  return (
    <article
      id={body.id}
      className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-gold">{body.id}</p>
          <h3 className="font-serif text-xl text-cream">
            {body.href ? (
              <Link href={body.href} className="hover:text-gold-light">
                {body.name}
              </Link>
            ) : (
              body.name
            )}
          </h3>
        </div>
        <span className="rounded border border-gold-subtle px-2 py-1 text-[10px] uppercase tracking-wider text-cream-muted">
          {STATUS_LABELS[body.status]}
        </span>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-cream-muted">{body.purpose}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {body.constitutionalRefs.map((ref) => (
          <span key={ref} className="rounded border border-gold-subtle px-2 py-0.5 font-mono text-[10px] text-cream-muted">
            {ref}
          </span>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BodySection title="Responsibilities" items={body.responsibilities} />
        <BodySection title="Authority" items={body.authority} />
        <BodySection title="Composition" items={body.composition} />
        <BodySection title="Appointment" items={body.appointment} />
        <BodySection title="Meetings" items={body.meetings} />
        <BodySection title="Decision Rules" items={body.decisionRules} />
        <BodySection title="Reporting" items={body.reporting} />
        <BodySection title="Annual Review" items={body.annualReview} />
      </div>
    </article>
  );
}

export function GovernanceBodyTemplateReference() {
  return (
    <div className="rounded-lg border border-gold/20 bg-ink p-4">
      <p className="mb-2 text-xs uppercase tracking-wider text-gold">Standard Body Template</p>
      <div className="flex flex-wrap gap-2">
        {GOVERNANCE_BODY_TEMPLATE_FIELDS.map((field) => (
          <span
            key={field}
            className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted"
          >
            {field}
          </span>
        ))}
      </div>
    </div>
  );
}
