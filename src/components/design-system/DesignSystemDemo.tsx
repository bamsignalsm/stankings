"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  Dropdown,
  FormField,
  Input,
  List,
  Pagination,
  Skeleton,
  StatusBadge,
  Tabs,
  Textarea,
} from "@/components/ui";

export function DesignSystemDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h3 className="text-xs tracking-widest text-gold uppercase">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs tracking-widest text-gold uppercase">Inputs</h3>
        <div className="grid max-w-xl gap-3">
          <FormField id="demo-input" label="Email">
            <Input id="demo-input" type="email" placeholder="you@company.com" />
          </FormField>
          <FormField id="demo-area" label="Message" hint="Enterprise tone — no flashy UI.">
            <Textarea id="demo-area" rows={3} placeholder="Describe the request" />
          </FormField>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs tracking-widest text-gold uppercase">Alerts & badges</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="operational" label="Operational" />
          <StatusBadge status="degraded" label="Degraded" />
          <StatusBadge status="unknown" label="Unknown" />
        </div>
        <Alert tone="info" title="Information">
          Shared components use consistent focus rings and reduced-motion support.
        </Alert>
        <Alert tone="warning" title="Warning">
          Prefer tokens over ad-hoc colors in product UIs.
        </Alert>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs tracking-widest text-gold uppercase">Tabs · dropdown · dialog</h3>
        <Tabs
          items={[
            {
              id: "tokens",
              label: "Tokens",
              panel: <p className="text-sm text-cream-muted">Import from @/lib/design-system.</p>,
            },
            {
              id: "components",
              label: "Components",
              panel: <p className="text-sm text-cream-muted">Import from @/components/ui.</p>,
            },
          ]}
        />
        <div className="flex flex-wrap gap-3">
          <Dropdown
            label="Actions"
            items={[
              { id: "a", label: "View docs", onSelect: () => undefined },
              { id: "b", label: "Copy import", onSelect: () => undefined },
            ]}
          />
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </div>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Example dialog">
          Accessible modal with Escape to close and focus management.
        </Dialog>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs tracking-widest text-gold uppercase">Lists · skeleton · pagination</h3>
        <List items={["Keyboard focus visible", "ARIA roles on dialogs and tabs", "Reduced motion respected"]} />
        <Skeleton className="h-10 w-full max-w-md" />
        <Pagination page={page} pageCount={5} onPageChange={setPage} />
      </section>
    </div>
  );
}
