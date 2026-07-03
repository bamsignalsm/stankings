-- CANON-018 Principles Before Opportunity + PAR Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-018', 'canon', 'Principles Before Opportunity',
  'No opportunity shall justify abandoning institutional principles — growth without compromise.',
  'Volume 0', 'first-principles', 'Strategic Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['principles', 'opportunity', 'PAR', 'governance', 'compromise'],
  ARRAY['iki', 'constitution', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-PAR-001', 'framework', 'Principles Alignment Review',
  'Major initiatives demonstrate alignment with Volume 0 principles before Board approval.',
  'Volume 0', 'first-principles', 'Strategic Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['PAR', 'principles', 'canon matrix', 'governance'],
  ARRAY['iki', 'constitution', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-018', 'CANON-001', 'depends_on', 'Principles rooted in service'),
  ('CANON-018', 'CANON-002', 'depends_on', 'Trust protected from compromise'),
  ('CANON-018', 'CANON-003', 'depends_on', 'Purpose before profit'),
  ('CANON-018', 'CANON-007', 'depends_on', 'Truth before convenience'),
  ('CANON-018', 'CANON-014', 'depends_on', 'Commitments protected'),
  ('CANON-017', 'CANON-018', 'supports', 'Uncertainty to principle governance'),
  ('CANON-016', 'CANON-018', 'supports', 'Strength to principle protection'),
  ('CANON-002', 'CANON-018', 'supports', 'Trust capital to restraint'),
  ('CANON-003', 'CANON-018', 'supports', 'Purpose to opportunity decline'),
  ('FRAMEWORK-PAR-001', 'CANON-018', 'depends_on', 'Derived from Canon 018'),
  ('CANON-018', 'FRAMEWORK-PAR-001', 'supports', 'Operationalized through PAR'),
  ('FRAMEWORK-PAR-001', 'FRAMEWORK-PAF-001', 'references', 'Purpose dimension'),
  ('FRAMEWORK-PAR-001', 'FRAMEWORK-TIA-001', 'references', 'Trust dimension'),
  ('FRAMEWORK-PAR-001', 'FRAMEWORK-EIA-001', 'references', 'Ecosystem dimension'),
  ('FRAMEWORK-PAR-001', 'FRAMEWORK-ISA-001', 'references', 'Strength dimension'),
  ('FRAMEWORK-PAR-001', 'FRAMEWORK-URF-001', 'references', 'Uncertainty dimension'),
  ('CANON-018', 'constitution', 'references', 'Constitutional principles')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
