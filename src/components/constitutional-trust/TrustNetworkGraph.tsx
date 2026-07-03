"use client";

import { useMemo, useState } from "react";
import type { TrustGraphEdge } from "@/lib/constitutional-trust/types";

interface TrustNetworkGraphProps {
  nodes: { id: string; label: string; type: "hub" | "layer" | "institution" | "platform" }[];
  edges: TrustGraphEdge[];
}

const CENTER = { x: 400, y: 200 };
const INSTITUTION_RADIUS = 220;
const SVG_W = 800;
const SVG_H = 520;

export function TrustNetworkGraph({ nodes, edges }: TrustNetworkGraphProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const institutions = nodes.filter((n) => n.type === "institution");
  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    map.set("identity-layer", { x: CENTER.x, y: 60 });
    map.set("yike-passport", CENTER);
    map.set("trust-graph", { x: CENTER.x - 120, y: CENTER.y + 100 });
    map.set("consent", { x: CENTER.x + 120, y: CENTER.y + 100 });
    map.set("shared-ai", { x: CENTER.x, y: CENTER.y + 140 });
    institutions.forEach((node, i) => {
      const angle = (i / institutions.length) * Math.PI * 2 - Math.PI / 2;
      map.set(node.id, {
        x: CENTER.x + INSTITUTION_RADIUS * Math.cos(angle),
        y: CENTER.y + 80 + INSTITUTION_RADIUS * Math.sin(angle) * 0.85,
      });
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

  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
      <p className="mb-4 text-center text-xs text-cream-muted">
        One trusted identity — institutions provide services around the Stankings Trust Network.
      </p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mx-auto w-full max-w-4xl">
          {relatedEdges.map((edge, i) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            if (!from || !to) return null;
            const dimmed = activeId && !isHighlighted(edge.from) && !isHighlighted(edge.to);
            return (
              <line
                key={`${edge.from}-${edge.to}-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(212,166,74,0.25)"
                strokeWidth={edge.relationship === "identity" ? 1.5 : 1}
                strokeDasharray={edge.relationship === "consent" ? "4 4" : undefined}
                opacity={dimmed ? 0.12 : 1}
              />
            );
          })}
          {nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const r =
              node.type === "hub" ? 36 : node.type === "layer" ? 28 : node.type === "platform" ? 22 : 18;
            const fill =
              node.type === "hub"
                ? "#2a2418"
                : node.type === "layer"
                  ? "#1a1a2e"
                  : node.type === "platform"
                    ? "#252530"
                    : "#2a2a3a";
            return (
              <g
                key={node.id}
                opacity={isHighlighted(node.id) ? 1 : 0.25}
                className="cursor-pointer"
                onClick={() => setActiveId(activeId === node.id ? null : node.id)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={fill}
                  stroke={activeId === node.id ? "#d4a64a" : "rgba(212,166,74,0.4)"}
                  strokeWidth={activeId === node.id ? 2 : 1}
                />
                <text
                  x={pos.x}
                  y={pos.y + r + 12}
                  textAnchor="middle"
                  fill="#e8e0d0"
                  fontSize={node.type === "institution" ? 9 : 10}
                >
                  {node.label.length > 14 ? `${node.label.slice(0, 12)}…` : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
