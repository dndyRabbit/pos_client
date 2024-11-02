"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormUom from "./form-uom"

export default function UpdateSheet({ data, onOpenChange, open }) {

  const savedAndCloseSheet = async () => {
    onOpenChange(!open)
  }
  const savedSheet = async () => {}
  const closedSheet = async () => {}

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update Uoms</SheetTitle>
          <SheetDescription>
            Update the Uom and save the changes!
          </SheetDescription>
        </SheetHeader>

        {/* Form Content */}
        <FormUom data={data} savedAndCloseSheet={savedAndCloseSheet} />
      </SheetContent>
    </Sheet>
  )
}
