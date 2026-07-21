# Logging Standard — Stankings

Startup banner logged once via `src/instrumentation.ts` → `logStartupBanner()`.

Format: `[stankings] startup application=… version=… environment=… platform=… provider=… commit=… port=… node=… startedAt=…`

Set `LOG_LEVEL=info` in production. Never log secrets.

See BamSignal `docs/engineering/LOGGING_STANDARD.md` for ecosystem rules.
