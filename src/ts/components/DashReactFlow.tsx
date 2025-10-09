import React, { useCallback, useState } from "react";
import { DashComponentProps } from "../props";
import "@xyflow/react/dist/style.css";
import { ReactFlow, Node, Edge, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";

type DashNodeType = {
  /** Unique identifier for the node */
  id: string;
  /** Position of the node */
  position: { x: number; y: number };
  label: string;
};

type DashEdgeType = {
  id: string;
  source: string;
  target: string;
};

type Props = {
  initial_nodes?: Array<DashNodeType>;
  initial_edges?: Array<DashEdgeType>;
} & DashComponentProps;

/**
 * Component description
 */
const DashReactFlow = (props: Props) => {
  const { id, setProps, initial_nodes, initial_edges } = props;

  const [nodes, setNodes] = useState<Node[]>(getNodes(initial_nodes));
  const [edges, setEdges] = useState<Edge[]>(getEdges(initial_edges));

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback((changes) => setEdges((edgesSnapshot) => addEdge(changes, edgesSnapshot)), []);

  return (
    <div id={id} style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
};

export default DashReactFlow;

function getNodes(initialNodes: Array<DashNodeType> | undefined): Node[] {
  if (!initialNodes) {
    return [];
  }
  return initialNodes.map((node) => ({
    id: node.id,
    position: node.position,
    data: { label: node.label },
    type: "default",
  } as Node));
}

function getEdges(initialEdges: Array<DashEdgeType> | undefined): Edge[] {
  if (!initialEdges) {
    return [];
  }
  return initialEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: "default",
  } as Edge));
}
