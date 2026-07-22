-- ROLLBACK for shared_consent_persistence (schema v1)
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Warning: destroys Shared Consent durable data.

DROP TABLE IF EXISTS shared_consent_history;
DROP TABLE IF EXISTS shared_consent_records;
