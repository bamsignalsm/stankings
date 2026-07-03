-- CANON-014 Our Word Is a Commitment + Commitment Registry

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-014', 'canon', 'Our Word Is a Commitment',
  'Our word is a commitment — promises shall be truthful, deliberate, and honoured faithfully across the ecosystem.',
  'Volume 0', 'first-principles', 'Credibility Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['commitment', 'promise', 'credibility', 'trust', 'SLA'],
  ARRAY['iki', 'commitment-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-014', 'CANON-001', 'depends_on', 'Commitments serve those we serve'),
  ('CANON-014', 'CANON-002', 'depends_on', 'Commitments create trust'),
  ('CANON-014', 'CANON-007', 'depends_on', 'Truthful promises'),
  ('CANON-013', 'CANON-014', 'supports', 'Innovation to credibility'),
  ('CANON-002', 'CANON-014', 'supports', 'Trust to institutional word'),
  ('CANON-007', 'CANON-014', 'supports', 'Truth to commitments')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
