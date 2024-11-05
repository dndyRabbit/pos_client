"use client"

import * as React from 'react'
import CreateSheet from "./create-sheet"
import { DeleteDialog } from "./delete-dialog"
import FormulaSheet from './formula-sheet'

export function TableToolbarActions({
  table,
}) {
  const [showFormulaSheet, setShowFormulaSheet] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteDialog
          datas={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <FormulaSheet open={showFormulaSheet} onOpenChange={setShowFormulaSheet} showTrigger />
      <CreateSheet />
    </div>
  )
}
