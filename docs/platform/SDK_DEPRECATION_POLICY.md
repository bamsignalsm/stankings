# SDK Deprecation Policy

**Package:** `@stankings/platform-sdk`  
**Applies from:** Enterprise Platform v1.0 certified  

## Rules

1. **No silent removals.** Public SDK exports require a deprecation window before removal.
2. **Minor versions** may add surfaces and mark items deprecated.
3. **Major versions** may remove previously deprecated surfaces.
4. **Minimum deprecation window:** one minor release cycle or 90 days (whichever longer) before major removal.
5. **Contract majors** are negotiated separately — SDK minors must remain compatible with declared contract majors where advertised.
6. **Certified v1.0 foundation** (`enterprise-platform-v1.0-certified`) is the stability baseline; evolve via backward-compatible minors (v1.1, v1.2…).

## Process

1. Mark export / method deprecated in docs + CHANGELOG.
2. Emit `DEPRECATED_SURFACE` warnings where practical.
3. Provide replacement path in upgrade guide.
4. Remove only in next major with release notes.

## Non-goals

Deprecation does not authorize product forks of Identity/Passport/Trust/Consent/Explainability.
