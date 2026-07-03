-- CANON-019 Leave It Better Than You Found It + IIR + ASR

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-019', 'canon', 'Leave It Better Than You Found It',
  'Every custodian strengthens the institution — stewardship measured by responsible improvement.',
  'Volume 0', 'first-principles', 'Legacy Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['improvement', 'stewardship', 'IIR', 'ASR', 'legacy'],
  ARRAY['iki', 'constitution', 'improvement-registry', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IIR-001', 'framework', 'Institutional Improvement Register',
  'Living register of improvements — visible history of institutional maturation.',
  'Volume 0', 'first-principles', 'Legacy Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IIR', 'improvement', 'stewardship'],
  ARRAY['iki', 'improvement-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-ASR-001', 'framework', 'Annual Stewardship Review',
  'Departments document what they preserved, improved, learned, and passed forward.',
  'Volume 0', 'first-principles', 'Legacy Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ASR', 'stewardship', 'annual review'],
  ARRAY['iki', 'improvement-registry', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-019', 'CANON-004', 'depends_on', 'Stewardship leadership'),
  ('CANON-019', 'CANON-006', 'depends_on', 'Generational improvement'),
  ('CANON-019', 'CANON-009', 'depends_on', 'Continuous learning'),
  ('CANON-019', 'CANON-016', 'depends_on', 'Strength through improvement'),
  ('CANON-019', 'CANON-018', 'depends_on', 'Principles preserved while improving'),
  ('CANON-018', 'CANON-019', 'supports', 'Strategic to legacy bridge'),
  ('CANON-004', 'CANON-019', 'supports', 'Leadership stewardship to legacy'),
  ('CANON-006', 'CANON-019', 'supports', 'Generations to improvement'),
  ('CANON-009', 'CANON-019', 'supports', 'Learning to improvement'),
  ('FRAMEWORK-IIR-001', 'CANON-019', 'depends_on', 'Derived from Canon 019'),
  ('CANON-019', 'FRAMEWORK-IIR-001', 'supports', 'Operationalized through IIR'),
  ('FRAMEWORK-ASR-001', 'CANON-019', 'depends_on', 'Derived from Canon 019'),
  ('CANON-019', 'FRAMEWORK-ASR-001', 'supports', 'Operationalized through ASR'),
  ('FRAMEWORK-ASR-001', 'FRAMEWORK-IIR-001', 'references', 'Improvement evidence'),
  ('FRAMEWORK-IIR-001', 'FRAMEWORK-LLR-001', 'references', 'Lessons feed improvements'),
  ('CANON-019', 'constitution', 'references', 'Family and Group Constitution bridge')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
