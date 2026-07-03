import { CONVENTION_PHASES } from "@/lib/constitutional-convention/phases";
import { getConventionAuditStats, CONSTITUTIONAL_AUDITS } from "@/lib/constitutional-convention/audit";
import { ARTICLE_CROSS_LINKS } from "@/lib/constitutional-convention/cross-links";
import { ARTICLE_COMMENTARY } from "@/lib/constitutional-convention/commentary";
import { CONSTITUTIONAL_DIAGRAMS } from "@/lib/constitutional-convention/diagrams";
import { CONSTITUTIONAL_INDEX } from "@/lib/constitutional-convention/index-terms";
import { CONSTITUTIONAL_DEFINITIONS_EXTENDED } from "@/lib/constitutional-convention/definitions";
import { CONSTITUTIONAL_LEARNING } from "@/lib/constitutional-convention/learning";

import { VOLUME_I_FREEZE } from "@/lib/constitutional-convention/freeze";

export const CONVENTION_IDENTIFIER = "CONVENTION-VOL-I-001";

export const VOLUME_I_STATUS = {
  version: VOLUME_I_FREEZE.version,
  frozen: true,
  frozenAt: VOLUME_I_FREEZE.frozenAt,
  conventionActive: true,
  conventionPhase: VOLUME_I_FREEZE.status,
  articlesComplete: VOLUME_I_FREEZE.articlesFrozen,
  schedulesOperational: true,
  commentaryVolume: "forming",
  textMutable: VOLUME_I_FREEZE.textMutable,
  nextMilestone: VOLUME_I_FREEZE.nextPhase,
} as const;

export function getConventionStats() {
  const audit = getConventionAuditStats();
  return {
    ...audit,
    phases: CONVENTION_PHASES.length,
    phasesActive: CONVENTION_PHASES.filter((p) => p.status === "active").length,
    crossLinkedArticles: Object.keys(ARTICLE_CROSS_LINKS).length,
    commentaryArticles: ARTICLE_COMMENTARY.length,
    diagrams: CONSTITUTIONAL_DIAGRAMS.length,
    indexTerms: CONSTITUTIONAL_INDEX.length,
    definitions: CONSTITUTIONAL_DEFINITIONS_EXTENDED.length,
    learningModules: CONSTITUTIONAL_LEARNING.length,
    volumeStatus: VOLUME_I_STATUS,
  };
}

export { CONSTITUTIONAL_AUDITS };
