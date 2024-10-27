"use client"

import { Input } from "@/components/ui/input"
import ViewButton from "./view-button"

export default function FilterTable({filter, setFilter, table}) {
  const onHandleChange = (e) => {
    const { name, value } = e.target

    setFilter({ ...filter, [name]: value })
  }

  return (
    <div className="flex space-x-2">
      <ViewButton table={table} />
      {/* <DateRangePicker
        triggerSize="sm"
        triggerClassName="w-56 sm:w-60"
        align="end"
        shallow={false}
      /> */}
      <Input onChange={onHandleChange} value={filter.search} className="h-8 w-[10rem] flex" placeholder="Search..." />
    </div>
  )
}
