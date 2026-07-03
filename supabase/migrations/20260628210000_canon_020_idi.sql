-- CANON-020 Exercise Sound Judgment + IDI Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-020', 'canon', 'Exercise Sound Judgment',
  'Cultivate sound judgment — policies guide, Canons shape, judgment applies principles wisely.',
  'Volume 0', 'first-principles', 'Legacy Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['judgment', 'IDI', 'wisdom', 'reasoning', 'legacy'],
  ARRAY['iki', 'decision-intelligence', 'decision-records', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IDI-001', 'framework', 'Institutional Decision Intelligence',
  'Judgment Records preserve institutional reasoning — evidence, alternatives, and Canons applied.',
  'Volume 0', 'first-principles', 'Legacy Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IDI', 'judgment', 'decision intelligence', 'reasoning'],
  ARRAY['iki', 'decision-intelligence', 'decision-records']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-020', 'CANON-002', 'depends_on', 'Trust informs judgment'),
  ('CANON-020', 'CANON-007', 'depends_on', 'Truth informs judgment'),
  ('CANON-020', 'CANON-009', 'depends_on', 'Learning improves judgment'),
  ('CANON-020', 'CANON-019', 'depends_on', 'Improvement through judgment'),
  ('CANON-019', 'CANON-020', 'supports', 'Legacy stewardship to judgment'),
  ('CANON-007', 'CANON-020', 'supports', 'Truth to judgment capstone'),
  ('CANON-002', 'CANON-020', 'supports', 'Trust to judgment'),
  ('FRAMEWORK-IDI-001', 'CANON-020', 'depends_on', 'Derived from Canon 020'),
  ('CANON-020', 'FRAMEWORK-IDI-001', 'supports', 'Operationalized through IDI'),
  ('FRAMEWORK-IDI-001', 'FRAMEWORK-IDR-001', 'references', 'Decision memory'),
  ('FRAMEWORK-IDI-001', 'FRAMEWORK-PAR-001', 'references', 'Principle alignment'),
  ('FRAMEWORK-IDI-001', 'FRAMEWORK-URF-001', 'references', 'Uncertainty dimension'),
  ('CANON-020', 'decision-intelligence', 'supports', 'Judgment Records registry')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
