import React, { useState } from "react";
import { WorkflowCanvas } from "./components/WorkflowCanvas";
import { Sidebar } from "./components/Sidebar";
import { Analytics } from "./components/Analytics";

function App() {
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(true); // State to control visibility

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        <div className="p-4">
          {/* Button to toggle the visibility of Analytics */}
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsAnalyticsVisible(!isAnalyticsVisible)}
          >
            {isAnalyticsVisible ? "Hide Analytics" : "Show Analytics"}
          </button>
          {/* Conditionally render Analytics component */}
          {isAnalyticsVisible && <Analytics />}
        </div>
      </div>
    </div>
  );
}

export default App;
