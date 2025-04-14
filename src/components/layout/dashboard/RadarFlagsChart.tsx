// src/components/layout/dashboard/RadarFlagsChart.tsx
import { Loader } from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { RadarFlagsItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function RadarFlagsChart() {
  const [period, setPeriod] = useState("24h");
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<RadarFlagsItem[]>({
    queryKey: ["radar-flags", period],
    queryFn: async () => {
      const response = await api.get("/dashboard/radar-flags", {
        headers: { Authorization: `Bearer ${token}` },
        params: { period },
      });
      return response.data;
    },
  });

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  return (
    <div className="border p-4 rounded shadow mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Incivility Categories</h3>
          <p className="text-sm text-muted-foreground">Distribution by classification</p>
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
      <div className={containerClass} style={{ width: "100%", height: 300 }}>
        {isLoading ? <Loader /> : (
          <ResponsiveContainer>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" stroke="#6b7280" />
              <Radar name="Incivility" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
