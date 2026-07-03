/** Public member authentication */
export const USER_LOGIN_PATH = "/auth/login";
export const USER_REGISTER_PATH = "/auth/register";

/** Discreet energy console — login at /energy/auth; panel at /energy and below */
export const ADMIN_AUTH_PATH = "/energy/auth";
export const ENERGY_HOME_PATH = "/energy";

export const AUTH_CALLBACK_PATH = "/auth/callback";

export function loginUrl(next?: string): string {
  if (!next) return USER_LOGIN_PATH;
  return `${USER_LOGIN_PATH}?next=${encodeURIComponent(next)}`;
}

export function registerUrl(next?: string): string {
  if (!next) return USER_REGISTER_PATH;
  return `${USER_REGISTER_PATH}?next=${encodeURIComponent(next)}`;
}

export function adminAuthUrl(next?: string): string {
  if (!next) return ADMIN_AUTH_PATH;
  return `${ADMIN_AUTH_PATH}?next=${encodeURIComponent(next)}`;
}

export function isEnergyPanelPath(pathname: string): boolean {
  if (pathname === ADMIN_AUTH_PATH) return false;
  return (
    pathname === ENERGY_HOME_PATH ||
    pathname.startsWith(`${ENERGY_HOME_PATH}/`)
  );
}

export function resolveEnergyNext(next: string | null | undefined): string {
  if (!next) return ENERGY_HOME_PATH;
  if (
    next === ENERGY_HOME_PATH ||
    (next.startsWith(`${ENERGY_HOME_PATH}/`) &&
      !next.startsWith(`${ADMIN_AUTH_PATH}`))
  ) {
    return next;
  }
  return ENERGY_HOME_PATH;
}
