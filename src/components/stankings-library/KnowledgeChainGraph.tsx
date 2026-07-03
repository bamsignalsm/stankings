"use client";

import Link from "next/link";
import { useState } from "react";
import type { KnowledgeChainEdge, KnowledgeChainNode } from "@/lib/stankings-library/types";

interface KnowledgeChainGraphProps {
  nodes: KnowledgeChainNode[];
  edges: KnowledgeChainEdge[];
}

export function KnowledgeChainGraph({ nodes, edges }: KnowledgeChainGraphProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const nodeIndex = nodes.findIndex((n) => n.id === activeId);
  const isHighlighted = (id: string) => {
    if (!activeId) return true;
    const idx = nodes.findIndex((n) => n.id === id);
    const activeIdx = nodes.findIndex((n) => n.id === activeId);
    return Math.abs(idx - activeIdx) <= 1 || id === activeId;
  };

  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
      <p className="mb-6 text-center text-xs text-cream-muted">
        From Canon to training — nothing isolated. Everything connected.
      </p>
      <div className="flex flex-col items-center gap-0">
        {nodes.map((node, i) => {
          const edge = edges.find((e) => e.to === node.id);
          const dimmed = !isHighlighted(node.id);
          const content = (
            <div
              className={`relative w-full max-w-md rounded-lg border px-6 py-4 text-center transition-opacity ${
                activeId === node.id
                  ? "border-gold bg-gold-subtle"
                  : "border-gold-subtle bg-ink"
              } ${dimmed ? "opacity-30" : "opacity-100"} ${node.href ? "cursor-pointer hover:border-gold/50" : "cursor-pointer"}`}
              onClick={() => setActiveId(activeId === node.id ? null : node.id)}
            >
              <p className="font-mono text-xs text-gold">{node.type}</p>
              <p className="font-serif text-lg text-cream">{node.label}</p>
            </div>
          );

          return (
            <div key={node.id} className="flex w-full flex-col items-center">
              {edge && i > 0 && (
                <div className={`my-1 h-8 w-px bg-gold/30 ${dimmed ? "opacity-30" : ""}`} />
              )}
              {node.href ? (
                <Link href={node.href} className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
      {activeId && nodeIndex >= 0 && (
        <p className="mt-6 text-center text-xs text-cream-muted">
          Step {nodeIndex + 1} of {nodes.length} in the institutional knowledge chain
        </p>
      )}
    </div>
  );
}
