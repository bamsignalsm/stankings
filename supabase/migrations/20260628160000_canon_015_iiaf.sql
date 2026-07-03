-- CANON-015 Accountability Builds Resilience + IIAF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-015', 'canon', 'Accountability Builds Resilience',
  'Accountability builds resilience — failures addressed with integrity become institutional wisdom.',
  'Volume 0', 'first-principles', 'Resilience Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['accountability', 'resilience', 'incident', 'root cause', 'blameless'],
  ARRAY['iki', 'incident-center', 'lessons-learned']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IIAF-001', 'framework', 'Institutional Incident & Accountability Framework',
  'Material incidents concluded with blameless review, RCA, lessons learned, and preventive action.',
  'Volume 0', 'first-principles', 'Resilience Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IIAF', 'incident', 'accountability', 'resilience'],
  ARRAY['iki', 'incident-center', 'lessons-learned']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-015', 'CANON-002', 'depends_on', 'Accountability strengthens trust'),
  ('CANON-015', 'CANON-009', 'depends_on', 'Failures become lessons'),
  ('CANON-015', 'CANON-014', 'depends_on', 'Honest response to broken commitments'),
  ('CANON-014', 'CANON-015', 'supports', 'Credibility to accountability'),
  ('CANON-009', 'CANON-015', 'supports', 'Learning to resilience'),
  ('FRAMEWORK-IIAF-001', 'CANON-015', 'depends_on', 'Derived from Canon 015'),
  ('CANON-015', 'FRAMEWORK-IIAF-001', 'supports', 'Operationalized through IIAF'),
  ('FRAMEWORK-IIAF-001', 'FRAMEWORK-LLR-001', 'references', 'Incidents feed LLR')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
