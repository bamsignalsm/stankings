import { describe, expect, it } from "vitest";
import { createPlatformSdk, PLATFORM_SDK } from "@stankings/platform-sdk";
import {
  createMemoryIdentityStore,
  createIdentitySubject,
  activateIdentitySubject,
  createIdentityBundle,
} from "@/lib/shared-runtime";
import { createMemoryConsentStore, defaultConsentDefinitions } from "@/lib/enterprise-platform/consent";

describe("platform sdk v1.2", () => {
  it("exposes registries, configuration, and health", async () => {
    const sdk = createPlatformSdk({
      platformId: "bamsignal",
      identityStore: createMemoryIdentityStore(),
      consentStore: createMemoryConsentStore(),
    });
    expect(sdk.version).toBe(PLATFORM_SDK.version);
    expect(sdk.version).toBe("1.2.0");
    expect(sdk.registries().capabilities.some((c) => c.capabilityId === "consent")).toBe(true);
    expect(sdk.configuration().capabilityToggles.consent).toBe(true);
    expect(sdk.health().overall).toBe("healthy");

    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_sdkv12subject000001",
      now: "2026-07-22T00:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    await sdk.identity.putSubject(createIdentityBundle(subject));
    const consent = await sdk.consent.grant({
      subjectId: "sid_sdkv12subject000001",
      definition: defaultConsentDefinitions()[0],
    });
    expect(consent.ok).toBe(true);

    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: ["identity", "consent"],
      declaredContractVersions: { identity: "1.0.0", consent: "1.0.0" },
    });
    expect(negotiation.ok).toBe(true);
    expect(negotiation.granted).toEqual(expect.arrayContaining(["identity", "consent"]));
  });
});
