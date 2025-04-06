import { DashboardChartsProps } from "@/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

//A definir as cores do gráfico de pizza
const PIE_COLORS = ["#f87171", "#60a5fa", "#fbbf24", "#34d399"];

export function DashboardCharts({
  moderationActivity,
  recentFlagged,
  radarFlags,
  moderationActions,
}: DashboardChartsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Moderation Activity</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Comments and Flags over time
          </p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={moderationActivity}>
                <defs>
                  <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff805d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff805d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFlags" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4bcaa8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4bcaa8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="comments"
                  stroke="#ff805d"
                  fill="url(#colorComments)"
                  stackId="1"
                />
                <Area
                  type="monotone"
                  dataKey="flags"
                  stroke="#4bcaa8"
                  fill="url(#colorFlags)"
                  stackId="1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Flagged Comments</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The most recent flagged comments
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between font-medium border-b pb-1">
              <span>Author</span>
              <span>Severity</span>
              <span>Action</span>
            </div>
            {recentFlagged.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.author}</span>
                <span>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      item.severity === "High"
                        ? "bg-red-500"
                        : item.severity === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.severity}
                  </span>
                </span>
                <span>{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Incivility Categories</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Distribution by classification
          </p>
          <div className="flex-1" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <RadarChart data={radarFlags}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                {/* <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" /> */}
                <Radar
                  name="Incivility"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-xs text-muted-foreground mt-2">
            Data for last 30 days
          </span>
        </div>

        {/* Ainda não terminado */}
        <div className="border p-4 rounded shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Moderation Actions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Distribution of actions taken
          </p>
          <div className="relative" style={{ width: 300, height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={moderationActions.data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={100}
                  label
                >
                  {moderationActions.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold">{moderationActions.total}</span>
              <p className="text-sm text-muted-foreground">Total Actions</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground mt-2">
            Last 30 days
          </span>
        </div>
      </div>
    </div>
  );
}
