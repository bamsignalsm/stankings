/**
 * Production environment presence checks (no secret values exposed).
 * Used by readiness probes and startup diagnostics.
 */

export function getPublicEnvStatus() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  const isPlaceholder = (v: string) =>
    !v ||
    v.includes("your-") ||
    v.includes("placeholder") ||
    v === "http://localhost:3000";

  return {
    NEXT_PUBLIC_SITE_URL: Boolean(siteUrl) && !isPlaceholder(siteUrl),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(supabaseUrl) && !isPlaceholder(supabaseUrl) && supabaseUrl.startsWith("https://"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(supabaseAnon) && !isPlaceholder(supabaseAnon) && supabaseAnon.length > 20,
  };
}

export function isPublicEnvReady(): boolean {
  const s = getPublicEnvStatus();
  return s.NEXT_PUBLIC_SITE_URL && s.NEXT_PUBLIC_SUPABASE_URL && s.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function getAppVersion(): string {
  return process.env.APP_VERSION ?? process.env.npm_package_version ?? "0.1.0";
}

export function getBuildId(): string {
  return (
    process.env.COOLIFY_BUILD_UUID ??
    process.env.SOURCE_COMMIT ??
    process.env.NEXT_PUBLIC_BUILD_ID ??
    "local"
  );
}
