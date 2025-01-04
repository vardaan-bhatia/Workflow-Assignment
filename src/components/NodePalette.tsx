import React from 'react';
import { Play, GitBranch, Clock, Square } from 'lucide-react';

const nodeTypes = [
  { type: 'start', label: 'Start', icon: Play, color: 'green' },
  { type: 'task', label: 'Task', icon: Clock, color: 'blue' },
  { type: 'decision', label: 'Decision', icon: GitBranch, color: 'yellow' },
  { type: 'end', label: 'End', icon: Square, color: 'red' }
];

export function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Node Types</h3>
      <div className="flex gap-2">
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className={`flex items-center p-2 bg-white border-2 border-${color}-200 rounded cursor-move hover:shadow-md transition-shadow`}
          >
            <Icon size={16} className="mr-2" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}