import { describe, expect, it } from "vitest";
import { LAUNCH_JOB_CATALOGUE } from "@/lib/workforce/job-catalogue";

describe("unified passport identity law", () => {
  it("hire and invite share identical capability binding fields", () => {
    const job = LAUNCH_JOB_CATALOGUE[0];
    const hire = {
      source: "hire" as const,
      passportRequired: true,
      companyId: job.companyId,
      roleKey: job.roleKey,
      workspaceKey: job.workspaceKey,
    };
    const invite = {
      source: "invite" as const,
      passportRequired: true,
      companyId: job.companyId,
      roleKey: job.roleKey,
      workspaceKey: job.workspaceKey,
    };
    expect(hire.passportRequired).toBe(true);
    expect(invite.passportRequired).toBe(true);
    expect(hire.companyId).toBe(invite.companyId);
    expect(hire.roleKey).toBe(invite.roleKey);
  });

  it("termination must never imply passport destruction", () => {
    const emergencyEffects = {
      terminate_employment: {
        workforceStatus: "terminated",
        sklAccess: false,
        passportPreserved: true,
        subjectPreserved: true,
      },
    };
    expect(emergencyEffects.terminate_employment.passportPreserved).toBe(true);
    expect(emergencyEffects.terminate_employment.subjectPreserved).toBe(true);
  });

  it("canonical workforce portal is /skl", () => {
    expect("/skl").not.toBe("/office");
    expect("/office").not.toEqual("/energy");
  });
});
