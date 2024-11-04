import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";

export function RecentFlaggedCommentsTable({
  className,
}: { className?: string }) {
  return (
    <Card className={cn("shadow-none rounded-lg", className)}>
      <CardHeader>
        <CardTitle>Recent Flagged Comments</CardTitle>
        <CardDescription>
          Most recently flagged comments requiring attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                user: "John Doe",
                severity: "high",
                link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
              },
              {
                user: "John Doe 2",
                severity: "low",
                link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
              },
              {
                user: "John Doe 3",
                severity: "medium",
                link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
              },
            ].map(({ user, severity, link }) => (
              <TableRow key={user}>
                <TableCell className="font-medium">{user}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "font-bold",
                      severity === "high" && "bg-red-500 hover:bg-red-600/90",
                      severity === "medium" &&
                        "bg-amber-500 hover:bg-amber-600/90",
                      severity === "low" &&
                        "bg-emerald-600 hover:bg-emerald-500/90",
                    )}
                  >
                    {severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="border px-2 py-1 rounded-md flex items-center gap-1 w-fit"
                  >
                    Review
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
