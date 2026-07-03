/**
 * Conceptual Decision Flow — diagram data
 * Chapter 1 — Session LIB-2026-06-27-012
 *
 * Conceptual flow only. Detailed procedures belong in later Books.
 */

export const CONCEPTUAL_DECISION_FLOW = [
  {
    id: "matter-identified",
    label: "Institutional matter identified",
    description: "A decision requiring governance attention arises",
  },
  {
    id: "constitutional-check",
    label: "Constitutional alignment",
    description: "Matter tested against Constitution, Canons, and Governance Code",
  },
  {
    id: "authority-determination",
    label: "Authority determination",
    description: "Which governance body holds decision authority for this matter",
  },
  {
    id: "governance-deliberation",
    label: "Governance deliberation",
    description: "Relevant governance bodies review within their mandate",
  },
  {
    id: "decision-recorded",
    label: "Decision recorded",
    description: "Outcome documented as Executive Decision, policy, or governance record",
  },
  {
    id: "execution",
    label: "Management execution",
    description: "Management executes within the boundaries set by governance",
  },
] as const;

export const CONCEPTUAL_DECISION_FLOW_NOTE =
  "This is the conceptual flow of major institutional decisions — not committee procedures, voting rules, or meeting agendas." as const;
