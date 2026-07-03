import Link from "next/link";
import {
  GOVERNANCE_MAP_ADVISORY_BODIES,
  GOVERNANCE_MAP_AUTHORITY_STACK,
  GOVERNANCE_MAP_EXECUTIVE_BRANCHES,
  GOVERNANCE_MAP_NOTE,
  GOVERNANCE_MAP_OPERATING_DEPTH,
  GOVERNANCE_MAP_SUPPORTING_LABEL,
} from "@/lib/governance-code/books/book-i/governance-map";

function FlowNode({
  label,
  href,
  variant = "primary",
}: {
  label: string;
  href?: string;
  variant?: "primary" | "branch" | "depth";
}) {
  const base =
    variant === "primary"
      ? "border-gold/40 bg-ink text-cream"
      : variant === "branch"
        ? "border-gold-subtle bg-ink-muted text-cream"
        : "border-gold-subtle/60 bg-ink text-cream-muted";

  const inner = (
    <span
      className={`block rounded border px-4 py-2 text-center text-xs font-medium uppercase tracking-wide print:border-gray-400 print:text-black ${base}`}
    >
      {label}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="block transition hover:opacity-90">
        {inner}
      </Link>
    );
  }
  return inner;
}

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <span className="text-gold print:text-gray-600">▼</span>
    </div>
  );
}

export function GovernanceMapDiagram({ dedicatedPage = false }: { dedicatedPage?: boolean }) {
  return (
    <section
      className={`rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white ${
        dedicatedPage ? "print:break-before-page" : ""
      }`}
    >
      <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
        Governance Map
      </p>
      <p className="mb-8 text-sm italic text-cream-muted print:text-gray-700">{GOVERNANCE_MAP_NOTE}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
        <div className="mx-auto w-full max-w-md">
          {GOVERNANCE_MAP_AUTHORITY_STACK.map((node, i) => (
            <div key={node.id}>
              {i > 0 && <Connector />}
              <FlowNode label={node.label} href={node.href} />
            </div>
          ))}

          <Connector />

          <div className="grid grid-cols-3 gap-2">
            {GOVERNANCE_MAP_EXECUTIVE_BRANCHES.map((branch) => (
              <FlowNode key={branch.id} label={branch.label} variant="branch" />
            ))}
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="col-start-1">
              <Connector />
              {GOVERNANCE_MAP_OPERATING_DEPTH.map((node) => (
                <FlowNode key={node.id} label={node.label} variant="depth" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:min-w-[240px]">
          <p className="mb-4 text-xs uppercase tracking-wider text-gold print:text-gray-600">
            {GOVERNANCE_MAP_SUPPORTING_LABEL}
          </p>
          <ul className="space-y-3 text-sm">
            {GOVERNANCE_MAP_ADVISORY_BODIES.map((body) => (
              <li key={body.name} className="rounded border border-gold-subtle p-3 print:border-gray-300">
                <Link
                  href={body.href}
                  className="font-medium text-cream hover:text-gold-light print:text-black"
                >
                  {body.name}
                </Link>
                <p className="text-cream-muted print:text-gray-700">{body.role}</p>
                {"tag" in body && body.tag && (
                  <p className="mt-1 text-xs text-gold print:text-gray-600">{body.tag}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
