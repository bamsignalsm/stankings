-- Stankings Library Publishing Standard (SLPS-001) — LIB-2026-06-27-007

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-SLPS-001', 'framework', 'Stankings Library Publishing Standard',
  'SLPS-001 — structure, metadata, lifecycle, and presentation for every official publication.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['slps', 'slps-001', 'publishing standard', 'metadata'],
  ARRAY['iki', 'editorial-standards', 'library-engine', 'publication-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'PUB-ENGINE-001', 'framework', 'Publication Generator',
  'Scaffolds new publications from SLPS-001 — structure, metadata, and status tracking.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['publication generator', 'scaffold', 'slps-001'],
  ARRAY['publication-engine', 'editorial-standards', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-007', 'meeting_record', 'Stankings Library Publishing Standard Established',
  'SLPS-001 adopted. Publication Generator created. Editorial Decision No. 50.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-007', 'slps', 'editorial decision 50'],
  ARRAY['iki', 'editorial-standards', 'publication-engine', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-007', 'FRAMEWORK-SLPS-001', 'implements', 'SLPS-001 established'),
  ('LIB-2026-06-27-007', 'PUB-ENGINE-001', 'implements', 'Publication Generator created'),
  ('FRAMEWORK-SLPS-001', 'FRAMEWORK-EDW-001', 'depends_on', 'Editorial workflow'),
  ('FRAMEWORK-SLPS-001', 'FRAMEWORK-LPS-001', 'supersedes', 'LPS retained as alias'),
  ('PUB-ENGINE-001', 'FRAMEWORK-SLPS-001', 'depends_on', 'Generator uses SLPS by default'),
  ('BOOK-I-ARCHITECTURE', 'FRAMEWORK-SLPS-001', 'references', 'SLPS scaffold active')
ON CONFLICT DO NOTHING;
