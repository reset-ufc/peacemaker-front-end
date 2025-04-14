// src/components/layout/dashboard/RecentFlaggedComments.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface FlaggedItem {
  author: string;
  severity: string;
  action: string;
}

export function RecentFlaggedComments() {
  const [period, setPeriod] = useState("24h");
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<FlaggedItem[]>({
    queryKey: ["recent-flagged", period],
    queryFn: async () => {
      const response = await api.get("/dashboard/recent-flagged", {
        headers: { Authorization: `Bearer ${token}` },
        params: { period },
      });
      return response.data;
    },
  });

  const containerClass = isLoading ? "filter blur-sm transition duration-300" : "";

  return (
    <div className="border p-4 rounded shadow ml-4 basis-1/3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Recent Flagged Comments</h3>
          <p className="text-sm text-muted-foreground">The most recent flagged comments</p>
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
      <div className={containerClass}>
        {isLoading ? <Loader /> : (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4 border-b pb-2 font-medium">
              <span className="ml-2">Author</span>
              <span className="text-center">Severity</span>
              <span className="text-right mr-2">Action</span>
            </div>
            {data?.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 items-center gap-4 border-b pb-3">
                <span className="truncate ml-2">{item.author}</span>
                <div className="flex justify-center">
                  <Badge
                    className={`text-white ${
                      item.severity === "High"
                        ? "bg-red-500"
                        : item.severity === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.severity}
                  </Badge>
                </div>
                <div className="flex justify-end mr-2">
                  <Button size="sm" variant="outline">{item.action}</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
