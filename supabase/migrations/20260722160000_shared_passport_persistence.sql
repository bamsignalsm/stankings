-- Shared Passport persistence (Enterprise Platform)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Schema version: 1
-- Apply only after: npm run verify:supabase-project -- --require-linked
-- Do NOT apply until architectural review approves Passport migration.

CREATE TABLE IF NOT EXISTS shared_passport_records (
  passport_id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL,
  state TEXT NOT NULL
    CHECK (state IN ('draft', 'issued', 'active', 'suspended', 'revoked', 'expired')),
  verification_status TEXT NOT NULL
    CHECK (verification_status IN ('unverified', 'pending', 'verified', 'contested')),
  version INTEGER NOT NULL CHECK (version >= 1),
  schema_version INTEGER NOT NULL DEFAULT 1,
  issuance JSONB NOT NULL DEFAULT '{}'::jsonb,
  issued_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  suspended_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  platform_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  audit_ref TEXT,
  renews_passport_id TEXT
);

CREATE INDEX IF NOT EXISTS shared_passport_records_subject_idx
  ON shared_passport_records (subject_id);

CREATE TABLE IF NOT EXISTS shared_passport_evidence (
  evidence_id TEXT PRIMARY KEY,
  passport_id TEXT NOT NULL REFERENCES shared_passport_records(passport_id) ON DELETE CASCADE,
  provider TEXT NOT NULL
    CHECK (provider IN ('identity', 'consent', 'bayright', 'yike', 'bamsignal', 'enterprise', 'other')),
  assertion_type TEXT NOT NULL,
  assertion_ref TEXT NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('asserted', 'verified', 'rejected', 'withdrawn', 'expired')),
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  audit_ref TEXT
);

CREATE INDEX IF NOT EXISTS shared_passport_evidence_passport_idx
  ON shared_passport_evidence (passport_id);

CREATE TABLE IF NOT EXISTS shared_passport_history (
  id BIGSERIAL PRIMARY KEY,
  passport_id TEXT NOT NULL REFERENCES shared_passport_records(passport_id) ON DELETE CASCADE,
  from_state TEXT NOT NULL,
  to_state TEXT NOT NULL,
  at TIMESTAMPTZ NOT NULL,
  reason TEXT,
  actor_system TEXT
);

CREATE INDEX IF NOT EXISTS shared_passport_history_passport_idx
  ON shared_passport_history (passport_id);

COMMENT ON TABLE shared_passport_records IS
  'Enterprise Passport records — portable trust containers bound to Shared Identity';
COMMENT ON TABLE shared_passport_evidence IS
  'Passport evidence references — opaque assertions from Identity, Consent, and consumer platforms';
COMMENT ON TABLE shared_passport_history IS
  'Append-only passport lifecycle history';
