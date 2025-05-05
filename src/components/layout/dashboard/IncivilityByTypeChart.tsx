// src/components/layout/dashboard/IncivilityByTypeChart.tsx
import { Loader } from "@/components/ui/loadingSpinner";
import { api } from "@/lib/api";
import { IncivilityData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IncivilityByTypeChartProps {
  repo?: string;
  type: "issue" | "pull_request";
  title: string;
  description: string;
  gradientId: string;
  strokeColor: string;
  stopColor: string;
}

export function IncivilityByTypeChart({
  repo,
  type,
  title,
  description,
  gradientId,
  strokeColor,
  stopColor,
}: IncivilityByTypeChartProps) {
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<IncivilityData[]>({
    queryKey: ["incivilities-by-type", repo, type],
    queryFn: async () => {
      const params: Record<string, string> = { type };
      if (repo && repo !== "all") params.repo = repo;
      const res = await api.get<IncivilityData[]>("/api/dashboard/incivilities-by-type", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return res.data;
    },
  });

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        {isLoading ? (
          <Loader />
        ) : (
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={stopColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" allowDecimals={false} />
              <Tooltip
                formatter={(value: any) => [`${value} incivilidades`, 'Total']}
                labelFormatter={(label: string) => {
                  const [year, week] = label.split("-");
                  return `Semana ${week} de ${year}`;
                }}
              />
              <Area type="monotone" dataKey="count" stroke={strokeColor} fill={`url(#${gradientId})`} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
