-- Shared Explainability persistence (Enterprise Platform)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Schema version: 1
-- Apply only after: npm run verify:supabase-project -- --require-linked
-- Do NOT apply until architectural review approves Explainability migration.

CREATE TABLE IF NOT EXISTS shared_explainability_records (
  explanation_id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL,
  decision JSONB NOT NULL,
  decision_ref TEXT NOT NULL,
  capability_id TEXT NOT NULL,
  assessment_ref TEXT,
  passport_ref TEXT,
  consent_ref TEXT,
  evidence_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  policy_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  human_summary TEXT NOT NULL,
  machine_explanation JSONB NOT NULL,
  confidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  version INTEGER NOT NULL CHECK (version >= 1),
  schema_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  platform_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  audit_ref TEXT
);

CREATE INDEX IF NOT EXISTS shared_explainability_records_subject_idx
  ON shared_explainability_records (subject_id);
CREATE INDEX IF NOT EXISTS shared_explainability_records_decision_idx
  ON shared_explainability_records (decision_ref);
CREATE INDEX IF NOT EXISTS shared_explainability_records_capability_idx
  ON shared_explainability_records (capability_id);

CREATE TABLE IF NOT EXISTS shared_explainability_history (
  id BIGSERIAL PRIMARY KEY,
  explanation_id TEXT NOT NULL REFERENCES shared_explainability_records(explanation_id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('created', 'superseded')),
  at TIMESTAMPTZ NOT NULL,
  reason TEXT,
  actor_system TEXT
);

CREATE INDEX IF NOT EXISTS shared_explainability_history_explanation_idx
  ON shared_explainability_history (explanation_id);

COMMENT ON TABLE shared_explainability_records IS
  'Enterprise Explainability records — why a decision was reached, without re-evaluation';
COMMENT ON TABLE shared_explainability_history IS
  'Append-only explainability history';
