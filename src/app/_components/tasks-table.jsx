"use client"

import * as React from "react"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { getColumns } from "./tasks-table-columns"
import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { useTasksTable } from "./tasks-table-provider"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

export function TasksTable({ tasksPromise: {data, pageCount} }) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable()

  // const { data, pageCount } = React.use(tasksPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    {
      label: "Status",
      value: "status",
      // options: tasks.status.enumValues.map((status) => ({
      //   label: status[0]?.toUpperCase() + status.slice(1),
      //   value: status,
      //   icon: getStatusIcon(status),
      //   withCount: true,
      // })),
    },
    {
      label: "Priority",
      value: "priority",
      // options: tasks.priority.enumValues.map((priority) => ({
      //   label: priority[0]?.toUpperCase() + priority.slice(1),
      //   value: priority,
      //   icon: getPriorityIcon(priority),
      //   withCount: true,
      // })),
    },
  ]

  const { table } = useDataTable({
    data: [],
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  })

  const Toolbar = featureFlags.includes("advancedFilter")
    ? DataTableAdvancedToolbar
    : DataTableToolbar

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <TasksTableFloatingBar table={table} />
        ) : null
      }
    >
      <Toolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
  )
}
