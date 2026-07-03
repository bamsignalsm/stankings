-- CANON-021 Knowledge Is an Institutional Asset + IKG Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-021', 'canon', 'Knowledge Is an Institutional Asset',
  'Knowledge preserved, improved and shared — institutional capability, not merely documents.',
  'Volume 0', 'first-principles', 'Legacy Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['knowledge', 'IKG', 'library', 'asset', 'institutional memory'],
  ARRAY['iki', 'library-engine', 'knowledge-graph', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IKG-001', 'framework', 'Institutional Knowledge Graph',
  'Connected knowledge across the Library — living brain of institutional wisdom.',
  'Volume 0', 'first-principles', 'Legacy Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IKG', 'knowledge graph', 'connected knowledge'],
  ARRAY['iki', 'knowledge-graph', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-021', 'CANON-006', 'depends_on', 'Generational knowledge'),
  ('CANON-021', 'CANON-009', 'depends_on', 'Learning preserves knowledge'),
  ('CANON-021', 'CANON-019', 'depends_on', 'Improvement through knowledge'),
  ('CANON-021', 'CANON-020', 'depends_on', 'Judgment uses knowledge'),
  ('CANON-020', 'CANON-021', 'supports', 'Judgment to knowledge asset'),
  ('CANON-009', 'CANON-021', 'supports', 'Learning to knowledge'),
  ('CANON-006', 'CANON-021', 'supports', 'Generations to knowledge'),
  ('FRAMEWORK-IKG-001', 'CANON-021', 'depends_on', 'Derived from Canon 021'),
  ('CANON-021', 'FRAMEWORK-IKG-001', 'supports', 'Operationalized through IKG'),
  ('FRAMEWORK-IKG-001', 'FRAMEWORK-IDR-001', 'references', 'Decision knowledge'),
  ('FRAMEWORK-IKG-001', 'FRAMEWORK-LLR-001', 'references', 'Lesson knowledge'),
  ('FRAMEWORK-IKG-001', 'FRAMEWORK-IDI-001', 'references', 'Judgment knowledge'),
  ('CANON-021', 'LS-001', 'references', 'Knowledge Object Standard'),
  ('LS-001', 'CANON-021', 'supports', 'Standard to constitutional asset'),
  ('llr-registry', 'CANON-021', 'supports', 'Lessons to knowledge'),
  ('idr-registry', 'CANON-021', 'supports', 'Decisions to knowledge'),
  ('CANON-021', 'knowledge-graph', 'supports', 'Connected knowledge registry')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
