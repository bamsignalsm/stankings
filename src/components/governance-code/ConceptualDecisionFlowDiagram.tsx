import {
  CONCEPTUAL_DECISION_FLOW,
  CONCEPTUAL_DECISION_FLOW_NOTE,
} from "@/lib/governance-code/books/book-i/chapters/decision-flow";

function Arrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <span className="text-gold print:text-gray-600">↓</span>
    </div>
  );
}

export function ConceptualDecisionFlowDiagram({
  dedicatedPage = false,
}: {
  dedicatedPage?: boolean;
}) {
  return (
    <section
      className={`rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white ${
        dedicatedPage ? "print:break-before-page" : ""
      }`}
    >
      <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
        Conceptual Decision Flow
      </p>
      <p className="mb-6 text-sm italic text-cream-muted print:text-gray-700">
        {CONCEPTUAL_DECISION_FLOW_NOTE}
      </p>
      <ol className="mx-auto max-w-lg space-y-0">
        {CONCEPTUAL_DECISION_FLOW.map((step, i) => (
          <li key={step.id}>
            {i > 0 && <Arrow />}
            <div className="rounded border border-gold-subtle bg-ink p-4 print:border-gray-400 print:bg-white">
              <p className="text-xs font-medium uppercase tracking-wide text-gold print:text-gray-700">
                Step {i + 1}
              </p>
              <p className="mt-1 font-serif text-sm font-medium text-cream print:text-black">
                {step.label}
              </p>
              <p className="mt-1 text-xs text-cream-muted print:text-gray-700">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
