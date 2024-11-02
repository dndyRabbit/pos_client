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
          Product ID
          <ArrowUpDown className="ml-1 size-3" />
        </Button>
      );
    },
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
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.sku}
      </div>
    ),
  }, 
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.category?.name}
      </div>
    ),
  },
  {
    accessorKey: "unit_id",
    header: "Unit",
    cell: ({ row }) => (
      <div className="text-left truncate"> {/* Right-align text with padding */}
        {row.original?.unit?.code}
      </div>
    ),
  },
  {
    accessorKey: "cost_price",
    size: 100,
    cell: ({ row }) => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        {row.original?.cost_price?.toLocaleString()}
      </div>
    ),
    header: () => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        Cost Price
      </div>
    ),
  },
  {
    accessorKey: "sale_price",
    size: 100,
    cell: ({ row }) => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        {row.original?.sale_price?.toLocaleString()}
      </div>
    ),
    header: () => (
      <div className="text-right pr-2"> {/* Right-align text with padding */}
        Sale Price
      </div>
    ),
  },

  {
    id: "actions",
  },
];
