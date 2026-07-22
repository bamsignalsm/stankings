-- ROLLBACK for shared_explainability_persistence (schema v1)
-- Project: dfaqkrikdvohvvcuxoek ONLY
-- Warning: destroys Shared Explainability durable data.

DROP TABLE IF EXISTS shared_explainability_history;
DROP TABLE IF EXISTS shared_explainability_records;
