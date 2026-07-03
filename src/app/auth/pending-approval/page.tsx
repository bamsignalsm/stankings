import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
          Awaiting Approval
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream">
          Membership under review
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-cream-muted">
          Your account has been created and your email is verified. A Stankings
          Group administrator must approve your membership before you can access
          institutional documents.
        </p>
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6 text-left text-sm text-cream-muted">
          <p className="mb-2">What happens next:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Your request is reviewed by a super admin</li>
            <li>You will receive access once approved</li>
            <li>Sign in again after approval to enter The Library</li>
          </ul>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-sm border border-gold-subtle px-6 py-2.5 text-sm text-cream transition hover:border-gold/40 hover:text-gold"
          >
            Return home
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm text-cream-muted hover:text-gold"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
