"use client";

import React from 'react'
import { AlertCircle, ArrowUpDown, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import UpdateSheet from './update-sheet';
import { DeleteDialog } from './delete-dialog';

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
    accessorKey: "from_unit",
    header: "From Unit",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.from_unit?.code}
      </div>
    ),
  },
  {
    accessorKey: "to_unit",
    header: "To Unit",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.to_unit?.code}
      </div>
    ),
  },
  {
    accessorKey: "conversion_factor",
    cell: ({ row }) => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        {row.original?.conversion_factor?.toLocaleString()}
      </div>
    ),
    header: () => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        Conversion Factor
      </div>
    ),
  },
  {
    accessorKey: "multiply_divided",
    header: " Multiply/Divided",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.multiply_divided?.toLocaleString()}
      </div>
    ),
  },
  {
    id: "actions",
  },
];
