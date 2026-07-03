export function VolumeOpeningQuote({ quote }: { quote: string }) {
  return (
    <blockquote className="mb-12 border-l-2 border-gold/50 pl-6 font-serif text-xl italic leading-relaxed text-cream/90 md:text-2xl">
      &ldquo;{quote}&rdquo;
    </blockquote>
  );
}
