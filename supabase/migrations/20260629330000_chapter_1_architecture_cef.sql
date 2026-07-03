-- Chapter 1 Architecture + CEF-001 — LIB-2026-06-27-012

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'BOOK-I-CH-01-ARCHITECTURE', 'framework',
  'Chapter 1 — Constitutional Governance Structure (Architecture)',
  'Eight-section architecture. Three diagrams. CEF-001 footer. Architecture review.',
  'Volume II', 'governance-code', 'Governance Law',
  'draft', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['chapter 1', 'architecture', 'constitutional governance'],
  ARRAY['governance-code', 'slps-core']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CEF-001', 'framework', 'Chapter Education Standard',
  'CEF-001 — every chapter is governance and teaching.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['cef-001', 'chapter education'],
  ARRAY['slps-core', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-012', 'meeting_record', 'Chapter 1 Architecture — Constitutional Governance Structure',
  'Chapter 1 architecture proposed. CEF-001 adopted.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-012', 'chapter 1 architecture'],
  ARRAY['governance-code', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-012', 'BOOK-I-CH-01-ARCHITECTURE', 'implements', 'Chapter 1 architecture v1.0'),
  ('BOOK-I-CH-01-ARCHITECTURE', 'FRAMEWORK-CEF-001', 'conforms_to', 'Education footer standard'),
  ('LIB-2026-06-27-012', 'FRAMEWORK-CEF-001', 'implements', 'CEF-001 adopted')
ON CONFLICT DO NOTHING;
