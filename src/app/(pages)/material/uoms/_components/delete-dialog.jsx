"use client"

import * as React from "react"
import { TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { deleteUom } from "@/actions/masters"
import { useSetParams } from "@/helper/set-params"

export function DeleteDialog({
  datas,
  showTrigger = true,
  onSuccess = () => {},
  ...props
}) {
  const setParams = useSetParams();
  const isDesktop = useMediaQuery("(min-width: 640px)")

  async function onDelete() {
    if(datas?.length > 0){
      await Promise.all(
        datas.map(async val => {
          await deleteUom({
            id: val.id,
          })
        })
      )
    }
   
    toast.success("Uoms deleted")
    onSuccess?.()
    setParams({
      page: 1,
      limit: 10,
    });
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
              Delete ({datas.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              <span className="font-medium">{datas.length}</span>
              {datas.length === 1 ? " Uom" : " Uoms"} from the dabatase.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={onDelete}
              // disabled={isDeletePending}
            >
              {/* {isDeletePending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )} */}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({datas.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{datas.length}</span>
            {datas.length === 1 ? " Uom" : " Uoms"} from the database.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
          >
            {/* {isDeletePending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )} */}
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
