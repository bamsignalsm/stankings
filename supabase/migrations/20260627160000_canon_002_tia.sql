-- CANON-002 and Trust Impact Assessment Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-002', 'canon', 'Trust Is Institutional Capital',
  'Trust is institutional capital — the greatest asset an institution holds. Every decision shall be evaluated for its effect upon trust.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['trust', 'capital', 'trust test', 'decision making'],
  ARRAY['yike', 'bamsignal', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-TIA-001', 'framework', 'Trust Impact Assessment Framework',
  'Decision-making machinery requiring trust impact evaluation on every significant institutional proposal.',
  'Volume 0', 'first-principles', 'Decision Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['trust impact', 'TIA', 'proposal', 'governance'],
  ARRAY['library-engine', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-002', 'CANON-001', 'depends_on', 'Builds upon the First Principle'),
  ('CANON-002', 'LS-001', 'depends_on', 'Knowledge Object under LS-001'),
  ('CANON-002', 'LS-002', 'depends_on', 'Uses Lexicon term: Trust'),
  ('FRAMEWORK-TIA-001', 'CANON-002', 'depends_on', 'Derived from Canon 002'),
  ('FRAMEWORK-TIA-001', 'CANON-001', 'references', 'Institutional service principle'),
  ('FRAMEWORK-TIA-001', 'LS-002', 'references', 'Lexicon: Trust')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
