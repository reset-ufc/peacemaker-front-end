import { Loader } from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PIE_COLORS = ["#f87171", "#60a5fa", "#fbbf24", "#34d399"];

interface ModerationActionsData {
  total: number;
  data: { name: string; value: number }[];
}

export function ModerationActionsChart() {
  const [period, setPeriod] = useState("24h");
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<ModerationActionsData>({
    queryKey: ["moderation-actions", period],
    queryFn: async () => {
      const response = await api.get("/api/dashboard/moderation-actions", {
        headers: { Authorization: `Bearer ${token}` },
        params: { period },
      });
      return response.data;
    },
  });

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  return (
    <div className="flex flex-col items-center border p-4 rounded shadow mb-8">
      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <h3 className="text-lg font-semibold">Moderation Actions</h3>
          <p className="text-sm text-muted-foreground">Distribution of actions taken</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24h</SelectItem>
            <SelectItem value="7d">7d</SelectItem>
            <SelectItem value="30d">30d</SelectItem>
            <SelectItem value="1y">1y</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={containerClass} style={{ width: 300, height: 300, position: "relative" }}>
        {isLoading ? <Loader /> : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data?.data}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={100}
                label
              >
                {data?.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-2xl font-bold">{data?.total}</span>
          <p className="text-sm text-muted-foreground">Total Actions</p>
        </div>
      </div>
    </div>
  );
}
