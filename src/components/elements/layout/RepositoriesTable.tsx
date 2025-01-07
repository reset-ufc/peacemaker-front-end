"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { repositoriesService } from "@/services/repositories";
import type { Repository } from "@/services/repositories/action";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const columns: Array<ColumnDef<Repository>> = [
  {
    accessorKey: "repository_id",
    header: () => <div className="font-semibold text-sm">Repository Id</div>,
    cell: ({ row }) => (
      <Link
        href={`/app/dashboard/${row.getValue("repository_id")}`}
        className="text-sm"
      >
        {row.getValue("repository_id")}
      </Link>
    ),
  },

  {
    id: "repository_name",
    accessorKey: "repository_name",

    header: () => <div className="font-semibold text-sm">Repository Name</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="text-sm">{row.getValue("repository_name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "github_html_url",
    header: () => <div className="font-semibold text-sm">Repository Link</div>,
    cell: ({ row }) => (
      <a
        className="flex items-center gap-2 hover:underline"
        href={row.getValue("github_html_url")}
        target="_blank"
        rel="noreferrer"
      >
        {row.getValue("github_html_url")}
        <ExternalLinkIcon className="size-4" />
      </a>
    ),
  },
];

export function RepositoriesTable() {
  const { repositories: data } = repositoriesService();

  const table = useReactTable({
    data: data?.repositories ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
