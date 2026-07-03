-- Book Charter architecture + Library Publishing Standard — LIB-2026-06-27-006

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LPS-001', 'framework', 'Library Publishing Standard',
  'Publishing hierarchy for every Book — Cover through Cross-Reference Index.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['publishing standard', 'book charter', 'library hierarchy'],
  ARRAY['iki', 'editorial-standards', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-006', 'meeting_record', 'Book I Charter Architecture',
  'Nine-section Charter architecture. LPS-001. No prose drafted.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-006', 'book charter', 'nine sections'],
  ARRAY['iki', 'governance-code', 'editorial-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-006', 'BOOK-I-ARCHITECTURE', 'implements', 'Charter architecture'),
  ('LIB-2026-06-27-006', 'FRAMEWORK-LPS-001', 'implements', 'Publishing standard adopted'),
  ('FRAMEWORK-LPS-001', 'FRAMEWORK-EDW-001', 'depends_on', 'Editorial workflow'),
  ('BOOK-I-ARCHITECTURE', 'FRAMEWORK-LPS-001', 'references', 'Publishing hierarchy')
ON CONFLICT DO NOTHING;
