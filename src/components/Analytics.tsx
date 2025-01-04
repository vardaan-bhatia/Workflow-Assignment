import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useWorkflowStore } from "../store/workflowStore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function Analytics() {
  const { nodes } = useWorkflowStore();

  const nodeData = nodes.map((node) => ({
    name: node.data.label,
    executionTime: node.data.executionTime,
    type: node.type,
  }));

  const typeData = nodes.reduce((acc: any, node) => {
    const type = node.type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type] += node.data.executionTime;
    return acc;
  }, {});

  const pieData = Object.entries(typeData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Workflow Analytics</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="h-64">
          <h3 className="text-sm font-medium mb-2">Execution Time by Node</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nodeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="executionTime" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <h3 className="text-sm font-medium mb-2">
            Cumulative Execution Time
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={nodeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="executionTime"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <h3 className="text-sm font-medium mb-2">
            Execution Time Distribution by Type
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
