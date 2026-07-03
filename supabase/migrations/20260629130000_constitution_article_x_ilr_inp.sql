-- Constitution Article X + ILR + Innovation Portal (ED 38)
-- Articles II & V amended (innovation sections) — seed body updated

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-X', 'article', 'Article X — The Lifecycle of Institutions',
  'Constitutional engine — birth, development pathway, charter, incubation, review, renewal, and responsible conclusion.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article x', 'institution lifecycle', 'venture studio', 'innovation', 'bambet'],
  ARRAY['iki', 'institution-lifecycle', 'innovation-portal', 'library-engine', 'venture-studio']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-ILR-001', 'framework', 'Institution Lifecycle Registry',
  'Register of Constitutional Institutions per Article X.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ilr', 'lifecycle registry', 'institutional charter', 'article x'],
  ARRAY['iki', 'institution-lifecycle', 'library-engine', 'innovation-portal']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-INP-001', 'framework', 'Innovation Portal',
  'Stankings Venture Studio — constitutional innovation pipeline per Article X and Schedule H.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['inp', 'innovation portal', 'venture studio', 'innovation passport'],
  ARRAY['iki', 'innovation-portal', 'institution-lifecycle', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-SCHEDULE-H', 'framework', 'Schedule H — Innovation & Venture Development',
  'Operational framework for Venture Studio, innovation tracks, and incubation per Article X.',
  'Volume I', 'constitution', 'Constitutional Schedules',
  'forming', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['schedule h', 'innovation', 'venture studio', 'incubation'],
  ARRAY['iki', 'innovation-portal', 'constitution-schedules']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-X', 'references', 'Article X adopted'),
  ('CONSTITUTION-ARTICLE-X', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-X', 'CONSTITUTION-ARTICLE-IX', 'depends_on', 'Follows ecosystem'),
  ('CONSTITUTION-ARTICLE-X', 'CONSTITUTION-ARTICLE-II', 'depends_on', 'Innovation as stewardship'),
  ('CONSTITUTION-ARTICLE-X', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Leadership encourages innovation'),
  ('CONSTITUTION-ARTICLE-IX', 'CONSTITUTION-ARTICLE-X', 'references', 'Lifecycle follows ecosystem'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-003', 'implements', 'Purpose alignment'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-005', 'implements', 'Ecosystem contribution'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-006', 'implements', 'Generational relevance'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-009', 'implements', 'Lessons preserved'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-013', 'implements', 'Responsible innovation'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-018', 'implements', 'Responsible conclusion'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-021', 'implements', 'Knowledge preservation'),
  ('CONSTITUTION-ARTICLE-X', 'CANON-022', 'implements', 'Lasting value'),
  ('CONSTITUTION-ARTICLE-X', 'FRAMEWORK-ILR-001', 'supports', 'Lifecycle registry'),
  ('CONSTITUTION-ARTICLE-X', 'FRAMEWORK-INP-001', 'supports', 'Innovation portal'),
  ('FRAMEWORK-ILR-001', 'CONSTITUTION-ARTICLE-X', 'depends_on', 'Derived from Article X'),
  ('FRAMEWORK-ILR-001', 'FRAMEWORK-IEP-001', 'references', 'Ecosystem register'),
  ('FRAMEWORK-ILR-001', 'FRAMEWORK-IIS-001', 'references', 'Institutional charters'),
  ('FRAMEWORK-ILR-001', 'FRAMEWORK-PAR-001', 'references', 'Principles review'),
  ('FRAMEWORK-ILR-001', 'institution-lifecycle', 'supports', 'Portal system'),
  ('FRAMEWORK-INP-001', 'CONSTITUTION-ARTICLE-X', 'depends_on', 'Derived from Article X'),
  ('FRAMEWORK-INP-001', 'CONSTITUTION-SCHEDULE-H', 'references', 'Schedule H framework'),
  ('FRAMEWORK-INP-001', 'FRAMEWORK-ILR-001', 'references', 'Lifecycle register'),
  ('FRAMEWORK-INP-001', 'innovation-portal', 'supports', 'Portal system'),
  ('FRAMEWORK-INP-001', 'venture-studio', 'supports', 'Venture Studio'),
  ('innovation-portal', 'CONSTITUTION-ARTICLE-X', 'depends_on', 'Constitutional authority'),
  ('institution-lifecycle', 'CONSTITUTION-ARTICLE-X', 'depends_on', 'Constitutional authority'),
  ('ecosystem-architecture', 'institution-lifecycle', 'references', 'Lifecycle profiles'),
  ('CANON-013', 'CONSTITUTION-ARTICLE-X', 'supports', 'Innovation to lifecycle'),
  ('CANON-018', 'CONSTITUTION-ARTICLE-X', 'supports', 'BamBet precedent'),
  ('CANON-021', 'CONSTITUTION-ARTICLE-X', 'supports', 'Knowledge to conclusion')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
