"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormFormula from "./form-formula"
import { PlusCircleIcon } from "lucide-react"

export default function FormulaSheet({ data, onOpenChange, open, showTrigger = false }) {
  const savedAndCloseSheet = async () => {
    onOpenChange(!open)
  }

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      {showTrigger && <SheetTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline"
          size="sm"
          className="ml-auto flex h-8"
        >
          <PlusCircleIcon className="mr-2 size-4" />
          Create Formula
        </Button>
      </SheetTrigger>}
      <SheetContent className="flex flex-col gap-6 h-[90%] w-full" side="bottom">
        <FormFormula data={data} savedAndCloseSheet={savedAndCloseSheet} />
      </SheetContent>
    </Sheet>
  )
}

