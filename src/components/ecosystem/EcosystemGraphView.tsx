"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EcosystemGraphEdge, EcosystemGraphNode } from "@/lib/institutional-ecosystem/types";

interface EcosystemGraphViewProps {
  nodes: EcosystemGraphNode[];
  edges: EcosystemGraphEdge[];
}

const CENTER = { x: 400, y: 280 };
const INSTITUTION_RADIUS = 200;
const SVG_W = 800;
const SVG_H = 560;

function polarPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y + radius * Math.sin(angle),
  };
}

export function EcosystemGraphView({ nodes, edges }: EcosystemGraphViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const institutions = nodes.filter((n) => n.type === "institution");
  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    map.set("stankings-group", CENTER);
    map.set("shared-platforms", { x: CENTER.x, y: CENTER.y + INSTITUTION_RADIUS + 70 });
    institutions.forEach((node, i) => {
      map.set(node.id, polarPosition(i, institutions.length, INSTITUTION_RADIUS));
    });
    return map;
  }, [institutions]);

  const relatedEdges = activeId
    ? edges.filter((e) => e.from === activeId || e.to === activeId)
    : edges;

  const isHighlighted = (id: string) => {
    if (!activeId) return true;
    if (id === activeId) return true;
    return relatedEdges.some((e) => e.from === id || e.to === id);
  };

  const edgeColor = (rel: EcosystemGraphEdge["relationship"]) => {
    if (rel === "depends") return "rgba(139, 58, 58, 0.5)";
    if (rel === "platform") return "rgba(212, 166, 74, 0.35)";
    return "rgba(212, 166, 74, 0.2)";
  };

  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
      <p className="mb-4 text-center text-xs text-cream-muted">
        Click an institution to explore relationships. Lines show strengthens, dependencies, and shared platform use.
      </p>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="mx-auto w-full max-w-4xl"
          role="img"
          aria-label="Institutional ecosystem graph"
        >
          {relatedEdges.map((edge, i) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            if (!from || !to) return null;
            const dimmed = activeId && !isHighlighted(edge.from) && !isHighlighted(edge.to);
            return (
              <line
                key={`${edge.from}-${edge.to}-${edge.relationship}-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColor(edge.relationship)}
                strokeWidth={edge.relationship === "depends" ? 2 : 1}
                strokeDasharray={edge.relationship === "platform" ? "4 4" : undefined}
                opacity={dimmed ? 0.15 : 1}
              />
            );
          })}

          {nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const highlighted = isHighlighted(node.id);
            const r = node.type === "group" ? 36 : node.type === "platform" ? 28 : 22;
            const fill =
              node.type === "group"
                ? "#1a1a2e"
                : node.type === "platform"
                  ? "#2a2418"
                  : node.color ?? "#2a2a3a";

            const label =
              node.label.length > 18 ? `${node.label.slice(0, 16)}…` : node.label;

            return (
              <g
                key={node.id}
                opacity={highlighted ? 1 : 0.25}
                className="cursor-pointer"
                onClick={() => setActiveId(activeId === node.id ? null : node.id)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={fill}
                  stroke={activeId === node.id ? "#d4a64a" : "rgba(212,166,74,0.4)"}
                  strokeWidth={activeId === node.id ? 2.5 : 1}
                />
                <text
                  x={pos.x}
                  y={pos.y + r + 14}
                  textAnchor="middle"
                  fill="#e8e0d0"
                  fontSize={node.type === "institution" ? 10 : 11}
                  className="pointer-events-none select-none"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {activeId && (
        <div className="mt-4 rounded border border-gold/25 bg-ink px-4 py-3 text-sm">
          {(() => {
            const node = nodes.find((n) => n.id === activeId);
            if (!node) return null;
            const strengthens = edges.filter((e) => e.from === activeId && e.relationship === "strengthens");
            const depends = edges.filter((e) => e.from === activeId && e.relationship === "depends");
            return (
              <>
                <p className="font-medium text-cream">{node.label}</p>
                {strengthens.length > 0 && (
                  <p className="mt-1 text-xs text-cream-muted">
                    Strengthens:{" "}
                    {strengthens
                      .map((e) => nodes.find((n) => n.id === e.to)?.label ?? e.to)
                      .join(", ")}
                  </p>
                )}
                {depends.length > 0 && (
                  <p className="mt-1 text-xs text-cream-muted">
                    Depends on:{" "}
                    {depends
                      .map((e) => nodes.find((n) => n.id === e.to)?.label ?? e.to)
                      .join(", ")}
                  </p>
                )}
                {node.href && (
                  <Link href={node.href} className="mt-2 inline-block text-xs text-gold hover:text-gold-light">
                    View constitutional profile →
                  </Link>
                )}
              </>
            );
          })()}
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-wider text-cream-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-gold/30" /> Strengthens
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-6 border-t border-dashed border-gold/40" /> Platform
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-burgundy/50" /> Depends
        </span>
      </div>
    </div>
  );
}
