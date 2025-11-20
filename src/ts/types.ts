import { Node, Edge } from "@xyflow/react";

export type DashNodeType = {
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

export type DashEdgeType = {
  id: string;
  source: string;
  target: string;
  /**
   * The type of handle on the source node (we can only connect to handles of the same type)
   * If not specified, it will connect to the default handle.
   */
  source_handle?: string;
  target_handle?: string;
};

export type DashNodeTypeHandle = {
  id: string;
  /** Position of the handle.
   * Should be one of 'top', 'bottom', 'left', 'right'
   */
  position: string;
};

export type DashNodeTypes = {
  name: string;
  title: string;
  targets: Array<DashNodeTypeHandle>;
  sources: Array<DashNodeTypeHandle>;
};

export type DashReactFlowProps = {
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

  // ============== Callbacks ==============
  clicked_node?: DashNodeType;
};
