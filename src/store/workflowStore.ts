import { create } from "zustand";
import { Node, Edge, Workflow } from "../types/workflow";

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  history: Workflow[];
  currentIndex: number;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  undo: () => void;
  redo: () => void;
  saveWorkflow: () => void;
  loadWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  currentIndex: -1,

  addNode: (node) => {
    set((state) => {
      const newNodes = [...state.nodes, node];
      const newState = { ...state, nodes: newNodes };
      return pushToHistory(newState);
    });
  },
  updateNode: (id, data) => {
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === id ? { ...node, ...data } : node
      );
      const newState = { ...state, nodes: newNodes };
      return pushToHistory(newState);
    });
  },
  removeNode: (id) => {
    set((state) => {
      const newNodes = state.nodes.filter((node) => node.id !== id);
      const newEdges = state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      );
      const newState = { ...state, nodes: newNodes, edges: newEdges };
      return pushToHistory(newState);
    });
  },

  addEdge: (edge) => {
    set((state) => {
      const newEdges = [...state.edges, edge];
      const newState = { ...state, edges: newEdges };
      return pushToHistory(newState);
    });
  },

  removeEdge: (id) => {
    set((state) => {
      const newEdges = state.edges.filter((edge) => edge.id !== id);
      const newState = { ...state, edges: newEdges };
      return pushToHistory(newState);
    });
  },

  undo: () => {
    const { currentIndex, history } = get();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const previousState = history[newIndex];
      set({ ...previousState, currentIndex: newIndex });
    }
  },

  redo: () => {
    const { currentIndex, history } = get();
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const nextState = history[newIndex];
      set({ ...nextState, currentIndex: newIndex });
    }
  },

  saveWorkflow: () => {
    const { nodes, edges } = get();
    localStorage.setItem("workflow", JSON.stringify({ nodes, edges }));
  },

  loadWorkflow: () => {
    const saved = localStorage.getItem("workflow");
    if (saved) {
      const { nodes, edges } = JSON.parse(saved);
      set({ nodes, edges, history: [], currentIndex: -1 });
    }
  },
}));

function pushToHistory(state: WorkflowState) {
  const { nodes, edges, history, currentIndex } = state;
  const newHistory = history.slice(0, currentIndex + 1);
  newHistory.push({ nodes, edges });
  return {
    ...state,
    history: newHistory,
    currentIndex: newHistory.length - 1,
  };
}
