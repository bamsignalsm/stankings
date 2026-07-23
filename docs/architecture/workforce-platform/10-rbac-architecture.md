# 10. RBAC Architecture

## Inheritance

```
Staff grants
  ∪ Department Manager grants (same dept)
  ∪ Company Head grants (same company)
  ∪ CEO override (Energy super_admin — all)
```

## Scopes

Company → Department → Role → Workspace → Feature → Action

## Storage

- `workforce_permission_defs` — catalogue of permission keys
- `workforce_role_templates` — default permission keys per role_key
- `workforce_grants` — effective grants on employee (copied at provision; adjustable in Energy)

## Resolution API

`resolvePermissions(employeeId) → Set<permissionKey>`

UI and server actions call `requirePermission(employee, key)` — never hardcode role names in feature gates alone.
