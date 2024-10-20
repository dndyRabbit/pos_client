"use client";

import Link from "next/link";
import { Annoyed, LogOut, Rabbit, SquareArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
// import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { clearStorage, getMenus } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Menu({ isOpen }) {
  
  const router = useRouter()
  const pathname = usePathname();
  // const menuList = getMenuList(pathname);
  const menus = getMenus()

  const onLogout = async () => {
    try {
      const res = await axios.post('/api/logout', null)

      if(res.status === 200){
        clearStorage()
        router.push('/')
        toast.success('Account logged out.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          <li className={cn("w-full")}>
            {menus?.map(
              ({ url, name, icon: Icon, active, menu_child }, index) =>
                !menu_child || menu_child.length === 0 ? (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              (active === undefined &&
                                pathname.startsWith(url)) ||
                              active
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start h-10 mb-1"
                            asChild
                          >
                            <Link href={url}>
                              <span
                                className={cn(isOpen === false ? "" : "mr-4")}
                              >
                                <Rabbit size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {name}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">
                            {name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      // icon={Icon}
                      name={name}
                      active={
                        active === undefined
                          ? pathname.startsWith(url)
                          : active
                      }
                      menu_child={menu_child}
                      isOpen={isOpen}
                    />
                  </div>
                )
            )}
          </li>
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                    type="button"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
