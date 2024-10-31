"use client"

import CreateSheet from "./create-sheet"
import { DeleteDialog } from "./delete-dialog"

export function TableToolbarActions({
  table,
}) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteDialog
          datas={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateSheet />
    </div>
  )
}
