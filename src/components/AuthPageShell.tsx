import { BrandLogo } from "@/components/BrandLogo";

export function AuthPageShell({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <BrandLogo variant="auth" className="justify-center" />
        </div>
        <p className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-gold">
          Member Access
        </p>
        <h1 className="mb-8 text-center font-serif text-3xl font-semibold text-cream">{title}</h1>
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8">{children}</div>
      </div>
    </div>
  );
}
