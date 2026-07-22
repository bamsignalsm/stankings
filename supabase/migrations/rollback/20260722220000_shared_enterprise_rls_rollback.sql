-- ROLLBACK for shared_enterprise_rls
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Restores table grants to anon/authenticated and disables FORCE/ENABLE RLS.
-- Warning: weakens Data API protection for shared enterprise tables.

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
    EXECUTE format('ALTER TABLE %I NO FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I DISABLE ROW LEVEL SECURITY', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE %I TO anon, authenticated', t);
  END LOOP;
END $$;
