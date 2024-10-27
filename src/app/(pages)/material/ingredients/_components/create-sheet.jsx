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
import { PlusCircleIcon } from "lucide-react"
import FormIngredient from "./form-ingredient"

export default function CreateSheet({fetchData}) {
  const [open, setOpen] = React.useState(false)

  const savedAndCloseSheet = async () => {
    await fetchData()
    setOpen(!open)
  }
  const savedSheet = async () => {}
  const closedSheet = async () => {}

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline"
          size="sm"
          className="ml-auto flex h-8"
        >
          <PlusCircleIcon className="mr-2 size-4" />
          Create Ingredient
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Create Ingredients</SheetTitle>
          <SheetDescription>
            Create new ingredient and save the changes!
          </SheetDescription>
        </SheetHeader>

        {/* Form Content */}
        <div className="d-flex flex-col overflow-auto h-[100vh] px-2">
          <FormIngredient 
            data={null}
            savedAndCloseSheet={savedAndCloseSheet} 
            savedSheet={savedSheet} 
            closedSheet={closedSheet} 
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}