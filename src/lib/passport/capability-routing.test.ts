import { describe, expect, it } from "vitest";
import {
  applyCapabilityNext,
  CAPABILITY_ROUTE_PATHS,
} from "./capability-routing";

describe("capability routing (O-5)", () => {
  it("never downgrades applicant home to library via next=", () => {
    expect(
      applyCapabilityNext("/passport/applicant", "/library")
    ).toBe("/passport/applicant");
  });

  it("allows deep links within applicant zone", () => {
    expect(
      applyCapabilityNext("/passport/applicant", "/passport/recovery")
    ).toBe("/passport/recovery");
  });

  it("routes employee deep links under /skl only", () => {
    expect(applyCapabilityNext("/skl", "/skl/tasks")).toBe("/skl/tasks");
    expect(applyCapabilityNext("/skl", "/library")).toBe("/skl");
  });

  it("keeps energy deep links inside energy", () => {
    expect(applyCapabilityNext("/energy", "/energy/employees")).toBe(
      "/energy/employees"
    );
    expect(applyCapabilityNext("/energy", "/library")).toBe("/energy");
  });

  it("exposes priority destinations", () => {
    expect(CAPABILITY_ROUTE_PATHS.energy).toBe("/energy");
    expect(CAPABILITY_ROUTE_PATHS.applicant).toBe("/passport/applicant");
    expect(CAPABILITY_ROUTE_PATHS.skl).toBe("/skl");
    expect(CAPABILITY_ROUTE_PATHS.library).toBe("/library");
    expect(CAPABILITY_ROUTE_PATHS.recovery).toBe("/passport/recovery");
  });
});
