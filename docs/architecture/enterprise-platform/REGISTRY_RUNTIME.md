# Enterprise Registry Runtime

**Milestone:** M1  
**Package:** `src/lib/enterprise-platform/registry/`  

---

## What shipped

Executable catalogues (not static docs alone):

| Registry | Builder |
|----------|---------|
| Capability | `buildCapabilityRegistry` |
| Service | `buildServiceRegistry` |
| Runtime | `buildRuntimeRegistry` |
| Version | `buildVersionRegistry` |
| Combined | `buildEnterpriseRegistryCatalogue` |

Validation:

- Duplicate detection  
- Capability dependency checks  
- Service → capability references  
- Company + platform seed consistency  
- Cross-registry runtime capability checks  

Company read surface: `listCompanyIds`, `getCompanyById` (consumers never write HQ company SSOT).

Platform seed catalogue remains under `shared-runtime/platform-registration` and is validated here.

---

## Inventory vs readiness

`PLATFORM_REGISTRY` inventory `status: active` still does **not** mean runtime readiness. Use Capability Registry `runtimeReadiness` and Eight-Gate reports.
