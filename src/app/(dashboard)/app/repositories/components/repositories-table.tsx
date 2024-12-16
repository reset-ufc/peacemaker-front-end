"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Repo } from "./data/schema";

export function RepositoriesTable() {
  const [repos] = useState<Repo[]>([]);

  return (
    <div className="hidden flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable columns={columns} data={repos} />
    </div>
  );
}
