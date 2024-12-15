import { SelectNative } from "@/components/ui/select-native";

export function DateRangeFilter() {
  return (
    <div className="space-y-2">
      <SelectNative>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </SelectNative>
    </div>
  );
}
