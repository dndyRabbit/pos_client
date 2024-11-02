"use client";

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "code",
    header: "Category ID",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.code}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.name}
      </div>
    ),
  },
  {
    id: "actions",
  },
];
