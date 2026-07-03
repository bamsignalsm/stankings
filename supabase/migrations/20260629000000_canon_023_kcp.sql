-- CANON-023 Remain Humble Enough to Learn + KCP Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-023', 'canon', 'Remain Humble Enough to Learn',
  'Stable principles, adaptable methods — confidence with humility, truth over pride.',
  'Volume 0', 'first-principles', 'Civilization Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['humility', 'learning', 'challenge', 'KCP', 'civilization'],
  ARRAY['iki', 'library-engine', 'knowledge-challenges', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-KCP-001', 'framework', 'Knowledge Challenge Process',
  'Respectfully challenge policy, workflow, standards, and decisions — evidence over tradition.',
  'Volume 0', 'first-principles', 'Civilization Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['KCP', 'knowledge challenge', 'humility'],
  ARRAY['iki', 'knowledge-challenges', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-023', 'CANON-007', 'depends_on', 'Truth over pride'),
  ('CANON-023', 'CANON-009', 'depends_on', 'Continuous learning'),
  ('CANON-023', 'CANON-020', 'depends_on', 'Judgment with humility'),
  ('CANON-023', 'CANON-022', 'depends_on', 'Civilization principles'),
  ('CANON-007', 'CANON-023', 'supports', 'Truth to humility'),
  ('CANON-009', 'CANON-023', 'supports', 'Learning to humility'),
  ('CANON-020', 'CANON-023', 'supports', 'Judgment to teachability'),
  ('CANON-022', 'CANON-023', 'supports', 'Legacy to learning'),
  ('FRAMEWORK-KCP-001', 'CANON-023', 'depends_on', 'Derived from Canon 023'),
  ('CANON-023', 'FRAMEWORK-KCP-001', 'supports', 'Operationalized through KCP'),
  ('FRAMEWORK-KCP-001', 'FRAMEWORK-LLR-001', 'references', 'Lessons from challenges'),
  ('FRAMEWORK-KCP-001', 'FRAMEWORK-IDI-001', 'references', 'Judgment records'),
  ('FRAMEWORK-KCP-001', 'CANON-009', 'references', 'Learning canon'),
  ('CANON-023', 'knowledge-challenges', 'supports', 'Challenge registry'),
  ('CANON-023', 'canon-dashboard', 'supports', 'Canon implementation tracking'),
  ('llr-registry', 'CANON-023', 'supports', 'Lessons to humility'),
  ('CANON-023', 'LEX-HUMILITY', 'references', 'Lexicon: Humility')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
