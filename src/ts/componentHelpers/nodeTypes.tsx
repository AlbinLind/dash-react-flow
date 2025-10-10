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

interface GroupedHandles {
  [key: string]: Array<DashNodeTypeHandle & { type: "source" | "target" }>;
}

function groupHandlesByPosition(
  sources: Array<DashNodeTypeHandle>,
  targets: Array<DashNodeTypeHandle>,
): GroupedHandles {
  const grouped: GroupedHandles = {
    top: [],
    bottom: [],
    left: [],
    right: [],
  };

  sources.forEach((handle) => {
    grouped[handle.position].push({ ...handle, type: "source" });
  });

  targets.forEach((handle) => {
    grouped[handle.position].push({ ...handle, type: "target" });
  });

  return grouped;
}

function calculateHandleStyle(
  position: string,
  index: number,
  total: number,
): React.CSSProperties {
  if (total === 0) return {};

  // Calculate even spacing: divide the available space into sections
  const percentage = ((index + 1) / (total + 1)) * 100;

  switch (position) {
    case "top":
    case "bottom":
      // Horizontal positioning for top/bottom
      return {
        left: `${percentage}%`,
        transform: "translateX(-50%) + translateY(-50%)",
      };
    case "left":
    case "right":
      // Vertical positioning for left/right
      return {
        top: `${percentage}%`,
        transform: "translateY(-50%) + translateX(-50%)",
      };
    default:
      return {};
  }
}

function createHandles(groupedHandles: GroupedHandles): React.JSX.Element[] {
  const handles: React.JSX.Element[] = [];

  // Process each position
  Object.entries(groupedHandles).forEach(([position, handlesAtPosition]) => {
    if (handlesAtPosition.length === 0) return;

    handlesAtPosition.forEach((handle, index) => {
      const style = calculateHandleStyle(
        position,
        index,
        handlesAtPosition.length,
      );

      handles.push(
        <Handle
          type={handle.type}
          key={handle.id}
          id={handle.id}
          position={getHandlePosition(position)}
          style={style}
        />,
      );
    });
  });

  return handles;
}

export function getNodeTypes(node_types: Array<DashNodeTypes> | undefined): {
  [key: string]: (props: any) => React.JSX.Element;
} {
  if (!node_types) {
    return {};
  }

  return node_types.reduce(
    (acc, node_type) => ({
      ...acc,
      [node_type.name]: (props: any) => {
        const groupedHandles = groupHandlesByPosition(
          node_type.sources,
          node_type.targets,
        );
        const maxHandlesVertical = Math.max(
          groupedHandles.left.length,
          groupedHandles.right.length,
        );
        const maxHandlesHorizontal = Math.max(
          groupedHandles.top.length,
          groupedHandles.bottom.length,
        );
        const height = Math.max(40, maxHandlesVertical * 20);
        const width = Math.max(100, maxHandlesHorizontal * 20);
        return (
          <div
            className="react-flow__node react-flow__node-default"
            style={{
              visibility: "visible",
              position: "relative",
              width,
              height,
            }}
          >
            <strong>{node_type.title}</strong>
            {createHandles(groupedHandles)}
          </div>
        );
      },
    }),
    {},
  );
}
