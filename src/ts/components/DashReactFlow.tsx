import React, { useCallback, useEffect, useState } from "react";
import { DashComponentProps } from "../props";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

type DashNodeType = {
  /** Unique identifier for the node */
  id: string;
  /** Position of the node */
  position: { x: number; y: number };
  /**
   * Label for the node, displayed inside the node
   */
  label: string;
};

type DashEdgeType = {
  id: string;
  source: string;
  target: string;
};

type Props = {
  /**
   * Nodes to display from the start
   */
  nodes?: Array<DashNodeType>;
  /**
   * Edges to display from the start, the ids must match the nodes
   */
  edges?: Array<DashEdgeType>;
} & DashComponentProps;

/**
 * Component description
 */
const DashReactFlow = (props: Props) => {
  const { id, setProps, nodes, edges } = props;

  const [reactNodes, setReactNodes, onNodesChange] = useNodesState(dashNodesToReactNodes(nodes));
  const [reactEdges, setReactEdges, onEdgesChange] = useEdgesState(dashEdgesToReactEdges(edges));

  const onConnect = useCallback(
    (params) => {
      setReactEdges((eds) => addEdge(params, eds));
    },
    [setReactEdges]
  );

  useEffect(() => {
    const newEdges = reactEdgesToDashEdges(reactEdges);
    if (edges !== newEdges) {
      setProps({ edges: newEdges });
    }
  }, [reactEdges]);

  return (
    <div id={id} style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={reactNodes}
        edges={reactEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={() => {
          const newNodes = reactNodesToDashNodes(reactNodes);
          setProps({ nodes: newNodes });
        }}
        fitView
      />
    </div>
  );
};

export default DashReactFlow;

function reactNodesToDashNodes(node: Node[]): DashNodeType[] {
  return node.map(
    (n) => ({ id: n.id, position: { x: n.position.x, y: n.position.y }, label: n.data.label }) as DashNodeType
  );
}

function reactEdgesToDashEdges(edge: Edge[]): DashEdgeType[] {
  return edge.map((e) => ({ id: e.id, source: e.source, target: e.target }) as DashEdgeType);
}

function dashNodesToReactNodes(initialNodes: Array<DashNodeType> | undefined): Node[] {
  if (!initialNodes) {
    return [];
  }
  return initialNodes.map(
    (node) =>
      ({
        id: node.id,
        position: node.position,
        data: { label: node.label },
        type: "default",
      }) as Node
  );
}

function dashEdgesToReactEdges(initialEdges: Array<DashEdgeType> | undefined): Edge[] {
  if (!initialEdges) {
    return [];
  }
  return initialEdges.map(
    (edge) =>
      ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: "default",
      }) as Edge
  );
}
