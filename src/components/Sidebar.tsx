import { logout } from "@/actions/auth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LogOut, Ticket, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SideBarWrapper from "./wrappers/SideBarWrapper";

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <TooltipProvider>
        <div></div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/mandaty"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Ticket className="h-5 w-5" />
                <span className="sr-only">Mandaty</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Mandaty</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/kierowcy"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Kierowcy</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Kierowcy</TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </TooltipTrigger>
          <TooltipContent side="right">Wyloguj</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SideBarWrapper>
  );
};

export default Sidebar;
