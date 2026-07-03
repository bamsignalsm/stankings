-- CANON-013 Innovate with Purpose + IGF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-013', 'canon', 'Innovate with Purpose',
  'Innovate with purpose — novelty alone never justifies investment; innovation serves mission, trust, and those we serve.',
  'Volume 0', 'first-principles', 'Innovation Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['innovation', 'purpose', 'experiment', 'pilot', 'technology'],
  ARRAY['iki', 'ai', 'engineering-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IGF-001', 'framework', 'Innovation Governance Framework',
  'Significant innovations governed through disciplined review before institutional adoption.',
  'Volume 0', 'first-principles', 'Innovation Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IGF', 'innovation', 'governance', 'pilot', 'experiment'],
  ARRAY['iki', 'ai', 'engineering-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-013', 'CANON-001', 'depends_on', 'Innovation serves those we serve'),
  ('CANON-013', 'CANON-003', 'depends_on', 'Purpose guides innovation'),
  ('CANON-013', 'CANON-012', 'depends_on', 'Platforms enable responsible innovation'),
  ('CANON-012', 'CANON-013', 'supports', 'Architecture to innovation governance'),
  ('CANON-003', 'CANON-013', 'supports', 'Purpose to innovation practice'),
  ('FRAMEWORK-IGF-001', 'CANON-013', 'depends_on', 'Derived from Canon 013'),
  ('CANON-013', 'FRAMEWORK-IGF-001', 'supports', 'Operationalized through IGF')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
