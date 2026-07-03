import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream">
          Access denied
        </h1>
        <p className="mb-8 text-cream-muted">
          The admin area is restricted to approved super administrators.
        </p>
        <Link href="/" className="text-gold hover:text-gold-light">
          Return home
        </Link>
      </div>
    </div>
  );
}
