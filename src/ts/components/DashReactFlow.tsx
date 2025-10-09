import React, {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  Connection,
  reconnectEdge,
  Handle,
  Position,
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
  node_type?: string;
};

type DashEdgeType = {
  id: string;
  source: string;
  target: string;
  /**
   * The type of handle on the source node (we can only connect to handles of the same type)
   * If not specified, it will connect to the default handle.
   */
  source_handle?: string;
};

type DashNodeTypeHandle = {
  id: string;
  /** Position of the handle.
   * Should be one of 'top', 'bottom', 'left', 'right'
   */
  position: string;
};

type DashNodeTypes = {
  name: string;
  title: string;
  targets: Array<DashNodeTypeHandle>;
  sources: Array<DashNodeTypeHandle>;
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
  /**
   * Allow creating custom nodes, you have to specify the node type in the nodes entry/when creating the node.
   */
  node_types?: Array<DashNodeTypes>;
} & DashComponentProps;

function getNodeTypes(node_types: Array<DashNodeTypes> | undefined): {
  [key: string]: (props) => React.JSX.Element;
} {
  if (!node_types) {
    return {};
  }
  return node_types.reduce(
    (acc, node_type) => ({
      ...acc,
      [node_type.name]: (props) => (
        <div>
          <strong>{node_type.title}</strong>
          {node_type.sources.map((source) => {
            const position =
              source.position === "top"
                ? Position.Top
                : source.position === "bottom"
                  ? Position.Bottom
                  : source.position === "left"
                    ? Position.Left
                    : Position.Right;
            return (
              <Handle
                type="source"
                key={source.id}
                id={source.id}
                position={position}
              />
            );
          })}
          {node_type.targets.map((target) => {
            const position =
              target.position === "top"
                ? Position.Top
                : target.position === "bottom"
                  ? Position.Bottom
                  : target.position === "left"
                    ? Position.Left
                    : Position.Right;
            return (
              <Handle
                type="target"
                key={target.id}
                id={target.id}
                position={position}
              />
            );
          })}
        </div>
      ),
    }),
    {},
  );
}

/**
 * Component description
 */
const DashReactFlow = (props: Props) => {
  const { id, setProps, nodes, edges, node_types } = props;

  const nodeTypes = getNodeTypes(node_types);
  const edgeReconnectSuccessful = useRef(true);

  const [reactNodes, setReactNodes, onNodesChange] = useNodesState(
    dashNodesToReactNodes(nodes),
  );
  const [reactEdges, setReactEdges, onEdgesChange] = useEdgesState(
    dashEdgesToReactEdges(edges),
  );

  const onConnect = useCallback(
    (changes: Connection) => {
      setReactEdges((eds) => addEdge(changes, eds));
    },
    [setReactEdges],
  );

  useEffect(() => {
    const newEdges = reactEdgesToDashEdges(reactEdges);
    if (edges !== newEdges) {
      setProps({ edges: newEdges });
    }
  }, [reactEdges]);

  // Allow us to reconnect edges by dragging them
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setReactEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [],
  );

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setReactEdges((eld) => eld.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);

  const isValidConnection = useCallback((connection: Connection) => {
    return connection.sourceHandle === connection.targetHandle;
  }, []);

  return (
    <div id={id} style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={reactNodes}
        edges={reactEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={() => {
          const newNodes = reactNodesToDashNodes(reactNodes);
          setProps({ nodes: newNodes });
        }}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onReconnect={onReconnect}
        isValidConnection={isValidConnection}
        fitView
      />
    </div>
  );
};

export default DashReactFlow;

function reactNodesToDashNodes(node: Node[]): DashNodeType[] {
  return node.map(
    (n) =>
      ({
        id: n.id,
        position: { x: n.position.x, y: n.position.y },
        label: n.data.label,
        node_type: n.type,
      }) as DashNodeType,
  );
}

function reactEdgesToDashEdges(edge: Edge[]): DashEdgeType[] {
  return edge.map(
    (e) => ({ id: e.id, source: e.source, target: e.target }) as DashEdgeType,
  );
}

function dashNodesToReactNodes(
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

function dashEdgesToReactEdges(
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
        type: "default",
      }) as Edge,
  );
}
