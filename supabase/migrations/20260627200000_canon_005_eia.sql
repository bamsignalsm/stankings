-- CANON-005 The Ecosystem Is Greater Than Any Single Institution + EIA Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-005', 'canon', 'The Ecosystem Is Greater Than Any Single Institution',
  'The ecosystem is greater than any single institution — each centre of excellence has its lane.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ecosystem', 'harmony', 'lanes', 'architecture'],
  ARRAY['iki', 'core-platform', 'ecosystem-map']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-EIA-001', 'framework', 'Ecosystem Impact Assessment Framework',
  'Every new company, division, or major product requires EIA — PAF, TIA, EIA before financial modelling.',
  'Volume 0', 'first-principles', 'Ecosystem Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['EIA', 'ecosystem', 'duplication', 'harmony'],
  ARRAY['iki', 'ecosystem-map', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-005', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-005', 'CANON-002', 'depends_on', 'Trust across institutions'),
  ('CANON-005', 'CANON-003', 'depends_on', 'Purposeful ecosystem'),
  ('CANON-005', 'CANON-004', 'depends_on', 'Ecosystem stewardship'),
  ('CANON-004', 'CANON-005', 'supports', 'Leadership stewards ecosystem'),
  ('FRAMEWORK-EIA-001', 'CANON-005', 'depends_on', 'Derived from Canon 005')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
