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
  createMemoryExplainabilityStore,
  defaultConsentDefinitions,
} from "@/lib/enterprise-platform";

describe("platform sdk v1.5", () => {
  it("explains trust assessments through the SDK", async () => {
    const sdk = createPlatformSdk({
      platformId: "bamsignal",
      identityStore: createMemoryIdentityStore(),
      consentStore: createMemoryConsentStore(),
      passportStore: createMemoryPassportStore(),
      trustStore: createMemoryTrustStore(),
      explainabilityStore: createMemoryExplainabilityStore(),
    });
    expect(sdk.version).toBe(PLATFORM_SDK.version);
    expect(sdk.version).toBe("1.5.0");

    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_sdkv15subject000001",
      now: "2026-07-22T00:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    await sdk.identity.putSubject(createIdentityBundle(subject));

    const passport = await sdk.passport.issue({
      subjectId: "sid_sdkv15subject000001",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_sdkv15subject000001",
          status: "verified",
        },
      ],
    });
    expect(passport.ok).toBe(true);

    const trust = await sdk.trust.assess({
      subjectId: "sid_sdkv15subject000001",
      passportId: passport.record!.passportId,
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_sdkv15subject000001",
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

    const explanation = await sdk.explainability.explainTrust(trust.assessment!);
    expect(explanation.ok).toBe(true);
    expect(explanation.record?.humanSummary).toContain("outcome");
    expect(explanation.record?.decision.capabilityId).toBe("trust");

    const consent = await sdk.consent.grant({
      subjectId: "sid_sdkv15subject000001",
      definition: defaultConsentDefinitions()[0],
    });
    expect(consent.ok).toBe(true);
    const consentExplanation = await sdk.explainability.explainConsent(consent.record!);
    expect(consentExplanation.ok).toBe(true);

    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: ["trust", "explainability"],
      declaredContractVersions: { trust: "1.0.0", explainability: "1.0.0" },
    });
    expect(negotiation.ok).toBe(true);
  });
});
