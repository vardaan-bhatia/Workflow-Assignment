import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Connection,
  Edge,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import { useWorkflowStore } from '../store/workflowStore';
import { TaskNode } from './nodes/TaskNode';
import { DecisionNode } from './nodes/DecisionNode';
import { StartNode } from './nodes/StartNode';
import { EndNode } from './nodes/EndNode';
import { NodePalette } from './NodePalette';
import 'reactflow/dist/style.css';

const nodeTypes: NodeTypes = {
  task: TaskNode,
  decision: DecisionNode,
  start: StartNode,
  end: EndNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, addNode, updateNode, removeNode, addEdge: addFlowEdge, removeEdge } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'string' && reactFlowBounds) {
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };

        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${id}`, executionTime: 100 },
        };

        addNode(newNode);
      }
    },
    [addNode]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      addFlowEdge({
        id: `${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
      });
    },
    [addFlowEdge]
  );

  return (
    <div className="h-full flex flex-col">
      <NodePalette />
      <div ref={reactFlowWrapper} className="flex-1">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(changes) => {
              changes.forEach((change) => {
                if (change.type === 'position' && change.position) {
                  updateNode(change.id, { position: change.position });
                } else if (change.type === 'remove') {
                  removeNode(change.id);
                }
              });
            }}
            onEdgesChange={(changes) => {
              changes.forEach((change) => {
                if (change.type === 'remove') {
                  removeEdge(change.id);
                }
              });
            }}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#64748b', strokeWidth: 2 },
            }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}