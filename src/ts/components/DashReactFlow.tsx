import React, { useCallback, useEffect, useRef } from "react";
import { DashComponentProps } from "../props";
import "@xyflow/react/dist/style.css";
import "../style.css";
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

  useEffect(() => {
    const newNodes = dashNodesToReactNodes(nodes);
    setReactNodes(newNodes);
  }, [nodes]);

  useEffect(() => {
    const newEdges = dashEdgesToReactEdges(edges);
    setReactEdges(newEdges);
  }, [edges]);

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
    <div id={id} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={reactNodes}
        edges={reactEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={() => {
          const newNodes = reactNodesToDashNodes(reactNodes);
          if (nodes !== newNodes) {
            setProps({ nodes: newNodes });
          }
        }}
        onNodeClick={(_, node) => {
          setProps({ clicked_node: reactNodesToDashNodes([node])[0] });
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
