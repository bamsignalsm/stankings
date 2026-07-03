/**
 * Volume I freeze — Constitutional Convention review window.
 * Text frozen; presentation, indexing, and cross-linking may strengthen.
 */

export const VOLUME_I_FREEZE = {
  version: "1.0",
  frozenAt: "2026-06-27",
  frozenBy: "Library Council",
  status: "convention_review" as const,
  articlesFrozen: 17,
  textMutable: false,
  presentationMutable: true,
  schedulesStatus: "operational_attachments",
  articleXviiiStatus: "forthcoming",
  mandate:
    "Volume I text is frozen for Constitutional Convention review. Strengthen presentation, indexing, and cross-linking. Do not rewrite Articles I–XVII without amendment discipline per Article XV.",
  nextPhase: "Convention verification complete → Article XVIII (Schedules seal) → Volume II Governance Code",
} as const;

export type VolumeIFreezeStatus = (typeof VOLUME_I_FREEZE)["status"];
