import Link from "next/link";
import {
  SOURCES_OF_AUTHORITY_NOTE,
  SOURCES_OF_AUTHORITY_STACK,
} from "@/lib/governance-code/books/book-i/chapters/authority-sources";

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <span className="text-gold print:text-gray-600">▼</span>
    </div>
  );
}

export function SourcesOfAuthorityDiagram({ dedicatedPage = false }: { dedicatedPage?: boolean }) {
  return (
    <section
      className={`rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white ${
        dedicatedPage ? "print:break-before-page" : ""
      }`}
    >
      <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
        Sources of Authority
      </p>
      <p className="mb-6 text-sm italic text-cream-muted print:text-gray-700">
        {SOURCES_OF_AUTHORITY_NOTE}
      </p>
      <div className="mx-auto max-w-md">
        {SOURCES_OF_AUTHORITY_STACK.map((node, i) => (
          <div key={node.id}>
            {i > 0 && <Connector />}
            <Link
              href={node.href}
              className="block rounded border border-gold/40 bg-ink px-4 py-3 text-center transition hover:opacity-90 print:border-gray-400"
            >
              <span className="block text-xs font-medium uppercase tracking-wide text-cream print:text-black">
                {node.label}
              </span>
              <span className="mt-1 block text-[10px] text-cream-muted print:text-gray-600">
                {node.subtitle}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
