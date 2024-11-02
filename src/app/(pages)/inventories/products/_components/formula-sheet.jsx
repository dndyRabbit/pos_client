"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import FormFormula from "./form-formula"

export default function FormulaSheet({ data, onOpenChange, open }) {
  const savedAndCloseSheet = async () => {
    onOpenChange(!open)
  }

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="flex flex-col gap-6 h-[90%] w-full" side="bottom">
        <FormFormula data={data} savedAndCloseSheet={savedAndCloseSheet} />
      </SheetContent>
    </Sheet>
  )
}

