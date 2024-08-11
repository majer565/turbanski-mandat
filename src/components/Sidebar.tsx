import { logout } from "@/actions/auth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleDotDashed, LogOut, Settings, Tickets, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SideBarWrapper from "./wrappers/SideBarWrapper";

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <TooltipProvider>
        <div className="flex flex-col gap-8 items-center">
          <div>
            <CircleDotDashed className="w-7 h-7" />
          </div>
          <div className="gap-3 flex flex-col items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/mandaty"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Tickets className="h-5 w-5" />
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/ustawienia"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Ustawienia</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ustawienia</TooltipContent>
            </Tooltip>
          </div>
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
