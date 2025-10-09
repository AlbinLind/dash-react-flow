import React, { useCallback, useEffect, useRef } from "react";
import { DashComponentProps } from "../props";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  reconnectEdge,
} from "@xyflow/react";
import { DashReactFlowProps } from "../types";
import { getNodeTypes } from "../componentHelpers/nodeTypes";
import {
  dashNodesToReactNodes,
  dashEdgesToReactEdges,
  reactNodesToDashNodes,
  reactEdgesToDashEdges,
} from "../utils";

type Props = DashReactFlowProps & DashComponentProps;

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
