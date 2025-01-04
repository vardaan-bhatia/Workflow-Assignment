import React from "react";
import { useWorkflowStore } from "../store/workflowStore";
import { Play, Save, Undo, Redo, Download, Upload } from "lucide-react";

export function Sidebar() {
  const { undo, redo, saveWorkflow, loadWorkflow } = useWorkflowStore();

  const exportWorkflow = () => {
    const workflow = useWorkflowStore.getState();
    const blob = new Blob([JSON.stringify(workflow)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
  };

  // const importWorkflow = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const content = e.target?.result as string;
  //       const workflow = JSON.parse(content);
  //       useWorkflowStore.setState(workflow);
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  return (
    <div className="w-64 bg-white border-r p-4">
      <div className="space-y-4">
        <button
          onClick={undo}
          className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Undo className="mr-2" size={16} />
          Undo
        </button>
        <button
          onClick={redo}
          className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Redo className="mr-2" size={16} />
          Redo
        </button>
        <button
          onClick={saveWorkflow}
          className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Save className="mr-2" size={16} />
          Save
        </button>
        <button
          onClick={loadWorkflow}
          className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Upload className="mr-2" size={16} />
          Load
        </button>
        <button
          onClick={exportWorkflow}
          className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <Download className="mr-2" size={16} />
          Export
        </button>
        <div className="relative">
          <input
            type="file"
            // onChange={importWorkflow}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".json"
          />
          <button className="flex items-center justify-center w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            <Upload className="mr-2" size={16} />
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
