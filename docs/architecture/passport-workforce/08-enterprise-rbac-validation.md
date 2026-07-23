# 8. Enterprise RBAC Validation

Inheritance: Staff ⊂ Dept Manager ⊂ Company Head ⊂ Founder.

Scopes: company → department → team → role → workspace → feature → action.

Grants stored in `workforce_grants`; templates from Organization Registry roles. Never hardcode role names alone in feature gates.
