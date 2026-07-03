-- CANON-016 Build for Institutional Strength + ISA Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-016', 'canon', 'Build for Institutional Strength',
  'Build for institutional strength — growth measured by resilience and capability, not size or revenue alone.',
  'Volume 0', 'first-principles', 'Strategic Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['strength', 'growth', 'acquisition', 'strategy', 'ISA'],
  ARRAY['iki', 'ecosystem-map', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-ISA-001', 'framework', 'Institutional Strength Assessment',
  'Acquisitions and major investments evaluated for institutional strength before approval.',
  'Volume 0', 'first-principles', 'Strategic Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ISA', 'strength', 'growth', 'acquisition'],
  ARRAY['iki', 'ecosystem-map']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-016', 'CANON-003', 'depends_on', 'Purpose guides growth'),
  ('CANON-016', 'CANON-005', 'depends_on', 'Ecosystem strength'),
  ('CANON-016', 'CANON-006', 'depends_on', 'Generational strength'),
  ('CANON-015', 'CANON-016', 'supports', 'Resilience to strategic growth'),
  ('CANON-005', 'CANON-016', 'supports', 'Ecosystem to strength assessment'),
  ('FRAMEWORK-ISA-001', 'CANON-016', 'depends_on', 'Derived from Canon 016'),
  ('CANON-016', 'FRAMEWORK-ISA-001', 'supports', 'Operationalized through ISA'),
  ('FRAMEWORK-ISA-001', 'FRAMEWORK-EIA-001', 'references', 'Ecosystem dimension')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
