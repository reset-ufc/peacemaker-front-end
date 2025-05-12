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
import { useTranslation } from "react-i18next";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function RadarFlagsChart({ repo }: { repo?: string }) {
  const [period, setPeriod] = useState("24h");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<RadarFlagsItem[]>({
    queryKey: ["radar-flags", period],
    queryFn: async () => {
      const params: Record<string, string> = { period };
      if (repo) params.repo = repo;
      const response = await api.get("/api/dashboard/radar-flags", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    },
  });

  const defaultCategories = [
    "bitter_frustration",
    "mocking",
    "irony",
    "insulting",
    "identity_attack",
    "entitlement",
    "impatience",
    "threat",
    "neutral",
  ];

  const apiData: RadarFlagsItem[] = data || [];

  const radarData = selectedCategories.map((category) => {
    const found = apiData.find(
      (item) => item.category?.toLowerCase() === category?.toLowerCase()
    );
    return {
      category,
      value: found ? found.value : 0,
    };
  });

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  const { t } = useTranslation();

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="border p-4 rounded shadow mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{t("Incivility Categories")}</h3>
          <p className="text-sm text-muted-foreground">{t("Distribution by classification")}</p>
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
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" stroke="#6b7280" />
              <Radar
                name="Incivility"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.4}
                animationDuration={500}
                animationBegin={0}
                animationEasing="ease-out"
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-4 flex justify-center flex-wrap gap-2">
        {defaultCategories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1 rounded-full cursor-pointer text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selectedCategories.includes(category)
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
