-- Constitution Article XV + Constitution Centre (ED 43) — Part V

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XV', 'article', 'Article XV — Constitutional Amendment, Preservation & Continuity',
  'Part V Constitutional Continuity — amendment process, preservation, interpretation, and self-governance.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xv', 'amendment', 'constitution register', 'preservation', 'continuity', 'part v'],
  ARRAY['iki', 'constitution-centre', 'library-engine', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CCR-001', 'framework', 'Constitution Centre',
  'Constitution Register, amendment workspace, and version history per Article XV.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ccr', 'constitution centre', 'constitution register', 'amendment', 'article xv'],
  ARRAY['iki', 'constitution-centre', 'library-engine', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XV', 'references', 'Article XV adopted — Part V continuity'),
  ('CONSTITUTION-ARTICLE-XV', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XIV', 'CONSTITUTION-ARTICLE-XV', 'references', 'Health precedes amendment discipline'),
  ('CONSTITUTION-ARTICLE-XV', 'CONSTITUTION-ARTICLE-XIV', 'depends_on', 'Improvement foundation'),
  ('CONSTITUTION-ARTICLE-XV', 'CONSTITUTION-ARTICLE-XIII', 'depends_on', 'Library preserves history'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-006', 'implements', 'Generational continuity'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-007', 'implements', 'Truth in amendment'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-016', 'implements', 'Schedules governance'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-020', 'implements', 'Sound judgment in change'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-021', 'implements', 'History preservation'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-023', 'implements', 'Humble evolution'),
  ('CONSTITUTION-ARTICLE-XV', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-ARTICLE-XV', 'FRAMEWORK-CCR-001', 'supports', 'Constitution centre'),
  ('CONSTITUTION-ARTICLE-XV', 'constitution-schedules', 'supports', 'Schedule framework'),
  ('FRAMEWORK-CCR-001', 'CONSTITUTION-ARTICLE-XV', 'depends_on', 'Derived from Article XV'),
  ('FRAMEWORK-CCR-001', 'FRAMEWORK-TIA-001', 'references', 'Amendment trust impact'),
  ('FRAMEWORK-CCR-001', 'FRAMEWORK-GRF-001', 'references', 'Generational review'),
  ('FRAMEWORK-CCR-001', 'FRAMEWORK-SLP-001', 'references', 'Library preservation'),
  ('FRAMEWORK-CCR-001', 'constitution-schedules', 'references', 'Schedules A–H'),
  ('FRAMEWORK-CCR-001', 'constitution-centre', 'supports', 'Portal system'),
  ('constitution-centre', 'CONSTITUTION-ARTICLE-XV', 'depends_on', 'Constitutional authority'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-XV', 'supports', 'Generations to continuity'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-XV', 'supports', 'Truth to amendment'),
  ('CANON-016', 'CONSTITUTION-ARTICLE-XV', 'supports', 'Governance to schedules'),
  ('CANON-021', 'CONSTITUTION-ARTICLE-XV', 'supports', 'Knowledge to history'),
  ('CANON-025', 'CONSTITUTION-ARTICLE-XV', 'supports', 'Endurance to stability')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
