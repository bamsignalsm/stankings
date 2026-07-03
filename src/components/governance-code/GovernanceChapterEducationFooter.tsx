import Link from "next/link";
import type { ChapterEducationFooterArchitecture } from "@/lib/editorial/chapter-education";
import { CHAPTER_EDUCATION_FOOTER_BLOCKS } from "@/lib/editorial/chapter-education";

export function GovernanceChapterEducationFooter({
  footer,
  mode = "architecture",
}: {
  footer: ChapterEducationFooterArchitecture;
  mode?: "architecture" | "published";
}) {
  const isArchitecture = mode === "architecture";

  return (
    <section
      id="chapter-education-footer"
      className="scroll-mt-28 space-y-6 rounded-lg border border-gold/30 bg-gold-subtle/20 p-6 print:border print:bg-gray-50"
    >
      <header>
        <p className="mb-1 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          Chapter Education Footer · CEF-001
        </p>
        <h2 className="font-serif text-xl font-semibold text-cream print:text-black">
          Teaching Layer
        </h2>
        {isArchitecture && (
          <p className="mt-2 text-sm text-cream-muted print:text-gray-700">
            Architecture scaffold — prose drafted after chapter architecture approval.
          </p>
        )}
      </header>

      <FooterBlock
        id="reflection-questions"
        title={CHAPTER_EDUCATION_FOOTER_BLOCKS[0]}
        isArchitecture={isArchitecture}
      >
        <ul className="list-disc space-y-2 pl-5 text-sm text-cream-muted print:text-gray-800">
          {footer.reflectionQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </FooterBlock>

      <FooterBlock
        id="practical-example"
        title={CHAPTER_EDUCATION_FOOTER_BLOCKS[1]}
        isArchitecture={isArchitecture}
      >
        <p className="mb-2 text-sm font-medium text-cream print:text-black">
          {footer.practicalExample.title}
        </p>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          {footer.practicalExample.scenario}
        </p>
        {isArchitecture && (
          <>
            <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
              Fields to draft
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-cream-muted print:text-gray-800">
              {footer.practicalExample.fieldsToDraft.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}
      </FooterBlock>

      <FooterBlock
        id="related-reading"
        title={CHAPTER_EDUCATION_FOOTER_BLOCKS[2]}
        isArchitecture={isArchitecture}
      >
        <LinkList items={footer.relatedReading} />
      </FooterBlock>

      <div className="grid gap-6 md:grid-cols-2">
        <FooterBlock
          id="related-constitution"
          title={CHAPTER_EDUCATION_FOOTER_BLOCKS[3]}
          isArchitecture={isArchitecture}
        >
          <LinkList items={footer.constitutionArticles} />
        </FooterBlock>

        <FooterBlock
          id="related-canons"
          title={CHAPTER_EDUCATION_FOOTER_BLOCKS[4]}
          isArchitecture={isArchitecture}
        >
          <LinkList items={footer.canons} />
        </FooterBlock>

        <FooterBlock
          id="related-knowledge-objects"
          title={CHAPTER_EDUCATION_FOOTER_BLOCKS[5]}
          isArchitecture={isArchitecture}
        >
          <LinkList items={footer.knowledgeObjects} />
        </FooterBlock>

        <FooterBlock
          id="related-sessions"
          title={CHAPTER_EDUCATION_FOOTER_BLOCKS[6]}
          isArchitecture={isArchitecture}
        >
          <LinkList items={footer.librarySessions} />
        </FooterBlock>
      </div>
    </section>
  );
}

function FooterBlock({
  id,
  title,
  children,
  isArchitecture,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  isArchitecture: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-5 print:break-inside-avoid print:border print:bg-white"
    >
      <h3 className="mb-3 font-serif text-lg font-semibold text-cream print:text-black">{title}</h3>
      {isArchitecture && (
        <p className="mb-3 text-[10px] uppercase tracking-wider text-amber-200/90 print:text-gray-600">
          Architecture only
        </p>
      )}
      {children}
    </section>
  );
}

function LinkList({
  items,
}: {
  items: { label: string; href: string; identifier: string }[];
}) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.identifier}>
          <Link href={item.href} className="text-gold hover:text-gold-light print:text-black">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
