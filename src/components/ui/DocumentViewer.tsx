export interface DocumentSection {
  heading: string;
  body: string;
}

export function DocumentViewer({
  sections,
  lastUpdated,
}: {
  sections: DocumentSection[];
  lastUpdated?: string;
}) {
  return (
    <article className="space-y-8">
      {lastUpdated ? (
        <p className="text-xs tracking-widest text-cream-muted uppercase">
          Last updated {lastUpdated}
        </p>
      ) : null}
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="mb-3 font-serif text-2xl font-semibold text-cream">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-cream-muted">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
