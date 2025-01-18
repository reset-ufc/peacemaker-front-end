import { ArrowUpRightIcon } from "lucide-react";

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

export function RecentFlaggedCommentsTable({
  users,
  className,
}: {
  users: { username: string; severity: string; link: string }[] | [];
  className?: string;
}) {
  return (
    <Card className={cn("rounded-lg shadow-none", className)}>
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
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              users.map(({ username, severity, link }) => (
                <TableRow key={username}>
                  <TableCell className="font-medium">{username}</TableCell>
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
                      className="flex w-fit items-center gap-1 rounded-md border px-2 py-1"
                    >
                      Review
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
