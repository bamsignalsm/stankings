-- Foundational Charter v1.0 RC1 — LIB-2026-06-27-011

UPDATE stankings_knowledge_objects
SET
  title = 'Book I — Foundational Charter',
  summary = 'Foundational Charter v1.0 RC1 — Draft – Editorial Review.',
  version = '1.0 RC1',
  updated_at = '2026-06-27'
WHERE identifier = 'BOOK-I-FOUNDATIONAL-CHARTER';

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-011', 'meeting_record', 'First Published Draft of the Foundational Charter',
  'Foundational Charter v1.0 RC1 — first Volume II governance prose. Founder review.',
  'Volume II', 'governance-code', 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-011', 'foundational charter', 'v1.0 rc1'],
  ARRAY['governance-code', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-06-27-011', 'BOOK-I-FOUNDATIONAL-CHARTER', 'implements', 'First published draft v1.0 RC1')
ON CONFLICT DO NOTHING;
