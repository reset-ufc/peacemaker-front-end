import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button variant="outline" size="sm">
        Last 24 hours
      </Button>
    </div>
  );
}
