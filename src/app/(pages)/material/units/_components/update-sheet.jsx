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
import FormUnit from "./form-unit"

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
          <SheetTitle>Update Unit</SheetTitle>
          <SheetDescription>
            Update the Unit and save the changes!
          </SheetDescription>
        </SheetHeader>

        {/* Form Content */}
        <FormUnit data={data} savedAndCloseSheet={savedAndCloseSheet} />
      </SheetContent>
    </Sheet>
  )
}
