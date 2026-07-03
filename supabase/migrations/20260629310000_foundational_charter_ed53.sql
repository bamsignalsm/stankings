-- Foundational Charter Standard — LIB-2026-06-27-010 · Editorial Decision No. 53

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-FC-001', 'framework', 'Foundational Charter Standard',
  'FC-001 — governing introduction to every Book. Ten sections, writing rules, chapter tests.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['foundational charter', 'fc-001', 'editorial decision 53'],
  ARRAY['editorial-standards', 'slps-core', 'governance-code']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'BOOK-I-FOUNDATIONAL-CHARTER', 'framework', 'Book I — Foundational Charter',
  'Foundational Charter v1.0 — governing introduction to Governance Bodies. Draft.',
  'Volume II', 'governance-code', 'Governance Law',
  'draft', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['foundational charter', 'book i', 'governance bodies'],
  ARRAY['governance-code', 'slps-core', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-010', 'meeting_record', 'Foundational Charter Adopted',
  'Book Charter renamed Foundational Charter. ED 53. Writing rules adopted.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-010', 'foundational charter', 'editorial decision 53'],
  ARRAY['editorial-standards', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-010', 'FRAMEWORK-FC-001', 'implements', 'FC-001 published'),
  ('LIB-2026-06-27-010', 'BOOK-I-FOUNDATIONAL-CHARTER', 'implements', 'Terminology adopted'),
  ('FRAMEWORK-FC-001', 'FRAMEWORK-SLPS-001', 'part_of', 'Publishing standard'),
  ('BOOK-I-FOUNDATIONAL-CHARTER', 'FRAMEWORK-FC-001', 'conforms_to', 'FC-001 template'),
  ('BOOK-I-FOUNDATIONAL-CHARTER', 'BOOK-I-CHARTER', 'supersedes', 'Legacy identifier')
ON CONFLICT DO NOTHING;
