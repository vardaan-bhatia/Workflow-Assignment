import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { Square, Edit3 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore"; // assuming you're using the same store
import SidebarForm from "../SidebarForm"; // assuming you have a SidebarForm component

export const EndNode = memo(({ id, data }: { id: string; data: any }) => {
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const [taskName, setTaskName] = useState(data.label);
  const [executionTime, setExecutionTime] = useState(data.executionTime);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleEdit = () => {
    setShowSidebar(true);
  };

  const handleSave = () => {
    updateNode(id, { data: { label: taskName, executionTime } });
    setShowSidebar(false);
  };

  return (
    <div className="relative">
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-red-200 min-w-[200px] max-w-[300px]">
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <div className="flex items-center">
          <Square className="mr-2" size={16} />
          <div className="ml-2 flex-1">
            <div className="text-sm font-bold">{taskName}</div>
            <div className="text-xs text-gray-500">{executionTime}ms</div>
          </div>
          <Edit3
            className="ml-2 cursor-pointer"
            size={16}
            onClick={handleEdit}
          />
        </div>
      </div>
      {showSidebar && (
        <SidebarForm
          taskName={taskName}
          executionTime={executionTime}
          type={data.type}
          onTaskNameChange={setTaskName}
          onExecutionTimeChange={setExecutionTime}
          onTypeChange={(newType) =>
            updateNode(id, { data: { ...data, type: newType } })
          }
          onSave={handleSave}
        />
      )}
    </div>
  );
});
