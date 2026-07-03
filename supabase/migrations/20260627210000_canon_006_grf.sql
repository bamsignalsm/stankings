-- CANON-006 Think in Generations, Act in the Present + GRF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-006', 'canon', 'Think in Generations, Act in the Present',
  'Think in generations, act in the present — every decision must strengthen the institution for those who come after us.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['generations', 'legacy', 'long-term', 'generational test'],
  ARRAY['iki', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-GRF-001', 'framework', 'Generational Review Framework',
  'Every major decision includes long-term generational assessment — PAF, TIA, EIA, GRF before financial modelling.',
  'Volume 0', 'first-principles', 'Generational Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['GRF', 'generational', 'long-term', 'legacy'],
  ARRAY['iki', 'custodian-programme', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-006', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-006', 'CANON-002', 'depends_on', 'Trust across generations'),
  ('CANON-006', 'CANON-003', 'depends_on', 'Purposeful continuity'),
  ('CANON-006', 'CANON-004', 'depends_on', 'Stewardship across time'),
  ('CANON-006', 'CANON-005', 'depends_on', 'Ecosystem endurance'),
  ('CANON-005', 'CANON-006', 'supports', 'Harmony endures across generations'),
  ('FRAMEWORK-GRF-001', 'CANON-006', 'depends_on', 'Derived from Canon 006')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
