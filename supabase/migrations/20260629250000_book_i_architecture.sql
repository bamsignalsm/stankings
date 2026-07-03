-- Book I architecture — Session LIB-2026-06-27-004

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'BOOK-I-ARCHITECTURE', 'framework', 'Book I — Governance Bodies (Architecture)',
  'Ten-chapter architecture — who has authority to make which decisions. Architecture review; no chapter content.',
  'Volume II', 'governance-code', 'Governance Law',
  'approved', '0.1', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['book i', 'architecture', 'governance bodies', 'ten chapters'],
  ARRAY['iki', 'governance-code', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-004', 'meeting_record', 'Book I Architecture Approved for Review',
  'Ten-chapter Book I architecture proposed. Constitutional Council Option 2. No content written.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-004', 'book i architecture'],
  ARRAY['iki', 'governance-code', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-004', 'BOOK-I-ARCHITECTURE', 'implements', 'Book I architecture proposed'),
  ('BOOK-I-ARCHITECTURE', 'VOLUME-II-GOVERNANCE-CODE', 'depends_on', 'Volume II Book I'),
  ('FRAMEWORK-EDW-001', 'BOOK-I-ARCHITECTURE', 'supports', 'Architecture-first publishing')
ON CONFLICT DO NOTHING;
