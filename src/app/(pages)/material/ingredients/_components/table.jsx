"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import FilterTable from "./filter-table";
import { TableToolbarActions } from "./table-toolbar-actions";
import ActionButtons from "./action-buttons";

export default function DataTable({
  columns,
  data,
  pagination,
  fetchData,
  filter,
  setFilter
}) {
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPage,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination: {
        pageIndex: pagination?.page - 1,
        pageSize: pagination?.limit,
      },
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4 space-x-2">
        <FilterTable filter={filter} setFilter={setFilter} table={table} />
        <TableToolbarActions table={table} fetchData={fetchData} />
      </div>
      <div className="rounded-md border overflow-auto max-h-[560px]" >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-md">
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}

                      {cell.id === `${index}_actions` && <ActionButtons data={row.original} fetchData={fetchData} />}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col py-2">
        <DataTablePagination table={table} pagination={pagination} fetchData={fetchData} />
      </div>
    </div>
  );
}
