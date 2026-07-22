import { describe, expect, it } from "vitest";
import { createPlatformSdk } from "@stankings/platform-sdk";
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
  MemoryEventCollector,
  MemoryNotificationProvider,
  NotificationService,
  assessPlatformCertification,
  isConsumerCapabilityReady,
  correlateEventLog,
  ENTERPRISE_EVENT_TYPES,
  buildUnifiedEnterpriseRegistries,
  validateUnifiedRegistries,
} from "@/lib/enterprise-platform";

describe("enterprise platform certification", () => {
  it("certifies all six core runtimes as GO", () => {
    const report = assessPlatformCertification("2026-07-22T14:00:00.000Z");
    expect(report.overall).toBe("certified");
    expect(report.recommendation).toBe("GO");
    expect(report.sdkVersion).toBe("1.5.0");
    expect(report.runtimes.every((r) => r.eightGateComplete)).toBe(true);
    expect(report.gaps).toEqual([]);
  });

  it("runs end-to-end identity→consent→passport→trust→explainability with events", async () => {
    const events = new MemoryEventCollector();
    const sdk = createPlatformSdk({
      platformId: "bamsignal",
      identityStore: createMemoryIdentityStore(),
      consentStore: createMemoryConsentStore(),
      passportStore: createMemoryPassportStore(),
      trustStore: createMemoryTrustStore(),
      explainabilityStore: createMemoryExplainabilityStore(),
      events,
    });

    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_certification0000001",
      now: "2026-07-22T14:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T14:00:01.000Z");
    await sdk.identity.putSubject(createIdentityBundle(subject));

    const consent = await sdk.consent.grant({
      subjectId: "sid_certification0000001",
      definition: defaultConsentDefinitions().find(
        (d) => d.definitionId === "consent.passport.cross_platform",
      )!,
    });
    expect(consent.ok).toBe(true);

    const passport = await sdk.passport.issue({
      subjectId: "sid_certification0000001",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_certification0000001",
          status: "verified",
        },
        {
          provider: "consent",
          assertionType: "consent.passport.cross_platform",
          assertionRef: consent.record!.consentId,
          status: "verified",
        },
      ],
    });
    expect(passport.ok).toBe(true);
    expect(passport.record?.state).toBe("active");

    const trust = await sdk.trust.assess({
      subjectId: "sid_certification0000001",
      passportId: passport.record!.passportId,
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_certification0000001",
          status: "verified",
        },
        {
          provider: "passport",
          assertionType: "passport.active",
          assertionRef: passport.record!.passportId,
          status: "verified",
        },
        {
          provider: "consent",
          assertionType: "consent.passport.cross_platform",
          assertionRef: consent.record!.consentId,
          status: "verified",
        },
        {
          provider: "bamsignal",
          assertionType: "bamsignal.relationship.verification",
          assertionRef: "bamsignal:opaque:cert-1",
          status: "verified",
          dimension: "relationship",
        },
      ],
    });
    expect(trust.ok).toBe(true);
    expect(trust.assessment?.outcome).toBe("eligible");

    const explanation = await sdk.explainability.explainTrust(trust.assessment!);
    expect(explanation.ok).toBe(true);
    expect(explanation.record?.humanSummary).toContain("outcome");
    expect(explanation.record?.machineExplanation.rationaleKeys).toContain(
      "trust.policy_applied",
    );

    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: [
        "identity",
        "consent",
        "passport",
        "trust",
        "explainability",
      ],
      declaredContractVersions: {
        identity: "1.0.0",
        consent: "1.0.0",
        passport: "1.0.0",
        trust: "1.0.0",
        explainability: "1.0.0",
      },
    });
    expect(negotiation.ok).toBe(true);

    const config = sdk.configuration();
    expect(
      isConsumerCapabilityReady(
        config.capabilityToggles,
        config.featureFlags,
        "explainability",
        "runtime.explainability",
      ),
    ).toBe(true);

    expect(events.ofType(ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED).length).toBeGreaterThan(0);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED).length).toBeGreaterThan(0);
    expect(
      events.ofType(ENTERPRISE_EVENT_TYPES.EXPLAINABILITY_RECORDED).length,
    ).toBeGreaterThan(0);

    const sample = events.ofType(ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED)[0];
    sample.correlationId = "corr_cert_001";
    const logLine = correlateEventLog(sample);
    expect(logLine).toContain("corr_cert_001");
    expect(logLine).toContain(ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED);

    const regs = buildUnifiedEnterpriseRegistries();
    expect(validateUnifiedRegistries(regs).valid).toBe(true);
    expect(sdk.health().overall).toBe("healthy");
    expect(sdk.registries().sdkModules.some((m) => m.moduleId === "sdk.explainability")).toBe(
      true,
    );
  });

  it("supports notification foundation alongside core chain", async () => {
    const provider = new MemoryNotificationProvider();
    const service = new NotificationService(provider);
    const result = await service.enqueue({
      channel: "email",
      to: "ops@stankings.com",
      body: "certification probe",
      subject: "platform-cert",
    });
    expect(result.ok).toBe(true);
    expect(provider.sent).toHaveLength(1);
  });

  it("degrades when consumer toggles explainability off", () => {
    const sdk = createPlatformSdk({
      platformId: "yike",
      identityStore: createMemoryIdentityStore(),
      configOverrides: {
        capabilityToggles: { explainability: false },
        featureFlags: { "runtime.explainability": false },
      },
    });
    const config = sdk.configuration();
    expect(
      isConsumerCapabilityReady(
        config.capabilityToggles,
        config.featureFlags,
        "explainability",
        "runtime.explainability",
      ),
    ).toBe(false);
    // Discovery still reports capability production — consumer gates decide usage
    const negotiation = sdk.discovery.negotiate({
      requiredCapabilities: ["explainability"],
      declaredContractVersions: { explainability: "1.0.0" },
    });
    expect(negotiation.ok).toBe(true);
  });
});
