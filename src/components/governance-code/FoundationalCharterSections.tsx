import Link from "next/link";
import { GovernanceMapDiagram } from "@/components/governance-code/GovernanceMapDiagram";
import {
  BOOK_I_FC_SECTION_BOOK_STRUCTURE,
  BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY,
  BOOK_I_FC_SECTION_GOVERNANCE_PHILOSOPHY,
  BOOK_I_FC_SECTION_PRINCIPLE,
  BOOK_I_FC_SECTION_PUBLICATION_STATUS,
  BOOK_I_FC_SECTION_PURPOSE,
  BOOK_I_FC_SECTION_READING_GUIDE,
  BOOK_I_FC_SECTION_RELATED_RESOURCES,
  BOOK_I_FC_SECTION_SCOPE,
  BOOK_I_FC_SECTION_SUCCESS_CRITERIA,
  BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS,
  BOOK_I_FOUNDATIONAL_CHARTER_VERSION,
  type FoundationalCharterSectionBlock,
} from "@/lib/governance-code/books/book-i/foundational-charter-sections";

function SectionShell({
  section,
  children,
  className = "",
}: {
  section: FoundationalCharterSectionBlock;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={section.anchor}
      data-section-version={section.version}
      data-section-status={section.status}
      className={`scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:break-inside-avoid print:border print:bg-white ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="mb-1 font-mono text-xs text-gold print:text-gray-600">
            Section {section.number}
          </p>
          <h2 className="font-serif text-xl font-semibold text-cream print:text-black">
            {section.title}
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-cream-muted print:text-gray-500">
          v{section.version} · {section.status}
        </p>
      </div>
      {children}
    </section>
  );
}

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-cream-muted print:text-gray-800">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </div>
  );
}

export function FoundationalCharterSections() {
  return (
    <div className="space-y-6">
      <SectionShell section={BOOK_I_FC_SECTION_PURPOSE}>
        <ProseBlock paragraphs={BOOK_I_FC_SECTION_PURPOSE.paragraphs} />
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_SCOPE}>
        <p className="mb-3 text-sm font-medium text-cream print:text-black">This Book includes:</p>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_SCOPE.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mb-3 text-sm font-medium text-cream print:text-black">
          This Book does <strong className="font-semibold">not</strong> include:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_SCOPE.excludes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-cream-muted print:text-gray-800">{BOOK_I_FC_SECTION_SCOPE.closing}</p>
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY}>
        <p className="mb-3 text-sm text-cream-muted print:text-gray-800">
          This Book derives its authority from:
        </p>
        <ul className="mb-6 space-y-2 text-sm">
          {BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY.authoritySources.map((src) => (
            <li key={src.identifier}>
              <Link href={src.href} className="text-gold hover:text-gold-light print:text-black">
                {src.label}
              </Link>
            </li>
          ))}
        </ul>
        <ProseBlock paragraphs={BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY.paragraphs} />
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_GOVERNANCE_PHILOSOPHY}>
        <ul className="space-y-3 text-sm leading-relaxed text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_GOVERNANCE_PHILOSOPHY.principles.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell
        section={BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS[4]}
        className="print:break-before-page"
      >
        <GovernanceMapDiagram dedicatedPage />
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_BOOK_STRUCTURE}>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_BOOK_STRUCTURE.intro}
        </p>
        <div className="space-y-4">
          {BOOK_I_FC_SECTION_BOOK_STRUCTURE.parts.map((part) => (
            <div key={part.part} className="border-l-2 border-gold-subtle pl-4">
              <p className="text-sm font-medium text-cream print:text-black">
                <Link href={part.href} className="hover:text-gold-light">
                  {part.part} — {part.title}
                </Link>
              </p>
              <p className="mt-1 text-sm text-cream-muted print:text-gray-800">{part.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_BOOK_STRUCTURE.closing}
        </p>
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_READING_GUIDE}>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_READING_GUIDE.intro}
        </p>
        <ul className="space-y-3 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_READING_GUIDE.entries.map((entry) => (
            <li key={entry.audience}>
              <span className="font-medium text-cream print:text-black">{entry.audience}</span>
              {" — "}
              {entry.guidance}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_RELATED_RESOURCES}>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_RELATED_RESOURCES.intro}
        </p>
        <ul className="mb-4 space-y-2 text-sm">
          {BOOK_I_FC_SECTION_RELATED_RESOURCES.resources.map((r) => (
            <li key={r.identifier}>
              <Link href={r.href} className="text-gold hover:text-gold-light print:text-black">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_RELATED_RESOURCES.closing}
        </p>
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_PUBLICATION_STATUS}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {BOOK_I_FC_SECTION_PUBLICATION_STATUS.rows.map((row) => (
                <tr key={row.field} className="border-b border-gold-subtle/40">
                  <th className="py-3 pr-6 text-left font-medium text-cream print:text-black">
                    {row.field}
                  </th>
                  <td className="py-3 text-cream-muted print:text-gray-800">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell section={BOOK_I_FC_SECTION_SUCCESS_CRITERIA}>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_SUCCESS_CRITERIA.intro}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_FC_SECTION_SUCCESS_CRITERIA.criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </SectionShell>

      <blockquote
        id={BOOK_I_FC_SECTION_PRINCIPLE.anchor}
        className="rounded-lg border border-gold/30 bg-gold-subtle p-6 print:border print:bg-gray-50"
      >
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          {BOOK_I_FC_SECTION_PRINCIPLE.title}
        </p>
        <p className="font-serif text-lg italic leading-relaxed text-cream print:text-black">
          {BOOK_I_FC_SECTION_PRINCIPLE.text}
        </p>
      </blockquote>
    </div>
  );
}

export { BOOK_I_FOUNDATIONAL_CHARTER_VERSION, BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS };
