import { GitHubIcon } from "@/components/elements/svg/Github";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Repo } from "./data/schema";

import type { ColumnDef } from "@tanstack/react-table";
import { Link2Icon } from "lucide-react";

export const columns: Array<ColumnDef<Repo>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={`https://github.com/${row.original.name}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        {row.original.name}
        <Link2Icon className="ml-2 h-4 w-4" />
      </a>
    ),
  },

  // {
  //   accessorKey: "permissions.admin",
  //   header: "Admin Permission",
  //   cell: ({ row }) => (
  //     <span>{row.original.permissions.admin ? "Yes" : "No"}</span>
  //   ),
  // },
  // {
  // 	accessorKey: "permissions.maintain",
  // 	header: "Maintain Permission",
  // 	cell: ({ row }) => (
  // 		<span>{row.original.permissions.maintain ? "Yes" : "No"}</span>
  // 	),
  // },
  // {
  //   accessorKey: "link",
  //   header: "Link",
  //   cell: ({ row }) => (
  //     <a
  //       href={`https://github.com/${row.original.full_name}`}
  //       target="_blank"
  //       rel="noreferrer"
  //       className="flex items-center"
  //     >
  //       {row.original.full_name}
  //       <Link2 className="ml-2 h-4 w-4" />
  //     </a>
  //   ),
  // },
  {
    accessorKey: "Install Bot",
    header: "Install Bot",
    cell: ({ row }) => (
      <Button size="sm" variant="outline">
        Install Bot
        <GitHubIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // {
  //   accessorKey: "owner",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Owner
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("owner")}</div>,
  // },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: ({ row }) => (
  //     <div className="truncate max-w-lg" title={row.getValue("description")}>
  //       {row.getValue("description")}
  //     </div>
  //   ),
  // },
];
