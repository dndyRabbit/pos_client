"use client"

import { Input } from "@/components/ui/input"
import ViewButton from "./view-button"
import { useSetParams } from "@/helper/set-params"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function FilterTable({table}) {
  const searchParams = useSearchParams();

  const setParams = useSetParams();
  const [filter, setFilter] = useState({
    search: searchParams.get("search")?.toString()
  })

  const onHandleChange = (name, value) => {
    setFilter({...filter, [name]:value})
    setParams({
      [name]: value,
    });
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
      <Input onChange={(e) => onHandleChange('search', e.target.value)} value={filter.search} className="h-8 w-[10rem] flex" placeholder="Search..." />
    </div>
  )
}
