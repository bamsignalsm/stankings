export const PROTECTED_PATH_PREFIXES = [
  "/library",
  "/constitution",
  "/documents",
] as const;

import {
  ADMIN_AUTH_PATH,
  ENERGY_HOME_PATH,
  USER_LOGIN_PATH,
  USER_REGISTER_PATH,
  isEnergyPanelPath,
  resolveEnergyNext,
} from "@/lib/auth-paths";

export function isProtectedPath(pathname: string): boolean {
  // Public library index — structure and principles only
  if (pathname === "/library") return false;

  if (pathname.startsWith("/library/")) return true;

  // Public overview at /constitution; member text at /library/constitution
  if (pathname.startsWith("/constitution/")) {
    return true;
  }

  return PROTECTED_PATH_PREFIXES.some(
    (prefix) =>
      prefix !== "/library" &&
      (pathname === prefix || pathname.startsWith(`${prefix}/`))
  );
}

/** @deprecated Use isEnergyPanelPath */
export function isAdminPath(pathname: string): boolean {
  return isEnergyPanelPath(pathname);
}
