/**
 * Server helpers for post-auth destination resolution.
 * Canonical logic lives in capability-routing.ts.
 */

import { createClient } from "@/lib/supabase/server";
import {
  resolvePostAuthDestination as resolveWithClient,
} from "./capability-routing";

export {
  applyCapabilityNext,
  resolveCapabilityRoute,
  CAPABILITY_ROUTE_PATHS,
  type CapabilityRoute,
} from "./capability-routing";

export async function resolvePostAuthDestination(
  userId: string,
  options?: { email?: string | null; next?: string | null }
): Promise<string> {
  const supabase = await createClient();
  return resolveWithClient(supabase, userId, options);
}
