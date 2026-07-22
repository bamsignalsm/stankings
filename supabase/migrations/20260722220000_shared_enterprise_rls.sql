-- Shared enterprise table RLS hardening (Platform v1.0 post-certification)
-- Project: dfaqkrikdvohvvcuxoek (Stankings only)
-- Access model: platform service_role only via server adapters.
-- anon / authenticated have no policies → denied by RLS.
-- service_role bypasses RLS (Supabase default) for Stankings runtime adapters.
-- Apply only after: npm run verify:supabase-project -- --require-linked

-- Identity
ALTER TABLE shared_identity_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_identity_external_refs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_identity_subjects FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_identity_external_refs FORCE ROW LEVEL SECURITY;

-- Consent
ALTER TABLE shared_consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_consent_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_consent_records FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_consent_history FORCE ROW LEVEL SECURITY;

-- Passport
ALTER TABLE shared_passport_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_passport_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_passport_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_passport_records FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_passport_evidence FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_passport_history FORCE ROW LEVEL SECURITY;

-- Trust
ALTER TABLE shared_trust_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_policies FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_assessments FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_evidence FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_trust_history FORCE ROW LEVEL SECURITY;

-- Explainability
ALTER TABLE shared_explainability_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_explainability_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_explainability_records FORCE ROW LEVEL SECURITY;
ALTER TABLE shared_explainability_history FORCE ROW LEVEL SECURITY;

-- Least privilege: revoke Data API roles from shared enterprise tables.
-- Consumers must use Stankings Enterprise SDK / server adapters — never direct table access.
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'shared_identity_subjects',
    'shared_identity_external_refs',
    'shared_consent_records',
    'shared_consent_history',
    'shared_passport_records',
    'shared_passport_evidence',
    'shared_passport_history',
    'shared_trust_policies',
    'shared_trust_assessments',
    'shared_trust_evidence',
    'shared_trust_history',
    'shared_explainability_records',
    'shared_explainability_history'
  ]
  LOOP
    EXECUTE format('REVOKE ALL ON TABLE %I FROM PUBLIC', t);
    EXECUTE format('REVOKE ALL ON TABLE %I FROM anon', t);
    EXECUTE format('REVOKE ALL ON TABLE %I FROM authenticated', t);
    EXECUTE format('GRANT ALL ON TABLE %I TO service_role', t);
  END LOOP;
END $$;

COMMENT ON TABLE shared_identity_subjects IS
  'Enterprise Identity subjects — RLS enforced; service_role adapter access only';
COMMENT ON TABLE shared_consent_records IS
  'Enterprise Consent records — RLS enforced; service_role adapter access only';
COMMENT ON TABLE shared_passport_records IS
  'Enterprise Passport records — RLS enforced; service_role adapter access only';
COMMENT ON TABLE shared_trust_assessments IS
  'Enterprise Trust assessments — RLS enforced; service_role adapter access only';
COMMENT ON TABLE shared_explainability_records IS
  'Enterprise Explainability records — RLS enforced; service_role adapter access only';
