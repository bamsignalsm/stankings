/**
 * Support authority — consumes shared support registry.
 */

import {
  SUPPORT_REGISTRY,
  SUPPORT_FAQS,
  SUPPORT_KNOWLEDGE_BASE,
  getSupportQueue as getSharedQueue,
  type SupportQueueRecord,
} from "@/lib/shared/support/registry";

export type SupportQueue = SupportQueueRecord & { slug: string };

export const SUPPORT_QUEUES: SupportQueue[] = SUPPORT_REGISTRY.map((q) => ({
  ...q,
  slug: q.id,
}));

export { SUPPORT_FAQS, SUPPORT_KNOWLEDGE_BASE };

export function getSupportQueue(slug: string): SupportQueue | undefined {
  const q = getSharedQueue(slug);
  return q ? { ...q, slug: q.id } : undefined;
}
