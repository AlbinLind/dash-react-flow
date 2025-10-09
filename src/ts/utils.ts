import { Node, Edge } from "@xyflow/react";
import { DashNodeType, DashEdgeType } from "./types";

export function reactNodesToDashNodes(nodes: Node[]): DashNodeType[] {
  return nodes.map(
    (n) =>
      ({
        id: n.id,
        position: { x: n.position.x, y: n.position.y },
        label: n.data.label,
        node_type: n.type,
      }) as DashNodeType,
  );
}

export function reactEdgesToDashEdges(edges: Edge[]): DashEdgeType[] {
  return edges.map(
    (e) =>
      ({
        id: e.id,
        source: e.source,
        target: e.target,
        source_handle: e.sourceHandle,
      }) as DashEdgeType,
  );
}

export function dashNodesToReactNodes(
  initialNodes: Array<DashNodeType> | undefined,
): Node[] {
  if (!initialNodes) {
    return [];
  }
  return initialNodes.map(
    (node) =>
      ({
        id: node.id,
        position: node.position,
        data: { label: node.label },
        type: node.node_type || "default",
      }) as Node,
  );
}

export function dashEdgesToReactEdges(
  initialEdges: Array<DashEdgeType> | undefined,
): Edge[] {
  if (!initialEdges) {
    return [];
  }
  return initialEdges.map(
    (edge) =>
      ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.source_handle,
        type: "default",
      }) as Edge,
  );
}
