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
import FormIngredient from "./form-ingredient"

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
          <SheetTitle>Update Ingredients</SheetTitle>
          <SheetDescription>
            Update the ingredient and save the changes!
          </SheetDescription>
        </SheetHeader>

        {/* Form Content */}
        <FormIngredient data={data} savedAndCloseSheet={savedAndCloseSheet} />
      </SheetContent>
    </Sheet>
  )
}
