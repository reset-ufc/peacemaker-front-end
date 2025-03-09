"use client";

import { useState } from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  GithubIcon,
  LockIcon,
  SearchIcon,
  UnlockIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Repository {
  user_id: string;
  gh_user_id: string;
  gh_repository_id: string;
  name: string;
  repo_fullname: string;
  url: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

// Mock data based on the provided API response
const mockRepositories: Repository[] = [];

const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 p-0 hover:bg-transparent"
        >
          <span className="font-semibold">Repository</span>
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPrivate = row.original.is_private;
      return (
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
            <GithubIcon className="text-primary h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{row.original.name}</span>
              {isPrivate ? (
                <LockIcon className="h-3.5 w-3.5 text-amber-500" />
              ) : (
                <UnlockIcon className="h-3.5 w-3.5 text-green-500" />
              )}
            </div>
            <span className="text-muted-foreground text-xs">
              {row.original.repo_fullname}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
      const isPrivate = row.original.is_private;
      return (
        <Badge
          variant={isPrivate ? "outline" : "secondary"}
          className={cn(
            "font-normal",
            isPrivate
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "bg-green-50 text-green-700"
          )}
        >
          {isPrivate ? "Private" : "Public"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 p-0 hover:bg-transparent"
        >
          <span className="font-semibold">Created</span>
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground text-sm">
          {format(new Date(row.original.created_at), "MMM dd, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 p-0 hover:bg-transparent"
        >
          <span className="font-semibold">Updated</span>
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground text-sm">
          {format(new Date(row.original.updated_at), "MMM dd, yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <a
          href={row.original.url}
          target="_blank"
          rel="noreferrer"
          className="text-primary flex items-center gap-1 text-sm hover:underline"
        >
          View on GitHub
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      );
    },
  },
];

export function RepositoriesTable({
  repositories,
}: {
  repositories: Repository[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const [pageIndex, setPageIndex] = useQueryState("page", {
    defaultValue: "0",
  });

  const table = useReactTable({
    data: repositories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchQuery,
      pagination: {
        pageIndex: Number(pageIndex),
        pageSize: 10,
      },
    },
    filterFns: {
      fuzzy: (row, columnId, value) => {
        const itemValue = row.getValue(columnId) as string;
        return itemValue.toLowerCase().includes(value.toLowerCase());
      },
    },
  });

  // Update URL when pagination changes
  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex.toString());
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className={cn("w-1/5")}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No repositories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Number(pageIndex) - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {Number(pageIndex) + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Number(pageIndex) + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
