import { describe, expect, it } from "vitest";
import {
  NotificationService,
  MemoryNotificationProvider,
  buildRuntimeConfiguration,
  isCapabilityEnabled,
  buildUnifiedEnterpriseRegistries,
  validateUnifiedRegistries,
  buildPlatformHealthReport,
} from "@/lib/enterprise-platform";

describe("foundation finalization modules", () => {
  it("delivers notifications via memory provider", async () => {
    const provider = new MemoryNotificationProvider();
    const service = new NotificationService(provider);
    const result = await service.enqueue({
      channel: "email",
      to: "ops@example.com",
      body: "hello",
      subject: "test",
    });
    expect(result.ok).toBe(true);
    expect(result.message?.status).toBe("delivered");
    expect(provider.sent).toHaveLength(1);
  });

  it("builds runtime configuration and toggles", () => {
    const config = buildRuntimeConfiguration({
      platformId: "yike",
      capabilityToggles: { trust: false },
    });
    expect(isCapabilityEnabled(config, "identity")).toBe(true);
    expect(isCapabilityEnabled(config, "passport")).toBe(true);
    expect(isCapabilityEnabled(config, "trust")).toBe(false);
    expect(config.defaults.sdkVersion).toBe("1.3.0");
  });

  it("validates unified registries", () => {
    const regs = buildUnifiedEnterpriseRegistries();
    expect(regs.contracts.some((c) => c.contractId === "passport.record")).toBe(true);
    expect(regs.sdkModules.some((m) => m.moduleId === "sdk.passport")).toBe(true);
    expect(validateUnifiedRegistries(regs).valid).toBe(true);
  });

  it("reports platform health", () => {
    const health = buildPlatformHealthReport();
    expect(health.overall).toBe("healthy");
    expect(health.components.some((c) => c.id === "passport" && c.status === "healthy")).toBe(
      true,
    );
  });
});
