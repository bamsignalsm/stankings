-- ROLLBACK for shared_trust_persistence (schema v1)
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Warning: destroys Shared Trust durable data.
-- Drop child tables before parent (FK order).

DROP TABLE IF EXISTS shared_trust_history;
DROP TABLE IF EXISTS shared_trust_evidence;
DROP TABLE IF EXISTS shared_trust_assessments;
DROP TABLE IF EXISTS shared_trust_policies;
