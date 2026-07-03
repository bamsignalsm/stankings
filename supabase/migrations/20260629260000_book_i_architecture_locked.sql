-- Book I architecture locked — Session LIB-2026-06-27-005, Editorial Decision No. 49

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-005', 'meeting_record', 'Governance Architecture Refined',
  'Four Parts, Book Charter shell, Governance Map. ED 49 Constitutional Council. Architecture locked.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-005', 'editorial decision 49', 'architecture locked'],
  ARRAY['iki', 'governance-code', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-005', 'BOOK-I-ARCHITECTURE', 'implements', 'Architecture locked'),
  ('BOOK-I-ARCHITECTURE', 'LIB-2026-06-27-005', 'references', 'Refinement session')
ON CONFLICT DO NOTHING;
