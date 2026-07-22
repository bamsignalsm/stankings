# Discovery Runtime

**Capability:** `capability_discovery`  
**Runtime:** 1.0.0  
**Eight-Gate:** Complete (G3 = N/A — registry-backed)  
**Contract:** `discovery.runtime@1.0.0`  
**SDK:** `@stankings/platform-sdk` → `discovery`

---

## Purpose

Central mechanism for locating enterprise capabilities, contracts, services, runtimes, versions, features, health, and compatibility metadata.

## Operations

| API | Role |
|-----|------|
| `buildDiscoverySnapshot()` | Full catalogue |
| `queryDiscovery(query)` | Filtered query |
| `negotiateCapabilities(request)` | Grant/deny by readiness + contract major |
| `assessDiscoveryHealth()` | healthy / degraded / unavailable |

## Consumer example

```ts
const sdk = createPlatformSdk({ platformId: "yike", identityStore });
const snap = sdk.discovery.snapshot();
const neg = sdk.discovery.negotiate({
  requiredCapabilities: ["identity"],
  declaredContractVersions: { identity: "1.0.0" },
});
```

## Non-goals

Service mesh, network service discovery, Passport/Trust activation.
