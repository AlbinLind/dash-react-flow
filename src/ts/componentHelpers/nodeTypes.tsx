import React, { useState, useEffect, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { DashNodeTypes } from "../types";

type CustomNodeData = {
  label?: string;
  onLabelChange?: (label: string) => void;
};

const createCustomNode = (config: DashNodeTypes) => {
  return ({ data }: NodeProps) => {
    const { title, targets, sources } = config;
    const [localLabel, setLocalLabel] = useState(
      (data as CustomNodeData)?.label || "",
    );

    const handleLabelChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = e.target.value;
        setLocalLabel(newLabel);
      },
      [],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          (data as CustomNodeData)?.onLabelChange?.(localLabel);
          e.currentTarget.blur();
        }
      },
      [localLabel, data],
    );

    const handleBlur = useCallback(() => {
      (data as CustomNodeData)?.onLabelChange?.(localLabel);
    }, [localLabel, data]);

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
          <Handle
            type={
              targets.some((t) => t.id === topHandle.id) ? "target" : "source"
            }
            position={Position.Top}
            id={topHandle.id}
          />
        )}

        {/* Header section with title and optional top handle label */}
        <div
          className="custom-node-header"
          style={{
            backgroundColor: config.color || "#9333ea",
          }}
        >
          {topHandle && (
            <div className="custom-node-header-handle">{topHandle.id}</div>
          )}
          <div className="custom-node-title">{title}</div>
        </div>

        {/* Label */}
        <div className="custom-node-label">
          <input
            type="text"
            value={localLabel}
            onChange={handleLabelChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="Enter label..."
            className="custom-node-label-input"
            size={Math.max(10, localLabel.length)}
          />
        </div>

        {/* Left handles */}
        {leftHandles.map((leftHandle) => (
          <div
            key={`left-${leftHandle.id}`}
            className="custom-node-handle-left"
          >
            <Handle type="target" position={Position.Left} id={leftHandle.id} />
            {leftHandle.id}
          </div>
        ))}

        {/* Right handles */}
        {rightHandles.map((rightHandle) => (
          <div
            key={`right-${rightHandle.id}`}
            className="custom-node-handle-right"
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
            <div className="custom-node-handle-bottom">{bottomHandle.id}</div>
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
