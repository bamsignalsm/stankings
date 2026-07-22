# SDK Release Readiness Report

**Package:** `@stankings/platform-sdk` **1.5.0**  
**Certified tag:** `enterprise-platform-v1.0-certified`  
**Date:** 2026-07-22  

| Check | Status |
|-------|--------|
| Semantic version | 1.5.0 (additive minors from 1.2→1.5) |
| Package metadata | name, engines, exports, repository, keywords |
| README | Present |
| CHANGELOG | Present (1.2–1.5) |
| Upgrade guide | `docs/platform/SDK_UPGRADE_GUIDE.md` |
| Deprecation policy | `docs/platform/SDK_DEPRECATION_POLICY.md` |
| API compatibility | No breaking changes in 1.5 vs certified surfaces |
| Publish to registry | **Pending** (TD-001) — private package; consume via git tag |

## Release process (current)

1. Complete Eight-Gate for any new surface  
2. Bump SDK minor (or patch)  
3. Update CHANGELOG + upgrade guide  
4. Tag `enterprise-platform-vX.Y-…`  
5. Push tag  
6. Downstream pin to tag until npm publish exists  

## Recommendation

**Ready for downstream consumption via git tag.** Registry publish is medium priority hardening, not a certification blocker.
