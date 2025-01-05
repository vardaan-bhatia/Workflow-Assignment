import React from "react";

interface SidebarFormProps {
  taskName: string;
  executionTime: number;
  type: string;
  onTaskNameChange: (name: string) => void;
  onExecutionTimeChange: (time: number) => void;
  onTypeChange: (type: string) => void;
  onSave: () => void;
}

const SidebarForm: React.FC<SidebarFormProps> = ({
  taskName,
  executionTime,
  type,
  onTaskNameChange,
  onExecutionTimeChange,
  onTypeChange,
  onSave,
}) => {
  return (
    <div className="sidebar-form p-4 bg-gray-100 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Edit Node</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Execution Time (ms)
        </label>
        <input
          type="number"
          value={executionTime}
          onChange={(e) => onExecutionTimeChange(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        onClick={onSave}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default SidebarForm;
