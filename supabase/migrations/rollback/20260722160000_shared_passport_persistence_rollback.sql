-- ROLLBACK for shared_passport_persistence (schema v1)
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Warning: destroys Shared Passport durable data.
-- Drop child tables before parent (FK order).

DROP TABLE IF EXISTS shared_passport_history;
DROP TABLE IF EXISTS shared_passport_evidence;
DROP TABLE IF EXISTS shared_passport_records;
