# Governance Foundation

**Package:** `src/lib/enterprise-platform/governance/`  
**Version:** 1.0.0  
**Contract:** `governance.policy@1.0.0`

---

## Primitives

- Policy definitions (versioned, requirement keys, effects allow/deny/require)
- Feature gates
- Policy evaluation (`evaluatePolicies`)
- Compliance metadata shape
- Emits `governance.policy.evaluated` events

## Built-in policies

- Identity must be production-ready for dependent capabilities  
- Deny production calls when capability is `interface_only` / `contract_only`

## Non-goals

Product business rules, Board policy text, constitutional amendments.
