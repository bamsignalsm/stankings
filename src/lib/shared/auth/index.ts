/**
 * Shared auth helpers — institutional membership only (not product auth).
 */

export const HQ_AUTH_PATHS = {
  login: "/auth/login",
  register: "/auth/register",
  verifyEmail: "/auth/verify-email",
  pendingApproval: "/auth/pending-approval",
  unauthorized: "/auth/unauthorized",
  energy: "/energy",
  energyAuth: "/energy/auth",
} as const;

export function isHqMemberPath(pathname: string): boolean {
  return (
    pathname.startsWith("/library/") ||
    pathname.startsWith("/constitution/") ||
    pathname.startsWith("/documents/") ||
    pathname === "/constitution" ||
    pathname.startsWith("/energy")
  );
}

export function getLoginHref(next?: string): string {
  if (!next) return HQ_AUTH_PATHS.login;
  return `${HQ_AUTH_PATHS.login}?next=${encodeURIComponent(next)}`;
}
