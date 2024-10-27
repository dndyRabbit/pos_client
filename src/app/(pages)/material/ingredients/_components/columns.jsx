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
    accessorKey: "code",
    header: ({ }) => {
      return (
        <Button
          variant="none"
          size="sm"
          className="m-0 p-0 h-8"
        >
          Ingredient ID
          <ArrowUpDown className="ml-1 size-3" />
        </Button>
      );
    },
  }, 
  {
    accessorKey: "name",
    header: "Ingredient Description",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.name}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        {row.original?.quantity?.toLocaleString()}
      </div>
    ),
    header: () => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        Qty
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const data = row.original;
      return data?.unit?.code
    },
  },
  {
    accessorKey: "unit_price",
    size: 100,
    cell: ({ row }) => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        {row.original?.unit_price?.toLocaleString()}
      </div>
    ),
    header: () => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        Unit Price
      </div>
    ),
  },
  {
    id: "actions",
  },
];
