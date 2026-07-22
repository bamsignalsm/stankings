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
  createMemoryTrustStore,
  defaultConsentDefinitions,
} from "@/lib/enterprise-platform";

describe("platform sdk v1.4", () => {
  it("exposes trust alongside identity, consent, and passport", async () => {
    const sdk = createPlatformSdk({
      platformId: "bamsignal",
      identityStore: createMemoryIdentityStore(),
      consentStore: createMemoryConsentStore(),
      passportStore: createMemoryPassportStore(),
      trustStore: createMemoryTrustStore(),
    });
    expect(sdk.version).toBe(PLATFORM_SDK.version);
    expect(sdk.version).toBe("1.4.0");
    expect(sdk.registries().capabilities.some((c) => c.capabilityId === "trust")).toBe(true);
    expect(sdk.configuration().capabilityToggles.trust).toBe(true);
    expect(sdk.health().components.some((c) => c.id === "trust" && c.status === "healthy")).toBe(
      true,
    );

    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_sdkv14subject000001",
      now: "2026-07-22T00:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    await sdk.identity.putSubject(createIdentityBundle(subject));

    const consent = await sdk.consent.grant({
      subjectId: "sid_sdkv14subject000001",
      definition: defaultConsentDefinitions()[0],
    });
    expect(consent.ok).toBe(true);

    const passport = await sdk.passport.issue({
      subjectId: "sid_sdkv14subject000001",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_sdkv14subject000001",
          status: "verified",
        },
      ],
    });
    expect(passport.ok).toBe(true);

    const trust = await sdk.trust.assess({
      subjectId: "sid_sdkv14subject000001",
      passportId: passport.record!.passportId,
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_sdkv14subject000001",
          status: "verified",
        },
        {
          provider: "passport",
          assertionType: "passport.active",
          assertionRef: passport.record!.passportId,
          status: "verified",
        },
      ],
    });
    expect(trust.ok).toBe(true);
    expect(trust.assessment?.outcome).toBe("eligible");

    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: ["identity", "consent", "passport", "trust"],
      declaredContractVersions: {
        identity: "1.0.0",
        consent: "1.0.0",
        passport: "1.0.0",
        trust: "1.0.0",
      },
    });
    expect(negotiation.ok).toBe(true);
    expect(negotiation.granted).toEqual(
      expect.arrayContaining(["identity", "consent", "passport", "trust"]),
    );
  });
});
