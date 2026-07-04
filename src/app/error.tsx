"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface digest for support; avoid logging secrets
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="mb-2 text-xs tracking-widest text-gold uppercase">500</p>
      <h1 className="mb-4 font-serif text-4xl font-semibold text-cream">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-cream-muted">
        An unexpected error occurred. Try again, or return to the institutional homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-gold-subtle px-6 py-2.5 text-sm text-cream transition hover:border-gold/40"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-sm border border-gold bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-light"
        >
          Return Home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 font-mono text-xs text-cream-muted">Ref: {error.digest}</p>
      ) : null}
    </div>
  );
}
