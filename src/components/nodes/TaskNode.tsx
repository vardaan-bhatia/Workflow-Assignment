import React, { memo, useState, useRef } from "react";
import { Handle, Position } from "reactflow";
import { Clock, Edit3 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import SidebarForm from "../SidebarForm";

export const TaskNode = memo(
  ({
    id,
    data,
  }: {
    id: string;
    data: { label: string; executionTime: number; type: string };
  }) => {
    const updateNode = useWorkflowStore((state) => state.updateNode);
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState(data.label);
    const [executionTime, setExecutionTime] = useState(data.executionTime);
    const [type, setType] = useState(data.type);
    const [showSidebar, setShowSidebar] = useState(false);

    const handleEdit = () => {
      setShowSidebar(true);
    };

    const handleSave = () => {
      updateNode(id, { data: { label: taskName, executionTime, type } });
      setShowSidebar(false);
    };

    return (
      <div className="relative">
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200 min-w-[200px] max-w-[300px]">
          <Handle type="target" position={Position.Top} className="w-3 h-3" />
          <div className="flex items-center">
            <Clock className="mr-2" size={16} />
            <div className="ml-2 flex-1">
              <div className="text-sm font-bold">{taskName}</div>
              <div className="text-xs text-gray-500">{executionTime}ms</div>
              <div className="text-xs text-gray-500">{type}</div>
            </div>
            <Edit3
              className="ml-2 cursor-pointer"
              size={16}
              onClick={handleEdit}
            />
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3"
          />
        </div>
        {showSidebar && (
          <SidebarForm
            taskName={taskName}
            executionTime={executionTime}
            type={type}
            onTaskNameChange={setTaskName}
            onExecutionTimeChange={setExecutionTime}
            onTypeChange={setType}
            onSave={handleSave}
          />
        )}
      </div>
    );
  }
);
