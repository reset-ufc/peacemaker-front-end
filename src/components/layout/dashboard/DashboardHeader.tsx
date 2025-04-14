import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardHeaderProps } from "@/types";

export function DashboardHeader({
  period,
  onPeriodChange,
}: DashboardHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Last 24 hours</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="1y">Last 1 year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
