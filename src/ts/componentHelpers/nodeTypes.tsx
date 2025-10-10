import React from "react";
import { Handle, Position } from "@xyflow/react";
import { DashNodeTypes, DashNodeTypeHandle } from "../types";

function getHandlePosition(positionString: string): Position {
  switch (positionString) {
    case "top":
      return Position.Top;
    case "bottom":
      return Position.Bottom;
    case "left":
      return Position.Left;
    case "right":
      return Position.Right;
    default:
      return Position.Right;
  }
}

function createHandles(
  handles: Array<DashNodeTypeHandle>,
  type: "source" | "target",
): React.JSX.Element[] {
  // TODO: make sure that they do not overlap
  return handles.map((handle) => (
    <Handle
      type={type}
      key={handle.id}
      id={handle.id}
      position={getHandlePosition(handle.position)}
    />
  ));
}

export function getNodeTypes(node_types: Array<DashNodeTypes> | undefined): {
  [key: string]: (props: any) => React.JSX.Element;
} {
  if (!node_types) {
    return {};
  }
  // TODO: style the nodes, and the name of the node should also be included. We can possibly
  // read more data from the arbitrary props.data I think.
  return node_types.reduce(
    (acc, node_type) => ({
      ...acc,
      [node_type.name]: (props: any) => (
        <div>
          <strong>{node_type.title}</strong>
          {createHandles(node_type.sources, "source")}
          {createHandles(node_type.targets, "target")}
        </div>
      ),
    }),
    {},
  );
}
