"use client"
import { Button } from "@/components/ui/button";
import UpdateSheet from "./update-sheet";
import { DeleteDialog } from "./delete-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertCircle, Pen } from "lucide-react";
import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const ActionButtons = ({ data }) => {
  const [showUpdateSheet, setShowUpdateSheet] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  return (
    <div className='flex justify-center'>
    <UpdateSheet
      data={data}
      onOpenChange={setShowUpdateSheet}
      open={showUpdateSheet}
    />
    <DeleteDialog
      open={showDeleteDialog}
      onOpenChange={setShowDeleteDialog}
      datas={[data]}
      showTrigger={false}
      onSuccess={() => {}}
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open menu"
          variant="ghost"
          className="flex size-8 p-0 m-0 data-[state=open]:bg-muted self-end"
        >
          <DotsHorizontalIcon className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[10rem]">
        <DropdownMenuItem
          onSelect={() => setShowUpdateSheet(true)}
          className="cursor-pointer"
        >
          Edit
          <DropdownMenuShortcut>
            <Pen size="1rem" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => setShowDeleteDialog(true)}
          className="cursor-pointer"
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  );
};

export default ActionButtons;
