-- CANON-022 Create Value That Outlasts Us + Legacy Dashboard Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-022', 'canon', 'Create Value That Outlasts Us',
  'Nation-building institution — leave society stronger than we found it.',
  'Volume 0', 'first-principles', 'Civilization Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['legacy', 'civilization', 'stewardship report', 'societal contribution', 'nation-building'],
  ARRAY['iki', 'library-engine', 'legacy-dashboard', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LEGACY-001', 'framework', 'Legacy Dashboard',
  'Annual Stewardship Reports — institutional performance and societal contribution.',
  'Volume 0', 'first-principles', 'Civilization Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['LEGACY', 'stewardship report', 'societal contribution'],
  ARRAY['iki', 'legacy-dashboard', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-022', 'CANON-001', 'depends_on', 'Institutions serve society'),
  ('CANON-022', 'CANON-003', 'depends_on', 'Purpose precedes profit'),
  ('CANON-022', 'CANON-006', 'depends_on', 'Generational value'),
  ('CANON-022', 'CANON-019', 'depends_on', 'Leave it better'),
  ('CANON-022', 'CANON-021', 'depends_on', 'Knowledge as enduring asset'),
  ('CANON-001', 'CANON-022', 'supports', 'Service to civilization'),
  ('CANON-003', 'CANON-022', 'supports', 'Purpose to legacy'),
  ('CANON-006', 'CANON-022', 'supports', 'Generations to legacy'),
  ('CANON-019', 'CANON-022', 'supports', 'Improvement to societal value'),
  ('CANON-021', 'CANON-022', 'supports', 'Knowledge to lasting value'),
  ('FRAMEWORK-LEGACY-001', 'CANON-022', 'depends_on', 'Derived from Canon 022'),
  ('CANON-022', 'FRAMEWORK-LEGACY-001', 'supports', 'Operationalized through Legacy Dashboard'),
  ('FRAMEWORK-LEGACY-001', 'FRAMEWORK-ASR-001', 'references', 'Department stewardship reviews'),
  ('FRAMEWORK-LEGACY-001', 'FRAMEWORK-IIR-001', 'references', 'Improvement register'),
  ('FRAMEWORK-LEGACY-001', 'CANON-019', 'references', 'Stewardship foundation'),
  ('CANON-022', 'legacy-dashboard', 'supports', 'Annual Stewardship Reports'),
  ('CANON-022', 'canon-dashboard', 'supports', 'Canon implementation tracking'),
  ('stankings-foundation', 'CANON-022', 'supports', 'Foundation to civilization canon'),
  ('CANON-022', 'LEX-LEGACY', 'references', 'Lexicon: Legacy')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
