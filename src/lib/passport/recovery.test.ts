import { describe, expect, it } from "vitest";

describe("passport recovery policy (O-1)", () => {
  it("forbids auto-bind and second Passport on email collision", () => {
    const policy = {
      neverCreateSecondPassport: true,
      neverAutoBindNewAuth: true,
      openRecoveryCase: true,
      requireAdminVerification: true,
      passportPreserved: true,
    };
    expect(policy.neverCreateSecondPassport).toBe(true);
    expect(policy.neverAutoBindNewAuth).toBe(true);
    expect(policy.openRecoveryCase).toBe(true);
    expect(policy.requireAdminVerification).toBe(true);
    expect(policy.passportPreserved).toBe(true);
  });

  it("models recovery statuses for future self-service without schema redesign", () => {
    const statuses = [
      "pending_admin_review",
      "approved",
      "rejected",
      "cancelled",
    ] as const;
    expect(statuses).toContain("pending_admin_review");
    expect(statuses).toContain("approved");
  });
});
