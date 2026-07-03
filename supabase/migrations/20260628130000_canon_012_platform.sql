-- CANON-012 Build Platforms, Not Silos + PLAT Framework + Platform Registry

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-012', 'canon', 'Build Platforms, Not Silos',
  'Build platforms, not silos — shared capabilities strengthen the ecosystem; duplication weakens it.',
  'Volume 0', 'first-principles', 'Architectural Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['platform', 'silos', 'architecture', 'ecosystem', 'shared infrastructure'],
  ARRAY['iki', 'platform-registry', 'engineering-standards', 'ecosystem-map']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-PLAT-001', 'framework', 'Platform Assessment',
  'New technical capabilities evaluated for platform reuse before implementation.',
  'Volume 0', 'first-principles', 'Architectural Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['PLAT', 'platform', 'architecture', 'registry'],
  ARRAY['iki', 'platform-registry', 'engineering-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-012', 'CANON-001', 'depends_on', 'Service through shared infrastructure'),
  ('CANON-012', 'CANON-005', 'depends_on', 'Ecosystem architecture'),
  ('CANON-012', 'CANON-011', 'depends_on', 'Simplicity enables platform reuse'),
  ('CANON-011', 'CANON-012', 'supports', 'Operational to architectural thinking'),
  ('CANON-005', 'CANON-012', 'supports', 'Ecosystem to platform architecture'),
  ('FRAMEWORK-PLAT-001', 'CANON-012', 'depends_on', 'Derived from Canon 012'),
  ('CANON-012', 'FRAMEWORK-PLAT-001', 'supports', 'Operationalized through PLAT')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
