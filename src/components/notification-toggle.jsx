"use client";

import Link from "next/link";
import { BellIcon, BellRing, LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Notification() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full w-8 h-8 bg-background mr-2 relative"
                variant="outline"
                size="icon"
              >
                <BellIcon className="w-[1.2rem] h-[1.2rem] ease-in-out duration-500 dark:rotate-0 dark:scale-100 hover:animate-wiggle" />
                <span className="sr-only">Notification</span>

                <span className="absolute h-3 w-3 -top-1 -right-1">
                  <span className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </Button>
            
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Notification</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-72 max-h-[20rem]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-none">Notification</p>
            <BellRing className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <div className="flex space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="#" alt="Avatar" />
                <AvatarFallback className="bg-transparent">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Create New Ingredient</p>
                <small className="text-truncate text-muted-foreground">Dendy just create new ingredient.</small>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
