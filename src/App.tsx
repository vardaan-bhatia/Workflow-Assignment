import React from 'react';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { Sidebar } from './components/Sidebar';
import { Analytics } from './components/Analytics';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        <div className="h-96 p-4 overflow-y-auto">
          <Analytics />
        </div>
      </div>
    </div>
  );
}

export default App;