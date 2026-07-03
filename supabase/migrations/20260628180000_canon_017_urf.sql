-- CANON-017 Reduce Uncertainty + URF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-017', 'canon', 'Reduce Uncertainty',
  'Reduce unnecessary uncertainty through trusted institutions — confidence enables progress.',
  'Volume 0', 'first-principles', 'Strategic Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['uncertainty', 'confidence', 'URF', 'strategy', 'mission'],
  ARRAY['iki', 'ecosystem-map', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-URF-001', 'framework', 'Uncertainty Reduction Framework',
  'Every proposal demonstrates how it reduces uncertainty and increases confidence before approval.',
  'Volume 0', 'first-principles', 'Strategic Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['URF', 'uncertainty', 'confidence', 'assessment'],
  ARRAY['iki', 'ecosystem-map', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-017', 'CANON-001', 'depends_on', 'Institutions reduce uncertainty'),
  ('CANON-017', 'CANON-002', 'depends_on', 'Truth reduces uncertainty'),
  ('CANON-017', 'CANON-003', 'depends_on', 'Purpose guides uncertainty reduction'),
  ('CANON-016', 'CANON-017', 'supports', 'Strength to strategic purpose'),
  ('CANON-001', 'CANON-017', 'supports', 'Moral foundation to confidence'),
  ('CANON-002', 'CANON-017', 'supports', 'Truth to confidence'),
  ('CANON-003', 'CANON-017', 'supports', 'Purpose to confidence'),
  ('FRAMEWORK-URF-001', 'CANON-017', 'depends_on', 'Derived from Canon 017'),
  ('CANON-017', 'FRAMEWORK-URF-001', 'supports', 'Operationalized through URF'),
  ('FRAMEWORK-URF-001', 'FRAMEWORK-PAF-001', 'references', 'Purpose dimension'),
  ('FRAMEWORK-URF-001', 'FRAMEWORK-TIA-001', 'references', 'Trust dimension'),
  ('CANON-017', 'ecosystem-map', 'supports', 'Confidence mapping across institutions')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
