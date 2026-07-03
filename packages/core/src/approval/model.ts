export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface FounderApproval {
  status: ApprovalStatus;
  approvedAt?: string | null;
  approvedBy?: string | null;
  note?: string | null;
}

export function isReleaseApproved(approval: FounderApproval): boolean {
  return approval.status === "approved" && Boolean(approval.approvedAt);
}
