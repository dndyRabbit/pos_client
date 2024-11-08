// components/MultiSelectTable.js
"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MultiSelectIngredient({
  items = [],
  placeholder = "Select items...",
  value = [], // Controlled value
  onChange, // onChange handler from react-hook-form
  className = "",
}) {
  const [open, setOpen] = React.useState(false)

  const isItemSelected = (item) => value.some((selected) => selected.value === item.value)

  const handleSelect = (item) => {
    let updatedValue

    if (isItemSelected(item)) {
      // Remove the item if it's already selected
      updatedValue = value.filter((selected) => selected.value !== item.value)
    } else {
      // Add the new item, and modify only the new selection
      updatedValue = [
        ...value,
        {
          ...item,
          unit_price: item.base_unit_id === item.unit_id ? item.unit_price : 0,
          quantity_used: 0,
          amount: item.base_unit_id === item.unit_id ? 0 : item.unit_price,
        },
      ]
    }

    console.log(updatedValue, "")

    // Call the onChange handler with the updated value
    onChange(updatedValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} className="h-full overflow-auto">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">
            {value.length > 0 ? value.map((item) => item.label).join(", ") : placeholder}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup heading="Ingredients">
              {items.map((item) => (
                <CommandItem
                  key={item.value} // Use unique `value` as key
                  value={item.value}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      isItemSelected(item) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
