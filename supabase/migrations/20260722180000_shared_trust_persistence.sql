-- Shared Trust persistence (Enterprise Platform)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Schema version: 1
-- Apply only after: npm run verify:supabase-project -- --require-linked
-- Do NOT apply until architectural review approves Trust migration.

CREATE TABLE IF NOT EXISTS shared_trust_policies (
  policy_id TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  eligible_threshold DOUBLE PRECISION NOT NULL,
  review_threshold DOUBLE PRECISION NOT NULL,
  rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (policy_id, policy_version)
);

CREATE TABLE IF NOT EXISTS shared_trust_assessments (
  assessment_id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL,
  passport_id TEXT NOT NULL,
  state TEXT NOT NULL
    CHECK (state IN ('draft', 'assessing', 'assessed', 'superseded', 'invalidated')),
  outcome TEXT
    CHECK (outcome IS NULL OR outcome IN ('eligible', 'review_required', 'ineligible', 'insufficient_evidence')),
  confidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  dimensions JSONB NOT NULL DEFAULT '[]'::jsonb,
  risk_indicators JSONB NOT NULL DEFAULT '[]'::jsonb,
  policy_id TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  version INTEGER NOT NULL CHECK (version >= 1),
  schema_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  assessed_at TIMESTAMPTZ,
  platform_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  audit_ref TEXT,
  supersedes_assessment_id TEXT
);

CREATE INDEX IF NOT EXISTS shared_trust_assessments_subject_idx
  ON shared_trust_assessments (subject_id);
CREATE INDEX IF NOT EXISTS shared_trust_assessments_passport_idx
  ON shared_trust_assessments (passport_id);

CREATE TABLE IF NOT EXISTS shared_trust_evidence (
  evidence_id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES shared_trust_assessments(assessment_id) ON DELETE CASCADE,
  provider TEXT NOT NULL
    CHECK (provider IN ('identity', 'consent', 'passport', 'bayright', 'yike', 'bamsignal', 'enterprise', 'other')),
  assertion_type TEXT NOT NULL,
  assertion_ref TEXT NOT NULL,
  passport_evidence_id TEXT,
  status TEXT NOT NULL
    CHECK (status IN ('asserted', 'verified', 'rejected', 'withdrawn', 'expired')),
  dimension TEXT,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  audit_ref TEXT
);

CREATE INDEX IF NOT EXISTS shared_trust_evidence_assessment_idx
  ON shared_trust_evidence (assessment_id);

CREATE TABLE IF NOT EXISTS shared_trust_history (
  id BIGSERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES shared_trust_assessments(assessment_id) ON DELETE CASCADE,
  from_state TEXT NOT NULL,
  to_state TEXT NOT NULL,
  at TIMESTAMPTZ NOT NULL,
  reason TEXT,
  actor_system TEXT
);

CREATE INDEX IF NOT EXISTS shared_trust_history_assessment_idx
  ON shared_trust_history (assessment_id);

COMMENT ON TABLE shared_trust_assessments IS
  'Enterprise Trust assessments — policy-driven outcomes bound to Identity + Passport';
COMMENT ON TABLE shared_trust_evidence IS
  'Trust evidence references — opaque assertions from ecosystem providers';
COMMENT ON TABLE shared_trust_policies IS
  'Versioned Trust policy definitions';
COMMENT ON TABLE shared_trust_history IS
  'Append-only trust assessment lifecycle history';
