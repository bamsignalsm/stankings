-- Shared Identity persistence (Enterprise Platform)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Schema version: 1
-- Apply only after: npm run verify:supabase-project -- --require-linked
-- Do not apply to BamSignal / Yike / BayRight projects.

CREATE TABLE IF NOT EXISTS shared_identity_subjects (
  subject_id TEXT PRIMARY KEY,
  kind TEXT NOT NULL
    CHECK (kind IN ('person', 'organization', 'system', 'service_account')),
  state TEXT NOT NULL
    CHECK (state IN ('proposed', 'active', 'suspended', 'merged', 'archived', 'revoked')),
  authority TEXT NOT NULL DEFAULT 'stankings-shared-identity'
    CHECK (authority = 'stankings-shared-identity'),
  version INTEGER NOT NULL CHECK (version >= 1),
  schema_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  display_label TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  origin_platform_id TEXT,
  external_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  memberships JSONB NOT NULL DEFAULT '[]'::jsonb,
  role_claims JSONB NOT NULL DEFAULT '[]'::jsonb,
  platform_participation JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS shared_identity_external_refs (
  ref_key TEXT PRIMARY KEY,
  system TEXT NOT NULL,
  external_id TEXT NOT NULL,
  subject_id TEXT NOT NULL REFERENCES shared_identity_subjects(subject_id) ON DELETE CASCADE,
  linked BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS shared_identity_external_refs_subject_idx
  ON shared_identity_external_refs (subject_id);

COMMENT ON TABLE shared_identity_subjects IS
  'Canonical Shared Identity subjects — owned by Stankings Shared Identity runtime';
COMMENT ON TABLE shared_identity_external_refs IS
  'Unique external platform mappings into Shared Identity subjects';
