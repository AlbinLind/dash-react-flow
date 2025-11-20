import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { DashNodeTypes } from "../types";

type CustomNodeData = {
  label: string;
};

const createCustomNode = (config: DashNodeTypes) => {
  return ({ data }: NodeProps) => {
    const { title, targets, sources } = config;

    // Separate handles by position
    const topHandles = [...targets, ...sources].filter(
      (h) => h.position === "top",
    );
    const bottomHandles = [...targets, ...sources].filter(
      (h) => h.position === "bottom",
    );
    const leftHandles = targets.filter((h) => h.position === "left");
    const rightHandles = sources.filter((h) => h.position === "right");

    // Only allow 1 top and 1 bottom handle
    const topHandle = topHandles[0];
    const bottomHandle = bottomHandles[0];

    return (
      <div className="react-flow__node-default nospan selectable draggable">
        {/* Top handle */}
        {topHandle && (
          <>
            <Handle
              type={
                targets.some((t) => t.id === topHandle.id) ? "target" : "source"
              }
              position={Position.Top}
              id={topHandle.id}
            />
            <div
              style={{
                fontSize: "10px",
                textAlign: "center",
                padding: "4px 8px",
              }}
            >
              {topHandle.id}
            </div>
          </>
        )}

        {/* Title */}
        <div
          style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </div>

        {/* Left handles */}
        {leftHandles.map((leftHandle) => (
          <div
            key={`left-${leftHandle.id}`}
            style={{
              padding: "4px 8px",
              fontSize: "10px",
              textAlign: "left",
              position: "relative",
              transform: "translateX(-10px)",
            }}
          >
            <Handle type="target" position={Position.Left} id={leftHandle.id} />
            {leftHandle.id}
          </div>
        ))}

        {/* Right handles */}
        {rightHandles.map((rightHandle) => (
          <div
            key={`right-${rightHandle.id}`}
            style={{
              padding: "4px 8px",
              fontSize: "10px",
              textAlign: "right",
              position: "relative",
              transform: "translateX(10px)",
            }}
          >
            {rightHandle.id}
            <Handle
              type="source"
              position={Position.Right}
              id={rightHandle.id}
            />
          </div>
        ))}

        {/* Bottom handle */}
        {bottomHandle && (
          <>
            <div
              style={{
                fontSize: "10px",
                textAlign: "center",
                padding: "4px 8px",
              }}
            >
              {bottomHandle.id}
            </div>
            <Handle
              type={
                targets.some((t) => t.id === bottomHandle.id)
                  ? "target"
                  : "source"
              }
              position={Position.Bottom}
              id={bottomHandle.id}
            />
          </>
        )}
      </div>
    );
  };
};

export const getNodeTypes = (
  nodeTypesConfig: Array<DashNodeTypes> | undefined,
): Record<string, React.ComponentType<NodeProps>> => {
  if (!nodeTypesConfig) {
    return {};
  }

  const nodeTypes: Record<string, React.ComponentType<NodeProps>> = {};

  nodeTypesConfig.forEach((config) => {
    nodeTypes[config.name] = createCustomNode(config);
  });

  return nodeTypes;
};
