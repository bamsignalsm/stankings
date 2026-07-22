-- Shared Consent persistence (Enterprise Platform)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Schema version: 1
-- Apply only after: npm run verify:supabase-project -- --require-linked
-- Do not apply until Production Foundation Review approves Consent migration.

CREATE TABLE IF NOT EXISTS shared_consent_records (
  consent_id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL,
  definition_id TEXT NOT NULL,
  purpose_key TEXT NOT NULL,
  state TEXT NOT NULL
    CHECK (state IN ('proposed', 'granted', 'revoked', 'expired', 'superseded')),
  version INTEGER NOT NULL CHECK (version >= 1),
  definition_version TEXT NOT NULL,
  schema_version INTEGER NOT NULL DEFAULT 1,
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  platform_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  supersedes JSONB NOT NULL DEFAULT '[]'::jsonb,
  audit_ref TEXT
);

CREATE INDEX IF NOT EXISTS shared_consent_records_subject_idx
  ON shared_consent_records (subject_id);

CREATE TABLE IF NOT EXISTS shared_consent_history (
  id BIGSERIAL PRIMARY KEY,
  consent_id TEXT NOT NULL REFERENCES shared_consent_records(consent_id) ON DELETE CASCADE,
  from_state TEXT NOT NULL,
  to_state TEXT NOT NULL,
  at TIMESTAMPTZ NOT NULL,
  reason TEXT
);

CREATE INDEX IF NOT EXISTS shared_consent_history_consent_idx
  ON shared_consent_history (consent_id);

COMMENT ON TABLE shared_consent_records IS
  'Enterprise Consent records — owned by Stankings Consent runtime';
COMMENT ON TABLE shared_consent_history IS
  'Append-only consent lifecycle history';
