# 06. Workforce Routing Architecture

Canonical implementation: `src/lib/passport/capability-routing.ts`  
Policy doc: [15-capability-routing.md](./15-capability-routing.md)

Post-auth destination is resolved by **capability**, never by user preference alone.

```text
Passport Auth
    ↓
Capability resolution
    ↓
Energy | Executive | Company | SKL | Recovery | Applicant | Library
```

## Priority

1. Founder / Super Admin → Energy  
2. Executive (`ceo`) → `/skl/executive`  
3. Company Head → `/skl/company`  
4. Employee / Manager → `/skl`  
5. Pending Passport recovery → `/passport/recovery`  
6. Applicant (active applications) → `/passport/applicant`  
7. Public approved member → `/library`  

Workers never enter Energy. Applicants with active applications never land on `/library` via stale `?next=`.

Login surfaces converge on capability resolution via `/auth/continue`, `/auth/callback`, and middleware auth-page bounce.
