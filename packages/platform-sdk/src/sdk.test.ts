import { describe, expect, it } from "vitest";
import { createPlatformSdk, PLATFORM_SDK } from "@stankings/platform-sdk";
import {
  createMemoryIdentityStore,
  createIdentitySubject,
  activateIdentitySubject,
  createIdentityBundle,
} from "@/lib/shared-runtime";
import {
  createMemoryConsentStore,
  createMemoryPassportStore,
  defaultConsentDefinitions,
} from "@/lib/enterprise-platform";

describe("platform sdk v1.3", () => {
  it("exposes passport alongside identity and consent", async () => {
    const sdk = createPlatformSdk({
      platformId: "bamsignal",
      identityStore: createMemoryIdentityStore(),
      consentStore: createMemoryConsentStore(),
      passportStore: createMemoryPassportStore(),
    });
    expect(sdk.version).toBe(PLATFORM_SDK.version);
    expect(sdk.version).toBe("1.3.0");
    expect(sdk.registries().capabilities.some((c) => c.capabilityId === "passport")).toBe(true);
    expect(sdk.configuration().capabilityToggles.passport).toBe(true);
    expect(sdk.health().components.some((c) => c.id === "passport" && c.status === "healthy")).toBe(
      true,
    );

    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_sdkv13subject000001",
      now: "2026-07-22T00:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    await sdk.identity.putSubject(createIdentityBundle(subject));
    const consent = await sdk.consent.grant({
      subjectId: "sid_sdkv13subject000001",
      definition: defaultConsentDefinitions()[0],
    });
    expect(consent.ok).toBe(true);

    const passport = await sdk.passport.issue({
      subjectId: "sid_sdkv13subject000001",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_sdkv13subject000001",
          status: "verified",
        },
      ],
    });
    expect(passport.ok).toBe(true);
    expect(passport.record?.state).toBe("active");

    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: ["identity", "consent", "passport"],
      declaredContractVersions: {
        identity: "1.0.0",
        consent: "1.0.0",
        passport: "1.0.0",
      },
    });
    expect(negotiation.ok).toBe(true);
    expect(negotiation.granted).toEqual(
      expect.arrayContaining(["identity", "consent", "passport"]),
    );
  });
});
