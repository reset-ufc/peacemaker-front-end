"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Repository } from "@/services/repositories/action";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ExternalLinkIcon } from "lucide-react";

export const columns: Array<ColumnDef<Repository>> = [
  {
    accessorKey: "repository_id",
    header: () => <div className="font-semibold text-sm">Repository Id</div>,
  },

  {
    accessorKey: "repository_name",
    header: () => <div className="font-semibold text-sm">Repository Name</div>,
  },
  {
    accessorKey: "repository_full_name",
    header: () => <div className="font-semibold text-sm">Repository Link</div>,
    cell: ({ row }) => (
      <a
        className="flex items-center gap-2 hover:underline"
        href={`https://github.com/${row.getValue("repository_full_name")}`}
        target="_blank"
        rel="noreferrer"
      >
        {row.getValue("repository_full_name")}
        <ExternalLinkIcon className="size-4" />
      </a>
    ),
  },
];

export function RepositoriesTable({ data }: { data: Array<Repository> }) {
  const table = useReactTable({
    data,
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
                          header.getContext(),
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
