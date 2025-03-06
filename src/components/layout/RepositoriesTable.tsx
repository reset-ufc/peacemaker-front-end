"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ExternalLinkIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Repository {
  _id: string;
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

export const columns: Array<ColumnDef<Partial<Repository>>> = [
  {
    accessorKey: "gh_repository_id",
    header: () => <div className="text-sm font-semibold">Repository Id</div>,
    cell: ({ row }) => (
      <p className="text-sm">{row.getValue("gh_repository_id")}</p>
    ),
  },

  {
    id: "name",
    accessorKey: "name",

    header: () => <div className="text-sm font-semibold">Repository Name</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="text-sm">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: () => <div className="text-sm font-semibold">Repository Link</div>,
    cell: ({ row }) => (
      <a
        className="flex items-center gap-2 hover:underline"
        href={row.getValue("url")}
        target="_blank"
        rel="noreferrer"
      >
        {row.getValue("url")}
        <ExternalLinkIcon className="size-4" />
      </a>
    ),
  },
];

interface RepositoriesTableProps {
  initialData: Array<Partial<Repository>>;
}

export function RepositoriesTable({ initialData }: RepositoriesTableProps) {
  const table = useReactTable({
    data: initialData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
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
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map(cell => (
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
