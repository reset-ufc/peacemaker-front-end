// src/components/layout/dashboard/PRIncivilityChart.tsx
import { Loader } from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { IncivilityData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PRIncivilityChartProps {
  repo?: string;
}

export function PRIncivilityChart({ repo }: PRIncivilityChartProps) {
  const [period, setPeriod] = useState("24h");
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<IncivilityData[]>({
    queryKey: ["incivilities-by-type", period, repo, "pull_request"],
    queryFn: async () => {
      const params: any = { period, repo, type: "pull_request" };
      if (repo) params.repo = repo;
      const response = await api.get("/api/dashboard/incivilities-by-type", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    },
  });

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Pull Request Incivility Over Time</h3>
          <p className="text-sm text-muted-foreground">Incivilized comments on pull requests</p>
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
            <AreaChart data={data}>
              <defs>
                <linearGradient id="prGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#fbbf24" fill="url(#prGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
