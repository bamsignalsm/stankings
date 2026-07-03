-- CANON-011 Simplicity Creates Strength + SR Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-011', 'canon', 'Simplicity Creates Strength',
  'Simplicity creates strength — clarity and thoughtful design over complexity mistaken for sophistication.',
  'Volume 0', 'first-principles', 'Operational Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['simplicity', 'clarity', 'complexity', 'operational'],
  ARRAY['iki', 'engineering-standards', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-SR-001', 'framework', 'Simplicity Review',
  'Engineering PRs and major features evaluated for unnecessary complexity before approval.',
  'Volume 0', 'first-principles', 'Operational Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['SR', 'simplicity', 'engineering', 'complexity'],
  ARRAY['iki', 'engineering-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-011', 'CANON-001', 'depends_on', 'Service through clarity'),
  ('CANON-011', 'CANON-010', 'depends_on', 'Moral foundation to operational thinking'),
  ('CANON-010', 'CANON-011', 'supports', 'Character to engineering philosophy'),
  ('FRAMEWORK-SR-001', 'CANON-011', 'depends_on', 'Derived from Canon 011'),
  ('CANON-011', 'FRAMEWORK-SR-001', 'supports', 'Operationalized through SR')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
