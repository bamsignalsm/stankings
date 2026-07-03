-- Book I Charter v1.0 — LIB-2026-06-27-009 · Editorial Decision No. 52

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'BOOK-I-CHARTER', 'framework', 'Book I — Book Charter',
  'Book Charter v1.0 — ten-section orientation guide. Draft — editorial review.',
  'Volume II', 'governance-code', 'Governance Law',
  'draft', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['book charter', 'book i', 'governance bodies', 'ten sections'],
  ARRAY['governance-code', 'slps-core', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-009', 'meeting_record', 'Book I Charter Approved for Drafting',
  'Ten-section Charter architecture. Book Charter v1.0 drafted. Editorial Decision No. 52.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-009', 'book charter', 'editorial decision 52'],
  ARRAY['governance-code', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-009', 'BOOK-I-CHARTER', 'implements', 'Charter v1.0 drafted'),
  ('BOOK-I-CHARTER', 'BOOK-I-ARCHITECTURE', 'depends_on', 'Book architecture'),
  ('BOOK-I-CHARTER', 'FRAMEWORK-SLPS-001', 'conforms_to', 'SLPS-001 publishing standard'),
  ('BOOK-I-CHARTER', 'VOLUME-II-GOVERNANCE-CODE', 'part_of', 'Volume II Book I')
ON CONFLICT DO NOTHING;
