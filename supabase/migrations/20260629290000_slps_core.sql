-- SLPS-CORE Publishing System — LIB-2026-06-27-008

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-SLPS-CORE-001', 'framework', 'Stankings Library Publishing System',
  'SLPS-CORE — seven-module engine enforcing SLPS-001 across all publications.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['slps-core', 'publishing system', 'metadata engine', 'institutional search'],
  ARRAY['slps-core', 'publication-engine', 'editorial-standards', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-008', 'meeting_record', 'Publishing System Approved',
  'SLPS-CORE approved. Platform architecture frozen. Editorial Decision No. 51.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-008', 'slps-core', 'editorial decision 51'],
  ARRAY['slps-core', 'editorial-standards', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-008', 'FRAMEWORK-SLPS-CORE-001', 'implements', 'Publishing system approved'),
  ('FRAMEWORK-SLPS-CORE-001', 'FRAMEWORK-SLPS-001', 'enforces', 'Enforces publishing standard'),
  ('FRAMEWORK-SLPS-CORE-001', 'PUB-ENGINE-001', 'includes', 'Module 1 — Generator'),
  ('FRAMEWORK-SLPS-CORE-001', 'FRAMEWORK-EDW-001', 'depends_on', 'Editorial workflow'),
  ('PUB-ENGINE-001', 'FRAMEWORK-SLPS-CORE-001', 'part_of', 'SLPS-CORE module'),
  ('BOOK-I-ARCHITECTURE', 'FRAMEWORK-SLPS-CORE-001', 'references', 'Publishing platform')
ON CONFLICT DO NOTHING;
