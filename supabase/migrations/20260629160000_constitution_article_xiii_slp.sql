-- Constitution Article XIII + Stankings Library Portal (ED 41) — Part IV

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XIII', 'article', 'Article XIII — Knowledge, Learning & Institutional Memory',
  'Part IV Constitutional Integrity — The Stankings Library, learning duty, knowledge contribution, and institutional memory.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xiii', 'knowledge', 'library', 'institutional memory', 'learning', 'part iv'],
  ARRAY['iki', 'stankings-library', 'library-engine', 'knowledge-graph', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-SLP-001', 'framework', 'Stankings Library Portal',
  'Knowledge object profiles, institutional knowledge chain, and KGF per Article XIII.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['slp', 'library portal', 'kgf', 'knowledge governance', 'article xiii'],
  ARRAY['iki', 'stankings-library', 'library-engine', 'knowledge-graph']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XIII', 'references', 'Article XIII adopted — Part IV knowledge layer'),
  ('CONSTITUTION-ARTICLE-XIII', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XII', 'CONSTITUTION-ARTICLE-XIII', 'references', 'Trust layer precedes knowledge layer'),
  ('CONSTITUTION-ARTICLE-XIII', 'CONSTITUTION-ARTICLE-XII', 'depends_on', 'Digital trust foundation'),
  ('CONSTITUTION-ARTICLE-XIII', 'CONSTITUTION-ARTICLE-VII', 'depends_on', 'Knowledge as constitutional asset'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-006', 'implements', 'Generational knowledge'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-009', 'implements', 'Continuous learning'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-019', 'implements', 'Knowledge contribution'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-020', 'implements', 'Judgment preservation'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-021', 'implements', 'Knowledge as asset'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-022', 'implements', 'Lasting value through knowledge'),
  ('CONSTITUTION-ARTICLE-XIII', 'CANON-023', 'implements', 'Humble learning'),
  ('CONSTITUTION-ARTICLE-XIII', 'FRAMEWORK-SLP-001', 'supports', 'Library portal'),
  ('CONSTITUTION-ARTICLE-XIII', 'FRAMEWORK-IKG-001', 'supports', 'Knowledge graph'),
  ('FRAMEWORK-SLP-001', 'CONSTITUTION-ARTICLE-XIII', 'depends_on', 'Derived from Article XIII'),
  ('FRAMEWORK-SLP-001', 'FRAMEWORK-IKG-001', 'references', 'Institutional knowledge graph'),
  ('FRAMEWORK-SLP-001', 'LS-001', 'references', 'Knowledge Object Standard'),
  ('FRAMEWORK-SLP-001', 'stankings-library', 'supports', 'Portal system'),
  ('stankings-library', 'CONSTITUTION-ARTICLE-XIII', 'depends_on', 'Constitutional authority'),
  ('FRAMEWORK-IKG-001', 'CONSTITUTION-ARTICLE-XIII', 'depends_on', 'Constitutional authority for IKG'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Generations to memory'),
  ('CANON-009', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Learning to library'),
  ('CANON-019', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Stewardship to contribution'),
  ('CANON-020', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Judgment to records'),
  ('CANON-021', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Asset to library'),
  ('CANON-022', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Value to knowledge'),
  ('CANON-023', 'CONSTITUTION-ARTICLE-XIII', 'supports', 'Humility to learning')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
