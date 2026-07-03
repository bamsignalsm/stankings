import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="mb-2 text-xs uppercase tracking-widest text-gold">404</p>
      <h1 className="mb-4 font-serif text-4xl font-semibold text-cream">
        Page Not Found
      </h1>
      <p className="mb-8 text-cream-muted">
        The page you are looking for does not exist in our institution.
      </p>
      <Link
        href="/"
        className="rounded-sm border border-gold bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-light"
      >
        Return Home
      </Link>
    </div>
  );
}
