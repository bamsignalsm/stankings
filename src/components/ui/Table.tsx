import type { ReactNode } from "react";

export function Table({
  headers,
  children,
  caption,
}: {
  headers: string[];
  children: ReactNode;
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gold-subtle">
      <table className="w-full min-w-[480px] text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-gold-subtle bg-ink-light">
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-xs font-semibold tracking-widest text-gold uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-gold-subtle last:border-0">{children}</tr>;
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-4 py-3 text-cream-muted">{children}</td>;
}
