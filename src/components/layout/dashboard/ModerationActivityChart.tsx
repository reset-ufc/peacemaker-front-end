// src/components/layout/dashboard/ModerationActivityChart.tsx
import { Loader } from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { ModerationActivityItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ModerationActivityChart({ repo }: { repo?: string }) {
  const [period, setPeriod] = useState("24h");
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<ModerationActivityItem[]>({
    queryKey: ["moderation-activity", period, repo],
    queryFn: async () => {
      const params: Record<string, string> = { period };
      if (repo) params.repo = repo;
      const response = await api.get("/api/dashboard/moderation-activity", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    },
  });

  console.log(data);

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  const { t } = useTranslation()

  return (
    <div className="basis-2/3">
      <div className="col-span-2 border p-4 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("Moderation Activity")}</h3>
            <p className="text-sm text-muted-foreground">{t("Comments and Flags over time")}</p>
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
                <Area type="monotone" dataKey="comments" stroke="#ff805d" fill="url(#colorComments)" stackId="1" />
                <Area type="monotone" dataKey="flags" stroke="#4bcaa8" fill="url(#colorFlags)" stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
