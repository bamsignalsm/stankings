-- ROLLBACK for shared_identity_persistence (schema v1)
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Run ONLY after: npm run verify:supabase-project -- --require-linked
-- Warning: destroys Shared Identity durable data.

DROP TABLE IF EXISTS shared_identity_external_refs;
DROP TABLE IF EXISTS shared_identity_subjects;
